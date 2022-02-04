/*!
 * Lightbox for Bootstrap by @ashleydw
 * Ekko Lightbox v.5.5.0-dhymik * https://github.com/dhymik/lightbox
 * based on: * Ekko Lightbox v.5.5.0-dhymik * https://github.com/ashleydw/lightbox
 *
 * License: https://github.com/ashleydw/lightbox/blob/master/LICENSE
 */
+function ($) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Lightbox = function ($) {
  /* Added in v.5.5.0-dhymik:
   * (search for "added by DhyMik")
   * 
   * 1. auto max data dimensions to max screen dimensions
   * 
   *    This solves issues with svg displayed too small
   *    and images / video frames not filling the screen
   * 
   * 2. skip resizing and adding inline size styles when
   *    'lightboxFullSize' css class is added to the lighbox <a> tag
   *    
   *    Use this if
   */
  var NAME = 'ekkoLightbox';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    debug: 0,
    // 0: no debug, 1: on-screen info, 2: on-screen plus pop-ups
    title: '',
    footer: '',
    maxWidth: 9999,
    maxHeight: 9999,
    showArrows: true,
    //display the left / right arrows or not
    hideArrowsOnVideo: false,
    //hide the left / right arrows for videos
    wrapping: true,
    //if true, gallery loops infinitely
    type: null,
    //force the lightbox into image / youtube mode. if null, or not image|youtube|vimeo; detect it
    alwaysShowClose: false,
    //always show the close button, even if there is no title
    fade: true,
    // fade in or not
    verticalAlignCenter: false,
    // vertically centered modal
    loadingMessage: '<div class="ekko-lightbox-loader"><div><div></div><div></div></div></div>',
    // http://tobiasahlin.com/spinkit/
    leftArrow: '<span>&#10094;</span>',
    rightArrow: '<span>&#10095;</span>',
    strings: {
      close: 'Close',
      fail: 'Failed to load image:',
      type: 'Could not detect remote target type. Force the type using data-type'
    },
    doc: document,
    // if in an iframe can specify top.document
    onShow: function onShow() {},
    onShown: function onShown() {},
    onHide: function onHide() {},
    onHidden: function onHidden() {},
    onNavigate: function onNavigate() {},
    onContentLoaded: function onContentLoaded() {}
  };

  var Lightbox = /*#__PURE__*/function () {
    function Lightbox($element, config) {
      var _this = this;

      _classCallCheck(this, Lightbox);

      this._config = $.extend({}, Default, config);
      this._$modalNavLayer = null;
      this._$modalArrows = null;
      this._$debugInfo = null;
      this._galleryIndex = 0;
      this._galleryName = null;
      this._titleIsShown = false;
      this._footerIsShown = false;
      this._wantedWidth = 0;
      this._wantedHeight = 0;
      this._touchstartX = 0;
      this._touchendX = 0;
      this._modalId = "ekkoLightbox-".concat(Math.floor(Math.random() * 1000 + 1));
      this._$element = $element instanceof jQuery ? $element : $($element);
      this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;
      var h4 = "<h4 class=\"modal-title\">".concat(this._config.title || "&nbsp;", "</h4>");
      var btn = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"".concat(this._config.strings.close, "\"><span aria-hidden=\"true\">&times;</span></button>");
      var fade = this._config.fade ? 'fade in' : '';
      var vertical = this._config.verticalAlignCenter ? 'modal-dialog-centered' : '';
      var header = "<div class=\"modal-header".concat(this._config.title || this._config.alwaysShowClose ? '' : ' hide', "\">") + (this._isBootstrap3 ? btn + h4 : h4 + btn) + "</div>";
      var footer = "<div class=\"modal-footer".concat(this._config.footer ? '' : ' hide', "\">").concat(this._config.footer || "&nbsp;", "</div>");
      var body = "<div class=\"modal-body\"><div class=\"ekko-lightbox-container\"><div class=\"ekko-lightbox-item ".concat(fade, " show\"></div><div class=\"ekko-lightbox-item fade\"></div></div></div>");
      var dialog = "<div class=\"modal-dialog ".concat(vertical, "\" role=\"document\"><div class=\"modal-content\">").concat(header).concat(body).concat(footer, "</div></div>");
      $(this._config.doc.body).append("<div id=\"".concat(this._modalId, "\" class=\"ekko-lightbox modal fade\" tabindex=\"-1\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">").concat(dialog, "</div>"));
      this._$modal = $("#".concat(this._modalId), this._config.doc);
      if (this._config.debug > 0) this._$modal.append("<div class=\"modal-debug-info\"></div>");
      this._$debugInfo = this._$modal.find('.modal-debug-info').first();
      this._$modalDialog = this._$modal.find('.modal-dialog').first();
      this._$modalContent = this._$modal.find('.modal-content').first();
      this._$modalBody = this._$modal.find('.modal-body').first();
      this._$modalHeader = this._$modal.find('.modal-header').first();
      this._$modalFooter = this._$modal.find('.modal-footer').first();
      this._$lightboxContainer = this._$modalBody.find('.ekko-lightbox-container').first();
      this._$lightboxBodyOne = this._$lightboxContainer.find('> div:first-child').first();
      this._$lightboxBodyTwo = this._$lightboxContainer.find('> div:last-child').first();
      this._galleryName = this._$element.data('gallery');

      if (this._galleryName) {
        this._$galleryItems = $(document.body).find("*[data-gallery=\"".concat(this._galleryName, "\"]"));
        this._galleryIndex = this._$galleryItems.index(this._$element);
        $(document).on('keydown.ekkoLightbox', this._navigationalBinder.bind(this)); // add the directional arrows to the modal

        if (this._config.showArrows && this._$galleryItems.length > 1) {
          // add the navigation layer with full surface links
          this._$lightboxContainer.prepend("<div class=\"ekko-lightbox-nav-overlay\"><a href=\"#\"></a><a href=\"#\"></a></div>");

          this._$modalNavLayer = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay').first(); // add the link arrows suitable also for video overlay

          this._$lightboxContainer.append("<div class=\"ekko-lightbox-nav-arrows\"><a href=\"#\">".concat(this._config.leftArrow, "</a><a href=\"#\">").concat(this._config.rightArrow, "</a></div>"));

          this._$modalArrows = this._$lightboxContainer.find('div.ekko-lightbox-nav-arrows').first(); // add the click event handlers to all links

          this._$lightboxContainer.on('click', 'a:first-child', function (event) {
            event.preventDefault();
            return _this.navigateLeft();
          });

          this._$lightboxContainer.on('click', 'a:last-child', function (event) {
            event.preventDefault();
            return _this.navigateRight();
          }); // add the hover event handlers to nav surface links, adding hover class to arrow links


          this._$modalNavLayer.find('a:first-child').hover(function () {
            _this._$modalArrows.find('a:first-child').addClass('hover');
          }, function () {
            _this._$modalArrows.find('a:first-child').removeClass('hover').filter('[class=""]').removeAttr('class');
          });

          this._$modalNavLayer.find('a:last-child').hover(function () {
            _this._$modalArrows.find('a:last-child').addClass('hover');
          }, function () {
            _this._$modalArrows.find('a:last-child').removeClass('hover').filter('[class=""]').removeAttr('class');
          });

          this.updateNavigation();
        }
      }

      this._$modal.on('show.bs.modal', this._config.onShow.bind(this)).on('shown.bs.modal', function () {
        _this._toggleLoading(true);

        _this._handle();

        return _this._config.onShown.call(_this);
      }).on('hide.bs.modal', this._config.onHide.bind(this)).on('hidden.bs.modal', function () {
        if (_this._galleryName) {
          $(document).off('keydown.ekkoLightbox');
          $(window).off('resize.ekkoLightbox');
        }

        _this._$modal.remove();

        return _this._config.onHidden.call(_this);
      }).modal(this._config);

      $(window).on('resize.ekkoLightbox', function () {
        _this._resize(_this._wantedWidth, _this._wantedHeight);
      });

      this._$lightboxContainer.on('touchstart', function () {
        _this._touchstartX = event.changedTouches[0].screenX;
      }).on('touchend', function () {
        _this._touchendX = event.changedTouches[0].screenX;

        _this._swipeGesure();
      });
    }

    _createClass(Lightbox, [{
      key: "element",
      value: function element() {
        return this._$element;
      }
    }, {
      key: "modal",
      value: function modal() {
        return this._$modal;
      }
    }, {
      key: "navigateTo",
      value: function navigateTo(index) {
        if (index < 0 || index > this._$galleryItems.length - 1) return this;
        this._galleryIndex = index;
        this.updateNavigation();
        this._$element = $(this._$galleryItems.get(this._galleryIndex));

        this._handle();
      }
    }, {
      key: "navigateLeft",
      value: function navigateLeft() {
        if (!this._$galleryItems) return;
        if (this._$galleryItems.length === 1) return;

        if (this._galleryIndex === 0) {
          if (this._config.wrapping) this._galleryIndex = this._$galleryItems.length - 1;else return;
        } else //circular
          this._galleryIndex--;

        this._config.onNavigate.call(this, 'left', this._galleryIndex);

        return this.navigateTo(this._galleryIndex);
      }
    }, {
      key: "navigateRight",
      value: function navigateRight() {
        if (!this._$galleryItems) return;
        if (this._$galleryItems.length === 1) return;

        if (this._galleryIndex === this._$galleryItems.length - 1) {
          if (this._config.wrapping) this._galleryIndex = 0;else return;
        } else //circular
          this._galleryIndex++;

        this._config.onNavigate.call(this, 'right', this._galleryIndex);

        return this.navigateTo(this._galleryIndex);
      }
    }, {
      key: "updateNavigation",
      value: function updateNavigation() {
        if (!this._config.wrapping) {
          var $nav = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay');

          if (this._galleryIndex === 0) $nav.find('a:first-child').addClass('disabled');else $nav.find('a:first-child').removeClass('disabled');
          if (this._galleryIndex === this._$galleryItems.length - 1) $nav.find('a:last-child').addClass('disabled');else $nav.find('a:last-child').removeClass('disabled');
        }
      }
    }, {
      key: "close",
      value: function close() {
        return this._$modal.modal('hide');
      } // helper private methods

    }, {
      key: "_navigationalBinder",
      value: function _navigationalBinder(event) {
        event = event || window.event;
        if (event.keyCode === 39) return this.navigateRight();
        if (event.keyCode === 37) return this.navigateLeft();
      } // type detection private methods

    }, {
      key: "_detectRemoteType",
      value: function _detectRemoteType(src, type) {
        type = type || false;
        if (!type && this._isImage(src)) type = 'image';
        if (!type && this._getYoutubeId(src)) type = 'youtube';
        if (!type && this._getVimeoId(src)) type = 'vimeo';
        if (!type && this._getInstagramId(src)) type = 'instagram';
        if (type == 'audio' || type == 'video' || !type && this._isMedia(src)) type = 'media';
        if (!type || ['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(type) < 0) type = 'url';
        return type;
      }
    }, {
      key: "_getRemoteContentType",
      value: function _getRemoteContentType(src) {
        var response = $.ajax({
          type: 'HEAD',
          url: src,
          async: false
        });
        var contentType = response.getResponseHeader('Content-Type');
        return contentType;
      }
    }, {
      key: "_isImage",
      value: function _isImage(string) {
        return string && string.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
      }
    }, {
      key: "_isMedia",
      value: function _isMedia(string) {
        return string && string.match(/(\.(mp3|mp4|ogg|webm|wav)((\?|#).*)?$)/i);
      }
    }, {
      key: "_containerToUse",
      value: function _containerToUse() {
        var _this2 = this;

        // if currently showing an image, fade it out and remove
        var $toUse = this._$lightboxBodyTwo;
        var $current = this._$lightboxBodyOne;

        if (this._$lightboxBodyTwo.hasClass('in')) {
          $toUse = this._$lightboxBodyOne;
          $current = this._$lightboxBodyTwo;
        }

        $current.removeClass('in show');
        setTimeout(function () {
          if (!_this2._$lightboxBodyTwo.hasClass('in')) _this2._$lightboxBodyTwo.empty();
          if (!_this2._$lightboxBodyOne.hasClass('in')) _this2._$lightboxBodyOne.empty();
        }, 500);
        $toUse.addClass('in show');
        return $toUse;
      }
    }, {
      key: "_handle",
      value: function _handle() {
        // ### Added by DhyMik in v.5.5.0-dhymik:
        // remove css added in '_preloadImage'
        this._$modalDialog.removeClass("imageLoading");

        this._$modalDialog.removeClass("imageLoaded");

        this._$modalDialog.removeClass("imageStretched");

        this._$modalDialog.removeClass("isVideo"); // ### End added by DhyMik in v.5.5.0-dhymik:


        var $toUse = this._containerToUse();

        this._updateTitleAndFooter();

        var currentRemote = this._$element.attr('data-remote') || this._$element.attr('href');

        var currentType = this._detectRemoteType(currentRemote, this._$element.attr('data-type') || false);

        if (['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(currentType) < 0) return this._error(this._config.strings.type);

        switch (currentType) {
          case 'image':
            var altTag = this._$element.attr('data-alt') || '';

            this._preloadImage(currentRemote, altTag, $toUse);

            this._preloadImageByIndex(this._galleryIndex, 3);

            break;

          case 'youtube':
            this._showYoutubeVideo(currentRemote, $toUse);

            break;

          case 'vimeo':
            this._showVimeoVideo(this._getVimeoId(currentRemote), $toUse);

            break;

          case 'instagram':
            this._showInstagramVideo(this._getInstagramId(currentRemote), $toUse);

            break;

          case 'media':
            this._showHtml5Media(currentRemote, $toUse);

            break;

          default:
            // url
            this._loadRemoteContent(currentRemote, $toUse);

            break;
        }

        return this;
      }
    }, {
      key: "_getYoutubeId",
      value: function _getYoutubeId(string) {
        if (!string) return false;
        var matches = string.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        return matches && matches[2].length === 11 ? matches[2] : false;
      }
    }, {
      key: "_getVimeoId",
      value: function _getVimeoId(string) {
        return string && string.indexOf('vimeo') > 0 ? string : false;
      }
    }, {
      key: "_getInstagramId",
      value: function _getInstagramId(string) {
        return string && string.indexOf('instagram') > 0 ? string : false;
      } // layout private methods

    }, {
      key: "_toggleLoading",
      value: function _toggleLoading(show) {
        show = show || false;

        if (show) {
          this._$modalDialog.css('display', 'none');

          this._$modal.removeClass('in show');

          $('.modal-backdrop').append(this._config.loadingMessage);
        } else {
          this._$modalDialog.css('display', this._config.verticalAlignCenter ? 'flex' : 'block');

          this._$modal.addClass('in show');

          $('.modal-backdrop').find('.ekko-lightbox-loader').remove();
        }

        return this;
      }
    }, {
      key: "_calculateScaleFactor",
      value: function _calculateScaleFactor(width, height) {
        /* 'calculateScaleFactor' is the size factor to be applied to an image's or video#s dimensions
         * so it will fill the entire screen if browser window is maximized or full-screened.
         * 
         * Added in v.5.5.0-dhymik
         * */
        var screenWidth = window.screen.width; // these are the hardware screen dimensions,

        var screenHeight = window.screen.height; // not the browser window

        var videoMaxDimension = Math.max(width, height);
        var screenMaxDimension = Math.max(screenWidth, screenHeight);
        return screenMaxDimension / videoMaxDimension;
      }
    }, {
      key: "_updateTitleAndFooter",
      value: function _updateTitleAndFooter() {
        var title = this._$element.data('title') || "";
        var caption = this._$element.data('footer') || "";
        this._titleIsShown = false;

        if (title || this._config.alwaysShowClose) {
          this._titleIsShown = true;

          this._$modalHeader.css('display', '').find('.modal-title').html(title || "&nbsp;");
        } else this._$modalHeader.css('display', 'none');

        this._footerIsShown = false;

        if (caption) {
          this._footerIsShown = true;

          this._$modalFooter.css('display', '').html(caption);
        } else this._$modalFooter.css('display', 'none');

        return this;
      }
    }, {
      key: "_showYoutubeVideo",
      value: function _showYoutubeVideo(remote, $containerForElement) {
        var id = this._getYoutubeId(remote);

        var query = remote.indexOf('&') > 0 ? remote.substr(remote.indexOf('&')) : '';
        var width = this._$element.data('width') || 560;
        var height = this._$element.data('height') || width / (560 / 315);
        return this._showVideoIframe("//www.youtube.com/embed/".concat(id, "?badge=0&autoplay=1&html5=1").concat(query), width, height, $containerForElement);
      }
    }, {
      key: "_showVimeoVideo",
      value: function _showVimeoVideo(id, $containerForElement) {
        var width = this._$element.data('width') || 500;
        var height = this._$element.data('height') || width / (560 / 315);
        return this._showVideoIframe(id + '?autoplay=1', width, height, $containerForElement);
      }
    }, {
      key: "_showInstagramVideo",
      value: function _showInstagramVideo(id, $containerForElement) {
        // instagram load their content into iframe's so this can be put straight into the element
        var width = this._$element.data('width') || 612;
        var height = width + 80;
        id = id.substr(-1) !== '/' ? id + '/' : id; // ensure id has trailing slash

        $containerForElement.html("<iframe width=\"".concat(width, "\" height=\"").concat(height, "\" src=\"").concat(id, "embed/\" frameborder=\"0\" allowfullscreen></iframe>"));

        this._resize(width, height);

        this._config.onContentLoaded.call(this);

        if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');

        this._$modalDialog.addClass("isVideo");

        this._toggleLoading(false);

        return this;
      }
    }, {
      key: "_showVideoIframe",
      value: function _showVideoIframe(url, width, height, $containerForElement) {
        // should be used for videos only. for remote content use loadRemoteContent (data-type=url)
        height = height || width; // default to square
        // Added in v.5.5.0-dhymik:

        var scalingFactor = this._calculateScaleFactor(width, height);

        width = width * scalingFactor;
        height = height * scalingFactor; // added end.

        $containerForElement.html("<div class=\"embed-responsive embed-responsive-16by9\"><iframe width=\"".concat(width, "\" height=\"").concat(height, "\" src=\"").concat(url, "\" frameborder=\"0\" allowfullscreen class=\"embed-responsive-item\"></iframe></div>"));

        this._resize(width, height);

        this._config.onContentLoaded.call(this);

        if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');

        this._$modalDialog.addClass("isVideo");

        this._toggleLoading(false);

        return this;
      }
    }, {
      key: "_showHtml5Media",
      value: function _showHtml5Media(url, $containerForElement) {
        // should be used for videos only. for remote content use loadRemoteContent (data-type=url)
        var contentType = this._getRemoteContentType(url);

        if (!contentType) {
          return this._error(this._config.strings.type);
        }

        var mediaType = '';

        if (contentType.indexOf('audio') > 0) {
          mediaType = 'audio';
        } else {
          mediaType = 'video';
        }

        var width = this._$element.data('width') || 560;
        var height = this._$element.data('height') || width / (560 / 315); // ### Added by DhyMik in v.5.5.0-dhymik:

        var scalingFactor = this._calculateScaleFactor(width, height);

        width = width * scalingFactor;
        height = height * scalingFactor; // ### added end.

        $containerForElement.html("<div class=\"embed-responsive embed-responsive-16by9\"><".concat(mediaType, " width=\"").concat(width, "\" height=\"").concat(height, "\" preload=\"auto\" autoplay controls class=\"embed-responsive-item\"><source src=\"").concat(url, "\" type=\"").concat(contentType, "\">").concat(this._config.strings.type, "</").concat(mediaType, "></div>"));

        this._resize(width, height);

        this._config.onContentLoaded.call(this);

        if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');

        this._$modalDialog.addClass("isVideo");

        this._toggleLoading(false);

        return this;
      }
    }, {
      key: "_loadRemoteContent",
      value: function _loadRemoteContent(url, $containerForElement) {
        var _this3 = this;

        var width = this._$element.data('width') || 560;
        var height = this._$element.data('height') || 560;
        var disableExternalCheck = this._$element.data('disableExternalCheck') || false;

        this._toggleLoading(false); // ### Added by DhyMik in v.5.5.0-dhymik:


        var scalingFactor = this._calculateScaleFactor(width, height);

        width = width * scalingFactor;
        height = height * scalingFactor; // ### added end.
        // external urls are loading into an iframe
        // local ajax can be loaded into the container itself

        if (!disableExternalCheck && !this._isExternal(url)) {
          $containerForElement.load(url, $.proxy(function () {
            return _this3._$element.trigger('loaded.bs.modal');
          }));
        } else {
          $containerForElement.html("<iframe src=\"".concat(url, "\" frameborder=\"0\" allowfullscreen></iframe>"));

          this._config.onContentLoaded.call(this);
        }

        if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');

        this._$modalDialog.addClass("isVideo");

        this._resize(width, height);

        return this;
      }
    }, {
      key: "_isExternal",
      value: function _isExternal(url) {
        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(".concat({
          "http:": 80,
          "https:": 443
        }[location.protocol], ")?$")), "") !== location.host) return true;
        return false;
      }
    }, {
      key: "_error",
      value: function _error(message) {
        console.error(message);

        this._containerToUse().html(message);

        this._resize(300, 300);

        return this;
      }
    }, {
      key: "_preloadImageByIndex",
      value: function _preloadImageByIndex(startIndex, numberOfTimes) {
        if (!this._$galleryItems) return;
        var next = $(this._$galleryItems.get(startIndex), false);
        if (typeof next == 'undefined') return;
        var src = next.attr('data-remote') || next.attr('href');
        if (next.attr('data-type') === 'image' || this._isImage(src)) this._preloadImage(src, '', false);
        if (numberOfTimes > 0) return this._preloadImageByIndex(startIndex + 1, numberOfTimes - 1);
      }
    }, {
      key: "_preloadImage",
      value: function _preloadImage(src, altTag, $containerForImage) {
        var _this4 = this;

        $containerForImage = $containerForImage || false;
        var img = new Image();
        var loadingTimeout = null;

        if ($containerForImage) {
          // if loading takes > 200ms show a loader
          loadingTimeout = setTimeout(function () {
            $containerForImage.append(_this4._config.loadingMessage);
          }, 200);
        }

        img.onload = function () {
          if (loadingTimeout) clearTimeout(loadingTimeout);
          loadingTimeout = null;
          var image = $('<img />');
          image.attr('src', img.src);
          image.attr('alt', altTag);
          image.addClass('img-fluid'); // backward compatibility for bootstrap v3

          image.css('width', '100% !important');

          if ($containerForImage) {
            $containerForImage.html(image);
            if (_this4._$modalNavLayer) _this4._$modalNavLayer.css('display', '');
            /* ***** determine image dimensions ****
             * 
             * If image dimensions can be determined 
             * - a max-width inline style is added to .modal-dialog element
             * - a height inline style is added to .ekko-lightbox-container element
             * inside of _resize() function.
             * 
             * In this case, a black backddrop is used behind images to prevent
             * background bleed during image transitions
             * 
             * If image dimensions cannot be determined, images are stretched
             * to maximum dimensions by maximizing all parent containers.
             * In this case
             * - 'imageStretched' css class is added to .modal-dialog element
             * - black backdrop is not being used, to prevent backdrop from
             *   extending over entire screen regardless of image size.
             * */

            _this4._$modalDialog.css('display', _this4._config.verticalAlignCenter ? 'flex' : 'block');

            _this4._$modalDialog.addClass("imageLoading"); // temporarily stretches img parent containers so image dimensions can be determined.


            var clientWidth = 0;
            var clientHeight = 0; // this works in Firefox etc.:

            var imageWidth = image[0].width;
            var imageHeight = image[0].height; // this works in Chrome etc.:

            var imgWidth = img.width;
            var imgHeight = img.height;

            if (imageWidth > 0 && imageHeight > 0) {
              clientWidth = imageWidth;
              clientHeight = imageHeight;
            } else if (imgWidth > 0 && imgHeight > 0) {
              clientWidth = imgWidth;
              clientHeight = imgHeight;
            }

            _this4._$modalDialog.removeClass("imageLoading"); // remove temporary parent container stretch


            if (clientWidth > 0 && clientHeight > 0) {
              // we found image dimensions
              if (_this4._config.debug > 1) alert("imageWidth: " + imageWidth + ", \\n" + "imageHeight: " + imageHeight + ", \\n" + "imgWidth: " + imgWidth + ", \\n" + "imgHeight: " + imgHeight + ".");

              _this4._resize(clientWidth, clientHeight);
            } else {
              // we did not find image dimensions, use stretch method
              _this4._$modalDialog.addClass("imageStretched");

              if (_this4._config.debug > 1) alert("imageStretched");
            }

            _this4._$modalDialog.addClass("imageLoaded");

            _this4._toggleLoading(false);

            return _this4._config.onContentLoaded.call(_this4);
          }
        };

        if ($containerForImage) {
          img.onerror = function () {
            _this4._toggleLoading(false);

            return _this4._error(_this4._config.strings.fail + "  ".concat(src));
          };
        }

        img.src = src;
        return img;
      }
    }, {
      key: "_swipeGesure",
      value: function _swipeGesure() {
        if (this._touchendX < this._touchstartX) {
          return this.navigateRight();
        }

        if (this._touchendX > this._touchstartX) {
          return this.navigateLeft();
        }
      }
    }, {
      key: "_resize",
      value: function _resize(width, height) {
        height = height || width;

        var scalingFactor = this._calculateScaleFactor(width, height);

        width = width * scalingFactor;
        height = height * scalingFactor;
        this._wantedWidth = width;
        this._wantedHeight = height;
        if (this._config.debug > 1) alert("wanted width: " + this._wantedWidth + ", wanted height: " + this._wantedHeight);
        var imageAspecRatio = width / height;

        this._$modalDialog.addClass("imageLoading"); // temporarily stretches img parent containers so element dimensions can be determined.


        var modalDialogOuterWidthExcludingMargins = this._$modalDialog.outerWidth(false);

        var modalImageContainerInnerWidth = this._$lightboxContainer.innerWidth();

        var modalDialogOuterHeightExcludingMargins = this._$modalDialog.outerHeight(false);

        var modalDialogOuterHeightIncludingMargins = this._$modalDialog.outerHeight(true);

        var modalImageContainerInnerHeight = this._$lightboxContainer.innerHeight();

        this._$modalDialog.removeClass("imageLoading"); // the width difference between image container and .modal-dialog element (excluding its margin), which gets the 'max-width' inline style added


        var widthInnerSpacing = modalDialogOuterWidthExcludingMargins - modalImageContainerInnerWidth; // the height difference between .moda-dialog element (excluding its margins) and the image container element, which gets the 'height' inline style added

        var heightInnerSpacing = modalDialogOuterHeightExcludingMargins - modalImageContainerInnerHeight;
        var heightOuterSpacing = modalDialogOuterHeightIncludingMargins - modalImageContainerInnerHeight;
        var maxWidth = Math.min(modalDialogOuterWidthExcludingMargins, this._config.doc.body.clientWidth, this._config.maxWidth); // if width > the available space, scale down the expected width and height

        if (width + widthInnerSpacing > maxWidth) {
          height = (maxWidth - widthInnerSpacing) / imageAspecRatio;
          width = maxWidth;
        } else width = width + widthInnerSpacing;

        var headerHeight = 0,
            footerHeight = 0; // as the resize is performed the modal is show, the calculate might fail
        // if so, default to the default sizes

        if (this._footerIsShown) footerHeight = this._$modalFooter.outerHeight(true) || 55;
        if (this._titleIsShown) headerHeight = this._$modalHeader.outerHeight(true) || 67;
        var maxHeight = Math.min(height, window.innerHeight - heightOuterSpacing - headerHeight - footerHeight, this._config.maxHeight - heightInnerSpacing - headerHeight - footerHeight);

        if (height > maxHeight) {
          // if height > the available height, scale down the width
          width = Math.ceil(maxHeight * imageAspecRatio) + widthInnerSpacing;
        }

        this._$lightboxContainer.css('height', maxHeight);

        this._$modalDialog.css('flex', '1').css('maxWidth', width);

        if (this._config.debug > 0 && this._$debugInfo) {
          var message = "window width: " + $(window).width() + ",\nwindow height: " + $(window).height() + ",\nwindow screen width: " + window.screen.width + ",\nwindow screen height: " + window.screen.height + ",\nwindow inner width: " + window.innerWidth + ",\nwindow inner height: " + window.innerHeight + ",\n maxheight: " + maxHeight;

          this._$debugInfo.text(message);
        }

        var modal = this._$modal.data('bs.modal');

        if (modal) {
          // v4 method is mistakenly protected
          try {
            modal._handleUpdate();
          } catch (Exception) {
            modal.handleUpdate();
          }
        }

        return this;
      }
    }], [{
      key: "Default",
      get:
      /**
        Class properties:
         _$element: null -> the <a> element currently being displayed
       _$modal: The bootstrap modal generated
          _$modalDialog: The .modal-dialog
          _$modalContent: The .modal-content
          _$modalBody: The .modal-body
          _$modalHeader: The .modal-header
          _$modalFooter: The .modal-footer
       _$lightboxContainerOne: Container of the first lightbox element
       _$lightboxContainerTwo: Container of the second lightbox element
       _$lightboxBody: First element in the container
       _$modalNavLayer: The navigation container, overlaid for images, underlaid for videos
       _$modalArrows: The overlayed arrows container, always overlaid
         _$galleryItems: Other <a>'s available for this gallery
       _galleryName: Name of the current data('gallery') showing
       _galleryIndex: The current index of the _$galleryItems being shown
         _config: {} the options for the modal
       _modalId: unique id for the current lightbox
         */
      function get() {
        return Default;
      }
    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        var _this5 = this;

        config = config || {};
        return this.each(function () {
          var $this = $(_this5);

          var _config = $.extend({}, Lightbox.Default, $this.data(), _typeof(config) === 'object' && config);

          new Lightbox(_this5, _config);
        });
      }
    }]);

    return Lightbox;
  }();

  $.fn[NAME] = Lightbox._jQueryInterface;
  $.fn[NAME].Constructor = Lightbox;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Lightbox._jQueryInterface;
  };

  return Lightbox;
}(jQuery);

var _default = Lightbox;
exports["default"] = _default;
//# sourceMappingURL=ekko-lightbox.js.map

}(jQuery);
