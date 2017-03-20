/*global jQuery, window, document, setTimeout, GM_setClipboard, GM_openInTab, GM_getValue */

(function () {

    // ----------------------------------------
    function getValue(variable) {
        console.log('retrived ' + variable + ' : ' + GM_getValue(variable, false));
        return GM_getValue(variable, false);
    }

    var caseToolbar = {
        init: function () {
            this.createElements();
            this.cacheDOM();
            this.changeTab();
            this.buildWSMlink();
            this.childCheck();
            this.parentCheck();
            this.buildFolderPath();
            this.bindEvents();
            this.addStyles();
            this.buildTool();
            this.attachTool();
            this.startTool();
            this.getBACtable();
        },
        createElements: function () {
            caseToolbar.config = {
                $uiBox: jQuery('<div>').attr({
                    id: 'uiBox'
                }).css({
                    position: 'fixed',
                    'z-index': '1100000',
                    background: 'linear-gradient(to right, rgb(116, 185, 233), #78ffd6)',
                    color: '#000',
                    'text-align': 'left',
                    'font-family': 'Arial',
                    'font-size': '12px',
                    height: '22px',
                    width: '30px',
                    'font-weight': 'bold',
                    top: '0',
                    right: '0',
                    '-moz-border-radius': '10px 0 0 10px',
                    'border-radius': '10px 0 0 10px',
                    border: '1px #AAA solid',
                    'border-right': '0',
                    'padding-top': '7px',
                    'padding-right': '80px'
                }),
                $toggleOn: jQuery('<div>').attr({
                    id: 'toggleOn'
                }).css({
                    'float': 'left',
                    width: '70px',
                    margin: '0',
                    padding: '0 0 0 4px',
                    cursor: 'pointer'
                }),
                $toggleOff: jQuery('<div>').attr({
                    id: 'toggleOff'
                }).css({
                    'float': 'left',
                    width: '70px',
                    margin: '0',
                    padding: '0 0 0 8px',
                    display: 'none',
                    cursor: 'pointer',
                    'border-right': '1px black solid',
                    height: '16px'
                }),
                base: 'http://websites.cobalt.com/wsm/index.do?webId=',
                us: '&locale=en_US',
                en_ca: '&locale=en_CA',
                fr_ca: '&locale=fr_CA',
                au: '&locale=en_AU',
                nz: '&locale=en_NZ',
                wsmLink: '',
                $resultBox: jQuery('<div>').attr({
                    id: 'resultBox'
                }).css({
                    display: 'none',
                    'float': 'right',
                    color: 'red',
                    'background-color': 'white',
                    padding: '0 15px',
                    margin: '2px 0 0 40px',
                    '-moz-border-radius': '8px',
                    'border-radius': '8px',
                    border: '2px #aaa solid',
                    cursor: 'text'
                }),
                $childCase: jQuery('<div>').css({
                    color: 'purple',
                    'margin-left': '5px'
                }).html('<b>Child Case:</b> Look for related cases'),
                $parentCase: jQuery('<div>').css({
                    color: 'red',
                    'margin-left': '5px'
                }).html('<b>Parent Case:</b> Look for related cases'),
                $toolbarStyles: jQuery('<style>').attr({
                    id: 'qa_toolbox',
                    type: 'text/css'
                }),
                $jQueryLink: jQuery('<script>').attr({
                    type: 'text/javascript',
                    src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
                }),
                baseManuLoc: '\\\\las-mgmt1.lasisi01a.las.san.dsghost.net\\Associate\\sea\\CS\\graphics\\manufacturers\\',
                nitra: 'http://nitra.',
                reload: '/?reload=true',
                liveSiteURL: '',
                folderPath: '',
                $accountLevel: jQuery('<div>').attr({
                    id: 'accountLevel'
                }).css({
                    display: 'none',
                    'float': 'left',
                    padding: '3px 15px 0',
                    height: '15px',
                    'padding-top': '0px'
                }),
                $EditLink: jQuery('<a>').attr({
                    target: '_new',
                }),
                $Edit: jQuery('<div>').attr({
                    id: 'webID',
                    class: 'funcButtons',
                    title: 'Edit in WSM'
                }).css({
                    color: 'gray',
                    float: 'right'
                }).text('EDIT'),
                $caseNo: jQuery('<div>').attr({
                    id: 'caseNumber',
                    class: 'funcButtons',
                    title: 'Copy Case Number'
                }).css({
                    float: 'right'
                }),
                $idCombo: jQuery('<div>').attr({
                    title: 'Copy WebID and Case Number',
                    id: 'idCombo',
                    class: 'funcButtons'
                }).css({
                    'float': 'right',
                    height: '15px',
                    'padding-top': '0px'
                }).text('+'),
                $copyWebID: jQuery('<div>').attr({
                    id: 'copyWebid',
                    title: 'Copy WebID',
                    class: 'funcButtons'
                }),
                $desktopIcon: jQuery('<i>').attr({
                    class: 'fa fa-desktop fa-lg',
                    'aira-hidden': 'true',
                    title: 'View Live Site'
                }).css({
                    float: 'right'
                }),
                $copyProof: jQuery('<div>').attr({
                    id: 'copyProof',
                    class: 'funcButtons'
                }).css({
                    float: 'right'
                }),
                $liveSite: jQuery('<a>').attr({
                    target: '_new',
                }).css({
                    float: 'right'
                }),
                $copyFolderPath: jQuery('<div>').attr({
                    class: 'funcButtons'
                }).css({
                    float: 'right',
                }),
                $folderImage: jQuery('<i>').attr({
                    class: 'fa fa-folder-open fa-lg',
                    title: 'Project Folder Location',
                    id: 'copyFolderPath'
                }).css({
                    float: 'right',
                    display: 'block'
                }),
                $commentCaseContainer: jQuery('<div>').attr({
                    class: 'funcButtons'
                }).css({
                    float: 'right'
                }),
                $commentCase: jQuery('<a>').attr({
                    target: '_parent'
                }).css({
                    float: 'right',
                    'text-decoration': 'none'
                }),
                $commentOnCase: jQuery('<div>').attr({
                    id: 'commentONCase',
                    title: 'Make a Comment'
                }).css({
                    'padding-left': '12px !important',
                    color: 'purple!important',
                    'font-size': '11 px!important'
                }).text('Comment'),
                $changeCaseOwner: jQuery('<a>').attr({
                    target: '_parent',
                    id: 'followUp',
                    class: 'funcButtons',
                    title: 'Change case owner'
                }).css({
                    float: 'right'
                }),
                $closeCase: jQuery('<a>').attr({
                    target: '_parent',
                }),
                $followInfo: jQuery('<div>').attr({
                    id: 'follow',
                    class: 'funcButtons'
                }).css({
                    'padding-left': '12px !important',
                    color: 'red !important',
                    'font-size': '11px !important'
                }),
                commentsbgColor: 'linear-gradient(to left, #FF512F , #DD2476)'
            };
        },
        cacheDOM: function () {
            this.path = window.location.pathname;
            console.log('this.path : ' + this.path);
            this.caseID = this.path.slice(1);
            console.log('this.caseID : ' + this.caseID);
            this.enterCommentURL = 'https://cdk.my.salesforce.com/00a/e?parent_id=' + this.caseID + '&retURL=%2F' + this.caseID;
            this.createdBy = jQuery('#CreatedBy_ileinner a').text();
            this.changeCaseOwner = 'https://cdk.my.salesforce.com/' + this.caseID + '/a?retURL=%2F' + this.caseID + '&newOwn=' + this.createdBy;
            this.closeCaseLink = 'https://cdk.my.salesforce.com/' + this.caseID + '/s?retURL=%2F';
            this.$body = jQuery('body');
            this.$head = jQuery('head');
            this.caseNo = jQuery('#cas2_ileinner').text();
            this.caseNumber = this.caseNo.substr(0, 8);
            this.webID = jQuery('#CF00N40000002aUB4_ileinner a').text();
            this.comboID = this.webID + ' ' + this.caseNumber;
            this.idArray = this.webID.split('-');
            this.oem = this.idArray[0];
            this.id = this.webID.substr(this.webID.indexOf('-') + 1);
            this.accountLevel = jQuery('#00N40000002OuSq_ileinner').text();
            this.pageToChange = jQuery('#00N40000002aU9c_ileinner').text();
            this.followUp = jQuery('#00N40000002aU7t_ileinner').text();
            this.$rawParent = jQuery('#cas28_ileinner');
            this.$rawParentLink = this.$rawParent.find('a');
            this.rawParentLaunch = this.$rawParent.text();
            this.$trimParentLaunch = jQuery.trim(this.rawParentLaunch);
            this.childCaseID = '#' + this.caseID + '_RelatedChildCaseList_link';
            console.log(this.childCaseID);
            this.childCases = jQuery.trim(jQuery('#' + this.caseID + '_RelatedChildCaseList_body').text());
            console.log(this.childCases);
            this.commentsID = '#' + this.caseID + '_RelatedCommentsList_link';
        },
        changeTab: function () {
            switch (this.pageToChange) {
                case 'Proof':
                    caseToolbar.config.$toggleOn.html('&#9666; PROOF');
                    caseToolbar.config.$toggleOff.html('PROOF &#9656;');
                    break;
                case 'Publish':
                    caseToolbar.config.$toggleOn.html('&#9666; PUBLISH');
                    caseToolbar.config.$toggleOff.html('PUBLISH &#9656;');
                    break;
                default:
                    // nothing
                    break;
            }
        },
        buildWSMlink: function () {
            if (-1 != this.webID.search('gmcl')) {
                if (-1 != this.webID.search('-fr')) {
                    caseToolbar.config.wsmLink = caseToolbar.config.base + this.webID + caseToolbar.config.fr_ca;
                } else {
                    caseToolbar.config.wsmLink = caseToolbar.config.base + this.webID + caseToolbar.config.en_ca;
                }
            } else if (-1 != this.webID.search('holden')) {
                if (-1 != this.webID.search('holdennz')) {
                    caseToolbar.config.wsmLink = caseToolbar.config.base + this.webID + caseToolbar.config.nz;
                } else {
                    caseToolbar.config.wsmLink = caseToolbar.config.base + this.webID + caseToolbar.config.au;
                }
            } else {
                caseToolbar.config.wsmLink = caseToolbar.config.base + this.webID + caseToolbar.config.us;
            }
        },
        childCheck: function () {
            if (this.childCases !== 'No records to display') {
                jQuery('.ptBody .content').append(caseToolbar.config.$childCase);

                jQuery('.listHoverLinks').on('load', setTimeout(this.colorRelatedCases, 3000));
            }
        },
        parentCheck: function () {
            if (this.$trimParentLaunch !== '') {
                jQuery('.ptBody .content').append(caseToolbar.config.$parentCase);
                this.$rawParentLink.css({
                    background: 'red',
                    color: 'white'
                });
            }
        },
        buildFolderPath: function () {
            switch (this.oem) {
                case 'gmps':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'gmpsdealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'gmcl':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'gmcldealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'vw':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'vwdealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'hyun':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'hyundaistores.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'mazda':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'mazdadealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'lex':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'lexusdealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + 'lexus\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'k1ia':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'k1iadealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'b2mw':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'b2mwdealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'mini':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'mini-dealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'motp':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'motorplace.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + 'motorplace\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'hond':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'hondadealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + 'honda\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'holden':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'gmholdendealer.com.au/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'holdennz':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'gmholdendealer.co.nz/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'nissan':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'nissandealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'toyd':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'toyotadealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + 'toyota\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'infiniti':
                    caseToolbar.config.liveSiteURL = caseToolbar.config.nitra + 'infinitthis.idealer.com/' + this.id + caseToolbar.config.reload;
                    caseToolbar.config.folderPath = caseToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
            }
        },
        bindEvents: function () {
            caseToolbar.config.$toggleOn.on('click', this.animate);
            caseToolbar.config.$toggleOn.on('click', this.showBox);
            caseToolbar.config.$toggleOff.on('click', this.animate);
            caseToolbar.config.$toggleOff.on('click', this.hideBox);
            caseToolbar.config.$idCombo.on('click', this.clipboardCopy.bind(this));
            caseToolbar.config.$caseNo.on('click', this.clipboardCopy.bind(this));
            caseToolbar.config.$copyWebID.on('click', this.clipboardCopy.bind(this));
            caseToolbar.config.$folderImage.on('click', this.clipboardCopy.bind(this));
        },
        addStyles: function () {
            caseToolbar.config.$toolbarStyles
                // general toolbox styles
                .append('.funcButtons { display: none; float: right; padding: 3px 15px 0; cursor: pointer; border-right: 1px rgb(112, 160, 121) solid; height: 15px; padding-top: 0px; } '); // end
        },
        buildTool: function () {
            caseToolbar.config.$accountLevel.append(this.accountLevel);
            caseToolbar.config.$EditLink.append(caseToolbar.config.$Edit);
            caseToolbar.config.$EditLink.attr({
                href: caseToolbar.config.wsmLink
            });
            caseToolbar.config.$copyProof.append(caseToolbar.config.$desktopIcon);
            caseToolbar.config.$liveSite.append(caseToolbar.config.$copyProof);
            caseToolbar.config.$liveSite.attr({
                href: caseToolbar.config.liveSiteURL
            });
            caseToolbar.config.$copyFolderPath.append(caseToolbar.config.$folderImage);
            caseToolbar.config.$commentCase.append(caseToolbar.config.$commentOnCase);
            caseToolbar.config.$commentCase.attr({
                href: this.enterCommentURL
            });
            caseToolbar.config.$commentCaseContainer.append(caseToolbar.config.$commentCase);
            caseToolbar.config.$changeCaseOwner.append(caseToolbar.config.$followInfo);
            caseToolbar.config.$changeCaseOwner.text(this.followUp);
            caseToolbar.config.$changeCaseOwner.attr({
                href: this.changeCaseOwner
            });
            caseToolbar.config.$closeCase.attr({
                href: this.changeCaseOwner
            });
            caseToolbar.config.$caseNo.text(this.caseNumber);
            caseToolbar.config.$copyWebID.text(this.webID);

            caseToolbar.config.$uiBox.append(caseToolbar.config.$toggleOn)
                .append(caseToolbar.config.$toggleOff)
                .append(caseToolbar.config.$accountLevel)
                .append(caseToolbar.config.$EditLink)
                .append(caseToolbar.config.$caseNo)
                .append(caseToolbar.config.$idCombo)
                .append(caseToolbar.config.$copyWebID)
                .append(caseToolbar.config.$liveSite)
                .append(caseToolbar.config.$copyFolderPath)
                .append(caseToolbar.config.$commentCaseContainer)
                .append(caseToolbar.config.$changeCaseOwner);
        },
        attachTool: function () {
            this.$head.append(caseToolbar.config.$toolbarStyles);
            this.$head.append(caseToolbar.config.$jQueryLink);
            this.$body.append(caseToolbar.config.$uiBox);
        },
        startTool: function () {
            var commentsID = this.commentsID;
            setTimeout(function (commentsID) {
                jQuery(commentsID).css({
                    background: caseToolbar.config.commentsbgColor,
                    color: '#ccc'
                });
                caseToolbar.config.$toggleOn.trigger('click');
            }, 2000);
        },
        getBACtable: function () {
            var x = getValue('BSCtable');

            console.log(x);
        },
        // ----------------------------------------
        // TIER 2
        // ----------------------------------------
        colorRelatedCases: function () {
            jQuery(this.childCaseID).css({
                background: 'linear-gradient(to left, #41295a , #2F0743)',
                color: '#ccc'
            });
        },
        animate: function () {
            var $funcButts = jQuery('.funcButtons');
            caseToolbar.config.$toggleOn.toggle();
            caseToolbar.config.$toggleOff.toggle();
            caseToolbar.config.$accountLevel.toggle();
            $funcButts.toggle();
        },
        showBox: function () {
            caseToolbar.config.$uiBox.animate({
                width: "75%"
            }, "slow");
        },
        hideBox: function () {
            caseToolbar.config.$uiBox.animate({
                width: "30px"
            }, "slow");
        },
        clipboardCopy: function (event) {
            var $clickedElement = jQuery(event.target),
                id = $clickedElement.attr('id'),
                variable = '';

            switch (id) {
                case 'idCombo':
                    variable = this.comboID;
                    break;
                case 'caseNumber':
                    variable = this.caseNumber;
                    break;
                case 'copyWebid':
                    variable = this.webID;
                    break;
                case 'copyFolderPath':
                    variable = caseToolbar.config.folderPath;
                    break;
            }
            //            console.log('copy clipboard ' + variable);
            GM_setClipboard(variable, 'text');
        }
    };

    caseToolbar.init();
})();
