/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ekko-lightbox.js":
/*!**************************!*\
  !*** ./ekko-lightbox.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
     * 
     * Changed in 5.5.1-dhymik (2023-04-02):
     * - Vimeo player url will not break if url contains querystring parameters
     * 
     * Changed in 5.5.2-dhymik
     * - added support for webstream.eu videos
     */

    var NAME = 'ekkoLightbox';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
        debug: 0, // 0: no debug, 1: on-screen info, 2: on-screen plus pop-ups
        title: '',
        footer: '',
        maxWidth: 9999,
        maxHeight: 9999,
        showArrows: true, //display the left / right arrows or not
        hideArrowsOnVideo: false, //hide the left / right arrows for videos
        wrapping: true, //if true, gallery loops infinitely
        type: null, //force the lightbox into image / youtube mode. if null, or not image|youtube|vimeo; detect it
        alwaysShowClose: false, //always show the close button, even if there is no title
        fade: true, // fade in or not
        verticalAlignCenter: false, // vertically centered modal
        loadingMessage: '<div class="ekko-lightbox-loader"><div><div></div><div></div></div></div>', // http://tobiasahlin.com/spinkit/
        leftArrow: '<span>&#10094;</span>',
        rightArrow: '<span>&#10095;</span>',
        strings: {
            close: 'Close',
            fail: 'Failed to load image:',
            type: 'Could not detect remote target type. Force the type using data-type'
        },
        doc: document, // if in an iframe can specify top.document
        onShow: function onShow() {},
        onShown: function onShown() {},
        onHide: function onHide() {},
        onHidden: function onHidden() {},
        onNavigate: function onNavigate() {},
        onContentLoaded: function onContentLoaded() {}
    };

    var Lightbox = function () {
        _createClass(Lightbox, null, [{
            key: 'Default',


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
             _$lightboxContainerCurrent: the container in use
             _$lightboxContainerUnUsed: the currently unused container
             _$lightboxBody: First element in the container
             _$modalNavLayer: The navigation container, overlaid for images, underlaid for videos
             _$modalArrows: The overlayed arrows container, always overlaid
               _$galleryItems: Other <a>'s available for this gallery
             _galleryName: Name of the current data('gallery') showing
             _galleryIndex: The current index of the _$galleryItems being shown
               _config: {} the options for the modal
             _modalId: unique id for the current lightbox
               */

            get: function get() {
                return Default;
            }
        }]);

        function Lightbox($element, config) {
            var _this2 = this;

            _classCallCheck(this, Lightbox);

            var _this = this;

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

            this._modalId = 'ekkoLightbox-' + Math.floor(Math.random() * 1000 + 1);
            this._$element = $element instanceof jQuery ? $element : $($element);

            this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;

            var h4 = '<h4 class="modal-title">' + (this._config.title || "&nbsp;") + '</h4>';
            var btn = '<button type="button" class="close" data-dismiss="modal" aria-label="' + this._config.strings.close + '"><span aria-hidden="true">&times;</span></button>';

            var fade = this._config.fade ? 'fade in' : '';
            var vertical = this._config.verticalAlignCenter ? 'modal-dialog-centered' : '';

            var header = '<div class="modal-header' + (this._config.title || this._config.alwaysShowClose ? '' : ' hide') + '">' + (this._isBootstrap3 ? btn + h4 : h4 + btn) + '</div>';
            var footer = '<div class="modal-footer' + (this._config.footer ? '' : ' hide') + '">' + (this._config.footer || "&nbsp;") + '</div>';
            var body = '<div class="modal-body"><div class="ekko-lightbox-container"><div class="ekko-lightbox-item ' + fade + ' show"></div><div class="ekko-lightbox-item fade"></div></div></div>';
            var dialog = '<div class="modal-dialog ' + vertical + '" role="document"><div class="modal-content">' + header + body + footer + '</div></div>';
            $(this._config.doc.body).append('<div id="' + this._modalId + '" class="ekko-lightbox modal fade" tabindex="-1" tabindex="-1" role="dialog" aria-hidden="true">' + dialog + '</div>');

            this._$modal = $('#' + this._modalId, this._config.doc);

            if (this._config.debug > 0) this._$modal.append('<div class="modal-debug-info"></div>');
            this._$debugInfo = this._$modal.find('.modal-debug-info').first();

            this._$modalDialog = this._$modal.find('.modal-dialog').first();
            this._$modalContent = this._$modal.find('.modal-content').first();
            this._$modalBody = this._$modal.find('.modal-body').first();
            this._$modalHeader = this._$modal.find('.modal-header').first();
            this._$modalFooter = this._$modal.find('.modal-footer').first();

            this._$lightboxContainer = this._$modalBody.find('.ekko-lightbox-container').first();
            this._$lightboxBodyOne = this._$lightboxContainer.find('> div:first-child').first();
            this._$lightboxBodyTwo = this._$lightboxContainer.find('> div:last-child').first();
            this._$lightboxContainerCurrent = this._$lightboxBodyOne;
            this._$lightboxContainerUnUsed = this._$lightboxBodyTwo;

            this._galleryName = this._$element.data('gallery');
            if (this._galleryName) {
                this._$galleryItems = $(document.body).find('*[data-gallery="' + this._galleryName + '"]');
                this._galleryIndex = this._$galleryItems.index(this._$element);
                $(document).on('keydown.ekkoLightbox', this._navigationalBinder.bind(this));

                // add the directional arrows to the modal
                if (this._config.showArrows && this._$galleryItems.length > 1) {

                    // add the navigation layer with full surface links
                    this._$lightboxContainer.prepend('<div class="ekko-lightbox-nav-overlay"><a href="#"></a><a href="#"></a></div>');
                    this._$modalNavLayer = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay').first();

                    // add the link arrows suitable also for video overlay
                    this._$lightboxContainer.append('<div class="ekko-lightbox-nav-arrows"><a href="#">' + this._config.leftArrow + '</a><a href="#">' + this._config.rightArrow + '</a></div>');
                    this._$modalArrows = this._$lightboxContainer.find('div.ekko-lightbox-nav-arrows').first();

                    // show highlighted nav arrows...
                    this._$modalArrows.find('a').addClass('init');

                    // ...and remove the highlight after 5 seconds,
                    // or when hover or navigation happens, see below.
                    var initTimer = window.setTimeout(function () {
                        clearInit(_this._$modalArrows);
                    }, 5000);

                    var clearInit = function clearInit() {
                        clearTimeout(initTimer);
                        this._$modalArrows.find('a').removeClass('init');
                    };

                    // add the click event handlers to all links
                    this._$lightboxContainer.on('click', 'a:first-child', function (event) {
                        event.preventDefault();
                        clearInit(_this2._$modalArrows);
                        return _this.navigateLeft();
                    });
                    this._$lightboxContainer.on('click', 'a:last-child', function (event) {
                        event.preventDefault();
                        clearInit(_this2._$modalArrows);
                        return _this.navigateRight();
                    });

                    // add the hover event handlers to nav surface links, adding hover class to arrow links
                    this._$modalNavLayer.find('a:first-child').hover(function () {
                        _this._$modalArrows.find('a:first-child').addClass('hover');
                        clearInit(_this2._$modalArrows);
                    }, function () {
                        _this._$modalArrows.find('a:first-child').removeClass('hover').filter('[class=""]').removeAttr('class');
                    });
                    this._$modalNavLayer.find('a:last-child').hover(function () {
                        _this._$modalArrows.find('a:last-child').addClass('hover');
                        clearInit(_this2._$modalArrows);
                    }, function () {
                        _this._$modalArrows.find('a:last-child').removeClass('hover').filter('[class=""]').removeAttr('class');
                    });

                    this.updateNavigation();
                }
            }

            this._$modal.on('show.bs.modal', this._config.onShow.bind(this)).on('shown.bs.modal', function () {
                _this._toggleLoading(true);
                _this._handle();
                return _this._config.onShown.call(_this2);
            }).on('hide.bs.modal', this._config.onHide.bind(this)).on('hidden.bs.modal', function () {
                if (_this._galleryName) {
                    $(document).off('keydown.ekkoLightbox');
                    $(window).off('resize.ekkoLightbox');
                }
                _this._$modal.remove();
                return _this2._config.onHidden.call(_this2);
            }).modal(this._config);

            $(window).on('resize.ekkoLightbox', function () {
                _this._resize(_this._wantedWidth, _this._wantedHeight);
            });

            this._$lightboxContainer.on('touchstart', function () {
                _this._touchstartX = event.changedTouches[0].screenX;
            }).on('touchend', function () {
                _this._touchendX = event.changedTouches[0].screenX;
                _this._swipeGesure();
                _this._$modalArrows.find('a').blur();
            });
        }

        _createClass(Lightbox, [{
            key: 'element',
            value: function element() {
                return this._$element;
            }
        }, {
            key: 'modal',
            value: function modal() {
                return this._$modal;
            }
        }, {
            key: 'navigateTo',
            value: function navigateTo(index) {

                if (index < 0 || index > this._$galleryItems.length - 1) return this;

                this._galleryIndex = index;

                this.updateNavigation();

                this._$element = $(this._$galleryItems.get(this._galleryIndex));
                this._handle();
            }
        }, {
            key: 'navigateLeft',
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
            key: 'navigateRight',
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
            key: 'updateNavigation',
            value: function updateNavigation() {
                if (!this._config.wrapping) {
                    var $nav = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay');
                    if (this._galleryIndex === 0) $nav.find('a:first-child').addClass('disabled');else $nav.find('a:first-child').removeClass('disabled');

                    if (this._galleryIndex === this._$galleryItems.length - 1) $nav.find('a:last-child').addClass('disabled');else $nav.find('a:last-child').removeClass('disabled');
                }
            }
        }, {
            key: 'close',
            value: function close() {
                return this._$modal.modal('hide');
            }

            // helper private methods

        }, {
            key: '_navigationalBinder',
            value: function _navigationalBinder(event) {
                event = event || window.event;
                if (event.keyCode === 39) return this.navigateRight();
                if (event.keyCode === 37) return this.navigateLeft();
            }

            // type detection private methods

        }, {
            key: '_detectRemoteType',
            value: function _detectRemoteType(src, type) {

                type = type || false;

                if (!type && this._isImage(src)) type = 'image';
                if (!type && this._getWebstreamId(src)) type = 'webstream';
                if (!type && this._getYoutubeId(src)) type = 'youtube';
                if (!type && this._getVimeoId(src)) type = 'vimeo';
                if (!type && this._getInstagramId(src)) type = 'instagram';
                if (type == 'audio' || type == 'video' || !type && this._isMedia(src)) type = 'media';
                if (!type || ['image', 'webstream', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(type) < 0) type = 'url';

                return type;
            }
        }, {
            key: '_getRemoteContentType',
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
            key: '_isImage',
            value: function _isImage(string) {
                return string && string.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
            }
        }, {
            key: '_isMedia',
            value: function _isMedia(string) {
                return string && string.match(/(\.(mp3|mp4|ogg|webm|wav)((\?|#).*)?$)/i);
            }
        }, {
            key: '_switchContainers',
            value: function _switchContainers() {

                var $newCurrent = this._$lightboxContainerUnUsed;
                this._$lightboxContainerUnUsed = this._$lightboxContainerCurrent;
                this._$lightboxContainerCurrent = $newCurrent;

                // switch z-index
                this._$lightboxContainerCurrent.css("z-index", this._$lightboxContainerUnUsed.css("z-index") + 1);
                this._$lightboxContainerUnUsed.css("z-index", "auto");
                this._$lightboxContainerCurrent.css("z-index", 1);

                this._$lightboxContainerUnUsed.removeClass('in show');
                this._$lightboxContainerCurrent.addClass('in show');

                return;
            }
        }, {
            key: '_handle',
            value: function _handle() {

                // ### Added by DhyMik in v.5.5.0-dhymik:

                // remove css added in '_preloadImage'
                this._$modalDialog.removeClass("imageLoading");
                this._$modalDialog.removeClass("imageLoaded");
                this._$modalDialog.removeClass("imageStretched");
                this._$modalDialog.removeClass("isVideo");

                // ### End added by DhyMik in v.5.5.0-dhymik:

                var $toUse = this._$lightboxContainerUnUsed;

                // fade out header and footer
                this._$modalHeader.css("opacity", 0);
                this._$modalFooter.css("opacity", 0);

                this._updateTitleAndFooter();
                this._switchContainers();

                var currentRemote = this._$element.attr('data-remote') || this._$element.attr('href');
                var currentType = this._detectRemoteType(currentRemote, this._$element.attr('data-type') || false);

                if (['image', 'webstream', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(currentType) < 0) return this._error(this._config.strings.type);

                switch (currentType) {
                    case 'image':
                        var altTag = this._$element.attr('data-alt') || '';
                        this._preloadImage(currentRemote, altTag, $toUse);
                        this._preloadImageByIndex(this._galleryIndex, 3);
                        break;
                    case 'webstream':
                        this._showWebstreamVideo(this._getWebstreamId(currentRemote), $toUse);
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

                var thisLightbox = this;

                // fade in header and footer after a delay and delete old content
                setTimeout(function () {
                    thisLightbox._$modalHeader.css("opacity", 1);
                    thisLightbox._$modalFooter.css("opacity", 1);
                    thisLightbox._$lightboxContainerUnUsed.empty();
                }, 250);

                return this;
            }
        }, {
            key: '_getWebstreamId',
            value: function _getWebstreamId(string) {
                /* id is the entire url fetched from data-remote or href attribute */
                return string && string.indexOf('webstream.eu') > 0 ? string : false;
            }
        }, {
            key: '_getYoutubeId',
            value: function _getYoutubeId(string) {
                /* Youtube id here is just the 11 character video id of the url */
                if (!string) return false;
                var matches = string.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                return matches && matches[2].length === 11 ? matches[2] : false;
            }
        }, {
            key: '_getVimeoId',
            value: function _getVimeoId(string) {
                /* id is the entire url fetched from data-remote or href attribute */
                return string && string.indexOf('vimeo') > 0 ? string : false;
            }
        }, {
            key: '_getInstagramId',
            value: function _getInstagramId(string) {
                /* id is the entire url fetched from data-remote or href attribute */
                return string && string.indexOf('instagram') > 0 ? string : false;
            }

            // layout private methods

        }, {
            key: '_toggleLoading',
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
            key: '_calculateScaleFactor',
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
            key: '_updateTitleAndFooter',
            value: function _updateTitleAndFooter() {
                var title = this._$element.data('title') || "";
                var caption = this._$element.data('footer') || "";

                this._titleIsShown = false;
                if (title || this._config.alwaysShowClose) {
                    this._titleIsShown = true;
                    this._$modalHeader.css('display', '').find('.modal-title').html(title || "&nbsp;");
                    this._$modalDialog.addClass("headerIsShown");
                } else {
                    this._$modalHeader.css('display', 'none');
                    this._$modalDialog.removeClass("headerIsShown");
                }

                this._footerIsShown = false;
                if (caption) {
                    this._footerIsShown = true;
                    this._$modalFooter.css('display', '').html(caption);
                    this._$modalDialog.addClass("footerIsShown");
                } else {
                    this._$modalFooter.css('display', 'none');
                    this._$modalDialog.removeClass("footerIsShown");
                }

                return this;
            }
        }, {
            key: '_showWebstreamVideo',
            value: function _showWebstreamVideo(id, $containerForElement) {
                var width = this._$element.data('width') || 500;
                var height = this._$element.data('height') || width / (560 / 315);
                return this._showVideoIframe(id + (id.includes("?") ? '&' : '?') + 'autoplay=1', width, height, $containerForElement, 500 // webstream shows white flash on iframe load, therefore, add 500ms delay before switching div's
                );
            }
        }, {
            key: '_showYoutubeVideo',
            value: function _showYoutubeVideo(remote, $containerForElement) {
                var id = this._getYoutubeId(remote);
                var query = remote.indexOf('&') > 0 ? remote.substr(remote.indexOf('&')) : '';
                var width = this._$element.data('width') || 560;
                var height = this._$element.data('height') || width / (560 / 315);
                return this._showVideoIframe('//www.youtube.com/embed/' + id + '?badge=0&autoplay=1&html5=1' + query, width, height, $containerForElement);
            }
        }, {
            key: '_showVimeoVideo',
            value: function _showVimeoVideo(id, $containerForElement) {
                var width = this._$element.data('width') || 500;
                var height = this._$element.data('height') || width / (560 / 315);
                return this._showVideoIframe(id + (id.includes("?") ? '&' : '?') + 'autoplay=1', width, height, $containerForElement);
            }
        }, {
            key: '_showInstagramVideo',
            value: function _showInstagramVideo(id, $containerForElement) {
                // instagram load their content into iframes so this can be put straight into the element
                var width = this._$element.data('width') || 612;
                var height = width + 80;
                id = id.substr(-1) !== '/' ? id + '/' : id; // ensure id has trailing slash
                $containerForElement.html('<iframe width="' + width + '" height="' + height + '" src="' + id + 'embed/" frameborder="0" allowfullscreen></iframe>');
                this._resize(width, height);
                this._config.onContentLoaded.call(this);
                if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
                this._$modalDialog.addClass("isVideo");
                this._toggleLoading(false);
                return this;
            }
        }, {
            key: '_showVideoIframe',
            value: function _showVideoIframe(url, width, height, $containerForElement, delay) {
                var _this3 = this;

                // should be used for videos only. for remote content use loadRemoteContent (data-type=url)
                height = height || width; // default to square

                // Added in v.5.5.0-dhymik:
                var scalingFactor = this._calculateScaleFactor(width, height);
                width = width * scalingFactor;
                height = height * scalingFactor;
                // added end.

                $containerForElement.html('<div class="embed-responsive embed-responsive-16by9"><iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen class="embed-responsive-item"></iframe></div>');
                var iFrame = $containerForElement.find("iframe");
                iFrame.ready(function () {
                    if (delay) {
                        setTimeout(function () {
                            _this3._toggleLoading(false);
                        }, delay);
                    } else {
                        _this3._toggleLoading(false);
                    }
                }); // bring forward once the iframe has loaded (https://stackoverflow.com/a/9249734/11035069)
                this._resize(width, height);
                this._config.onContentLoaded.call(this);
                if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
                this._$modalDialog.addClass("isVideo");

                return this;
            }
        }, {
            key: '_showHtml5Media',
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
                var height = this._$element.data('height') || width / (560 / 315);

                // ### Added by DhyMik in v.5.5.0-dhymik:
                var scalingFactor = this._calculateScaleFactor(width, height);
                width = width * scalingFactor;
                height = height * scalingFactor;
                // ### added end.

                $containerForElement.html('<div class="embed-responsive embed-responsive-16by9"><' + mediaType + ' width="' + width + '" height="' + height + '" preload="auto" autoplay controls class="embed-responsive-item"><source src="' + url + '" type="' + contentType + '">' + this._config.strings.type + '</' + mediaType + '></div>');
                this._resize(width, height);
                this._config.onContentLoaded.call(this);
                if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
                this._$modalDialog.addClass("isVideo");
                this._toggleLoading(false);
                return this;
            }
        }, {
            key: '_loadRemoteContent',
            value: function _loadRemoteContent(url, $containerForElement) {
                var _this4 = this;

                var width = this._$element.data('width') || 560;
                var height = this._$element.data('height') || 560;

                var disableExternalCheck = this._$element.data('disableExternalCheck') || false;
                this._toggleLoading(false);

                // ### Added by DhyMik in v.5.5.0-dhymik:
                var scalingFactor = this._calculateScaleFactor(width, height);
                width = width * scalingFactor;
                height = height * scalingFactor;
                // ### added end.

                // external urls are loading into an iframe
                // local ajax can be loaded into the container itself
                if (!disableExternalCheck && !this._isExternal(url)) {
                    $containerForElement.load(url, $.proxy(function () {
                        return _this4._$element.trigger('loaded.bs.modal');
                    }));
                } else {
                    $containerForElement.html('<iframe src="' + url + '" frameborder="0" allowfullscreen></iframe>');
                    this._config.onContentLoaded.call(this);
                }

                if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
                this._$modalDialog.addClass("isVideo");

                this._resize(width, height);
                return this;
            }
        }, {
            key: '_isExternal',
            value: function _isExternal(url) {
                var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;

                if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(':(' + {
                    "http:": 80,
                    "https:": 443
                }[location.protocol] + ')?$'), "") !== location.host) return true;

                return false;
            }
        }, {
            key: '_error',
            value: function _error(message) {
                console.error(message);
                this._$lightboxContainerCurrent.html(message);
                this._resize(300, 300);
                return this;
            }
        }, {
            key: '_preloadImageByIndex',
            value: function _preloadImageByIndex(startIndex, numberOfTimes) {

                if (!this._$galleryItems) return;

                var next = $(this._$galleryItems.get(startIndex), false);
                if (typeof next == 'undefined') return;

                var src = next.attr('data-remote') || next.attr('href');
                if (next.attr('data-type') === 'image' || this._isImage(src)) this._preloadImage(src, '', false);

                if (numberOfTimes > 0) return this._preloadImageByIndex(startIndex + 1, numberOfTimes - 1);
            }
        }, {
            key: '_preloadImage',
            value: function _preloadImage(src, altTag, $containerForImage) {
                var _this5 = this;

                $containerForImage = $containerForImage || false;

                var img = new Image();
                var loadingTimeout = null;
                if ($containerForImage) {
                    // if loading takes > 200ms show a loader
                    loadingTimeout = setTimeout(function () {
                        $containerForImage.append(_this5._config.loadingMessage);
                    }, 200);
                }

                img.onload = function () {
                    if ($containerForImage) {

                        if (loadingTimeout) clearTimeout(loadingTimeout);
                        loadingTimeout = null;

                        var image = $('<img />');
                        image.attr('src', img.src);
                        image.attr('alt', altTag);
                        image.addClass('img-fluid');

                        // backward compatibility for bootstrap v3
                        image.css('width', '100% !important');

                        // if the "data-markup" attribute is set on the <a> tag...
                        if (_this5._$element[0].hasAttribute("data-markup")) {

                            // ...then the "data-markup" attribute value provides the repalcement markup
                            var markup = _this5._$element.attr("data-markup");
                            $containerForImage.html(markup);
                        } else {
                            $containerForImage.html(image);
                        }

                        if (_this5._$modalNavLayer) _this5._$modalNavLayer.css('display', '');

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

                        _this5._$modalDialog.css('display', _this5._config.verticalAlignCenter ? 'flex' : 'block');

                        _this5._$modalDialog.addClass("imageLoading");
                        // temporarily stretches img parent containers so image dimensions can be determined.

                        var clientWidth = 0;
                        var clientHeight = 0;

                        // this works in Firefox etc. for jpg AND svg:
                        var imageWidth = $containerForImage.find("img")[0].width;
                        var imageHeight = $containerForImage.find("img")[0].height;

                        // this works in Chrome etc. for jpg AND svg:
                        var imgWidth = img.width;
                        var imgHeight = img.height;

                        if (imageWidth > 0 && imageHeight > 0) {
                            clientWidth = imageWidth;
                            clientHeight = imageHeight;
                        } else if (imgWidth > 0 && imgHeight > 0) {
                            clientWidth = imgWidth;
                            clientHeight = imgHeight;
                        }

                        _this5._$modalDialog.removeClass("imageLoading");
                        // remove temporary parent container stretch

                        if (clientWidth > 0 && clientHeight > 0) {
                            // we found image dimensions...
                            if (_this5._config.debug > 1) alert("imageWidth: " + imageWidth + ", \\n" + "imageHeight: " + imageHeight + ", \\n" + "imgWidth: " + imgWidth + ", \\n" + "imgHeight: " + imgHeight + ".");
                            // ...resize the parent containers accordingly:
                            _this5._resize(clientWidth, clientHeight);
                        } else {
                            // we did not find image dimensions, use stretch method by css:
                            _this5._$modalDialog.addClass("imageStretched");
                            if (_this5._config.debug > 1) alert("imageStretched");
                            if (window.console) console.log("ekko lightbox: using 'imageStretched' mode for " + img.src);
                        }

                        _this5._$modalDialog.addClass("imageLoaded");

                        _this5._toggleLoading(false);
                        return _this5._config.onContentLoaded.call(_this5);
                    }
                };

                if ($containerForImage) {
                    img.onerror = function () {
                        _this5._toggleLoading(false);
                        return _this5._error(_this5._config.strings.fail + ('  ' + src));
                    };
                }

                img.src = src;
                return img;
            }
        }, {
            key: '_swipeGesure',
            value: function _swipeGesure() {
                if (this._touchendX < this._touchstartX) {
                    return this.navigateRight();
                }
                if (this._touchendX > this._touchstartX) {
                    return this.navigateLeft();
                }
            }
        }, {
            key: '_resize',
            value: function _resize(width, height) {

                height = height || width;

                var scalingFactor = this._calculateScaleFactor(width, height);
                width = width * scalingFactor;
                height = height * scalingFactor;

                this._wantedWidth = width;
                this._wantedHeight = height;

                if (this._config.debug > 1) alert("wanted width: " + this._wantedWidth + ", wanted height: " + this._wantedHeight);

                var imageAspecRatio = width / height;

                this._$modalDialog.addClass("imageLoading");
                // temporarily stretches img parent containers so element dimensions can be determined.

                var modalDialogOuterWidthExcludingMargins = this._$modalDialog.outerWidth(false);
                var modalImageContainerInnerWidth = this._$lightboxContainer.innerWidth();

                var modalDialogOuterHeightExcludingMargins = this._$modalDialog.outerHeight(false);
                var modalDialogOuterHeightIncludingMargins = this._$modalDialog.outerHeight(true);
                var modalImageContainerInnerHeight = this._$lightboxContainer.innerHeight();

                this._$modalDialog.removeClass("imageLoading");

                // the width difference between image container and .modal-dialog element (excluding its margin), which gets the 'max-width' inline style added
                var widthInnerSpacing = modalDialogOuterWidthExcludingMargins - modalImageContainerInnerWidth;

                // the height difference between .moda-dialog element (excluding its margins) and the image container element, which gets the 'height' inline style added
                var heightInnerSpacing = modalDialogOuterHeightExcludingMargins - modalImageContainerInnerHeight;
                var heightOuterSpacing = modalDialogOuterHeightIncludingMargins - modalImageContainerInnerHeight;

                var maxWidth = Math.min(modalDialogOuterWidthExcludingMargins, this._config.doc.body.clientWidth, this._config.maxWidth);

                // if width > the available space, scale down the expected width and height

                if (width + widthInnerSpacing > maxWidth) {
                    height = (maxWidth - widthInnerSpacing) / imageAspecRatio;
                    width = maxWidth;
                } else width = width + widthInnerSpacing;

                var headerHeight = 0,
                    footerHeight = 0;

                // as the resize is performed the modal is show, the calculate might fail
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
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var _this6 = this;

                config = config || {};
                return this.each(function () {
                    var $this = $(_this6);
                    var _config = $.extend({}, Lightbox.Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

                    new Lightbox(_this6, _config);
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

exports.default = Lightbox;

/***/ }),

/***/ "./ekko-lightbox.less":
/*!****************************!*\
  !*** ./ekko-lightbox.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Bootstrap Lightbox</title>\r\n\r\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n\r\n        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n        <link href=\"main.css\" rel=\"stylesheet\">\r\n\r\n        <!-- for documentation only -->\r\n        <style type=\"text/css\">\r\n            div.row > div > div.row {\r\n                margin-bottom: 15px;\r\n            }\r\n\r\n            html {\r\n                background-color: #02709e;\r\n            }\r\n            body {\r\n                background: #fefefe;\r\n                padding-bottom: 50px;\r\n            }\r\n\r\n            div.top-container {\r\n                padding-top:100px;\r\n                background-color: #02709e;\r\n                color:#ccc;\r\n            }\r\n            div.top-container h1 {\r\n                color:white;\r\n            }\r\n            div.top-container a {\r\n                color:#ccc;\r\n                border-bottom:1px dotted white;\r\n            }\r\n            div.top-container a:hover {\r\n                color: white;\r\n                cursor:pointer;\r\n                border-bottom:1px solid white;\r\n                text-decoration: none;\r\n            }\r\n            div.top-header {\r\n                margin-bottom:100px;\r\n            }\r\n\r\n            h2 {\r\n                background-color:#02709e;\r\n                color:white;\r\n                display:inline-block;\r\n                padding:6px;\r\n                margin-top:100px;\r\n            }\r\n\r\n            h3 {\r\n                padding-bottom:5px;\r\n                margin-bottom:10px;\r\n                border-bottom:1px solid #f2f2f2;\r\n                margin-top: 50px;\r\n            }\r\n\r\n            h4:not(.modal-title) {\r\n                margin-top:25px;\r\n            }\r\n\r\n            figure {\r\n                position: relative;\r\n            }\r\n\r\n            figure figcaption {\r\n                font-size: 22px;\r\n                color: #fff;\r\n                text-decoration: none;\r\n                bottom: 10px;\r\n                right: 20px;\r\n                position: absolute;\r\n                background-color: #000;\r\n            }\r\n\t\t\tcode[data-code], code.block-code {\r\n                display:block;\r\n                overflow:scroll;\r\n                font-size:12px;\r\n\t\t\t\twhite-space: pre;\r\n\t\t\t}\r\n\r\n            table {\r\n                font-size:12px;\r\n            }\r\n            .footer {\r\n                text-align: center;\r\n            }\r\n            .footer span {\r\n                margin-top:100px;\r\n                font-size:12px;\r\n                background-color:#02709e;\r\n                color:white;\r\n                display:inline-block;\r\n                padding:6px;\r\n            }\r\n            .footer span a {\r\n                color:#ccc;\r\n                border-bottom:1px dotted white;\r\n            }\r\n            .footer span a:hover {\r\n                cursor:pointer;\r\n                color: white;\r\n                border-bottom:1px solid white;\r\n                text-decoration: none;\r\n            }\r\n            a.anchorjs-link {\r\n                color:black;\r\n            }\r\n            a.anchorjs-link:hover {\r\n                color:#02709e;\r\n                text-decoration: none;\r\n            }\r\n        </style>\r\n    </head>\r\n    <body>\r\n\r\n        <div class=\"top-container\">\r\n\r\n            <div class=\"container\">\r\n                <div class=\"row justify-content-center\">\r\n                    <div class=\"col-md-10\">\r\n\r\n                        <div class=\"top-header\">\r\n                            <h1>Lightbox for Bootstrap</h1>\r\n                            <p class=\"lead\">Utilizes Bootstraps modal plugin to implement a lightbox gallery - <a href=\"https://github.com/ashleydw/lightbox\">GitHub</a></p>\r\n                            <div class=\"text-center\">\r\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=ashleydw&repo=lightbox&type=watch&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"100\t\" height=\"20\"></iframe>\r\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=ashleydw&repo=lightbox&type=fork&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"100\" height=\"20\"></iframe>\r\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=ashleydw&repo=lightbox&type=follow&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"160\" height=\"20\"></iframe>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container\">\r\n            <div class=\"row justify-content-center\">\r\n                <div class=\"col-md-10\">\r\n\r\n                    <h2>Install</h2>\r\n                    <p>Grab the latest CSS / JS files from the CDN: <a href=\"https://cdnjs.com/libraries/ekko-lightbox\">https://cdnjs.com/libraries/ekko-lightbox</a>.</p>\r\n                    <p>Or, with bower: <code>bower install ekko-lightbox --save</code></p>\r\n                    <p>Or, download the files directly: <a href=\"https://github.com/ashleydw/lightbox/tree/master/dist\">https://github.com/ashleydw/lightbox/tree/master/dist</a></p>\r\n                    <br /><br />\r\n                    <p>Place this near on your page, probably near the end of the body section:</p>\r\n<code class=\"block-code\">$(document).on('click', '[data-toggle=\"lightbox\"]', function(event) {\r\n    event.preventDefault();\r\n    $(this).ekkoLightbox();\r\n});</code>\r\n                    <br /><br />\r\n                    <p>Then simply add <code>data-toggle</code> to your anchor tags.</p>\r\n<code class=\"block-code\">&lt;a href=&quot;https://unsplash.it/1200/768.jpg?image=251&quot; data-toggle=&quot;lightbox&quot;&gt;\r\n    &lt;img src=&quot;https://unsplash.it/600.jpg?image=251&quot; class=&quot;img-fluid&quot;&gt;\r\n&lt;/a&gt;\r\n</code>\r\n                    <br /><br />\r\n                    <p>Obviously, you need Bootstrap. Made for Bootstrap v4 but *should* work with v3.</p>\r\n\r\n                    <h2>Options</h2>\r\n                    <p>Options are passed down to the modal object so you can also use any of the <a href=\"http://getbootstrap.com/javascript/#modals-usage\">original modal options</a>.</p>\r\n                    <p>Pass the options to the calling function as an object, or set defaults using <code>$.fn.ekkoLightbox.defaults</code> (excluding modal default options, notable: title, footer, remote)</p>\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table table-bordered\">\r\n                            <thead>\r\n                            <tr>\r\n                                <th>Name</th>\r\n                                <th>type</th>\r\n                                <th>default</th>\r\n                                <th>description</th>\r\n                                <th>data-*</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>leftArrow / rightArrow</td>\r\n                                    <td>html</td>\r\n                                    <td><code>&#10094;</code> / <code>&#10095;</code></td>\r\n                                    <td>HTML for the arrows</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>wrapping</td>\r\n                                    <td>boolean</td>\r\n                                    <td><code>true</code></td>\r\n                                    <td>Whether the gallery should loop or not</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>width / height</td>\r\n                                    <td>integer</td>\r\n                                    <td></td>\r\n                                    <td>Force the width / height</td>\r\n                                    <td><code>data-(width|height)=\"[0-9]+\"</code></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>maxWidth / maxHeight</td>\r\n                                    <td>integer</td>\r\n                                    <td>9999</td>\r\n                                    <td>Limit the container width / height</td>\r\n                                    <td><code>data-(max-width|max-height)=\"[0-9]+\"</code></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>alwaysShowClose</td>\r\n                                    <td>boolean</td>\r\n                                    <td><code>false</code></td>\r\n                                    <td>Always show the close button, even if no title is present</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>loadingMessage</td>\r\n                                    <td>html</td>\r\n                                    <td>A fancy loader</td>\r\n                                    <td>HTML injected for loading</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>showArrows</td>\r\n                                    <td>bool</td>\r\n                                    <td>true</td>\r\n                                    <td>Disable the navigation overlay</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>fade</td>\r\n                                    <td>bool</td>\r\n                                    <td>true</td>\r\n                                    <td>Fade in the modal</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>verticalAlignCenter</td>\r\n                                    <td>bool</td>\r\n                                    <td>false</td>\r\n                                    <td>Center the modal vertically</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <code class=\"block-code\">$(this).ekkoLightbox({\r\n    alwaysShowClose: true,\r\n    onShown: function() {\r\n        console.log('Checking our the events huh?');\r\n    },\r\n    onNavigate: function(direction, itemIndex)\r\n        console.log('Navigating '+direction+'. Current item: '+itemIndex);\r\n    }\r\n    ...\r\n});</code>\r\n                    <br /><br />\r\n                    <p>The following options are specified per element.</p>\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table table-bordered\">\r\n                            <thead>\r\n                            <tr>\r\n                                <th>Name</th>\r\n                                <th>Description</th>\r\n                                <th>Example</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr>\r\n                                <td>remote</td>\r\n                                <td>If you can't/don't want to set the href property of an element</td>\r\n                                <td><code>data-remote=\"http://www....\"</code></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>gallery</td>\r\n                                <td>For grouping elements</td>\r\n                                <td><code>data-gallery=\"gallery-name\"</code></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>type</td>\r\n                                <td>Force the lightbox into image/YouTube mode.</td>\r\n                                <td><code>data-type=\"(image|youtube|vimeo)\"</code></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>disable-external-check</td>\r\n                                <td>Force the lightbox loading into an iframe.</td>\r\n                                <td><code>data-disable-external-check=\"(true|false)\"</code></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <code class=\"block-code\">&lt;a href=&quot;https://unsplash.it/1200/768.jpg?image=251&quot; data-toggle=&quot;lightbox&quot; data-gallery=&quot;example-gallery&quot; data-type=&quot;image&quot;&gt;\r\n    &lt;img src=&quot;https://unsplash.it/600.jpg?image=251&quot; class=&quot;img-fluid&quot;&gt;\r\n&lt;/a&gt;</code>\r\n\r\n                    <h2>Events</h2>\r\n                    <p>Events can be hooked into, set the the same as options above.</p>\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table table-bordered\">\r\n                            <thead>\r\n                            <tr>\r\n                                <th>Name</th>\r\n                                <th>Description</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr>\r\n                                <td>onContentLoaded</td>\r\n                                <td>Fired when content (image/video/remote page etc) has been fully loaded.</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>onNavigate</td>\r\n                                <td>Fired before navigating a gallery.</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>onShow/onShown/onHide/onHidden</td>\r\n                                <td>Inherited from the bootstrap modal.</td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n\r\n                    <h2>Examples</h2>\r\n                    <p>Thanks to <a href=\"https://unsplash.it/\">https://unsplash.it/</a> for the images.</p>\r\n                    <ul>\r\n                        <li><a href=\"#single-image\">Single Image</a></li>\r\n                        <li><a href=\"#image-gallery\">Image Gallery</a></li>\r\n                        <li><a href=\"#limit-size\">Limit Image Size</a></li>\r\n                        <li><a href=\"#videos\">Videos</a></li>\r\n                        <li><a href=\"#videos-gallery\">Gallery of Videos</a></li>\r\n                        <li><a href=\"#mixed-gallery\">Mixed gallery</a></li>\r\n                        <li><a href=\"#programatically-call\">Programmatically call</a></li>\r\n                        <li><a href=\"#data-remote\">Via <code>data-remote</code></a></li>\r\n                        <li><a href=\"#force-type\">Force type</a></li>\r\n                        <li><a href=\"#hidden-elements\">Hidden elements</a></li>\r\n                        <li><a href=\"#remote-content\">Remote content</a></li>\r\n                        <li><a href=\"#no-wrapping\">Disable wrapping</a></li>\r\n                        <li><a href=\"#disable-fade\">Disable fade</a></li>\r\n                        <li><a href=\"#center-vertically\">Center vertically</a></li>\r\n                        <li><a href=\"#alt-attr\">\"alt\" attribute</a></li>\r\n                    </ul>\r\n\r\n                    <h3 id=\"single-image\">Single Image</h3>\r\n                    <p>Note: uses modal plugin title option via <code>data-title</code>, and the custom footer tag using <code>data-footer</code></p>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-sm-3\" data-code=\"example-1\">\r\n                            <a href=\"https://unsplash.it/1200/768.jpg?image=250\" data-toggle=\"lightbox\" data-title=\"A random title\" data-footer=\"A custom footer text\">\r\n                                <img src=\"https://unsplash.it/600.jpg?image=250\" class=\"img-fluid\">\r\n                            </a>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code=\"example-1\"></code>\r\n\r\n                    <h3 id=\"image-gallery\">Image Gallery</h3>\r\n                    <p>Galleries are created by adding the <code>data-gallery</code> attribute.</p>\r\n                    <div data-code=\"example-2\">\r\n                        <div class=\"row justify-content-center\">\r\n                            <div class=\"col-md-8\">\r\n                                <div class=\"row\">\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=251\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=251\" alt=\"Image 1\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=252\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=252\" alt=\"Image 3\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=253\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=253\" alt=\"Image 3\" class=\"img-fluid\">\r\n                                    </a>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=254\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=254\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=255\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=255\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=256\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=256\" class=\"img-fluid\">\r\n                                    </a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code=\"example-2\"></code>\r\n\r\n                    <h3 id=\"limit-size\">Limit Image Size</h3>\r\n                    <p>Note: uses modal plugin limiting via <code>data-max-width</code> (or <code>data-max-height</code>)</p>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-sm-3\" data-code=\"example-10\">\r\n                            <a href=\"https://unsplash.it/1200/768.jpg?image=250\" data-toggle=\"lightbox\" data-max-width=\"600\">\r\n                                <img src=\"https://unsplash.it/600.jpg?image=250\" class=\"img-fluid\">\r\n                            </a>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code=\"example-10\"></code>\r\n\r\n                    <h3 id=\"videos\">Videos</h3>\r\n                    <h4>YouTube</h4>\r\n                    <p>You can use various YouTube URL formats, the regex used is: <code>/^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/</code></p>\r\n                    <div data-code=\"example-3\">\r\n                        <p><a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" data-toggle=\"lightbox\">Justin Bieber - Love Yourself</a></p>\r\n                        <p><a href=\"http://youtu.be/b0jqPvpn3sY\" data-toggle=\"lightbox\">Tame Impala - Elephant (using youtu.be link)</a></p>\r\n                        <p><a href=\"https://www.youtube.com/watch?v=oyEuk8j8imI&rel=0\" data-toggle=\"lightbox\">Justin Bieber - Love Yourself</a> (suppress related videos with <code>&rel=0</code>)</p>\r\n                    </div>\r\n                    <code data-code=\"example-3\" data-trim=\"all\"></code>\r\n                    <h4>Vimeo</h4>\r\n                    <p>You cannot embed Vimeo videos using the standard url (ie http://vimeo.com/80629469); you must link to the embed source (ie player.vimeo.com/video/80629469). This will mean your link url - if the JavaScript fails, will open the full screen player (try opening the first link below in a new tab); the solution to this is to set the lightbox source directly - the second link below does this.</p>\r\n                    <div data-code=\"example-3-b\">\r\n                        <p><a href=\"http://player.vimeo.com/video/80629469\" data-toggle=\"lightbox\">City Lights - from Colin Rich (using embed link)</a></p>\r\n                        <p><a href=\"http://vimeo.com/80629469\" data-remote=\"http://player.vimeo.com/video/80629469\" data-toggle=\"lightbox\">City Lights - from Colin Rich</a> (with reccommended <code>data-remote</code> setting)</p>\r\n                    </div>\r\n                    <code data-code=\"example-3-b\" data-trim=\"all\"></code>\r\n                    <h4>Instagram</h4>\r\n                    <p></p>\r\n                    <div data-code=\"example-3-c\">\r\n                        <p><a href=\"http://instagram.com/p/BRCYe_wD9pV/\" data-toggle=\"lightbox\" data-title=\"Plug for our new service\">Instagram</a></p>\r\n                        <p>This also works with photos: <a href=\"//instagram.com/p/BRCdyxnjBsA/\" data-toggle=\"lightbox\">Instagram</a></p>\r\n                    </div>\r\n                    <code data-code=\"example-3-c\" data-trim=\"all\"></code>\r\n                    <h4>Forcing width</h4>\r\n                    <p>Set the width of the video</p>\r\n                    <div data-code=\"example-3-d\">\r\n                        <p><a href=\"https://www.youtube.com/watch?v=e-ORhEE9VVg\" data-toggle=\"lightbox\">Taylor Swift - Blank Space (standard)</a></p>\r\n                        <p><a href=\"https://www.youtube.com/watch?v=e-ORhEE9VVg\" data-toggle=\"lightbox\" data-width=\"640\">Taylor Swift - Blank Space (640 x 360)</a></p>\r\n                        <p><a href=\"https://www.youtube.com/watch?v=e-ORhEE9VVg\" data-toggle=\"lightbox\" data-width=\"1280\">Taylor Swift - Blank Space (1280 x 780)</a></p>\r\n                    </div>\r\n                    <code data-code=\"example-3-d\" data-trim=\"all\"></code>\r\n\r\n                    <!-- i hope your coworkers think you're listening to some justin and taylor -->\r\n\r\n                    <h3 id=\"videos-gallery\">Gallery of Videos</h3>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row\" data-code=\"example-4\">\r\n                                <a href=\"http://www.youtube.com/watch?v=k6mFF3VmVAs\" data-toggle=\"lightbox\" data-gallery=\"youtubevideos\" class=\"col-sm-4\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/yP11r5n5RNg/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"http://youtu.be/iQ4D273C7Ac\" data-toggle=\"lightbox\" data-gallery=\"youtubevideos\" class=\"col-sm-4\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/iQ4D273C7Ac/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"//www.youtube.com/embed/b0jqPvpn3sY\" data-toggle=\"lightbox\" data-gallery=\"youtubevideos\" class=\"col-sm-4\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/b0jqPvpn3sY/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code data-code=\"example-4\"></code>\r\n\r\n                    <h3 id=\"mixed-gallery\">Mixed gallery</h3>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row flex-items-xs-center\" data-code=\"example-5\">\r\n                                <a href=\"http://www.youtube.com/watch?v=k6mFF3VmVAs\" data-toggle=\"lightbox\" data-gallery=\"mixedgallery\" class=\"col-sm-4\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/yP11r5n5RNg/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=257\" data-toggle=\"lightbox\" data-gallery=\"mixedgallery\" class=\"col-sm-4\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=257\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"http://vimeo.com/80629469\" data-remote=\"http://player.vimeo.com/video/80629469\" data-toggle=\"lightbox\" data-gallery=\"mixedgallery\" class=\"col-sm-4\">\r\n                                    <img src=\"http://b.vimeocdn.com/ts/458/070/458070637_200.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code data-code=\"example-5\"></code>\r\n\r\n                    <h3 id=\"programatically-call\">Programmatically call</h3>\r\n                    <p>These two examples are opened via the JavaScript at the bottom of the source.</p>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row\" data-code=\"example-6\">\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=258\" id=\"open-image\" class=\"col-6\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=258\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"http://youtu.be/iQ4D273C7Ac\" id=\"open-youtube\" class=\"col-6\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/iQ4D273C7Ac/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code data-code=\"example-6\"></code>\r\n                    <code class=\"block-code\">$(&#39;#open-image&#39;).click(function (e) {\r\n    e.preventDefault();\r\n    $(this).ekkoLightbox();\r\n});\r\n$(&#39;#open-youtube&#39;).click(function (e) {\r\n    e.preventDefault();\r\n    $(this).ekkoLightbox();\r\n});</code>\r\n\r\n                    <h3 id=\"data-remote\">Via <code>data-remote</code></h3>\r\n                    <p>Neither of these are <code>&lt;a /&gt;</code> tags, so both rely on the <code>data-remote</code> attribute.</p>\r\n                    <div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row\" data-code=\"example-7\" style=\"height:240px\">\r\n                                <img src=\"https://unsplash.it/600.jpg?image=259\" data-toggle=\"lightbox\" data-remote=\"https://unsplash.it/1200/768.jpg?image=259\" class=\"img-fluid col-6\">\r\n                                <img src=\"http://i1.ytimg.com/vi/b0jqPvpn3sY/mqdefault.jpg\" data-toggle=\"lightbox\" data-remote=\"https://www.youtube.com/embed/b0jqPvpn3sY\" class=\"img-fluid col-6\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code data-code=\"example-7\"></code>\r\n\r\n                    <h3 id=\"force-type\">Force type</h3>\r\n                    <p>If the images you are linking to have no extension, the lightbox cannot detect that is an image; therefore you need to tell the lightbox what <code>data-type</code> it is.</p>\r\n                    <p>Current allowed types are: <code>['image', 'youtube', 'vimeo', 'instagram', 'video', 'url']</code></p>\r\n                    <div data-code=\"example-8\">\r\n                        <p><a href=\"https://unsplash.it/1200/768?image=260\" data-title=\"Force image display\" data-footer=\"The remote of this modal has no extension (https://unsplash.it/1200/768?image=260) but works because the type is forced.\" data-toggle=\"lightbox\" data-type=\"image\">Click here for an image, but with no extension.</a></p>\r\n                        <p><a href=\"https://unsplash.it/1200/768?image=261\" data-footer=\"Without the type forced, the lightbox will remote load the content\" data-toggle=\"lightbox\">This link is missing the type attribute, and will iframe the image.</a></p>\r\n                        <p><a href=\"http://www.youtube.com/watch?v=b0jqPvpn3sY\" data-toggle=\"lightbox\" data-type=\"image\">This link is linking to a YouTube video, but forcing an image.</a></p>\r\n                    </div>\r\n                    <code data-code=\"example-8\"></code>\r\n\r\n                    <h3 id=\"hidden-elements\">Hidden elements</h3>\r\n                    <p>Facebook style, only show a few images but have a large gallery</p>\r\n                    <div class=\"row justify-content-center\" data-code=\"example-9\">\r\n                        <a href=\"https://unsplash.it/1200/768.jpg?image=263\" data-toggle=\"lightbox\" data-gallery=\"hidden-images\" class=\"col-4\">\r\n                            <img src=\"https://unsplash.it/600.jpg?image=263\" class=\"img-fluid\">\r\n                        </a>\r\n                        <a href=\"https://unsplash.it/1200/768.jpg?image=264\" data-toggle=\"lightbox\" data-gallery=\"hidden-images\" class=\"col-4\">\r\n                            <img src=\"https://unsplash.it/600.jpg?image=264\" class=\"img-fluid\">\r\n                        </a>\r\n                        <a href=\"https://unsplash.it/1200/768.jpg?image=265\" data-toggle=\"lightbox\" data-gallery=\"hidden-images\" class=\"col-4\">\r\n                            <img src=\"https://unsplash.it/600.jpg?image=265\" class=\"img-fluid\">\r\n                        </a>\r\n                        <!-- elements not showing, use data-remote -->\r\n                        <div data-toggle=\"lightbox\" data-gallery=\"hidden-images\" data-remote=\"https://unsplash.it/1200/768.jpg?image=264\" data-title=\"Hidden item 1\"></div>\r\n                        <div data-toggle=\"lightbox\" data-gallery=\"hidden-images\" data-remote=\"https://www.youtube.com/embed/b0jqPvpn3sY\" data-title=\"Hidden item 2\"></div>\r\n                        <div data-toggle=\"lightbox\" data-gallery=\"hidden-images\" data-remote=\"https://unsplash.it/1200/768.jpg?image=265\" data-title=\"Hidden item 3\"></div>\r\n                        <div data-toggle=\"lightbox\" data-gallery=\"hidden-images\" data-remote=\"https://unsplash.it/1200/768.jpg?image=266\" data-title=\"Hidden item 4\"></div>\r\n                        <div data-toggle=\"lightbox\" data-gallery=\"hidden-images\" data-remote=\"https://unsplash.it/1200/768.jpg?image=267\" data-title=\"Hidden item 5\"></div>\r\n                    </div>\r\n                    <code data-code=\"example-9\"></code>\r\n\r\n                    <h3 id=\"remote-content\">Remote content</h3>\r\n\t\t\t\t\t<p>Given a URL, that is not an image or video (including unforced types), load the content using an iFrame.</p>\r\n\t\t\t\t\t<div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\" data-code=\"example-10\">\r\n                            <div class=\"row\">\r\n                                <p class=\"col-sm-3\"><a href=\"http://getbootstrap.com\" data-title=\"Bootstrap\" data-width=\"1200\" data-toggle=\"lightbox\" data-gallery=\"remoteload\">Bootstrap Docs</a></p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code data-code=\"example-10\"></code>\r\n\r\n                    <h3 id=\"no-wrapping\">Disable wrapping</h3>\r\n                    <p>To disable wrapping, set <code>wrapping: false</code> in the options to disable wrapping.</p>\r\n                    <div>\r\n                        <div class=\"row justify-content-center\">\r\n                            <div class=\"col-md-8\">\r\n                                <div class=\"row\">\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=251\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=251\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=252\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=252\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=253\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=253\" class=\"img-fluid\">\r\n                                    </a>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=254\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=254\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=255\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=255\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=256\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-11\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=256\" class=\"img-fluid\">\r\n                                    </a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code>$(this).ekkoLightbox({ wrapping: false });</code>\r\n\r\n                    <h3 id=\"disable-fade\">Disable fade</h3>\r\n\t\t\t\t\t<p>Set <code>fade: false</code> in the options to disable the fade.</p>\r\n\t\t\t\t\t<div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row\">\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=251\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-12\" class=\"col-sm-4\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=251\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=252\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-12\" class=\"col-sm-4\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=252\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=253\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-12\" class=\"col-sm-4\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=253\" class=\"img-fluid\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code>$(this).ekkoLightbox({ fade: false });</code>\r\n\r\n                    <h3 id=\"center-vertically\">Center vertically</h3>\r\n\t\t\t\t\t<p>Set <code>verticalAlignCenter: true</code> in the options to vertically center the modal.</p>\r\n\t\t\t\t\t<div class=\"row justify-content-center\">\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"row flex-items-xs-center\" data-code=\"example-5\">\r\n                                <a href=\"http://www.youtube.com/watch?v=k6mFF3VmVAs\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-13\" class=\"col-sm-4\">\r\n                                    <img src=\"http://i1.ytimg.com/vi/yP11r5n5RNg/mqdefault.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"https://unsplash.it/1200/768.jpg?image=257\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-13\" class=\"col-sm-4\">\r\n                                    <img src=\"https://unsplash.it/600.jpg?image=257\" class=\"img-fluid\">\r\n                                </a>\r\n                                <a href=\"http://vimeo.com/80629469\" data-remote=\"http://player.vimeo.com/video/80629469\" data-toggle=\"lightbox\" data-gallery=\"example-gallery-13\" class=\"col-sm-4\">\r\n                                    <img src=\"http://b.vimeocdn.com/ts/458/070/458070637_200.jpg\" class=\"img-fluid\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code>$(this).ekkoLightbox({ verticalAlignCenter: true });</code>\r\n\r\n                    <h3 id=\"alt-attr\">Image \"alt\" attribute</h3>\r\n                    <p>Add <code>data-alt</code> to provide the enlarged image an alt tag.</p>\r\n                    <div data-code=\"example-2\">\r\n                        <div class=\"row justify-content-center\">\r\n                            <div class=\"col-md-8\">\r\n                                <div class=\"row\">\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=251\" data-toggle=\"lightbox\" data-alt=\"Image 1 Large Alt\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=251\" alt=\"Image 1 Thumbnail\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=252\" data-toggle=\"lightbox\" data-alt=\"Image 2 Large Alt\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=252\" alt=\"Image 2 Thumbnail\" class=\"img-fluid\">\r\n                                    </a>\r\n                                    <a href=\"https://unsplash.it/1200/768.jpg?image=253\" data-toggle=\"lightbox\" data-alt=\"Image 3 Large Alt\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\r\n                                        <img src=\"https://unsplash.it/600.jpg?image=253\" alt=\"Image 3 Thumbnail\" class=\"img-fluid\">\r\n                                    </a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <code class=\"html\" data-code=\"example-14\"></code>\r\n\r\n                    <p class=\"footer\"><span>Built by me, <a href=\"https://ashleyd.ws\">ashleydw</a></span></p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <script src=\"https://code.jquery.com/jquery-3.2.1.slim.min.js\" integrity=\"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN\" crossorigin=\"anonymous\"></script>\r\n        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js\" integrity=\"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q\" crossorigin=\"anonymous\"></script>\r\n        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js\" integrity=\"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl\" crossorigin=\"anonymous\"></script>\r\n        <script src=\"main.js\"></script>\r\n\r\n        <!-- for documentation only -->\r\n        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/anchor-js/3.2.1/anchor.min.js\"></script>\r\n        <script type=\"text/javascript\">\r\n            $(document).ready(function ($) {\r\n                // delegate calls to data-toggle=\"lightbox\"\r\n                $(document).on('click', '[data-toggle=\"lightbox\"]:not([data-gallery=\"navigateTo\"]):not([data-gallery^=\"example-gallery-\"])', function(event) {\r\n                    event.preventDefault();\r\n                    return $(this).ekkoLightbox({\r\n                        onShown: function() {\r\n                            if (window.console) {\r\n                                return console.log('Checking our the events huh?');\r\n                            }\r\n                        },\r\n\t\t\t\t\t\tonNavigate: function(direction, itemIndex) {\r\n                            if (window.console) {\r\n                                return console.log('Navigating '+direction+'. Current item: '+itemIndex);\r\n                            }\r\n\t\t\t\t\t\t}\r\n                    });\r\n                });\r\n\r\n                // disable wrapping\r\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"example-gallery-11\"]', function(event) {\r\n                    event.preventDefault();\r\n                    return $(this).ekkoLightbox({\r\n                        wrapping: false\r\n                    });\r\n                });\r\n\r\n                // disable fade\r\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"example-gallery-12\"]', function(event) {\r\n                    event.preventDefault();\r\n                    return $(this).ekkoLightbox({\r\n                        fade: false\r\n                    });\r\n                });\r\n\r\n                // center vertically\r\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"example-gallery-13\"]', function(event) {\r\n                    event.preventDefault();\r\n                    return $(this).ekkoLightbox({\r\n                        verticalAlignCenter: true\r\n                    });\r\n                });\r\n\r\n                //Programmatically call\r\n                $('#open-image').click(function (e) {\r\n                    e.preventDefault();\r\n                    $(this).ekkoLightbox();\r\n                });\r\n                $('#open-youtube').click(function (e) {\r\n                    e.preventDefault();\r\n                    $(this).ekkoLightbox();\r\n                });\r\n\r\n\t\t\t\t// navigateTo\r\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"navigateTo\"]', function(event) {\r\n                    event.preventDefault();\r\n\r\n                    return $(this).ekkoLightbox({\r\n                        onShown: function() {\r\n\r\n\t\t\t\t\t\t\tthis.modal().on('click', '.modal-footer a', function(e) {\r\n\r\n\t\t\t\t\t\t\t\te.preventDefault();\r\n\t\t\t\t\t\t\t\tthis.navigateTo(2);\r\n\r\n                            }.bind(this));\r\n\r\n                        }\r\n                    });\r\n                });\r\n\r\n\r\n                /**\r\n                 * Documentation specific - ignore this\r\n                 */\r\n                anchors.options.placement = 'left';\r\n                anchors.add('h3');\r\n                $('code[data-code]').each(function() {\r\n\r\n                    var $code = $(this),\r\n                        $pair = $('div[data-code=\"'+$code.data('code')+'\"]');\r\n\r\n                    $code.hide();\r\n                    var text = $code.text($pair.html()).html().trim().split(\"\\n\");\r\n                    var indentLength = text[text.length - 1].match(/^\\s+/)\r\n                    indentLength = indentLength ? indentLength[0].length : 24;\r\n                    var indent = '';\r\n                    for(var i = 0; i < indentLength; i++)\r\n                        indent += ' ';\r\n                    if($code.data('trim') == 'all') {\r\n                        for (var i = 0; i < text.length; i++)\r\n                            text[i] = text[i].trim();\r\n                    } else  {\r\n                        for (var i = 0; i < text.length; i++)\r\n                            text[i] = text[i].replace(indent, '    ').replace('    ', '');\r\n                    }\r\n                    text = text.join(\"\\n\");\r\n                    $code.html(text).show();\r\n\r\n                });\r\n            });\r\n        </script>\r\n    </body>\r\n</html>\r\n"

/***/ }),

/***/ 0:
/*!******************************************************************!*\
  !*** multi ./ekko-lightbox.js ./ekko-lightbox.less ./index.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./ekko-lightbox.js */"./ekko-lightbox.js");
__webpack_require__(/*! ./ekko-lightbox.less */"./ekko-lightbox.less");
module.exports = __webpack_require__(/*! ./index.html */"./index.html");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map