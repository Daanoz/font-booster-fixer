# font-booster-fixer #

FontBoosterFixer is a libary which tries convert font-sizes that were altered by android's font boosting back to their original size.

*Still under development, needs more test cases/devices! Please raise an issue if you find a non-working situation*

## Why is this fix needed? ##

Apparently there is a bug in WebKit that causes the fonts to render in the incorrect size. Mainly in webview components which are used by libraries like Cordova, the bug is very visible.

[WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=84186)
[Stack overflow issue #1](http://stackoverflow.com/questions/31573602/android-webview-css-line-height-rendering-bug)
[Stack overflow issue #2](http://stackoverflow.com/questions/11289166/chrome-on-android-resizes-font)

There is currently no good CSS fix that will work in all cases, therefor we created this JavaScript library which tries to correct all font-sizes.

## What is still todo? ##

* Test on more devices
* Performance optimizations (maybe using the user-agent to determine if the script has to be run?)
* Expand readme on use cases

## Credits and collaboration ##

FontBoosterFixer is maintained by [Daan Sieben](https://www.linkedin.com/in/daansieben). Comments, feedback and suggestions are welcome.  Please feel free to raise an issue or pull request.
