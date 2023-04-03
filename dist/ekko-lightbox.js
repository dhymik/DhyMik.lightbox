/*!
 * Lightbox for Bootstrap by @ashleydw
 * https://github.com/ashleydw/lightbox
 * 
 * License: https://github.com/ashleydw/lightbox/blob/master/LICENSE
 * 
 */!function(e){var t={};function i(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=3)}([,function(e,t,i){},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();var n=function(e){var t="ekkoLightbox",i=e.fn[t],n={debug:0,title:"",footer:"",maxWidth:9999,maxHeight:9999,showArrows:!0,hideArrowsOnVideo:!1,wrapping:!0,type:null,alwaysShowClose:!1,fade:!0,verticalAlignCenter:!1,loadingMessage:'<div class="ekko-lightbox-loader"><div><div></div><div></div></div></div>',leftArrow:"<span>&#10094;</span>",rightArrow:"<span>&#10095;</span>",strings:{close:"Close",fail:"Failed to load image:",type:"Could not detect remote target type. Force the type using data-type"},doc:document,onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNavigate:function(){},onContentLoaded:function(){}},s=function(){function t(i,a){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e.extend({},n,a),this._$modalNavLayer=null,this._$modalArrows=null,this._$debugInfo=null,this._galleryIndex=0,this._galleryName=null,this._titleIsShown=!1,this._footerIsShown=!1,this._wantedWidth=0,this._wantedHeight=0,this._touchstartX=0,this._touchendX=0,this._modalId="ekkoLightbox-"+Math.floor(1e3*Math.random()+1),this._$element=i instanceof jQuery?i:e(i),this._isBootstrap3=3==e.fn.modal.Constructor.VERSION[0];var s='<h4 class="modal-title">'+(this._config.title||"&nbsp;")+"</h4>",l='<button type="button" class="close" data-dismiss="modal" aria-label="'+this._config.strings.close+'"><span aria-hidden="true">&times;</span></button>',r=this._config.fade?"fade in":"",d='<div class="modal-dialog '+(this._config.verticalAlignCenter?"modal-dialog-centered":"")+'" role="document"><div class="modal-content">'+('<div class="modal-header'+(this._config.title||this._config.alwaysShowClose?"":" hide")+'">'+(this._isBootstrap3?l+s:s+l)+"</div>")+('<div class="modal-body"><div class="ekko-lightbox-container"><div class="ekko-lightbox-item '+r+' show"></div><div class="ekko-lightbox-item fade"></div></div></div>')+('<div class="modal-footer'+(this._config.footer?"":" hide")+'">'+(this._config.footer||"&nbsp;")+"</div>")+"</div></div>";e(this._config.doc.body).append('<div id="'+this._modalId+'" class="ekko-lightbox modal fade" tabindex="-1" tabindex="-1" role="dialog" aria-hidden="true">'+d+"</div>"),this._$modal=e("#"+this._modalId,this._config.doc),this._config.debug>0&&this._$modal.append('<div class="modal-debug-info"></div>'),this._$debugInfo=this._$modal.find(".modal-debug-info").first(),this._$modalDialog=this._$modal.find(".modal-dialog").first(),this._$modalContent=this._$modal.find(".modal-content").first(),this._$modalBody=this._$modal.find(".modal-body").first(),this._$modalHeader=this._$modal.find(".modal-header").first(),this._$modalFooter=this._$modal.find(".modal-footer").first(),this._$lightboxContainer=this._$modalBody.find(".ekko-lightbox-container").first(),this._$lightboxBodyOne=this._$lightboxContainer.find("> div:first-child").first(),this._$lightboxBodyTwo=this._$lightboxContainer.find("> div:last-child").first(),this._$lightboxContainerCurrent=this._$lightboxBodyOne,this._$lightboxContainerUnUsed=this._$lightboxBodyTwo,this._galleryName=this._$element.data("gallery"),this._galleryName&&(this._$galleryItems=e(document.body).find('*[data-gallery="'+this._galleryName+'"]'),this._galleryIndex=this._$galleryItems.index(this._$element),e(document).on("keydown.ekkoLightbox",this._navigationalBinder.bind(this)),this._config.showArrows&&this._$galleryItems.length>1&&(this._$lightboxContainer.prepend('<div class="ekko-lightbox-nav-overlay"><a href="#"></a><a href="#"></a></div>'),this._$modalNavLayer=this._$lightboxContainer.find("div.ekko-lightbox-nav-overlay").first(),this._$lightboxContainer.append('<div class="ekko-lightbox-nav-arrows"><a href="#">'+this._config.leftArrow+'</a><a href="#">'+this._config.rightArrow+"</a></div>"),this._$modalArrows=this._$lightboxContainer.find("div.ekko-lightbox-nav-arrows").first(),this._$lightboxContainer.on("click","a:first-child",function(e){return e.preventDefault(),o.navigateLeft()}),this._$lightboxContainer.on("click","a:last-child",function(e){return e.preventDefault(),o.navigateRight()}),this._$modalNavLayer.find("a:first-child").hover(function(){o._$modalArrows.find("a:first-child").addClass("hover")},function(){o._$modalArrows.find("a:first-child").removeClass("hover").filter('[class=""]').removeAttr("class")}),this._$modalNavLayer.find("a:last-child").hover(function(){o._$modalArrows.find("a:last-child").addClass("hover")},function(){o._$modalArrows.find("a:last-child").removeClass("hover").filter('[class=""]').removeAttr("class")}),this.updateNavigation())),this._$modal.on("show.bs.modal",this._config.onShow.bind(this)).on("shown.bs.modal",function(){return o._toggleLoading(!0),o._handle(),o._config.onShown.call(o)}).on("hide.bs.modal",this._config.onHide.bind(this)).on("hidden.bs.modal",function(){return o._galleryName&&(e(document).off("keydown.ekkoLightbox"),e(window).off("resize.ekkoLightbox")),o._$modal.remove(),o._config.onHidden.call(o)}).modal(this._config),e(window).on("resize.ekkoLightbox",function(){o._resize(o._wantedWidth,o._wantedHeight)}),this._$lightboxContainer.on("touchstart",function(){o._touchstartX=event.changedTouches[0].screenX}).on("touchend",function(){o._touchendX=event.changedTouches[0].screenX,o._swipeGesure()})}return o(t,null,[{key:"Default",get:function(){return n}}]),o(t,[{key:"element",value:function(){return this._$element}},{key:"modal",value:function(){return this._$modal}},{key:"navigateTo",value:function(t){if(t<0||t>this._$galleryItems.length-1)return this;this._galleryIndex=t,this.updateNavigation(),this._$element=e(this._$galleryItems.get(this._galleryIndex)),this._handle()}},{key:"navigateLeft",value:function(){if(this._$galleryItems&&1!==this._$galleryItems.length){if(0===this._galleryIndex){if(!this._config.wrapping)return;this._galleryIndex=this._$galleryItems.length-1}else this._galleryIndex--;return this._config.onNavigate.call(this,"left",this._galleryIndex),this.navigateTo(this._galleryIndex)}}},{key:"navigateRight",value:function(){if(this._$galleryItems&&1!==this._$galleryItems.length){if(this._galleryIndex===this._$galleryItems.length-1){if(!this._config.wrapping)return;this._galleryIndex=0}else this._galleryIndex++;return this._config.onNavigate.call(this,"right",this._galleryIndex),this.navigateTo(this._galleryIndex)}}},{key:"updateNavigation",value:function(){if(!this._config.wrapping){var e=this._$lightboxContainer.find("div.ekko-lightbox-nav-overlay");0===this._galleryIndex?e.find("a:first-child").addClass("disabled"):e.find("a:first-child").removeClass("disabled"),this._galleryIndex===this._$galleryItems.length-1?e.find("a:last-child").addClass("disabled"):e.find("a:last-child").removeClass("disabled")}}},{key:"close",value:function(){return this._$modal.modal("hide")}},{key:"_navigationalBinder",value:function(e){return 39===(e=e||window.event).keyCode?this.navigateRight():37===e.keyCode?this.navigateLeft():void 0}},{key:"_detectRemoteType",value:function(e,t){return!(t=t||!1)&&this._isImage(e)&&(t="image"),!t&&this._getWebstreamId(e)&&(t="webstream"),!t&&this._getYoutubeId(e)&&(t="youtube"),!t&&this._getVimeoId(e)&&(t="vimeo"),!t&&this._getInstagramId(e)&&(t="instagram"),("audio"==t||"video"==t||!t&&this._isMedia(e))&&(t="media"),(!t||["image","webstream","youtube","vimeo","instagram","media","url"].indexOf(t)<0)&&(t="url"),t}},{key:"_getRemoteContentType",value:function(t){return e.ajax({type:"HEAD",url:t,async:!1}).getResponseHeader("Content-Type")}},{key:"_isImage",value:function(e){return e&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)}},{key:"_isMedia",value:function(e){return e&&e.match(/(\.(mp3|mp4|ogg|webm|wav)((\?|#).*)?$)/i)}},{key:"_switchContainers",value:function(){var e=this._$lightboxContainerUnUsed;this._$lightboxContainerUnUsed=this._$lightboxContainerCurrent,this._$lightboxContainerCurrent=e,this._$lightboxContainerCurrent.css("z-index",this._$lightboxContainerUnUsed.css("z-index")+1),this._$lightboxContainerUnUsed.css("z-index","auto"),this._$lightboxContainerCurrent.css("z-index",1),this._$lightboxContainerUnUsed.removeClass("in show"),this._$lightboxContainerCurrent.addClass("in show")}},{key:"_handle",value:function(){this._$modalDialog.removeClass("imageLoading"),this._$modalDialog.removeClass("imageLoaded"),this._$modalDialog.removeClass("imageStretched"),this._$modalDialog.removeClass("isVideo");var e=this._$lightboxContainerUnUsed;this._$modalHeader.css("opacity",0),this._$modalFooter.css("opacity",0),this._updateTitleAndFooter(),this._switchContainers();var t=this._$element.attr("data-remote")||this._$element.attr("href"),i=this._detectRemoteType(t,this._$element.attr("data-type")||!1);if(["image","webstream","youtube","vimeo","instagram","media","url"].indexOf(i)<0)return this._error(this._config.strings.type);switch(i){case"image":var a=this._$element.attr("data-alt")||"";this._preloadImage(t,a,e),this._preloadImageByIndex(this._galleryIndex,3);break;case"webstream":this._showWebstreamVideo(this._getVimeoId(t),e);break;case"youtube":this._showYoutubeVideo(t,e);break;case"vimeo":this._showVimeoVideo(this._getVimeoId(t),e);break;case"instagram":this._showInstagramVideo(this._getInstagramId(t),e);break;case"media":this._showHtml5Media(t,e);break;default:this._loadRemoteContent(t,e)}var o=this;return setTimeout(function(){o._$modalHeader.css("opacity",1),o._$modalFooter.css("opacity",1),o._$lightboxContainerUnUsed.empty()},250),this}},{key:"_getWebstreamId",value:function(e){return!!(e&&e.indexOf("webstream.eu")>0)&&e}},{key:"_getYoutubeId",value:function(e){if(!e)return!1;var t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);return!(!t||11!==t[2].length)&&t[2]}},{key:"_getVimeoId",value:function(e){return!!(e&&e.indexOf("vimeo")>0)&&e}},{key:"_getInstagramId",value:function(e){return!!(e&&e.indexOf("instagram")>0)&&e}},{key:"_toggleLoading",value:function(t){return(t=t||!1)?(this._$modalDialog.css("display","none"),this._$modal.removeClass("in show"),e(".modal-backdrop").append(this._config.loadingMessage)):(this._$modalDialog.css("display",this._config.verticalAlignCenter?"flex":"block"),this._$modal.addClass("in show"),e(".modal-backdrop").find(".ekko-lightbox-loader").remove()),this}},{key:"_calculateScaleFactor",value:function(e,t){var i=window.screen.width,a=window.screen.height,o=Math.max(e,t);return Math.max(i,a)/o}},{key:"_updateTitleAndFooter",value:function(){var e=this._$element.data("title")||"",t=this._$element.data("footer")||"";return this._titleIsShown=!1,e||this._config.alwaysShowClose?(this._titleIsShown=!0,this._$modalHeader.css("display","").find(".modal-title").html(e||"&nbsp;"),this._$modalDialog.addClass("headerIsShown")):(this._$modalHeader.css("display","none"),this._$modalDialog.removeClass("headerIsShown")),this._footerIsShown=!1,t?(this._footerIsShown=!0,this._$modalFooter.css("display","").html(t),this._$modalDialog.addClass("footerIsShown")):(this._$modalFooter.css("display","none"),this._$modalDialog.removeClass("footerIsShown")),this}},{key:"_showWebstreamVideo",value:function(e,t){var i=this._$element.data("width")||500,a=this._$element.data("height")||i/(560/315);return this._showVideoIframe(e+"/embed"+(e.includes("?")?"&":"?")+"autoplay=1",i,a,t)}},{key:"_showYoutubeVideo",value:function(e,t){var i=this._getYoutubeId(e),a=e.indexOf("&")>0?e.substr(e.indexOf("&")):"",o=this._$element.data("width")||560,n=this._$element.data("height")||o/(560/315);return this._showVideoIframe("//www.youtube.com/embed/"+i+"?badge=0&autoplay=1&html5=1"+a,o,n,t)}},{key:"_showVimeoVideo",value:function(e,t){var i=this._$element.data("width")||500,a=this._$element.data("height")||i/(560/315);return this._showVideoIframe(e+(e.includes("?")?"&":"?")+"autoplay=1",i,a,t)}},{key:"_showInstagramVideo",value:function(e,t){var i=this._$element.data("width")||612,a=i+80;return e="/"!==e.substr(-1)?e+"/":e,t.html('<iframe width="'+i+'" height="'+a+'" src="'+e+'embed/" frameborder="0" allowfullscreen></iframe>'),this._resize(i,a),this._config.onContentLoaded.call(this),this._$modalNavLayer&&this._$modalNavLayer.css("display",this._config.hideArrowsOnVideo?"none":""),this._$modalDialog.addClass("isVideo"),this._toggleLoading(!1),this}},{key:"_showVideoIframe",value:function(e,t,i,a){i=i||t;var o=this._calculateScaleFactor(t,i);return t*=o,i*=o,a.html('<div class="embed-responsive embed-responsive-16by9"><iframe width="'+t+'" height="'+i+'" src="'+e+'" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen class="embed-responsive-item"></iframe></div>'),this._resize(t,i),this._config.onContentLoaded.call(this),this._$modalNavLayer&&this._$modalNavLayer.css("display",this._config.hideArrowsOnVideo?"none":""),this._$modalDialog.addClass("isVideo"),this._toggleLoading(!1),this}},{key:"_showHtml5Media",value:function(e,t){var i=this._getRemoteContentType(e);if(!i)return this._error(this._config.strings.type);var a="";a=i.indexOf("audio")>0?"audio":"video";var o=this._$element.data("width")||560,n=this._$element.data("height")||o/(560/315),s=this._calculateScaleFactor(o,n);return o*=s,n*=s,t.html('<div class="embed-responsive embed-responsive-16by9"><'+a+' width="'+o+'" height="'+n+'" preload="auto" autoplay controls class="embed-responsive-item"><source src="'+e+'" type="'+i+'">'+this._config.strings.type+"</"+a+"></div>"),this._resize(o,n),this._config.onContentLoaded.call(this),this._$modalNavLayer&&this._$modalNavLayer.css("display",this._config.hideArrowsOnVideo?"none":""),this._$modalDialog.addClass("isVideo"),this._toggleLoading(!1),this}},{key:"_loadRemoteContent",value:function(t,i){var a=this,o=this._$element.data("width")||560,n=this._$element.data("height")||560,s=this._$element.data("disableExternalCheck")||!1;this._toggleLoading(!1);var l=this._calculateScaleFactor(o,n);return o*=l,n*=l,s||this._isExternal(t)?(i.html('<iframe src="'+t+'" frameborder="0" allowfullscreen></iframe>'),this._config.onContentLoaded.call(this)):i.load(t,e.proxy(function(){return a._$element.trigger("loaded.bs.modal")})),this._$modalNavLayer&&this._$modalNavLayer.css("display",this._config.hideArrowsOnVideo?"none":""),this._$modalDialog.addClass("isVideo"),this._resize(o,n),this}},{key:"_isExternal",value:function(e){var t=e.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof t[1]&&t[1].length>0&&t[1].toLowerCase()!==location.protocol||"string"==typeof t[2]&&t[2].length>0&&t[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"")!==location.host}},{key:"_error",value:function(e){return console.error(e),this._$lightboxContainerCurrent.html(e),this._resize(300,300),this}},{key:"_preloadImageByIndex",value:function(t,i){if(this._$galleryItems){var a=e(this._$galleryItems.get(t),!1);if(void 0!==a){var o=a.attr("data-remote")||a.attr("href");return("image"===a.attr("data-type")||this._isImage(o))&&this._preloadImage(o,"",!1),i>0?this._preloadImageByIndex(t+1,i-1):void 0}}}},{key:"_preloadImage",value:function(t,i,a){var o=this;a=a||!1;var n=new Image,s=null;return a&&(s=setTimeout(function(){a.append(o._config.loadingMessage)},200)),n.onload=function(){if(a){s&&clearTimeout(s),s=null;var t=e("<img />");if(t.attr("src",n.src),t.attr("alt",i),t.addClass("img-fluid"),t.css("width","100% !important"),o._$element[0].hasAttribute("data-markup")){var l=o._$element.attr("data-markup");a.html(l)}else a.html(t);o._$modalNavLayer&&o._$modalNavLayer.css("display",""),o._$modalDialog.css("display",o._config.verticalAlignCenter?"flex":"block"),o._$modalDialog.addClass("imageLoading");var r=0,d=0,h=a.find("img")[0].width,g=a.find("img")[0].height,c=n.width,_=n.height;return h>0&&g>0?(r=h,d=g):c>0&&_>0&&(r=c,d=_),o._$modalDialog.removeClass("imageLoading"),r>0&&d>0?(o._config.debug>1&&alert("imageWidth: "+h+", \\nimageHeight: "+g+", \\nimgWidth: "+c+", \\nimgHeight: "+_+"."),o._resize(r,d)):(o._$modalDialog.addClass("imageStretched"),o._config.debug>1&&alert("imageStretched"),window.console&&console.log("ekko lightbox: using 'imageStretched' mode for "+n.src)),o._$modalDialog.addClass("imageLoaded"),o._toggleLoading(!1),o._config.onContentLoaded.call(o)}},a&&(n.onerror=function(){return o._toggleLoading(!1),o._error(o._config.strings.fail+"  "+t)}),n.src=t,n}},{key:"_swipeGesure",value:function(){return this._touchendX<this._touchstartX?this.navigateRight():this._touchendX>this._touchstartX?this.navigateLeft():void 0}},{key:"_resize",value:function(t,i){i=i||t;var a=this._calculateScaleFactor(t,i);t*=a,i*=a,this._wantedWidth=t,this._wantedHeight=i,this._config.debug>1&&alert("wanted width: "+this._wantedWidth+", wanted height: "+this._wantedHeight);var o=t/i;this._$modalDialog.addClass("imageLoading");var n=this._$modalDialog.outerWidth(!1),s=this._$lightboxContainer.innerWidth(),l=this._$modalDialog.outerHeight(!1),r=this._$modalDialog.outerHeight(!0),d=this._$lightboxContainer.innerHeight();this._$modalDialog.removeClass("imageLoading");var h=n-s,g=l-d,c=r-d,_=Math.min(n,this._config.doc.body.clientWidth,this._config.maxWidth);t+h>_?(i=(_-h)/o,t=_):t+=h;var m=0,u=0;this._footerIsShown&&(u=this._$modalFooter.outerHeight(!0)||55),this._titleIsShown&&(m=this._$modalHeader.outerHeight(!0)||67);var f=Math.min(i,window.innerHeight-c-m-u,this._config.maxHeight-g-m-u);if(i>f&&(t=Math.ceil(f*o)+h),this._$lightboxContainer.css("height",f),this._$modalDialog.css("flex","1").css("maxWidth",t),this._config.debug>0&&this._$debugInfo){var v="window width: "+e(window).width()+",\nwindow height: "+e(window).height()+",\nwindow screen width: "+window.screen.width+",\nwindow screen height: "+window.screen.height+",\nwindow inner width: "+window.innerWidth+",\nwindow inner height: "+window.innerHeight+",\n maxheight: "+f;this._$debugInfo.text(v)}var y=this._$modal.data("bs.modal");if(y)try{y._handleUpdate()}catch(e){y.handleUpdate()}return this}}],[{key:"_jQueryInterface",value:function(i){var o=this;return i=i||{},this.each(function(){var n=e(o),s=e.extend({},t.Default,n.data(),"object"===(void 0===i?"undefined":a(i))&&i);new t(o,s)})}}]),t}();return e.fn[t]=s._jQueryInterface,e.fn[t].Constructor=s,e.fn[t].noConflict=function(){return e.fn[t]=i,s._jQueryInterface},s}(jQuery);t.default=n},function(e,t,i){i(2),e.exports=i(1)}]);
//# sourceMappingURL=ekko-lightbox.js.map