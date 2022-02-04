const Lightbox = (($) => {

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


    const NAME = 'ekkoLightbox'
    const JQUERY_NO_CONFLICT = $.fn[NAME]

    const Default = {
        debug: 0,   // 0: no debug, 1: on-screen info, 2: on-screen plus pop-ups
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
            type: 'Could not detect remote target type. Force the type using data-type',
        },
        doc: document, // if in an iframe can specify top.document
        onShow() { },
        onShown() { },
        onHide() { },
        onHidden() { },
        onNavigate() { },
        onContentLoaded() { },
    }

    class Lightbox {

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

        static get Default() {
            return Default
        }

        constructor($element, config) {
            this._config = $.extend({}, Default, config)
            this._$modalNavLayer = null
            this._$modalArrows = null
            this._$debugInfo = null;
            this._galleryIndex = 0
            this._galleryName = null
            this._titleIsShown = false
            this._footerIsShown = false
            this._wantedWidth = 0
            this._wantedHeight = 0
            this._touchstartX = 0
            this._touchendX = 0

            this._modalId = `ekkoLightbox-${Math.floor((Math.random() * 1000) + 1)}`;
            this._$element = $element instanceof jQuery ? $element : $($element)

            this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;

            let h4 = `<h4 class="modal-title">${this._config.title || "&nbsp;"}</h4>`;
            let btn = `<button type="button" class="close" data-dismiss="modal" aria-label="${this._config.strings.close}"><span aria-hidden="true">&times;</span></button>`;

            let fade = this._config.fade ? 'fade in' : '';
            let vertical = this._config.verticalAlignCenter ? 'modal-dialog-centered' : '';

            let header = `<div class="modal-header${this._config.title || this._config.alwaysShowClose ? '' : ' hide'}">` + (this._isBootstrap3 ? btn + h4 : h4 + btn) + `</div>`;
            let footer = `<div class="modal-footer${this._config.footer ? '' : ' hide'}">${this._config.footer || "&nbsp;"}</div>`;
            let body = `<div class="modal-body"><div class="ekko-lightbox-container"><div class="ekko-lightbox-item ${fade} show"></div><div class="ekko-lightbox-item fade"></div></div></div>`;
            let dialog = `<div class="modal-dialog ${vertical}" role="document"><div class="modal-content">${header}${body}${footer}</div></div>`;
            $(this._config.doc.body).append(`<div id="${this._modalId}" class="ekko-lightbox modal fade" tabindex="-1" tabindex="-1" role="dialog" aria-hidden="true">${dialog}</div>`)

            this._$modal = $(`#${this._modalId}`, this._config.doc)

            if (this._config.debug > 0) this._$modal.append(`<div class="modal-debug-info"></div>`);
            this._$debugInfo = this._$modal.find('.modal-debug-info').first();

            this._$modalDialog = this._$modal.find('.modal-dialog').first()
            this._$modalContent = this._$modal.find('.modal-content').first()
            this._$modalBody = this._$modal.find('.modal-body').first()
            this._$modalHeader = this._$modal.find('.modal-header').first()
            this._$modalFooter = this._$modal.find('.modal-footer').first()

            this._$lightboxContainer = this._$modalBody.find('.ekko-lightbox-container').first()
            this._$lightboxBodyOne = this._$lightboxContainer.find('> div:first-child').first()
            this._$lightboxBodyTwo = this._$lightboxContainer.find('> div:last-child').first()

            this._galleryName = this._$element.data('gallery')
            if (this._galleryName) {
                this._$galleryItems = $(document.body).find(`*[data-gallery="${this._galleryName}"]`)
                this._galleryIndex = this._$galleryItems.index(this._$element)
                $(document).on('keydown.ekkoLightbox', this._navigationalBinder.bind(this))

                // add the directional arrows to the modal
                if (this._config.showArrows && this._$galleryItems.length > 1) {

                    // add the navigation layer with full surface links
                    this._$lightboxContainer.prepend(`<div class="ekko-lightbox-nav-overlay"><a href="#"></a><a href="#"></a></div>`)
                    this._$modalNavLayer = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay').first()

                    // add the link arrows suitable also for video overlay
                    this._$lightboxContainer.append(`<div class="ekko-lightbox-nav-arrows"><a href="#">${this._config.leftArrow}</a><a href="#">${this._config.rightArrow}</a></div>`)
                    this._$modalArrows = this._$lightboxContainer.find('div.ekko-lightbox-nav-arrows').first()

                    // add the click event handlers to all links
                    this._$lightboxContainer.on('click', 'a:first-child', event => {
                        event.preventDefault()
                        return this.navigateLeft()
                    })
                    this._$lightboxContainer.on('click', 'a:last-child', event => {
                        event.preventDefault()
                        return this.navigateRight()
                    })

                    // add the hover event handlers to nav surface links, adding hover class to arrow links
                    this._$modalNavLayer.find('a:first-child').hover(
                        () => {
                            this._$modalArrows.find('a:first-child').addClass('hover');
                        },
                        () => {
                            this._$modalArrows.find('a:first-child').removeClass('hover').filter('[class=""]').removeAttr('class');
                        }
                    );
                    this._$modalNavLayer.find('a:last-child').hover(
                        () => {
                            this._$modalArrows.find('a:last-child').addClass('hover');
                        },
                        () => {
                            this._$modalArrows.find('a:last-child').removeClass('hover').filter('[class=""]').removeAttr('class');
                        }
                    );

                    this.updateNavigation()
                }
            }

            this._$modal
                .on('show.bs.modal', this._config.onShow.bind(this))
                .on('shown.bs.modal', () => {
                    this._toggleLoading(true)
                    this._handle()
                    return this._config.onShown.call(this)
                })
                .on('hide.bs.modal', this._config.onHide.bind(this))
                .on('hidden.bs.modal', () => {
                    if (this._galleryName) {
                        $(document).off('keydown.ekkoLightbox')
                        $(window).off('resize.ekkoLightbox')
                    }
                    this._$modal.remove()
                    return this._config.onHidden.call(this)
                })
                .modal(this._config)

            $(window).on('resize.ekkoLightbox', () => {
                this._resize(this._wantedWidth, this._wantedHeight)
            })
            this._$lightboxContainer
                .on('touchstart', () => {
                    this._touchstartX = event.changedTouches[0].screenX;

                })
                .on('touchend', () => {
                    this._touchendX = event.changedTouches[0].screenX;
                    this._swipeGesure();
                })
        }

        element() {
            return this._$element;
        }

        modal() {
            return this._$modal;
        }

        navigateTo(index) {

            if (index < 0 || index > this._$galleryItems.length - 1)
                return this

            this._galleryIndex = index

            this.updateNavigation()

            this._$element = $(this._$galleryItems.get(this._galleryIndex))
            this._handle();
        }

        navigateLeft() {

            if (!this._$galleryItems)
                return;

            if (this._$galleryItems.length === 1)
                return

            if (this._galleryIndex === 0) {
                if (this._config.wrapping)
                    this._galleryIndex = this._$galleryItems.length - 1
                else
                    return
            }
            else //circular
                this._galleryIndex--

            this._config.onNavigate.call(this, 'left', this._galleryIndex)
            return this.navigateTo(this._galleryIndex)
        }

        navigateRight() {

            if (!this._$galleryItems)
                return;

            if (this._$galleryItems.length === 1)
                return

            if (this._galleryIndex === this._$galleryItems.length - 1) {
                if (this._config.wrapping)
                    this._galleryIndex = 0
                else
                    return
            }
            else //circular
                this._galleryIndex++

            this._config.onNavigate.call(this, 'right', this._galleryIndex)
            return this.navigateTo(this._galleryIndex)
        }

        updateNavigation() {
            if (!this._config.wrapping) {
                let $nav = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay')
                if (this._galleryIndex === 0)
                    $nav.find('a:first-child').addClass('disabled')
                else
                    $nav.find('a:first-child').removeClass('disabled')

                if (this._galleryIndex === this._$galleryItems.length - 1)
                    $nav.find('a:last-child').addClass('disabled')
                else
                    $nav.find('a:last-child').removeClass('disabled')
            }
        }

        close() {
            return this._$modal.modal('hide');
        }

        // helper private methods
        _navigationalBinder(event) {
            event = event || window.event;
            if (event.keyCode === 39)
                return this.navigateRight()
            if (event.keyCode === 37)
                return this.navigateLeft()
        }

        // type detection private methods
        _detectRemoteType(src, type) {

            type = type || false;

            if (!type && this._isImage(src))
                type = 'image';
            if (!type && this._getYoutubeId(src))
                type = 'youtube';
            if (!type && this._getVimeoId(src))
                type = 'vimeo';
            if (!type && this._getInstagramId(src))
                type = 'instagram';
            if (type == 'audio' || type == 'video' || (!type && this._isMedia(src)))
                type = 'media';
            if (!type || ['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(type) < 0)
                type = 'url';

            return type;
        }

        _getRemoteContentType(src) {
            let response = $.ajax({
                type: 'HEAD',
                url: src,
                async: false
            });
            let contentType = response.getResponseHeader('Content-Type')
            return contentType;
        }

        _isImage(string) {
            return string && string.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        }

        _isMedia(string) {
            return string && string.match(/(\.(mp3|mp4|ogg|webm|wav)((\?|#).*)?$)/i)
        }

        _containerToUse() {
            // if currently showing an image, fade it out and remove
            let $toUse = this._$lightboxBodyTwo
            let $current = this._$lightboxBodyOne

            if (this._$lightboxBodyTwo.hasClass('in')) {
                $toUse = this._$lightboxBodyOne
                $current = this._$lightboxBodyTwo
            }

            $current.removeClass('in show')
            setTimeout(() => {
                if (!this._$lightboxBodyTwo.hasClass('in'))
                    this._$lightboxBodyTwo.empty()
                if (!this._$lightboxBodyOne.hasClass('in'))
                    this._$lightboxBodyOne.empty()
            }, 500)

            $toUse.addClass('in show')
            return $toUse
        }

        _handle() {

            // ### Added by DhyMik in v.5.5.0-dhymik:

            // remove css added in '_preloadImage'
            this._$modalDialog.removeClass("imageLoading");
            this._$modalDialog.removeClass("imageLoaded");
            this._$modalDialog.removeClass("imageStretched");
            this._$modalDialog.removeClass("isVideo");

            // ### End added by DhyMik in v.5.5.0-dhymik:

            let $toUse = this._containerToUse()
            this._updateTitleAndFooter()

            let currentRemote = this._$element.attr('data-remote') || this._$element.attr('href')
            let currentType = this._detectRemoteType(currentRemote, this._$element.attr('data-type') || false)

            if (['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(currentType) < 0)
                return this._error(this._config.strings.type)

            switch (currentType) {
                case 'image':
                    let altTag = this._$element.attr('data-alt') || '';
                    this._preloadImage(currentRemote, altTag, $toUse)
                    this._preloadImageByIndex(this._galleryIndex, 3)
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
                default: // url
                    this._loadRemoteContent(currentRemote, $toUse);
                    break;
            }

            return this;
        }

        _getYoutubeId(string) {
            if (!string)
                return false;
            let matches = string.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
            return (matches && matches[2].length === 11) ? matches[2] : false
        }

        _getVimeoId(string) {
            return string && string.indexOf('vimeo') > 0 ? string : false
        }

        _getInstagramId(string) {
            return string && string.indexOf('instagram') > 0 ? string : false
        }

        // layout private methods
        _toggleLoading(show) {
            show = show || false
            if (show) {
                this._$modalDialog.css('display', 'none')
                this._$modal.removeClass('in show')
                $('.modal-backdrop').append(this._config.loadingMessage)
            }
            else {
                this._$modalDialog.css('display', this._config.verticalAlignCenter ? 'flex' : 'block')
                this._$modal.addClass('in show')
                $('.modal-backdrop').find('.ekko-lightbox-loader').remove()
            }
            return this;
        }

        _calculateScaleFactor(width, height) {
            /* 'calculateScaleFactor' is the size factor to be applied to an image's or video#s dimensions
             * so it will fill the entire screen if browser window is maximized or full-screened.
             * 
             * Added in v.5.5.0-dhymik
             * */
            var screenWidth = window.screen.width;      // these are the hardware screen dimensions,
            var screenHeight = window.screen.height;    // not the browser window

            var videoMaxDimension = Math.max(width, height);
            var screenMaxDimension = Math.max(screenWidth, screenHeight);

            return screenMaxDimension / videoMaxDimension;
        }

        _updateTitleAndFooter() {
            let title = this._$element.data('title') || ""
            let caption = this._$element.data('footer') || ""

            this._titleIsShown = false
            if (title || this._config.alwaysShowClose) {
                this._titleIsShown = true
                this._$modalHeader.css('display', '').find('.modal-title').html(title || "&nbsp;")
            }
            else
                this._$modalHeader.css('display', 'none')

            this._footerIsShown = false
            if (caption) {
                this._footerIsShown = true
                this._$modalFooter.css('display', '').html(caption)
            }
            else
                this._$modalFooter.css('display', 'none')

            return this;
        }

        _showYoutubeVideo(remote, $containerForElement) {
            let id = this._getYoutubeId(remote)
            let query = remote.indexOf('&') > 0 ? remote.substr(remote.indexOf('&')) : ''
            let width = this._$element.data('width') || 560
            let height = this._$element.data('height') || width / (560 / 315)
            return this._showVideoIframe(
                `//www.youtube.com/embed/${id}?badge=0&autoplay=1&html5=1${query}`,
                width,
                height,
                $containerForElement
            );
        }

        _showVimeoVideo(id, $containerForElement) {
            let width = this._$element.data('width') || 500
            let height = this._$element.data('height') || width / (560 / 315)
            return this._showVideoIframe(id + '?autoplay=1', width, height, $containerForElement)
        }

        _showInstagramVideo(id, $containerForElement) {
            // instagram load their content into iframe's so this can be put straight into the element
            let width = this._$element.data('width') || 612
            let height = width + 80;
            id = id.substr(-1) !== '/' ? id + '/' : id; // ensure id has trailing slash
            $containerForElement.html(`<iframe width="${width}" height="${height}" src="${id}embed/" frameborder="0" allowfullscreen></iframe>`);
            this._resize(width, height);
            this._config.onContentLoaded.call(this);
            if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
            this._$modalDialog.addClass("isVideo");
            this._toggleLoading(false);
            return this;
        }

        _showVideoIframe(url, width, height, $containerForElement) { // should be used for videos only. for remote content use loadRemoteContent (data-type=url)
            height = height || width; // default to square

            // Added in v.5.5.0-dhymik:
            var scalingFactor = this._calculateScaleFactor(width, height);
            width = width * scalingFactor;
            height = height * scalingFactor;
            // added end.

            $containerForElement.html(`<div class="embed-responsive embed-responsive-16by9"><iframe width="${width}" height="${height}" src="${url}" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe></div>`);
            this._resize(width, height);
            this._config.onContentLoaded.call(this);
            if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
            this._$modalDialog.addClass("isVideo");
            this._toggleLoading(false);
            return this;
        }

        _showHtml5Media(url, $containerForElement) { // should be used for videos only. for remote content use loadRemoteContent (data-type=url)
            let contentType = this._getRemoteContentType(url);
            if (!contentType) {
                return this._error(this._config.strings.type)
            }
            let mediaType = '';
            if (contentType.indexOf('audio') > 0) {
                mediaType = 'audio';
            } else {
                mediaType = 'video';
            }
            let width = this._$element.data('width') || 560
            let height = this._$element.data('height') || width / (560 / 315)

            // ### Added by DhyMik in v.5.5.0-dhymik:
            var scalingFactor = this._calculateScaleFactor(width, height);
            width = width * scalingFactor;
            height = height * scalingFactor;
            // ### added end.

            $containerForElement.html(`<div class="embed-responsive embed-responsive-16by9"><${mediaType} width="${width}" height="${height}" preload="auto" autoplay controls class="embed-responsive-item"><source src="${url}" type="${contentType}">${this._config.strings.type}</${mediaType}></div>`);
            this._resize(width, height);
            this._config.onContentLoaded.call(this);
            if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
            this._$modalDialog.addClass("isVideo");
            this._toggleLoading(false);
            return this;
        }

        _loadRemoteContent(url, $containerForElement) {
            let width = this._$element.data('width') || 560;
            let height = this._$element.data('height') || 560;

            let disableExternalCheck = this._$element.data('disableExternalCheck') || false;
            this._toggleLoading(false);

            // ### Added by DhyMik in v.5.5.0-dhymik:
            var scalingFactor = this._calculateScaleFactor(width, height);
            width = width * scalingFactor;
            height = height * scalingFactor;
            // ### added end.

            // external urls are loading into an iframe
            // local ajax can be loaded into the container itself
            if (!disableExternalCheck && !this._isExternal(url)) {
                $containerForElement.load(url, $.proxy(() => {
                    return this._$element.trigger('loaded.bs.modal');
                }));

            } else {
                $containerForElement.html(`<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`);
                this._config.onContentLoaded.call(this);
            }

            if (this._$modalNavLayer) this._$modalNavLayer.css('display', !this._config.hideArrowsOnVideo ? '' : 'none');
            this._$modalDialog.addClass("isVideo");

            this._resize(width, height);
            return this;
        }

        _isExternal(url) {
            let match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
            if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
                return true;

            if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(`:(${{
                "http:": 80,
                "https:": 443
            }[location.protocol]})?$`), "") !== location.host)
                return true;

            return false;
        }

        _error(message) {
            console.error(message);
            this._containerToUse().html(message);
            this._resize(300, 300);
            return this;
        }

        _preloadImageByIndex(startIndex, numberOfTimes) {

            if (!this._$galleryItems)
                return;

            let next = $(this._$galleryItems.get(startIndex), false)
            if (typeof next == 'undefined')
                return

            let src = next.attr('data-remote') || next.attr('href')
            if (next.attr('data-type') === 'image' || this._isImage(src))
                this._preloadImage(src, '', false)

            if (numberOfTimes > 0)
                return this._preloadImageByIndex(startIndex + 1, numberOfTimes - 1);
        }

        _preloadImage(src, altTag, $containerForImage) {

            $containerForImage = $containerForImage || false

            let img = new Image();
            let loadingTimeout = null;
            if ($containerForImage) {
                // if loading takes > 200ms show a loader
                loadingTimeout = setTimeout(() => {
                    $containerForImage.append(this._config.loadingMessage)
                }, 200);
            }

            img.onload = () => {
                if (loadingTimeout)
                    clearTimeout(loadingTimeout)
                loadingTimeout = null;
                let image = $('<img />');
                image.attr('src', img.src);
                image.attr('alt', altTag);
                image.addClass('img-fluid');

                // backward compatibility for bootstrap v3
                image.css('width', '100% !important');

                if ($containerForImage) {

                    $containerForImage.html(image);

                    if (this._$modalNavLayer) this._$modalNavLayer.css('display', '');

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

                    this._$modalDialog.css('display', this._config.verticalAlignCenter ? 'flex' : 'block');

                    this._$modalDialog.addClass("imageLoading");
                    // temporarily stretches img parent containers so image dimensions can be determined.

                    var clientWidth = 0;
                    var clientHeight = 0;

                    // this works in Firefox etc.:
                    var imageWidth = image[0].width;
                    var imageHeight = image[0].height;

                    // this works in Chrome etc.:
                    var imgWidth = img.width;
                    var imgHeight = img.height;

                    if (imageWidth > 0 && imageHeight > 0) {
                        clientWidth = imageWidth;
                        clientHeight = imageHeight;
                    }
                    else if (imgWidth > 0 && imgHeight > 0) {
                        clientWidth = imgWidth;
                        clientHeight = imgHeight;
                    }

                    this._$modalDialog.removeClass("imageLoading");
                    // remove temporary parent container stretch

                    if (clientWidth > 0 && clientHeight > 0) {
                        // we found image dimensions
                        if (this._config.debug > 1) alert(
                            "imageWidth: " + imageWidth + ", \\n" +
                            "imageHeight: " + imageHeight + ", \\n" +
                            "imgWidth: " + imgWidth + ", \\n" +
                            "imgHeight: " + imgHeight + "."
                        );
                        this._resize(clientWidth, clientHeight);
                    }
                    else {
                        // we did not find image dimensions, use stretch method
                        this._$modalDialog.addClass("imageStretched");
                        if (this._config.debug > 1) alert("imageStretched");
                    }

                    this._$modalDialog.addClass("imageLoaded");

                    this._toggleLoading(false);
                    return this._config.onContentLoaded.call(this);
                }
            };

            if ($containerForImage) {
                img.onerror = () => {
                    this._toggleLoading(false);
                    return this._error(this._config.strings.fail + `  ${src}`);
                };
            }

            img.src = src;
            return img;
        }

        _swipeGesure() {
            if (this._touchendX < this._touchstartX) {
                return this.navigateRight();
            }
            if (this._touchendX > this._touchstartX) {
                return this.navigateLeft();
            }
        }

        _resize(width, height) {

            height = height || width;

            var scalingFactor = this._calculateScaleFactor(width, height);
            width = width * scalingFactor;
            height = height * scalingFactor;

            this._wantedWidth = width;
            this._wantedHeight = height;

            if (this._config.debug > 1) alert("wanted width: " + this._wantedWidth + ", wanted height: " + this._wantedHeight);

            let imageAspecRatio = width / height;

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

            let maxWidth = Math.min(modalDialogOuterWidthExcludingMargins, this._config.doc.body.clientWidth, this._config.maxWidth)

            // if width > the available space, scale down the expected width and height

            if ((width + widthInnerSpacing) > maxWidth) {
                height = (maxWidth - widthInnerSpacing) / imageAspecRatio;
                width = maxWidth
            } else
                width = (width + widthInnerSpacing)

            let headerHeight = 0,
                footerHeight = 0

            // as the resize is performed the modal is show, the calculate might fail
            // if so, default to the default sizes
            if (this._footerIsShown)
                footerHeight = this._$modalFooter.outerHeight(true) || 55

            if (this._titleIsShown)
                headerHeight = this._$modalHeader.outerHeight(true) || 67

            let maxHeight = Math.min(height, window.innerHeight - heightOuterSpacing - headerHeight - footerHeight, this._config.maxHeight - heightInnerSpacing - headerHeight - footerHeight);

            if (height > maxHeight) {
                // if height > the available height, scale down the width
                width = Math.ceil(maxHeight * imageAspecRatio) + widthInnerSpacing;
            }

            this._$lightboxContainer.css('height', maxHeight)
            this._$modalDialog.css('flex', '1').css('maxWidth', width);

            if (this._config.debug > 0 && this._$debugInfo) {
                var message = "window width: " + $(window).width()
                    + ",\nwindow height: " + $(window).height()
                    + ",\nwindow screen width: " + window.screen.width
                    + ",\nwindow screen height: " + window.screen.height
                    + ",\nwindow inner width: " + window.innerWidth
                    + ",\nwindow inner height: " + window.innerHeight
                    + ",\n maxheight: " + maxHeight;

                this._$debugInfo.text(message);
            }

            let modal = this._$modal.data('bs.modal');
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

        static _jQueryInterface(config) {
            config = config || {}
            return this.each(() => {
                let $this = $(this)
                let _config = $.extend(
                    {},
                    Lightbox.Default,
                    $this.data(),
                    typeof config === 'object' && config
                )

                new Lightbox(this, _config)
            })
        }
    }



    $.fn[NAME] = Lightbox._jQueryInterface
    $.fn[NAME].Constructor = Lightbox
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Lightbox._jQueryInterface
    }

    return Lightbox

})(jQuery)

export default Lightbox
