/**
 * Saver module for Personality tool
 * @author  CodeX Team
 */
module.exports = function (saver) {

    'use strict';

    var ui = require('./ui');

    /**
     * Extracts data from block
     * @param  {Element} block
     * @return {Object}
     */
    saver.extractData = function (block) {

        var nameEl = block.querySelector(`.${ui.css.name}`),
            citeEl = block.querySelector(`.${ui.css.cite}`),
            urlEl  = block.querySelector(`.${ui.css.url}`),
            photo  = block.querySelector(`.${ui.css.photo} img`),
            toolData = {},
            sanitizerConfig = {
                tags : {
                    p : {},
                    a: {
                        href: true,
                        target: '_blank',
                        rel: 'nofollow'
                    },
                    i: {},
                    b: {},
                }
            },
            cite;

        cite = citeEl.innerHTML;
        cite = codex.editor.content.wrapTextWithParagraphs(cite);
        cite = codex.editor.sanitizer.clean(cite, sanitizerConfig);

        toolData.name = nameEl.value;
        toolData.cite = cite;
        toolData.url  = urlEl.value;
        toolData.photo = null;

        if (photo) {

            toolData.photo = photo.src;

        }

        return toolData;

    };

    /**
     * Validation method
     * @param  {Object} toolData - saving data that needs to check
     * @return {Boolean}         - TRUE if data is value
     */
    saver.validate = function (toolData) {

        /** Dont allow empty name */
        if (!toolData.name.trim()) {

            return false;

        }

        return true;

    };

    return saver;

}({});