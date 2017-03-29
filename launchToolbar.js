/*global jQuery, window, document, setTimeout, GM_setClipboard, GM_openInTab, GM_setValue, GM_getValue, GM_addValueChangeListener, setInterval */

//TODO
//Launch Id - done
//Account - done
//WebID - done
//WebID Text - done
//Webnum - done
//Proof Due Date - done
//Expected Launch Date - done
//BAC code - Done
//Account number - Done

(function () {
    // Tampermonkey functions

    function openInTab(url) {
        GM_openInTab(url, 'insert');
    }

    function setValue(variable, val) {
        console.log('"SET" value "' + variable + '" with "' + val + '"');
        GM_setValue(variable, val);
    }

    function getValue(variable) {
        return GM_getValue(variable, 'false');
    }

    var launchToolbar = {
        init: function () {
            this.createElements();
            this.cacheDOM();
            this.changeTab();
            this.buildWSMlink();
            this.caseCheck();
            //            this.parentCheck();
            this.buildFolderPath();
            this.openAccountInfoPage();
            this.bindEvents();
            this.addStyles();
            this.buildTool();
            this.attachTool();
            this.startTool();
            this.BACtable();
        },
        createElements: function () {
            launchToolbar.config = {
                $placeholder: jQuery('<div>').css({
                    height: '50px',
                    display: 'none'
                }),
                $uiBox: jQuery('<div>').attr({
                    id: 'uiBox'
                }).css({
                    position: 'fixed',
                    display: 'none',
                    //                    display: 'inline-block',
                    'z-index': '9999',
                    background: 'linear-gradient(to left, #FFAFBD , #ffc3a0)',
                    color: '#000',
                    'text-align': 'left',
                    //                    'font-family': 'Arial',
                    'font-size': '12px',
                    //                    height: '25px',
                    width: '99%',
                    'font-weight': 'bold',
                    //                                        top: '0',
                    //                                        right: '0',
                    //                    '-moz-border-radius': '10px 0 0 10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    //                    'border-radius': '10px 0 0 10px',
                    border: '1px #AAA solid',
                    'border-right': '0',
                    'padding': '7px 0px',
                    //                    'padding-right': '80px'
                }),
                $toggleOn: jQuery('<div>').attr({
                    id: 'toggleOn',
                    class: 'myClass'
                }).css({
                    float: 'left',
                    padding: '0px 10px',
                    cursor: 'pointer'
                }),
                $toggleOff: jQuery('<div>').attr({
                    id: 'toggleOff',
                    class: 'myClass'
                }).css({
                    float: 'left',
                    padding: '0px 10px',
                    display: 'none',
                    cursor: 'pointer',
                    'border-right': '1px black solid'
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
                $casesMade: jQuery('<div>').css({
                    color: 'purple',
                    'margin-left': '5px'
                }).html('<b>Cases Created</b>'),
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
                $status: jQuery('<div>').attr({
                    id: 'statusText'
                }).css({
                    display: 'none',
                    'float': 'left',
                    padding: '3px 15px 0',
                    height: '15px',
                    'padding-top': '0px'
                }),
                $accountName: jQuery('<div>').attr({
                    //                    id: 'accountName',
                    class: 'accountName funcButtons imp',
                    title: 'Copy Account Name'
                }).css({
                    padding: '3px 15px 0',
                    color: 'rgb(110, 55, 215)',
                    'padding-top': '0px'
                }).html('<div class="myTitle">Account</div>'),
                $EditLink: jQuery('<a>').attr({
                    target: '_new',
                }),
                $Edit: jQuery('<div>').attr({
                    //                    id: 'webID',
                    class: 'webID funcButtons',
                    title: 'Edit in WSM'
                }).css({
                    color: 'gray',
                    float: 'right'
                }).text('EDIT'),
                $webIDtext: jQuery('<div>').attr({
                    //                    id: 'webIDtext',
                    class: 'webIDtext funcButtons imp',
                    title: 'Copy WebID Text'
                }).css({
                    color: 'rgb(0, 0, 0)'
                }).html('<div class="myTitle">WebID Text</div>'),
                $launchID: jQuery('<div>').attr({
                    //                    id: 'launchID',
                    class: 'launchID funcButtons imp',
                    title: 'Copy Launch ID'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(255, 0, 0)'
                }).html('<div class="myTitle">Launch ID</div>'),
                $idCombo: jQuery('<div>').attr({
                    title: 'Copy WebID and Launch',
                    //                    fa-plus
                    //                    id: 'idCombo',
                    class: 'funcButtons myClass'
                }).css({
                    'float': 'right',
                    height: '15px',
                    'padding-top': '0px'
                }),
                $plusIcon: jQuery('<i>').attr({
                    class: 'fa fa-plus fa-lg myClass idCombo',
                    'aira-hidden': 'true',
                    title: 'Copy Launch ID + Web ID'
                }).css({
                    float: 'right'
                }),
                $copyWebID: jQuery('<div>').attr({
                    //                    id: 'copyWebid',
                    title: 'Copy WebID',
                    class: 'copyWebid funcButtons imp'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(255, 20, 155)'
                }).html('<div class="myTitle">Web ID</div>'),
                $webnum: jQuery('<div>').attr({
                    //                                        id: 'copyWebid',
                    //                    id: 'copyWebnum',
                    title: 'Copy Webnum',
                    class: 'copyWebnum funcButtons imp'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(219, 112, 147)'
                }).html('<div class="myTitle">Webnum</div>'),
                $proofDate: jQuery('<div>').attr({
                    //                                                            id: 'copyWebid',
                    title: 'Proof Date',
                    class: 'funcButtons imp'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(0, 100, 0)'
                }).html('<div class="myTitle">Proof Date</div>'),
                $launchDate: jQuery('<div>').attr({
                    //                                                            id: 'copyWebid',
                    title: 'Launch Date',
                    class: 'funcButtons imp'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(165, 115, 50)'
                }).html('<div class="myTitle">Launch Date</div>'),
                $desktopIcon: jQuery('<i>').attr({
                    class: 'fa fa-desktop fa-lg myClass',
                    'aira-hidden': 'true',
                    title: 'View Live Site'
                }).css({
                    float: 'right'
                }),
                $copyProof: jQuery('<div>').attr({
                    id: 'copyProof',
                    //                    class: 'funcButtons'
                }).css({
                    float: 'right'
                }),
                $liveSite: jQuery('<a>').attr({
                    target: '_new',
                    class: 'funcButtons'
                }).css({
                    float: 'right'
                }),
                $copyFolderPath: jQuery('<div>').css({
                    float: 'right',
                    class: 'funcButtons'
                }),
                $folderImage: jQuery('<i>').attr({
                    class: 'fa fa-folder-open fa-lg funcButtons myClass copyFolderPath',
                    title: 'Project Folder Location'
                }).css({
                    float: 'right',
                    display: 'none'
                }),
                //                $commentCaseContainer: jQuery('<div>').attr({
                //                    class: 'funcButtons'
                //                }).css({
                //                    float: 'right'
                //                }),
                //                $commentCase: jQuery('<a>').attr({
                //                    target: '_parent'
                //                }).css({
                //                    float: 'right',
                //                    'text-decoration': 'none'
                //                }),
                //                $commentOnCase: jQuery('<div>').attr({
                //                    id: 'commentONCase',
                //                    title: 'Make a Comment'
                //                }).css({
                //                    'padding-left': '12px !important',
                //                    color: 'purple!important',
                //                    'font-size': '11 px!important'
                //                }).text('Comment'),
                //                $changeCaseOwner: jQuery('<a>').attr({
                //                    target: '_parent',
                //                    id: 'followUp',
                //                    class: 'funcButtons',
                //                    title: 'Change case owner'
                //                }).css({
                //                    float: 'right'
                //                }),
                //                $closeCase: jQuery('<a>').attr({
                //                    target: '_parent',
                //                }),
                //                $followInfo: jQuery('<div>').attr({
                //                    id: 'follow',
                //                    class: 'funcButtons'
                //                }).css({
                //                    'padding-left': '12px !important',
                //                    color: 'red !important',
                //                    'font-size': '11px !important'
                //                }),
                commentsbgColor: 'linear-gradient(to left, #FF512F , #DD2476)',
                $importantInfo: jQuery('<div>').attr({
                    id: 'importantInfo'
                }),
                $BACinfo: jQuery('<div>').attr({
                    class: 'BACinfo funcButtons imp'
                }).html('<div class="myTitle BACinfo">Dealer Code/BAC</div>'),
                $clickMe: jQuery('<div>').attr({
                    class: 'BACinfo'
                }).text('Click to Display').css({
                    display: 'none',
                }),
                $BACtable: jQuery('<div>').css({
                    //                    display: 'inline-table',
                    display: 'none',
                    position: 'absolute',
                    'margin-top': '38px',
                    background: 'rgb(255, 255, 255)',
                    border: '1px solid rgb(0, 0, 0)',
                    //                    float: 'left'
                }),
                accountPage: '',
                $dynoDisplay: jQuery('<div>').attr({
                    id: 'dynoDisplay'
                }).css({
                    position: 'absolute',
                    left: '35%',
                    background: 'purple',
                    padding: '5px 20px',
                    top: '100%',
                    display: 'none',
                    color: 'white'
                })
            };
        },
        cacheDOM: function () {
            // launch stuff
            this.$launchID = jQuery('#Name_ileinner').css({
                background: 'rgb(255, 0, 0)',
                color: 'white',
                display: 'table'
            });
            this.launchID = this.$launchID.text();

            this.$webID = jQuery('#CF00N40000002aUF9_ileinner a').css({
                background: 'rgb(255, 20, 155)',
                color: 'white'
            });
            this.webID = this.$webID.text();

            this.comboID = this.webID + ' ' + this.launchID;

            this.$account = jQuery('#CF00N40000002aUDp_ileinner a').css({
                background: 'rgb(110, 55, 215)',
                color: 'white'
            });
            this.accountInfo = this.$account.attr('href');
            this.accountName = this.$account.text();
            this.accountID = this.accountInfo.slice(1);

            this.$webIDtext = jQuery('#00N40000002aUF8_ileinner').css({
                background: 'rgb(0, 0, 0)',
                color: 'white',
                display: 'table'
            });
            this.webIDtext = this.$webIDtext.text();

            this.$webnum = jQuery('#00N40000002cgmd_ileinner').css({
                background: 'rgb(219, 112, 147)',
                color: 'white',
                display: 'table'
            });
            this.webnumText = this.$webnum.text();

            this.$proofDate = jQuery('#00N330000038W91_ileinner').css({
                background: 'rgb(0, 100, 0)',
                color: 'white',
                display: 'table'
            });
            this.proofDateText = this.$proofDate.text();

            this.$launchDate = jQuery('#00N33000002yrbp_ileinner').css({
                background: 'rgb(165, 115, 50)',
                color: 'white',
                display: 'table'
            });
            this.launchDateText = this.$launchDate.text();

            this.$status = jQuery('#00N40000002aUF4_ileinner');
            this.statusText = jQuery('#00N40000002aUF4_ileinner').text();
            this.owner = jQuery('#Owner_ileinner').find('[id*="Owner"]').text();
            this.$builder = jQuery('#CF00N40000002aUE2_ileinner');
            this.bizBeginning = 'j_id0_j_id5_';
            this.accountID = '';
            this.bizEnd = '_00N40000002aU57';
            this.bizSiteTable = this.bizBeginning + this.accountID + this.bizEnd;
            // case stuff
            this.path = window.location.pathname;
            this.actualLaunchID = this.path.slice(1);
            console.log('this.actualLaunchID : ' + this.actualLaunchID);
            //            this.enterCommentURL = 'https://cdk.my.salesforce.com/00a/e?parent_id=' + this.actualLaunchID + '&retURL=%2F' + this.actualLaunchID;
            //            this.createdBy = jQuery('#CreatedBy_ileinner a').text();
            //            this.changeCaseOwner = 'https://cdk.my.salesforce.com/' + this.actualLaunchID + '/a?retURL=%2F' + this.actualLaunchID + '&newOwn=' + this.createdBy;
            //            this.closeCaseLink = 'https://cdk.my.salesforce.com/' + this.actualLaunchID + '/s?retURL=%2F';
            this.$body = jQuery('body');
            this.$head = jQuery('head');
            //            this.caseNo = jQuery('#cas2_ileinner').text();
            //            this.caseNumber = this.caseNo.substr(0, 8);
            //            this.webID = jQuery('#CF00N40000002aUB4_ileinner a').text();

            this.idArray = this.webID.split('-');
            this.oem = this.idArray[0];
            this.id = this.webID.substr(this.webID.indexOf('-') + 1);
            //            this.webIDtext = jQuery('#00N40000002OuSq_ileinner').text();
            //            this.pageToChange = jQuery('#00N40000002aU9c_ileinner').text();
            //            this.followUp = jQuery('#00N40000002aU7t_ileinner').text();
            //            this.$rawParent = jQuery('#cas28_ileinner');
            //            this.$rawParentLink = this.$rawParent.find('a');
            //            this.rawParentLaunch = this.$rawParent.text();
            //            this.$trimParentLaunch = jQuery.trim(this.rawParentLaunch);
            this.childCasesID = '#' + this.actualLaunchID + '_00N40000002aU8H_body';
            //            console.log('this.childCasesID : ' + this.childCasesID);
            //            this.childCases = jQuery.trim(jQuery('#' + this.actualLaunchID + '_RelatedChildCaseList_body').text());
            this.childCasesText = jQuery.trim(jQuery('#' + this.actualLaunchID + '_00N40000002aU8H_body').text());
            console.log(this.childCasesText);
            //            this.commentsID = '#' + this.actualLaunchID + '_RelatedCommentsList_link';
            this.host = window.location.hostname;
            console.log('this.host : ' + this.host);
            this.protocol = window.location.protocol;
            console.log('this.protocol : ' + this.protocol);

            //            this.win = '';
        },
        changeTab: function () {
            //            switch (this.pageToChange) {
            //                case 'Proof':
            //                    launchToolbar.config.$toggleOn.html('&#9666; ' + this.status);
            //                    launchToolbar.config.$toggleOff.html(this.status + ' &#9656;');
            //                    break;
            //                case 'Publish':
            //                    launchToolbar.config.$toggleOn.html('&#9666; ' + this.status);
            //                    launchToolbar.config.$toggleOff.html(this.status + ' &#9656;');
            //                    break;
            //                default:
            //                    // nothing
            //                    break;
            //            }
            launchToolbar.config.$toggleOn.html('&#9666; Launch');
            launchToolbar.config.$toggleOff.html('Launch &#9656;');
        },
        buildWSMlink: function () {
            if (-1 != this.webID.search('gmcl')) {
                if (-1 != this.webID.search('-fr')) {
                    launchToolbar.config.wsmLink = launchToolbar.config.base + this.webID + launchToolbar.config.fr_ca;
                } else {
                    launchToolbar.config.wsmLink = launchToolbar.config.base + this.webID + launchToolbar.config.en_ca;
                }
            } else if (-1 != this.webID.search('holden')) {
                if (-1 != this.webID.search('holdennz')) {
                    launchToolbar.config.wsmLink = launchToolbar.config.base + this.webID + launchToolbar.config.nz;
                } else {
                    launchToolbar.config.wsmLink = launchToolbar.config.base + this.webID + launchToolbar.config.au;
                }
            } else {
                launchToolbar.config.wsmLink = launchToolbar.config.base + this.webID + launchToolbar.config.us;
            }
        },
        caseCheck: function () {
            //            var _cases = '_00N40000002aU8H_link',
            //                $caseLink = jQuery('#' + this.actualLaunchID + '' + _cases);
            if (this.childCasesText !== 'No records to display') {
                console.log('cases made');
                jQuery('.ptBody .content').append(launchToolbar.config.$casesMade);

                jQuery('listHoverLinks').on('load', setTimeout(this.colorRelatedCases.bind(this), 2000));
            }
            console.log('no cases made');
        },
        buildFolderPath: function () {
            switch (this.oem) {
                case 'gmps':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'gmpsdealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'gmcl':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'gmcldealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'vw':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'vwdealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'hyun':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'hyundaistores.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'mazda':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'mazdadealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'lex':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'lexusdealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + 'lexus\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'k1ia':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'k1iadealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'b2mw':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'b2mwdealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'mini':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'mini-dealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'motp':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'motorplace.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + 'motorplace\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'hond':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'hondadealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + 'honda\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'holden':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'gmholdendealer.com.au/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'holdennz':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'gmholdendealer.co.nz/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'nissan':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'nissandealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'toyd':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'toyotadealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + 'toyota\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
                case 'infiniti':
                    launchToolbar.config.liveSiteURL = launchToolbar.config.nitra + 'infiniti.dealer.com/' + this.id + launchToolbar.config.reload;
                    launchToolbar.config.folderPath = launchToolbar.config.baseManuLoc + this.oem + '\\' + this.id.charAt(0) + '\\' + this.id;
                    break;
            }
        },
        openAccountInfoPage: function () {
            //this.accountInfo = jQuery('#CF00N40000002aUDp_ileinner a').attr('href');
            //            console.log(this.accountInfo);
            var openThis = this.protocol + '//' + this.host + '' + this.accountInfo;
            console.log('openThis : ' + openThis);
            //            var openThis = 'https://cdk.my.salesforce.com/0014000000JvwMC';
            launchToolbar.config.accountPage = openInTab(openThis);

            //            launchToolbar.config.accountPage = window.open(openThis, '_blank');
            //            var win = window.open(openThis, '_blank');
            //            win.focus();
        },
        bindEvents: function () {
            launchToolbar.config.$toggleOn.on('click', this.animate);
            //            launchToolbar.config.$toggleOn.on('click', this.showBox);
            launchToolbar.config.$toggleOn.on('click', this.toggleBox);
            launchToolbar.config.$toggleOff.on('click', this.animate);
            launchToolbar.config.$toggleOff.on('click', this.toggleBox);
            //            launchToolbar.config.$toggleOff.on('click', this.hideBox);
            launchToolbar.config.$idCombo.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$launchID.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$copyWebID.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$accountName.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$folderImage.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$BACinfo.on('click', this.toggleThis.bind(this));
        },
        toggleThis: function (event) {
            var $event = jQuery(event.target),
                classText = $event.attr('class');
            console.log('$event');
            console.log($event);
            console.log('class : ' + classText);
            switch (classText) {
                case 'BACinfo':
                    launchToolbar.config.$BACtable.toggle(1000);
                    break;
            }
            //            return .toggle(1000)
        },
        addStyles: function () {
            launchToolbar.config.$toolbarStyles
                // general toolbox styles
                //                .append('.funcButtons { display: none; float: right; padding: 3px 15px 0; cursor: pointer; border-right: 1px rgb(112, 160, 121) solid; padding-top: 0px; } ')
                .append('.funcButtons { display: none; padding: 3px 15px 0; cursor: pointer; border-right: 1px rgb(112, 160, 121) solid; padding-top: 0px; } ')
                .append('.myTitle { color: #000000; } ')
                .append('.myClass { line-height: 30px;  height: 30px; } ')
                .append('.imp { float: left !important; } '); // end
        },
        buildTool: function () {
            launchToolbar.config.$status.append(this.statusText);
            launchToolbar.config.$accountName.append(this.accountName);
            launchToolbar.config.$EditLink.append(launchToolbar.config.$Edit);
            launchToolbar.config.$EditLink.attr({
                href: launchToolbar.config.wsmLink
            });
            launchToolbar.config.$copyProof.append(launchToolbar.config.$desktopIcon);
            launchToolbar.config.$idCombo.append(launchToolbar.config.$plusIcon);
            launchToolbar.config.$liveSite.append(launchToolbar.config.$copyProof);
            launchToolbar.config.$liveSite.attr({
                href: launchToolbar.config.liveSiteURL
            });
            launchToolbar.config.$copyFolderPath.append(launchToolbar.config.$folderImage);
            //            launchToolbar.config.$commentCase.append(launchToolbar.config.$commentOnCase);
            //            launchToolbar.config.$commentCase.attr({
            //                href: this.enterCommentURL
            //            });
            //            launchToolbar.config.$commentCaseContainer.append(launchToolbar.config.$commentCase);
            //            launchToolbar.config.$changeCaseOwner.append(launchToolbar.config.$followInfo);
            //            launchToolbar.config.$changeCaseOwner.append(this.followUp);
            //            launchToolbar.config.$changeCaseOwner.attr({
            //                href: this.changeCaseOwner
            //            });
            //            launchToolbar.config.$closeCase.attr({
            //                href: this.changeCaseOwner
            //            });
            launchToolbar.config.$launchID.append(this.launchID);
            launchToolbar.config.$copyWebID.append(this.webID);
            launchToolbar.config.$webnum.append(this.webnumText);
            launchToolbar.config.$proofDate.append(this.proofDateText);
            launchToolbar.config.$launchDate.append(this.launchDateText);
            launchToolbar.config.$webIDtext.append(this.webIDtext);

            launchToolbar.config.$BACinfo.append(launchToolbar.config.$clickMe);

            launchToolbar.config.$uiBox.append(launchToolbar.config.$toggleOn)
                .append(launchToolbar.config.$toggleOff)
                //                .append(launchToolbar.config.$status)
                .append(launchToolbar.config.$webIDtext)
                .append(launchToolbar.config.$accountName)
                .append(launchToolbar.config.$EditLink)
                .append(launchToolbar.config.$launchID)
                .append(launchToolbar.config.$idCombo)
                .append(launchToolbar.config.$copyWebID)
                .append(launchToolbar.config.$webnum)
                .append(launchToolbar.config.$proofDate)
                .append(launchToolbar.config.$launchDate)
                .append(launchToolbar.config.$liveSite)
                .append(launchToolbar.config.$copyFolderPath)
                //                .append(launchToolbar.config.$commentCaseContainer)
                //                .append(launchToolbar.config.$changeCaseOwner)
                .append(launchToolbar.config.$importantInfo)
                .append(launchToolbar.config.$dynoDisplay)
                .append(launchToolbar.config.$BACinfo)
                .append(launchToolbar.config.$BACtable);
        },
        attachTool: function () {
            this.$head.append(launchToolbar.config.$toolbarStyles);
            this.$head.append(launchToolbar.config.$jQueryLink);
            //            this.$body.append(launchToolbar.config.$uiBox);
            this.$body.prepend(launchToolbar.config.$placeholder);
            this.$body.prepend(launchToolbar.config.$uiBox);
        },
        getBAC: function () {
            //            jQuery('#importantInfo').load('https://cdk--c.na27.visual.force.com/apex/ALL_AccountDetailPageOverride?id=0014000000JvwMC #j_id0_j_id5_0014000000JvwMC_00N40000002aU57');

        },
        startTool: function () {
            var commentsID = this.commentsID;
            setTimeout(function (commentsID) {
                jQuery(commentsID).css({
                    background: launchToolbar.config.commentsbgColor,
                    color: '#ccc'
                });
                launchToolbar.config.$toggleOn.trigger('click');
            }, 2000);
        },
        BACtable: function () {
            var BACvariable = 'BSCtable';

            if (getValue(BACvariable) === undefined) {
                // if table is empty
                this.BACtable();
            } else {
                // if table is not empty
                console.log('content loaded');
                setTimeout(function () {
                    launchToolbar.config.$BACtable.html(getValue(BACvariable));
                    setTimeout(function () {
                        //                    launchToolbar.config.$uiBox.append(launchToolbar.config.$BACinfo);
                        launchToolbar.config.$clickMe.toggle(500);
                    });
                }, 7000);
            }

        },
        // ----------------------------------------
        // TIER 2
        // ----------------------------------------
        colorRelatedCases: function () {
            var _cases = '_00N40000002aU8H_link',
                $caseLink = jQuery('#' + this.actualLaunchID + '' + _cases);
            $caseLink.css({
                background: 'linear-gradient(to left, rgb(130, 40, 90), rgb(100, 30, 75))',
                color: '#ccc'
            });
        },
        animate: function () {
            var $funcButts = jQuery('.funcButtons');
            launchToolbar.config.$toggleOn.toggle();
            launchToolbar.config.$toggleOff.toggle();
            $funcButts.toggle();
        },
        toggleBox: function () {
            launchToolbar.config.$placeholder.slideToggle("slow");
            launchToolbar.config.$uiBox.slideToggle("slow", function () {
                if (jQuery(this).is(':visible')) {
                    jQuery(this).css({
                        display: 'inline-block'
                    });
                }
            });
            //            launchToolbar.config.$uiBox.animate({
            //                width: "100%"
            //            }, "slow");
        },
        showBox: function () {
            launchToolbar.config.$uiBox.slideToggle("slow", function () {
                if (jQuery(this).is(':visible')) {
                    jQuery(this).css({
                        display: 'inline-block'
                    });
                }
            });
            //            launchToolbar.config.$uiBox.animate({
            //                width: "100%"
            //            }, "slow");
        },
        hideBox: function () {
            launchToolbar.config.$uiBox.animate({
                width: "150px"
            }, "slow");
        },
        clipboardCopy: function (event) {
            var $clickedElement = jQuery(event.target),
                classText = $clickedElement.attr('class');

            console.log($clickedElement);
            console.log('classText :' + classText);

            switch (true) {
                case (classText.indexOf('idCombo') === 0):
                    console.log('idCombo');
                    this.copyInfo(this.comboID);
                    break;
                case (classText.indexOf('launchID') === 0):
                    console.log('launchID');
                    this.copyInfo(this.launchID);
                    break;
                case (classText.indexOf('copyWebid') === 0):
                    console.log('copyWebid');
                    this.copyInfo(this.webID);
                    break;
                case (classText.indexOf('accountName') === 0):
                    console.log('accountName');
                    this.copyInfo(this.accountName);
                    break;
                case (classText.indexOf('copyFolderPath') === 0):
                    console.log('copyFolderPath');
                    this.copyInfo(launchToolbar.config.folderPath);
                    break;
                default:
                    console.log('nothing copied');
            }
        },
        // ----------------------------------------
        // tier 3
        // ----------------------------------------
        copyInfo: function (variable) {
            var $display = jQuery('<div>').css({
                display: 'none'
            });
            GM_setClipboard(variable, 'text');
            $display.text('COPIED ' + variable);
            launchToolbar.config.$dynoDisplay.toggle().append($display);
            $display.slideToggle(500).delay(3000).slideToggle(500, function () {
                $display.remove();
                launchToolbar.config.$dynoDisplay.toggle();
            });
        }
    };

    var getBAC = {
        init: function () {
            this.getBAC();
            //            this.checkFocus();
        },
        getBAC: function () {

            jQuery(document).ready(function () {
                var beginning = 'j_id0_j_id5_',
                    end = '_00N40000002aU57',
                    location = window.location.href,
                    body = '_body',
                    findID = 'id=',
                    BACvariable = 'BSCtable',
                    accountID, tableID, tableBody, startLocation, endLocation, $BACbody;

                // search url for account id
                startLocation = location.indexOf(findID) + findID.length;
                endLocation = location.indexOf('&');
                accountID = location.slice(startLocation, endLocation);
                tableID = '#' + beginning + '' + accountID + '' + end;
                console.log(getValue(BACvariable));
                setTimeout(function () {
                    while (getValue(BACvariable) === undefined || getValue(BACvariable) === false) {
                        tableBody = tableID + body;
                        $BACbody = jQuery(tableBody);
                        setValue(BACvariable, $BACbody.html());
                    }
                }, 5000);
            });

            window.close();
        },
        checkFocus: function () {
            var window_focus = false;

            setInterval(function () {
                jQuery(window).focus(function () {
                    window_focus = true;
                }).blur(function () {
                    window_focus = false;
                });
                //                            jQuery('body').append('has focus? ' + window_focus + '<br>');
                console.log('focused : ' + window_focus);
            }, 2000);
        }
    };

    if (window.location.hostname === 'cdk.my.salesforce.com') {
        console.log('fire');
        launchToolbar.init();
    }

    //    jQuery(document).ready(function () {
    if (window.location.hostname === 'cdk--c.na27.visual.force.com') {
        getBAC.init();
    }
    //});

})();
