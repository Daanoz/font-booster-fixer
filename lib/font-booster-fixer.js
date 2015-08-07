;(function () {
  'use strict';

  /**
   * @preserve FontBoosterFixer: Polyfill for font booster offset on android devices.
   *
   * @copyright DaanSieben.net [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */

  /*jslint browser:true, node:true*/
  /*global define */

  /**
   * Instantiate FontBoosterFixer.
   *
   * @constructor
   * @param {Object} [options={}] The options to override the defaults
   */
  function FontBoosterFixer(options) {
    options = options || {};

    /**
     * Scaling factor for fonts.
     *
     * @type number
     */
    this.factor = options.factor || null;

    /**
     * List of units to be converted
     *
     * @type Array
     */
    this.units = options.units || ['px', 'pt', 'pc', 'cm', 'mm', 'pc'];

    /**
     * Regex for size parsing
     *
     * @type RegExp
     */
    this.sizeRegex = options.sizeRegex || new RegExp('^([0-9\\.]*?)('+this.units.join('|')+')(.*?)$', 'igm');
  }

  /**
   * Creates a temporary text element to messure font offset
   *
   */
  FontBoosterFixer.prototype.getFontFactor = function() {
    var p = document.createElement('p');
    p.style.lineHeight = '100px';
    p.style.position = 'absolute';
    p.style.opacity = '0.001';
    p.innerText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    document.body.appendChild(p);
    this.factor = 100 / p.getBoundingClientRect().height;
    p.remove();
  };

  /**
   * Converts provided value to the correct font size
   *
   * @param {string} css style string
   * @returns {string} converted style string
   */
  FontBoosterFixer.prototype.convertSize = function(value) {
    if(!this.factor) {
      this.getFontFactor();
    }
    if(this.factor === 1) {
      return value;
    }

    var sizeMatches = this.sizeRegex.exec(value);
    if(sizeMatches) {
      value = (parseFloat(sizeMatches[1]) * this.factor) + sizeMatches[2] + sizeMatches[3];
    }
    return value;
  };

  /**
   * Parses css style element for styles that have to be converted
   *
   * @param {cssStyle} css style element
   */
  FontBoosterFixer.prototype.convertStyle = function(style) {
    if(style.lineHeight) {
      style.lineHeight = this.convertSize(style.lineHeight);
    }
    if(style.fontSize) {
      style.fontSize = this.convertSize(style.fontSize);
    }
  };

  /**
   * Parses css stylesheet for rules that have to be converted
   *
   * @param {styleSheet} css stylesheet element
   */
  FontBoosterFixer.prototype.parseStyleSheet = function(styleSheet) {
    var rule = null;
    if (styleSheet.cssRules) {
      for (var i = 0; i < styleSheet.cssRules.length; i++) {
        rule = styleSheet.cssRules[i];
        if(rule.style) {
          this.convertStyle(rule.style);
        }
      }
    }
  };

  /**
   * Parses the full page
   *
   */
  FontBoosterFixer.prototype.parsePage = function() {
    if (document.styleSheets) {
      for (var i = 0; i < document.styleSheets.length; i++) {
        this.parseStyleSheet(document.styleSheets[i]);
      }
    }
  };

  /**
   * Factory method for creating a FontBoosterFixer object
   *
   */
  FontBoosterFixer.attach = function(options) {
    return new FontBoosterFixer(options);
  };

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return FontBoosterFixer;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = FontBoosterFixer.attach;
    module.exports.FontBoosterFixer = FontBoosterFixer;
  } else {
    window.FontBoosterFixer = FontBoosterFixer;
  }
}());