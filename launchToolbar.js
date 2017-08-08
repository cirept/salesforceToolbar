/* global jQuery, window, setTimeout, GM_setClipboard, GM_openInTab, GM_setValue, GM_getValue, GM_info, setInterval, clearInterval, document, GM_getResourceURL, GM_listValues */
// Tampermonkey functions

function openInTab(url) {
    'use strict';
    GM_openInTab(url); // eslint-disable-line new-cap
}

function setValue(variable, val) {
    'use strict';
    GM_setValue(variable, val); // eslint-disable-line new-cap
}

function getValue(variable) {
    'use strict';
    return GM_getValue(variable, 'false'); // eslint-disable-line new-cap
}

function getResourceURL(resource) {
    'use strict';
    return GM_getResourceURL(resource); // eslint-disable-line new-cap
}

function programVariables() {
    'use strict';
    return GM_listValues(); // eslint-disable-line new-cap
}

(function () {
    'use strict';
    var launchToolbar = {
        'init': function () {
            this.createElements();
            this.cacheDOM();
            // test element
            this.buildEmailTargets();
            this.buildLogTargets();
            //            this.getEmail();
            this.buildWSMlink();
            this.buildFolderPath();
            this.openAccountInfoPage();
            this.bindEvents();
            this.addStyles();
            this.buildSettings();
            this.buildTool();
            this.attachTool();
            this.turnSettingsOn();
            this.switchPlatform();
            this.startTool();
            this.bacTable();
        },
        'createElements': function () {
            launchToolbar.config = {
                '$placeholder': jQuery('<div>').css({
                    'height': '50px',
                    'display': 'none',
                }).attr({
                    'id': 'ph',
                }),
                '$uiBox': jQuery('<div>').attr({
                    'id': 'uiBox',
                }).css({
                    'position': 'fixed',
                    'display': 'none',
                    'z-index': '9999',
                    'background': 'linear-gradient(to right, rgb(178, 254, 250), rgb(14, 210, 200))',
                    'color': '#000',
                    'text-align': 'center',
                    'font-size': '11px',
                    'width': '99%',
                    'font-weight': '700',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    'border': '1px #000 solid',
                    'padding': '7px 0px',
                    'font-family': '"Raleway", sans-serif',
                }),
                '$settingContainer': jQuery('<div>').css({
                    'height': '40px',
                    'display': 'none',
                    'position': 'fixed',
                    'background': 'linear-gradient(to right, #b2fefa, #0ed2f7)',
                    'border': '1px #000 solid',
                    'top': '40px',
                    'z-index': 500,
                    'width': '99%',
                }).attr({
                    'id': 'sc',
                }),
                '$toggleOn': jQuery('<div>').attr({
                    'id': 'toggleOn',
                    'class': 'funcButtons imp',
                }).css({
                    'line-height': '15px',
                }).html('<b>Launch</b> <i class="fa fa-angle-right fa-lg">&nbsp;</i><br> v: ' + GM_info.script.version), // eslint-disable-line camelcase
                '$toolbarStyles': jQuery('<style>').attr({
                    'id': 'qa_toolbox',
                    'type': 'text/css',
                }),
                '$fontLink': jQuery('<link>').attr({
                    'id': 'googFont',
                    'rel': 'stylesheet',
                    'href': getResourceURL('googFont'),
                }),
                '$jQueryUI': jQuery('<link>').attr({
                    'id': 'jqueryUI',
                    'rel': 'stylesheet',
                    'href': getResourceURL('jqueryUI'),
                }),
                '$fontAwe': jQuery('<script>').attr({
                    'id': 'fontAwe',
                    'type': 'text/javascript',
                    'src': getResourceURL('fontAwe'),
                }),
                '$accountName': jQuery('<div>').attr({
                    'class': 'accountName funcButtons imp click-able',
                    'title': 'Copy Account Name',
                }).css({
                    'padding': '3px 15px 0',
                    'color': 'rgb(110, 55, 215)',
                    'padding-top': '0px',
                }).html('<div class="myTitle">Account</div>'),
                '$EditLink': jQuery('<div>').attr({
                    'class': 'WSMedit funcButtons myClass click-able',
                    'title': 'Copy WSM Link',
                }).css({
                    'float': 'right',
                }).text('Copy WSM Link'),
                '$webIDtext': jQuery('<div>').attr({
                    'class': 'webIDtext funcButtons imp click-able',
                    'title': 'Copy WebID Text',
                }).css({
                    'color': 'rgb(180, 120, 120)',
                }).html('<div class="myTitle">WebID Text</div>'),
                '$launchID': jQuery('<div>').attr({
                    'class': 'launchID funcButtons imp click-able',
                    'title': 'Copy Launch ID',
                }).css({
                    'color': 'rgb(255, 0, 0)',
                }).html('<div class="myTitle">Launch ID</div>'),
                '$idCombo': jQuery('<div>').attr({
                    'title': 'Copy WebID and Launch',
                    'class': 'funcButtons myClass idCombo click-able',
                }).css({
                    'float': 'right',
                }),
                '$plusIcon': jQuery('<i>').attr({
                    'class': 'fa fa-plus fa-lg myClass click-able',
                    'aira-hidden': 'true',
                }).css({
                    'float': 'right',
                }),
                '$copyWebID': jQuery('<div>').attr({
                    'title': 'Copy WebID',
                    'class': 'copyWebid funcButtons imp click-able',
                }).css({
                    'color': 'rgb(255, 20, 155)',
                }).html('<div class="myTitle">Web ID</div>'),
                '$webnum': jQuery('<div>').attr({
                    'title': 'Copy Webnum',
                    'class': 'copyWebnum funcButtons imp click-able',
                }).css({
                    'color': 'rgb(219, 112, 147)',
                }).html('<div class="myTitle">Webnum</div>'),
                '$proofDate': jQuery('<div>').attr({
                    'title': 'Proof Date',
                    'class': 'funcButtons imp',
                }).css({
                    'color': 'rgb(0, 100, 0)',
                }).html('<div class="myTitle">Proof Date</div>'),
                '$launchDate': jQuery('<div>').attr({
                    'title': 'Launch Date',
                    'class': 'funcButtons imp',
                }).css({
                    'color': 'rgb(165, 115, 50)',
                }).html('<div class="myTitle">Launch Date</div>'),
                '$wipSite': jQuery('<a>').attr({
                    'target': '_new',
                    'class': 'wipSite funcButtons click-able myClass',
                    'title': 'View WIP Site - RIGHT CLICK TO COPY URL',
                }).css({
                    'float': 'right',
                }).text('WIP'),
                '$proofSite': jQuery('<a>').attr({
                    'target': '_new',
                    'class': 'proofSite funcButtons click-able myClass',
                    'title': 'View PROOF Site - RIGHT CLICK TO COPY URL',
                }).css({
                    'float': 'right',
                }).text('PROOF'),
                '$liveSite': jQuery('<a>').attr({
                    'target': '_new',
                    'class': 'liveSite funcButtons click-able myClass',
                    'title': 'View LIVE Site - RIGHT CLICK TO COPY URL',
                }).css({
                    'float': 'right',
                }).text('LIVE'),
                '$copyFolderPath': jQuery('<div>').attr({
                    'class': 'funcButtons copyFolderPath click-able',
                    'title': 'Project Folder Location in Manu Folder',
                }).css({
                    'float': 'right',
                    'display': 'none',
                }),
                '$folderImage': jQuery('<i>').attr({
                    'class': 'fa fa-folder-open fa-lg myClass',
                }),
                '$importantInfo': jQuery('<div>').attr({
                    'id': 'importantInfo',
                }),
                '$BACinfo': jQuery('<div>').attr({
                    'class': 'BACinfo funcButtons imp click-able',
                }).html('<div class="myTitle BACinfo">Dealer Code/BAC</div>'),
                '$clickMe': jQuery('<div>').attr({
                    'class': 'BACinfo',
                }).text('Content Loading').css({
                    'color': 'rgb(255, 0, 255)',
                }),
                '$accountNum': jQuery('<div>').attr({
                    'class': 'accountNum funcButtons imp click-able',
                }).html('<div class="myTitle accountNum">Acc. Number</div>'),
                '$clickMe2': jQuery('<div>').attr({
                    'class': 'BACinfo',
                }).text('Content Loading'),
                '$bacTable': jQuery('<div>').attr({
                    'class': 'dealerCodeInfo',
                }).css({
                    'display': 'none',
                    'position': 'absolute',
                    'margin-top': '38px',
                    'background': 'rgb(255, 255, 255)',
                    'border': '1px solid rgb(0, 0, 0)',
                }),
                '$dynoDisplay': jQuery('<div>').attr({
                    'id': 'dynoDisplay',
                }).css({
                    'position': 'absolute',
                    'left': '35%',
                    'background': 'purple',
                    'padding': '5px 20px',
                    'top': '100%',
                    'display': 'none',
                    'color': 'white',
                }),
                '$platformToggle': jQuery('<div>').attr({
                    'class': 'funcButtons platformSelector click-able',
                    'title': 'Sets the platform that these --> links lead too',
                }).addClass('myClass').css({
                    'float': 'right',
                    'display': 'none',
                }),
                '$toggleLabel': jQuery('<div>').css({
                    'display': 'inline-block',
                }),
                '$arrowIcon': jQuery('<i>').attr({
                    'class': 'fa fa-angle-double-right fa-lg myClass',
                    'style': 'vertical-align: -1px; margin: 0px 0px 0px 5px;',
                }),
                // toolbox version
                '$version': jQuery('<span>').text('version: ' + GM_info.script.version), // eslint-disable-line camelcase
                // email launch owner
                '$emailTargetsPanel': jQuery('<div>').attr({
                    'id': 'emailTargets',
                    'class': 'click-able',
                    'tabindex': '1',
                }).css({
                    'display': 'none',
                    'position': 'absolute',
                    'background': 'linear-gradient(to right, rgb(178, 254, 250), rgb(14, 210, 200))',
                    'margin-top': '38px',
                    'margin-left': '1305px',
                    'padding': '0px 10px',
                    'border-left': '1px solid rgb(0, 0, 0)',
                    'border-bottom': '1px solid rgb(0, 0, 0)',
                    'border-right': '1px solid rgb(0, 0, 0)',
                }),
                // logs
                '$logTargetsPanel': jQuery('<div>').attr({
                    'id': 'logTargets',
                    'class': 'click-able',
                    'tabindex': '2',
                }).css({
                    'display': 'none',
                    'position': 'absolute',
                    'background': 'linear-gradient(to right, rgb(178, 254, 250), rgb(14, 210, 200))',
                    'margin-top': '38px',
                    'margin-left': '1305px',
                    'padding': '0px 10px',
                    'border-left': '1px solid rgb(0, 0, 0)',
                    'border-bottom': '1px solid rgb(0, 0, 0)',
                    'border-right': '1px solid rgb(0, 0, 0)',
                }),
                '$salesforceEmailOwner': jQuery('<div>').attr({
                    'title': 'Email Owner',
                    'class': 'funcButtons myClass click-able',
                }).css({
                    'float': 'right',
                }),
                '$salesforceEmailOwnerConfirm': jQuery('<button>').css({
                    'height': '30px',
                    'width': '100%',
                }).text('Send Email'),
                '$salesforceEmailIcon': jQuery('<i>').attr({
                    'class': 'fa fa-envelope-o fa-lg myClass',
                }),
                '$howToGuide': jQuery('<a>').attr({
                    'title': 'Info About Tool',
                    'class': 'funcButtons myClass click-able',
                    'target': '_blank',
                    'href': 'https://cirept.github.io/salesforceToolbar/',
                }).css({
                    'float': 'right',
                }),
                '$howToIcon': jQuery('<i>').attr({
                    'class': 'fa fa-question-circle-o fa-lg myClass',
                }),
                // ---------------------------------------- log call or chat
                '$logActivity': jQuery('<div>').attr({
                    'title': 'Log Chat',
                    'class': 'funcButtons myClass click-able',
                }).css({
                    'float': 'right',
                }),
                '$logActivityIcon': jQuery('<i>').attr({
                    'class': 'fa fa-edit fa-lg myClass',
                }),
                // ---------------------------------------- settings
                '$settings': jQuery('<div>').attr({
                    'title': 'Settings',
                    'class': 'funcButtons myClass click-able',
                }).css({
                    'float': 'right',
                }),
                '$settingsIcon': jQuery('<i>').attr({
                    'class': 'fa fa-cogs fa-lg myClass',
                }),
                '$container': jQuery('<div>').attr({
                    'class': 'funcButtons click-able',
                }).css({
                    'line-height': '50px',
                    'height': '40px',
                    'float': 'left',
                    '-moz-user-select': 'none',
                    /* Firefox */
                    '-ms-user-select': 'none',
                    /* Internet Explorer/Edge */
                    'user-select': 'none',
                    /* Non-prefixed version, currently supported by Chrome and Opera */
                }),
                '$settingCheckboxIcon': jQuery('<i>').attr({
                    'class': 'fa fa-square fa-lg myClass',
                }).css({
                    'padding': '5px',
                }),
                '$settingInput': jQuery('<input>').attr({
                    'class': 'settings',
                }).css({
                    'width': '100px',
                    'margin': '0px 10px',
                }),
                '$myButt': jQuery('<button>').attr({
                    'type': 'button',
                    'class': 'myButton',
                }),
            };
        },
        'cacheDOM': function () {
            // launch stuff
            this.$launchID = jQuery('#Name_ileinner');
            this.launchID = this.$launchID.text(); // launch ID
            this.$webID = jQuery('#CF00N40000002aUF9_ileinner a');
            this.webID = this.$webID.text(); // web id
            this.launchSFID = window.location.pathname;
            this.comboID = this.launchID + ' ' + this.webID; // combo id
            this.$account = jQuery('#CF00N40000002aUDp_ileinner a');
            this.accountInfo = this.$account.attr('href'); // account info
            this.accountName = this.$account.text(); // acount name
            this.accountID = this.accountInfo.slice(1); // account id
            this.$webIDtext = jQuery('#00N40000002aUF8_ileinner');
            this.webIDtext = this.$webIDtext.text(); // webid text
            this.$webnum = jQuery('#00N40000002cgmd_ileinner');
            this.webnum = this.$webnum.text(); // webnum
            this.$proofDate = jQuery('#00N330000038W91_ileinner');
            this.proofDateText = this.$proofDate.text(); // proof date
            this.$launchDate = jQuery('#00N33000002yrbp_ileinner');
            this.launchDateText = this.$launchDate.text(); // launch date
            this.$productType = jQuery('#00N40000002aUEy_ileinner');
            this.productTypeText = this.$productType.text(); // launch date
            this.$dealerCode = jQuery('#00N40000002cglV_ileinner');
            this.dealerCodeText = this.$productType.text(); // launch date
            this.$builder = jQuery('#CF00N40000002aUE2_ileinner'); // builder
            this.$body = jQuery('body'); // target body tag
            this.$head = jQuery('head'); // target head tag
            this.platformSelector = getValue('platformSelector'); // platform selector
            this.$launchOwner = jQuery('#Owner_ileinner a[id*="Owner"]').attr({
                'class': 'launchOwner',
            });
            // Launch owner hover info
            this.launchMouseover = this.$launchOwner.attr('onmouseover');
            this.launchOwnerID = this.$launchOwner.attr('href').slice(1); // launch owner ID
            this.launchOwnerText = this.$launchOwner.text(); // launch owner
            // launch quick links
            this.$quickLinks = jQuery('.listHoverLinks');
            jQuery('#00N40000002aUEt_ileinner, #00N40000002aUDx_ileinner').css({
                'width': '565px',
                'overflow': 'auto',
                'word-wrap': 'break-word',
            });
            // Designer
            this.designer = jQuery('#CF00N40000002aUE2_ileinner a');
            this.designerName = this.designer.text();
            //            this.designerSummaryURL = this.designer.attr('onfocus');
            //            var start = this.designerSummaryURL.indexOf('(');
            //            var end = this.designerSummaryURL.indexOf(')');
            //            this.designerSummaryURL = this.designerSummaryURL.slice(start + 1, end);
            //            var arr = this.designerSummaryURL.replace(/[\s']/g, '');
            // slice at , then take the 2nd
            //            console.log(arr.slice(','));
            // pre-designer
            this.preDesign = jQuery('#CF00N330000038wsz_ileinner a');
            this.preDesignName = this.preDesign.text();
            this.preDesignInfo = this.preDesign.attr('on');
            //                        console.log(this.preDesign);
            // qa designer
            this.qaDesigner = jQuery('#CF00N40000002cgmH_ileinner a');
            this.qaDesignerName = this.qaDesigner.text();
            //                        console.log(this.qaDesigner);
            this.userName = unsafeWindow.UserContext.userName;
            //            console.log(unsafeWindow.UserContext.userName);
        },
        'buildEmailTargets': function () {
            var self = this;

            function removeSelectedTarget(currentTarget) {
                jQuery(currentTarget).siblings('.selectedTarget').removeClass('selectedTarget');
            }

            function updateAction(currentTarget) {
                if (currentTarget.className.indexOf('ic') > -1) {
                    self.getEmail(self.$launchOwner.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('designer') > -1) {
                    self.getEmail(self.designer.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('preDesign') > -1) {
                    self.getEmail(self.preDesign.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('qaDesigner') > -1) {
                    self.getEmail(self.qaDesigner.attr('onmouseover'));
                }
            }

            function selectItem(currentTarget) {
                removeSelectedTarget(currentTarget);
                jQuery(currentTarget).addClass('selectedTarget');
                updateAction(currentTarget);
            }

            launchToolbar.config.$emailTargetsPanel.on('click', function () {
                selectItem(event.target);
            });

            launchToolbar.config.$emailTargetsPanel
                .append(jQuery('<div class="myClass ic">IC: ' + this.launchOwnerText + '</div>'))
                .append(jQuery('<div class="myClass designer">WDS: ' + this.designerName + '</div>'))
                .append(jQuery('<div class="myClass preDesign">PD: ' + this.preDesignName + '</div>'))
                .append(jQuery('<div class="myClass qaDesigner">QA: ' + this.qaDesignerName + '</div>'));

            launchToolbar.config.$emailTargetsPanel.children().each(function (index, elem) {
                // hides element if it is the user
                elem.innerHTML.indexOf(self.extractNameFromEmail(self.userName, true)) > -1 ? jQuery(elem).hide() : jQuery(elem).show();
            });
        },
        /**
         * Will extract the name out of a CDK email
         * emailAddress will contain the email that will have the name extracted from
         * bool will determine if the first letter of the names will be capitalized, optional
         */
        'extractNameFromEmail': function (emailAddress, bool) {
            //            var ownerName;
            var wordArr;
            bool = bool ? bool : false;

            return emailAddress.split('@')[0].split('.').map((word) => {
                wordArr = word.split('');
                wordArr[0] = bool ? wordArr[0].toUpperCase() : wordArr[0];
                return wordArr.join('');
            }).join(' ');
        },
        'buildLogTargets': function () {
            var self = this;

            function removeSelectedTarget(currentTarget) {
                jQuery(currentTarget).siblings('.selectedTarget').removeClass('selectedTarget');
            }

            function updateAction(currentTarget) {
                if (currentTarget.className.indexOf('ic') > -1) {
                    self.activityLog(self.$launchOwner.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('designer') > -1) {
                    self.activityLog(self.designer.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('preDesign') > -1) {
                    self.activityLog(self.preDesign.attr('onmouseover'));
                } else if (currentTarget.className.indexOf('qaDesigner') > -1) {
                    self.activityLog(self.qaDesigner.attr('onmouseover'));
                }
            }

            function selectItem(currentTarget) {
                removeSelectedTarget(currentTarget);
                jQuery(currentTarget).addClass('selectedTarget');
                updateAction(currentTarget);
            }

            launchToolbar.config.$logTargetsPanel.on('click', function () {
                selectItem(event.target);
            });

            launchToolbar.config.$logTargetsPanel
                .append(jQuery('<div class="myClass ic">IC: ' + this.launchOwnerText + '</div>'))
                .append(jQuery('<div class="myClass designer">WDS: ' + this.designerName + '</div>'))
                .append(jQuery('<div class="myClass preDesign">PD: ' + this.preDesignName + '</div>'))
                .append(jQuery('<div class="myClass qaDesigner">QA: ' + this.qaDesignerName + '</div>'));

            launchToolbar.config.$logTargetsPanel.children().each(function (index, elem) {
                // hides element if it is the user
                elem.innerHTML.indexOf(self.extractNameFromEmail(self.userName, true)) > -1 ? jQuery(elem).hide() : jQuery(elem).show();
            });
        },
        'getEmail': function (emailTarget) {
            var ajaxRequestURL = emailTarget.split("'")[3]; // eslint-disable-line quotes
            var self = this;
            var retURL = this.launchSFID;
            var emailAddress;
            var trList;
            var id;
            var emailLink;
            var newEmailLink; // can be re-written to loop through array to find info.

            jQuery.ajax({
                'url': ajaxRequestURL,
                'context': document.body,
                'success': function (data) {
                    trList = jQuery('<div>').html(data).find('.detailList').find('tr');
                    emailAddress = jQuery(trList[1]).find('a').text();

                    // build email link URL
                    id = self.launchSFID.slice(1) + '_RelatedHistoryList';
                    emailLink = jQuery('#' + id).find('input[value="Send an Email"]').attr('onclick').split("'")[1]; // eslint-disable-line quotes
                    newEmailLink = emailLink.slice(1, emailLink.indexOf('&retURL='));

                    launchToolbar.config.$salesforceEmailOwner.attr({
                        'onclick': window.location.href = encodeURI(newEmailLink + '&p24=' + emailAddress + '&p4=' + 'Jennifer.Walker@cdk.com;Erika.Myrick@cdk.com' + '&p6=' + self.comboID + '&retURL=' + retURL),
                    });
                },
            });
        },
        'activityLog': function (emailTarget) {
            var ajaxRequestURL = emailTarget.split("'")[3]; // eslint-disable-line quotes
            var self = this;
            var retURL = this.launchSFID;
            var emailAddress;
            var logID;
            var logURL;
            var newLogURL;
            var ownerName;
            var trList;

            jQuery.ajax({
                'url': ajaxRequestURL,
                'context': document.body,
                'success': function (data) {
                    trList = jQuery('<div>').html(data).find('.detailList').find('tr');
                    emailAddress = jQuery(trList[1]).find('a').text();

                    // build log activity URL
                    logID = self.launchSFID.replace('/', '#') + '_RelatedHistoryList';
                    logURL = jQuery(logID).find('input[value="Log a Call"]').attr('onclick').split("'")[1]; // eslint-disable-line quotes
                    newLogURL = logURL.slice(1, logURL.indexOf('&retURL='));

                    // 1. cut out name from email address
                    // 2. split name into two parts
                    // 3. capitalize the first letter of each name
                    // 4. combine into full name
                    ownerName = emailAddress.split('@')[0].split('.').map((word) => {
                        var wordArr = word.split('');
                        wordArr[0] = wordArr[0].toUpperCase();
                        return wordArr.join('');
                    }).join(' ');

                    launchToolbar.config.$logActivity.attr({
                        'onclick': window.location.href = encodeURI(newLogURL + '&tsk2=' + ownerName + '&retURL=' + retURL),
                    });

                },
            });
        },
        'buildWSMlink': function () {
            var base = 'http://websites.cobalt.com/wsm/index.do?webId=';
            var wsmLink = '';

            if (this.webID.search('gmcl') !== -1) {
                if (this.webID.search('-fr') !== -1) {
                    wsmLink = base + this.webID + '&locale=fr_CA';
                } else {
                    wsmLink = base + this.webID + '&locale=en_CA';
                }
            } else if (this.webID.search('holden') !== -1) {
                if (this.webID.search('holdennz') !== -1) {
                    wsmLink = base + this.webID + '&locale=en_NZ';
                } else {
                    wsmLink = base + this.webID + '&locale=en_AU';
                }
            } else {
                wsmLink = base + this.webID + '&locale=en_US';
            }

            launchToolbar.config.$EditLink.attr({
                'data-link': wsmLink,
            });
        },
        'buildFolderPath': function () {
            var platformSelector = this.platformSelector ? '&nextGen=true' : '&nextgen=false';
            var nitra = 'http://nitra.';
            var wip = 'wip.';
            var proof = 'proof.';
            var reload = '/?reload=true';
            var baseManuLoc = '\\\\las-mgmt1.lasisi01a.las.san.dsghost.net\\Associate\\sea\\CS\\graphics\\manufacturers\\';
            var oem = this.webID.split('-')[0];
            var id = this.webID.substr(this.webID.indexOf('-') + 1);
            var oemPart;

            switch (oem) {
                case 'gmps':
                    oemPart = 'gmpsdealer.com/';
                    break;
                case 'gmcl':
                    oemPart = 'gmcldealer.com/';
                    break;
                case 'vw':
                    oemPart = 'vwcdkdealer.com/';
                    break;
                case 'hyun':
                    oemPart = 'hyundaistores.com/';
                    break;
                case 'mazda':
                    oemPart = 'mazdadealer.com/';
                    break;
                case 'lex':
                    oemPart = 'lexusdealer.com/';
                    oem = 'lexus';
                    break;
                case 'k1ia':
                    oemPart = 'k1iadealer.com/';
                    break;
                case 'b2mw':
                    oemPart = 'b2mwdealer.com/';
                    break;
                case 'mini':
                    oemPart = 'mini-dealer.com/';
                    break;
                case 'motp':
                    oemPart = 'motorplace.com/';
                    oem = 'motorplace';
                    break;
                case 'hond':
                    oemPart = 'hondadealer.com/';
                    oem = 'honda';
                    break;
                case 'holden':
                    oemPart = 'gmholdendealer.com.au/';
                    break;
                case 'holdennz':
                    oemPart = 'gmholdendealer.co.nz/';
                    break;
                case 'nissan':
                    oemPart = 'nissandealer.com/';
                    break;
                case 'toyd':
                    oemPart = 'toyotadealer.com/';
                    oem = 'toyota';
                    break;
                case 'infiniti':
                    oemPart = 'infinitidealer.com/';
                    break;
                default:
                    // console.log('OEM NOT FOUND, please add OEM to code : ' + oem);
            }

            launchToolbar.config.folderPath = baseManuLoc + oem + '\\' + id.charAt(0) + '\\' + id;

            launchToolbar.config.$wipSite.attr({
                'href': nitra + wip + oemPart + id + reload + platformSelector,
            });
            launchToolbar.config.$proofSite.attr({
                'href': nitra + proof + oemPart + id + reload + platformSelector,
            });
            launchToolbar.config.$liveSite.attr({
                'href': nitra + oemPart + id + reload + platformSelector,
            });
        },
        'openAccountInfoPage': function () {
            var host = window.location.hostname;
            var protocol = window.location.protocol;
            var openThis = protocol + '//' + host + '' + this.accountInfo;
            openInTab(openThis);
        },
        'bindEvents': function () {
            launchToolbar.config.$idCombo.on('click', this.doWork.bind(this));
            launchToolbar.config.$launchID.on('click', this.doWork.bind(this));
            launchToolbar.config.$copyWebID.on('click', this.doWork.bind(this));
            launchToolbar.config.$accountName.on('click', this.doWork.bind(this));
            launchToolbar.config.$copyFolderPath.on('click', this.doWork.bind(this));
            launchToolbar.config.$webIDtext.on('click', this.doWork.bind(this));
            launchToolbar.config.$webnum.on('click', this.doWork.bind(this));
            launchToolbar.config.$wipSite.on('mousedown', this.doWork.bind(this));
            launchToolbar.config.$wipSite.bind('contextmenu', function () {
                return false;
            });
            launchToolbar.config.$proofSite.on('mousedown', this.doWork.bind(this));
            launchToolbar.config.$proofSite.bind('contextmenu', function () {
                return false;
            });
            launchToolbar.config.$liveSite.on('mousedown', this.doWork.bind(this));
            launchToolbar.config.$liveSite.bind('contextmenu', function () {
                return false;
            });
            this.$launchOwner.on('mousedown', this.doWork.bind(this));
            this.$launchOwner.bind('contextmenu', function () {
                return false;
            });
            launchToolbar.config.$BACinfo.on('click', this.doWork.bind(this));
            launchToolbar.config.$platformToggle.on('click', this.flipTheSwitch.bind(this));
            launchToolbar.config.$platformToggle.on('click', this.buildFolderPath.bind(this));
            launchToolbar.config.$settings.on('click', function () {
                launchToolbar.config.$settingContainer.slideToggle(500);
            });
            launchToolbar.config.$container.on('click', this.doWork.bind(this));
            launchToolbar.config.$container.on('click', this.flipTheSwitch.bind(this));
            launchToolbar.config.$accountNum.on('click', this.doWork.bind(this));
            launchToolbar.config.$EditLink.on('click', this.doWork.bind(this));

            launchToolbar.config.$salesforceEmailOwner.on('click', function () {
                launchToolbar.config.$emailTargetsPanel.toggle();
                launchToolbar.config.$emailTargetsPanel.focus();
                launchToolbar.config.$salesforceEmailOwner.toggleClass('activeFunction');
            });
            launchToolbar.config.$logActivity.on('click', function () {
                launchToolbar.config.$logTargetsPanel.toggle();
                launchToolbar.config.$logTargetsPanel.focus();
                launchToolbar.config.$logActivity.toggleClass('activeFunction');
            });
            launchToolbar.config.$emailTargetsPanel.on('focusout', function () {
                launchToolbar.config.$emailTargetsPanel.toggle();
                launchToolbar.config.$salesforceEmailOwner.toggleClass('activeFunction');
            });
            launchToolbar.config.$logTargetsPanel.on('focusout', function () {
                launchToolbar.config.$logTargetsPanel.toggle();
                launchToolbar.config.$logActivity.toggleClass('activeFunction');
            });
        },
        'addStyles': function () {
            launchToolbar.config.$toolbarStyles
                // general toolbox styles
                .append('.funcButtons { display: none; padding: 0px 15px; border-right: 1px rgb(0, 0, 0) solid; padding-top: 0px; } ')
                .append('.click-able { cursor: pointer; } ')
                .append('.hFont { color: white !important; display: table; } ')
                .append('.hlaunchID { background: rgb(255, 0, 0); } ')
                .append('.hwebID { background: rgb(255, 20, 155); } ')
                .append('.haccount { background: rgb(110, 55, 215); } ')
                .append('.hwebIDtext { background: rgb(180, 120, 120); } ')
                .append('.hwebnum { background: rgb(219, 112, 147); } ')
                .append('.hproofDate { background: rgb(0, 100, 0); } ')
                .append('.hlaunchDate { background: rgb(165, 115, 50); } ')
                .append('.hproductType { background: rgb(19, 106, 138); } ')
                .append('.hdealerCode { background: rgb(199, 121, 208); } ')
                .append('.myTitle { color: #000000; font-weight: 900; } ')
                .append('.makeLarger { font-size: 1rem; } ')
                .append('.makeBolder { font-weight: 900; } ')
                .append('.myClass { line-height: 30px !important;  height: 30px; vertical-align: -5% !important; } ')
                .append('.myClass:hover, .fa.myClass:hover { font-weight: 900; } ')
                .append('.imp { float: left !important; } ')
                .append('.selectedTarget { background: white; color: green; }')
                .append('.activeFunction { background: teal; color: white; }')
                .append('.dealerCodeInfo th { text-align: center; } '); // end
        },
        'buildSettings': function () {
            var $otherSettings = launchToolbar.config.$container.clone(true).text('Other Features').removeClass('click-able');
            var $settingsArrow = launchToolbar.config.$arrowIcon.clone(true);
            var $quickLinksSizing = launchToolbar.config.$container.clone(true).addClass('quickLinksSize').text('big quick links');
            var $quickLinksSizingCheckboxIcon = launchToolbar.config.$settingCheckboxIcon.clone().addClass('quickLinksSize');
            var $largeInfo = launchToolbar.config.$container.clone(true).addClass('largeInfo').text('make important info pop');
            var $largeInfoCheckboxIcon = launchToolbar.config.$settingCheckboxIcon.clone().addClass('largeInfo');
            var $colorizeLaunch = launchToolbar.config.$container.clone(true).addClass('colorizeLaunch').text('highlight important info');
            var $colorizeLaunchCheckboxIcon = launchToolbar.config.$settingCheckboxIcon.clone().addClass('colorizeLaunch');
            var $colorTool = launchToolbar.config.$container.clone(true).addClass('changeToolColor').removeClass('click-able').text('Change tool Color');
            // test elements - colorize
            var $colorStartInputField = launchToolbar.config.$settingInput.clone(true).addClass('startColor changeToolColor');
            var $colorEndInputField = launchToolbar.config.$settingInput.clone(true).addClass('endColor changeToolColor');
            var $colorInputFieldButt = launchToolbar.config.$myButt.clone(true).addClass('changeToolColor').text('submit');

            $otherSettings.append($settingsArrow);
            $quickLinksSizing.append($quickLinksSizingCheckboxIcon);
            $largeInfo.append($largeInfoCheckboxIcon);
            $colorizeLaunch.append($colorizeLaunchCheckboxIcon);
            // test elements - colorize
            $colorTool.append($colorStartInputField).append($colorEndInputField).append($colorInputFieldButt);

            // Add 'other panel tools' to ther Features Panel
            launchToolbar.config.$settingContainer.append($otherSettings);
            launchToolbar.config.$settingContainer.append($quickLinksSizing);
            launchToolbar.config.$settingContainer.append($largeInfo);
            // test element - colorize
            launchToolbar.config.$settingContainer.append($colorizeLaunch);
        },
        'buildTool': function () {
            launchToolbar.config.$accountName.append(this.accountName);
            launchToolbar.config.$idCombo.append(launchToolbar.config.$plusIcon);
            launchToolbar.config.$copyFolderPath.append(launchToolbar.config.$folderImage);
            launchToolbar.config.$launchID.append(this.launchID);
            launchToolbar.config.$copyWebID.append(this.webID);
            launchToolbar.config.$webnum.append(this.webnum);
            launchToolbar.config.$proofDate.append(this.proofDateText);
            launchToolbar.config.$launchDate.append(this.launchDateText);
            launchToolbar.config.$webIDtext.append(this.webIDtext);
            launchToolbar.config.$BACinfo.append(launchToolbar.config.$clickMe);
            launchToolbar.config.$accountNum.append(launchToolbar.config.$clickMe2);
            launchToolbar.config.$platformToggle.append(launchToolbar.config.$toggleLabel).append(launchToolbar.config.$arrowIcon);
            launchToolbar.config.$salesforceEmailOwner.append(launchToolbar.config.$salesforceEmailIcon);
            launchToolbar.config.$howToGuide.append(launchToolbar.config.$howToIcon);
            launchToolbar.config.$settings.append(launchToolbar.config.$settingsIcon);
            launchToolbar.config.$logActivity.append(launchToolbar.config.$logActivityIcon);

            launchToolbar.config.$uiBox.append(launchToolbar.config.$toggleOn)
                .append(launchToolbar.config.$webIDtext)
                .append(launchToolbar.config.$accountName)
                .append(launchToolbar.config.$launchID)
                .append(launchToolbar.config.$copyWebID)
                .append(launchToolbar.config.$webnum)
                .append(launchToolbar.config.$proofDate)
                .append(launchToolbar.config.$launchDate)
                .append(launchToolbar.config.$howToGuide)
                .append(launchToolbar.config.$settings)
                .append(launchToolbar.config.$wipSite)
                .append(launchToolbar.config.$proofSite)
                .append(launchToolbar.config.$liveSite)
                .append(launchToolbar.config.$platformToggle)
                .append(launchToolbar.config.$EditLink)
                .append(launchToolbar.config.$salesforceEmailOwner)
                .append(launchToolbar.config.$logTargetsPanel)
                .append(launchToolbar.config.$emailTargetsPanel)
                .append(launchToolbar.config.$logActivity)
                .append(launchToolbar.config.$copyFolderPath)
                .append(launchToolbar.config.$idCombo)
                .append(launchToolbar.config.$importantInfo)
                .append(launchToolbar.config.$dynoDisplay)
                .append(launchToolbar.config.$BACinfo)
                .append(launchToolbar.config.$accountNum)
                .append(launchToolbar.config.$bacTable);
        },
        'attachTool': function () {
            this.$head.append(launchToolbar.config.$toolbarStyles);
            this.$head.append(launchToolbar.config.$jQueryLink);
            this.$head.append(launchToolbar.config.$jQueryUI);
            this.$head.append(launchToolbar.config.$fontAwe);
            this.$body.prepend(launchToolbar.config.$placeholder);
            this.$body.prepend(launchToolbar.config.$settingContainer);
            this.$body.prepend(launchToolbar.config.$uiBox);
        },
        'turnSettingsOn': function () {

        },
        'switchPlatform': function () {
            launchToolbar.config.$toggleLabel.css({
                'color': this.platformSelector ? 'purple' : 'blue',
            }).text(this.platformSelector ? 'Nextgen' : 'Tetra');
        },
        'largerQuickLinks': function () {
            this.$quickLinks.toggleClass('makeLarger');
            this.$quickLinks.find('.linklet').find('.count').toggleClass('makeBolder');
        },
        'makeLarger': function () {
            this.$launchID.toggleClass('makeLarger');
            this.$webID.toggleClass('makeLarger');
            this.$account.toggleClass('makeLarger');
            this.$webIDtext.toggleClass('makeLarger');
            this.$webnum.toggleClass('makeLarger');
            this.$proofDate.toggleClass('makeLarger');
            this.$launchDate.toggleClass('makeLarger');
            this.$productType.toggleClass('makeLarger');
            this.$dealerCode.toggleClass('makeLarger');
        },
        'colorizeLaunch': function () {
            this.$launchID.toggleClass('hFont hlaunchID');
            this.$webID.toggleClass('hFont hwebID');
            this.$account.toggleClass('hFont haccount');
            this.$webIDtext.toggleClass('hFont hwebIDtext');
            this.$webnum.toggleClass('hFont hwebnum');
            this.$proofDate.toggleClass('hFont hproofDate');
            this.$launchDate.toggleClass('hFont hlaunchDate');
            this.$productType.toggleClass('hFont hproductType');
            this.$dealerCode.toggleClass('hFont hdealerCode');
        },
        'startTool': function () {
            var $funcButts = jQuery('.funcButtons');
            var BACvariable = 'BSCtable';
            var self = this;

            setValue('accountName', false);
            setValue(BACvariable, false);

            setTimeout(function () {
                $funcButts.toggle();

                launchToolbar.config.$placeholder.slideToggle('slow');
                launchToolbar.config.$uiBox.slideToggle('slow', function () {
                    if (jQuery(this).is(':visible')) {
                        jQuery(this).css({
                            'display': 'inline-block',
                        });
                    }
                });

                // set up advanced options
                self.programData();
            }, 1000);
        },
        'bacTable': function () {
            var BACvariable = 'BSCtable';
            var accountName;
            var bacTableData;
            var accountNumber;
            //            var dataGathered;
            //            var dataGathered = false;
            var attempts = 1;
            var gatherInfo;

            setTimeout(function () {
                // set interval start
                gatherInfo = setInterval(function () {
                    accountName = getValue('accountName');
                    accountNumber = getValue('accountNumber');
                    bacTableData = getValue(BACvariable);

                    if (bacTableData === 'undefined' || bacTableData === false || accountName === 'undefined' || accountName === false || accountNumber === 'undefined' || accountNumber === false) {
                        //                        dataGathered = false;
                        // if table is empty
                        attempts += 1;

                        if (attempts === 10) {
                            clearInterval(gatherInfo);
                        }
                    } else {
                        //                        dataGathered = true;
                        // if table is not empty
                        launchToolbar.config.$bacTable.html(bacTableData);
                        launchToolbar.config.$clickMe.fadeOut(200, function () {
                            launchToolbar.config.$BACinfo.attr({
                                'title': 'Click for ' + accountName + ' Info',
                            });
                            launchToolbar.config.$clickMe.text('Click for Dealer Info').fadeIn(200);
                        });
                        launchToolbar.config.$clickMe2.fadeOut(200, function () {
                            launchToolbar.config.$accountNum.attr({
                                'title': 'Click for account number',
                            });
                            launchToolbar.config.$clickMe2.text(accountNumber).fadeIn(200);
                        });

                        clearInterval(gatherInfo);
                    }
                }, 2000); // set interval end

            }, 2000); // set time out end
        },
        // ----------------------------------------
        // TIER 2
        // ----------------------------------------
        'doWork': function (event) {
            var $clickedElement = jQuery(event.delegateTarget);
            var classText = $clickedElement.attr('class');

            switch (true) {
                case classText.indexOf('idCombo') > -1:
                    this.copyInfo(this.comboID);
                    break;
                case classText.indexOf('launchID') > -1:
                    this.copyInfo(this.launchID);
                    break;
                case classText.indexOf('copyWebid') > -1:
                    this.copyInfo(this.webID);
                    break;
                case classText.indexOf('accountName') > -1:
                    this.copyInfo(this.accountName);
                    break;
                case classText.indexOf('copyFolderPath') > -1:
                    this.copyInfo(launchToolbar.config.folderPath);
                    break;
                case classText.indexOf('webIDtext') > -1:
                    this.copyInfo(this.webIDtext);
                    break;
                case classText.indexOf('Webnum') > -1:
                    this.copyInfo(this.webnum);
                    break;
                case classText.indexOf('BACinfo') > -1:
                    launchToolbar.config.$bacTable.toggle(1000);
                    break;
                case classText.indexOf('accountNum') > -1:
                    this.copyInfo(launchToolbar.config.$clickMe2.text());
                    break;
                case classText.indexOf('WSMedit') > -1:
                    this.copyInfo(launchToolbar.config.$EditLink.data('link'));
                    break;
                    // ---------------------------------------- wip/proof/live site
                case event.which === 3 && classText.indexOf('liveSite') >= 0:
                    this.copyInfo($clickedElement.attr('href'));
                    break;
                case event.which === 3 && classText.indexOf('proofSite') > -1:
                    this.copyInfo($clickedElement.attr('href'));
                    break;
                case event.which === 3 && classText.indexOf('wipSite') > -1:
                    this.copyInfo($clickedElement.attr('href'));
                    break;
                case event.which === 3 && classText.indexOf('launchOwner') > -1:
                    this.copyInfo(this.launchOwnerText);
                    break;
            }
        },
        'flipTheSwitch': function (event) {
            var $clickedElement = jQuery(event.delegateTarget);
            var classText = $clickedElement.attr('class');
            var tempBool;

            switch (true) {
                case classText.indexOf('platformSelector') > -1:
                    // set saved variable to opposite of current value
                    this.platformSelector = !getValue('platformSelector');
                    setValue('platformSelector', this.platformSelector);
                    // set toggle
                    this.switchPlatform();
                    break;
                case classText.indexOf('quickLinksSize') > -1:
                    tempBool = !getValue('quickLinksSize');
                    setValue('quickLinksSize', tempBool);
                    this.setToggle('quickLinksSize', tempBool);
                    break;
                case classText.indexOf('largeInfo') > -1:
                    tempBool = !getValue('largeInfo');
                    setValue('largeInfo', tempBool);
                    this.setToggle('largeInfo', tempBool);
                    break;
                case classText.indexOf('colorizeLaunch') > -1:
                    tempBool = !getValue('colorizeLaunch');
                    setValue('colorizeLaunch', tempBool);
                    this.setToggle('colorizeLaunch', tempBool);
                    break;
            }
        },
        // ----------------------------------------
        // tier 3
        // ----------------------------------------
        'copyInfo': function (variable) {
            var $display = jQuery('<div>').css({
                'display': 'none',
            });
            GM_setClipboard(variable, 'text'); // eslint-disable-line new-cap
            $display.text('COPIED ' + variable);
            launchToolbar.config.$dynoDisplay.toggle().append($display);
            $display.slideToggle(500).delay(3000).slideToggle(500, function () {
                $display.remove();
                launchToolbar.config.$dynoDisplay.toggle();
            });
        },
        'programData': function () {
            var allVariables = programVariables();
            var length = allVariables.length;
            var a = 0;
            var variableName = '';
            var bool = '';
            // add variables to list
            for (a; a < length; a += 1) {
                variableName = allVariables[a];
                bool = getValue(variableName);

                if (bool) {
                    this.setToggle(variableName, bool);
                }
            }
        },
        'setToggle': function (variableName, bool) {
            switch (true) {
                case variableName === 'quickLinksSize':
                    jQuery('i.quickLinksSize').replaceWith(bool ? '<i class="fa fa-check-square fa-lg myClass quickLinksSize" style="padding: 5px;"></i>' : '<i class="fa fa-square fa-lg myClass quickLinksSize" style="padding: 5px;"></i>');
                    this.largerQuickLinks();
                    break;
                case variableName === 'largeInfo':
                    jQuery('i.largeInfo').replaceWith(bool ? '<i class="fa fa-check-square fa-lg myClass largeInfo" style="padding: 5px;"></i>' : '<i class="fa fa-square fa-lg myClass largeInfo" style="padding: 5px;"></i>');
                    this.makeLarger(bool);
                    break;
                case variableName === 'colorizeLaunch':
                    jQuery('i.colorizeLaunch').replaceWith(bool ? '<i class="fa fa-check-square fa-lg myClass colorizeLaunch" style="padding: 5px;"></i>' : '<i class="fa fa-square fa-lg myClass colorizeLaunch" style="padding: 5px;"></i>');
                    this.colorizeLaunch(bool);
                    break;
                default:
            }
        },
    };
    var getBAC = {
        'init': function () {
            return this.getBAC();
        },
        'getBAC': function () {
            var BACvariable = 'BSCtable';
            var findID = 'id=';
            var counter = 0;
            var gatherData;
            var accountID;
            var tableID;
            var tableBody;
            var startLocation;
            var endLocation;
            var $BACbody;
            var accountName;
            var accountNumber;

            // reset value
            setValue(BACvariable, false);
            setValue('accountName', false);
            setValue('accountNumber', false);

            // set interval start
            gatherData = setInterval(function () {

                var location = window.location.href;
                var accountNameText = jQuery('#acc2j_id0_j_id5_ileinner').text();

                if (location.indexOf('cdk--c.na57.visual.force.com') > -1) {
                    accountNumber = jQuery('#00N40000002aU3Ij_id0_j_id5_ileinner').text();
                    setValue('accountNumber', accountNumber);

                    accountName = jQuery.trim(accountNameText.slice(0, accountNameText.indexOf('[')));

                    // search url for account id
                    startLocation = location.indexOf(findID) + findID.length;
                    endLocation = location.indexOf('&');
                    accountID = location.slice(startLocation, endLocation);
                    tableID = '#' + 'j_id0_j_id5_' + '' + accountID + '' + '_00N40000002aU57';

                    tableBody = tableID + '_body';
                    $BACbody = jQuery(tableBody);
                    setValue(BACvariable, $BACbody.html());
                    setValue('accountName', accountName);

                    counter += 1;
                    if (counter === 10) {
                        //                            console.log('Data not gathered, function timing out');
                        clearInterval(gatherData);
                        window.close();
                    }

                    if (getValue(BACvariable) !== false && getValue('accountName') !== false && getValue('accountNumber')) {
                        clearInterval(gatherData);
                        window.close();
                    }
                }
            }, 1000); // set interval end
        },
    };

    if (window.location.hostname === 'cdk.my.salesforce.com') {
        launchToolbar.init();
    }

    if (window.location.hostname === 'cdk--c.na57.visual.force.com') {
        getBAC.init();
    }

})();
