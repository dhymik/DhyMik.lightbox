Bootstrap Lightbox
========

A lightbox module for Bootstrap that supports images, YouTube videos, and galleries - built around Bootstrap's Modal plugin.

This is DhyMik's fork from http://ashleydw.github.io/lightbox

# v.5.5.0-dhymik

Fixed by DhyMik:
- svg images won't display in Firefox
- svg images would be displayed too small
- dynamic changes in .modal-dialog padding where not picked up upon window resize
- black backdrop leaks out at the sides
- images are displayed in native size and not zoomed to window size
- image area too small on some mobile devices, for instance IOS

Changed by DhyMik
- For video and remote content items, 'isVideo' class is being added to modal-dialog item
- New config option 'hideArrowsOnVideo', defaults to 'false'. If 'false', Navigation arrows display also for videos. For videos, navigation pane is behind video.
- New config option 'debug', defaults to 'false'. If true, some debug information pops up.
- Improved resize function to pick up on real modal dialog size


Contributing
----
Instead of modifying the /dist/*.js JavaScript files directly, you should instead modify the ekko-lightbox.js file and run the grunt task.

Copyright and license
----

Code released under [the MIT license](https://github.com/ashleydw/lightbox/blob/master/LICENSE).
