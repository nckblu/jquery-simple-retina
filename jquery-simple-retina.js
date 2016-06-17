/**
 * jQuery Simple Retina, on any image that you have a retina version for simply call it with
 * a jQuery element, e.g $('header .logo img').simpleRetina()
 * suffix: suffix whatever suffix you're using for the retina version of the image eg. @2x for logo@2x.png (default @2x)
 * callback: callback the function you may want to run once the plugin has completed
 * https://github.com/nckblu
 */
(function($) {
    $.fn.simpleRetina = function(options) {
        // Extend the options object (will keep defaults if empty)
        var opts = $.extend({}, $.fn.simpleRetina.defaults, options);

        // Check to see if screen is hires
        function checkHiDpi() {
            return !!((window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI) || 1) > 1);
        }  

        if (!checkHiDpi()) 
            return this;

            // Check element has a source and is an image
            if (this.attr('src') && this.is("img")) {
                var imgSrc = this.attr('src'), // get source
                    imgExtension = imgSrc.substr(-4), // store file extension in variable
                    imgExtensionRemoved = imgSrc.slice(0, -4), // store source without file extension
                    newImgSrc = imgExtensionRemoved + opts.suffix + imgExtension;

                // If a callback is passed, call it.
                opts.callback ? opts.callback.call() : false;

                // Return the element
                return this.attr('src', newImgSrc);

            } else {
                console.error('jQuery Simple Retina: Element is not an inline image, please adjust your selector')
            }

    }

    $.fn.simpleRetina.defaults = {
        suffix: '@2x',
        callback: false
    }

}(jQuery))