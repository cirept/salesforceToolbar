/*global jQuery, window, document, setTimeout, GM_setClipboard, GM_openInTab, GM_setValue, GM_getValue */

//TODO
//Launch Id - done
//Account - done
//WebID - done
//WebID Text - done
//Webnum - done
//Proof Due Date
//Expected Launch Date
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
            this.childCheck();
            this.parentCheck();
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
                $uiBox: jQuery('<div>').attr({
                    id: 'uiBox'
                }).css({
                    position: 'fixed',
                    'z-index': '1100000',
                    background: 'linear-gradient(to left, #FFAFBD , #ffc3a0)',
                    color: '#000',
                    'text-align': 'left',
                    'font-family': 'Arial',
                    'font-size': '12px',
                    //                    height: '25px',
                    width: '150px',
                    'font-weight': 'bold',
                    top: '0',
                    right: '0',
                    '-moz-border-radius': '10px 0 0 10px',
                    'border-radius': '10px 0 0 10px',
                    border: '1px #AAA solid',
                    'border-right': '0',
                    'padding': '7px 0px',
                    'padding-right': '80px'
                }),
                $toggleOn: jQuery('<div>').attr({
                    id: 'toggleOn'
                }).css({
                    'float': 'left',
                    //                    width: '100px',
                    margin: '0',
                    padding: '0px 10px',
                    cursor: 'pointer'
                }),
                $toggleOff: jQuery('<div>').attr({
                    id: 'toggleOff'
                }).css({
                    'float': 'left',
                    //                    width: '100px',
                    margin: '0',
                    padding: '0px 10px',
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
                    id: 'accountName',
                    class: 'funcButtons imp',
                    title: 'Copy Account Name'
                }).css({
                    //                    'float': 'left',
                    padding: '3px 15px 0',
                    height: '15px',
                    color: 'rgb(110, 55, 215)',
                    'padding-top': '0px'
                }).html('<div class="myTitle">Account</div>'),
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
                $launchID: jQuery('<div>').attr({
                    id: 'launchID',
                    class: 'funcButtons imp',
                    title: 'Copy Launch ID'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(255, 0, 0)'
                }).html('<div class="myTitle">Launch ID</div>'),
                $idCombo: jQuery('<div>').attr({
                    title: 'Copy WebID and Launch',
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
                    class: 'funcButtons imp'
                }).css({
                    //                    float: 'left',
                    color: 'rgb(255, 20, 155)'
                }).html('<div class="myTitle">Web ID</div>'),
                $webnum: jQuery('<div>').attr({
                    //                                        id: 'copyWebid',
                    id: 'copyWebnum',
                    title: 'Copy Webnum',
                    class: 'funcButtons imp'
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
                    color: 'rgb(140, 255, 55)'
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
                    class: 'funcButtons'
                }).css({
                    float: 'right'
                }),
                $copyFolderPath: jQuery('<div>').css({
                    float: 'right',
                    class: 'funcButtons'
                }),
                $folderImage: jQuery('<i>').attr({
                    class: 'fa fa-folder-open fa-lg funcButtons',
                    title: 'Project Folder Location',
                    id: 'copyFolderPath'
                }).css({
                    float: 'right',
                    display: 'none'
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
                commentsbgColor: 'linear-gradient(to left, #FF512F , #DD2476)',
                $importantInfo: jQuery('<div>').attr({
                    id: 'importantInfo'
                }),
                $BACinfo: jQuery('<div>').attr({
                    id: 'BACinfo',
                    class: 'funcButtons imp'
                }).text('Business Sites'),
                $BACtable: jQuery('<div>').css({
                    //                    display: 'inline-table',
                    display: 'none',
                    position: 'absolute',
                    'margin-top': '23px',
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
            this.launchID = jQuery('#Name_ileinner').text();

            this.$webID = jQuery('#CF00N40000002aUF9_ileinner a').css({
                background: 'rgb(255, 20, 155)',
                color: 'white'
            });
            this.webID = this.$webID.text();

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
                background: 'rgb(140, 255, 55)',
                color: 'black',
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
            //            this.caseID = this.path.slice(1);
            this.enterCommentURL = 'https://cdk.my.salesforce.com/00a/e?parent_id=' + this.launchID + '&retURL=%2F' + this.launchID;
            this.createdBy = jQuery('#CreatedBy_ileinner a').text();
            this.changeCaseOwner = 'https://cdk.my.salesforce.com/' + this.launchID + '/a?retURL=%2F' + this.launchID + '&newOwn=' + this.createdBy;
            this.closeCaseLink = 'https://cdk.my.salesforce.com/' + this.launchID + '/s?retURL=%2F';
            this.$body = jQuery('body');
            this.$head = jQuery('head');
            //            this.caseNo = jQuery('#cas2_ileinner').text();
            //            this.caseNumber = this.caseNo.substr(0, 8);
            //            this.webID = jQuery('#CF00N40000002aUB4_ileinner a').text();
            this.comboID = this.webID + ' ' + this.launchID;
            this.idArray = this.webID.split('-');
            this.oem = this.idArray[0];
            this.id = this.webID.substr(this.webID.indexOf('-') + 1);
            //            this.webIDtext = jQuery('#00N40000002OuSq_ileinner').text();
            this.pageToChange = jQuery('#00N40000002aU9c_ileinner').text();
            this.followUp = jQuery('#00N40000002aU7t_ileinner').text();
            this.$rawParent = jQuery('#cas28_ileinner');
            this.$rawParentLink = this.$rawParent.find('a');
            this.rawParentLaunch = this.$rawParent.text();
            this.$trimParentLaunch = jQuery.trim(this.rawParentLaunch);
            this.childCaseID = '#' + this.caseID + '_RelatedChildCaseList_link';
            this.childCases = jQuery.trim(jQuery('#' + this.caseID + '_RelatedChildCaseList_body').text());
            this.commentsID = '#' + this.caseID + '_RelatedCommentsList_link';
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
            launchToolbar.config.$toggleOn.html('&#9666; ' + this.webIDtext);
            launchToolbar.config.$toggleOff.html(this.webIDtext + ' &#9656;');
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
        childCheck: function () {
            if (this.childCases !== 'No records to display') {
                jQuery('.ptBody .content').append(launchToolbar.config.$childCase);

                jQuery('.listHoverLinks').on('load', setTimeout(this.colorRelatedCases, 2000));
            }
        },
        parentCheck: function () {
            if (this.$trimParentLaunch !== '') {
                jQuery('.ptBody .content').append(launchToolbar.config.$parentCase);
                this.$rawParentLink.css({
                    background: 'red',
                    color: 'white'
                });
            }
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
            launchToolbar.config.$toggleOn.on('click', this.showBox);
            launchToolbar.config.$toggleOff.on('click', this.animate);
            launchToolbar.config.$toggleOff.on('click', this.hideBox);
            launchToolbar.config.$idCombo.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$launchID.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$copyWebID.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$folderImage.on('click', this.clipboardCopy.bind(this));
            launchToolbar.config.$BACinfo.on('click', this.toggleThis.bind(this));
        },
        toggleThis: function (event) {
            var $event = jQuery(event.target),
                id = $event.attr('id');
            console.log('$event');
            console.log($event);
            console.log('id : ' + id);
            switch (id) {
                case 'BACinfo':
                    launchToolbar.config.$BACtable.toggle(1000);
                    break;
            }
            //            return .toggle(1000)
        },
        addStyles: function () {
            launchToolbar.config.$toolbarStyles
                // general toolbox styles
                .append('.funcButtons { display: none; float: right; padding: 3px 15px 0; cursor: pointer; border-right: 1px rgb(112, 160, 121) solid; padding-top: 0px; } ')
                .append('.myTitle { color: #000000; } ')
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
            launchToolbar.config.$liveSite.append(launchToolbar.config.$copyProof);
            launchToolbar.config.$liveSite.attr({
                href: launchToolbar.config.liveSiteURL
            });
            launchToolbar.config.$copyFolderPath.append(launchToolbar.config.$folderImage);
            launchToolbar.config.$commentCase.append(launchToolbar.config.$commentOnCase);
            launchToolbar.config.$commentCase.attr({
                href: this.enterCommentURL
            });
            launchToolbar.config.$commentCaseContainer.append(launchToolbar.config.$commentCase);
            launchToolbar.config.$changeCaseOwner.append(launchToolbar.config.$followInfo);
            launchToolbar.config.$changeCaseOwner.append(this.followUp);
            launchToolbar.config.$changeCaseOwner.attr({
                href: this.changeCaseOwner
            });
            launchToolbar.config.$closeCase.attr({
                href: this.changeCaseOwner
            });
            launchToolbar.config.$launchID.append(this.launchID);
            launchToolbar.config.$copyWebID.append(this.webID);
            launchToolbar.config.$webnum.append(this.webnumText);
            launchToolbar.config.$proofDate.append(this.proofDateText);
            launchToolbar.config.$launchDate.append(this.launchDateText);

            //            launchToolbar.config.$BACinfo.append(launchToolbar.config.$BACtable);

            launchToolbar.config.$uiBox.append(launchToolbar.config.$toggleOn)
                .append(launchToolbar.config.$toggleOff)
                //                .append(launchToolbar.config.$status)
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
                //                .append(launchToolbar.config.$BACinfo)
                .append(launchToolbar.config.$BACtable);
        },
        attachTool: function () {
            this.$head.append(launchToolbar.config.$toolbarStyles);
            this.$head.append(launchToolbar.config.$jQueryLink);
            this.$body.append(launchToolbar.config.$uiBox);
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
            }, 2500);
        },
        BACtable: function () {
            var BACvariable = 'BSCtable';

            //            setTimeout(launchToolbar.config.$BACtable.html(getValue(BACvariable)), 5000);
            setTimeout(function () {
                launchToolbar.config.$BACtable.html(getValue(BACvariable));
                setTimeout(function () {
                    launchToolbar.config.$uiBox.append(launchToolbar.config.$BACinfo);
                    launchToolbar.config.$BACinfo.toggle(500);
                });
            }, 5000);
            //            launchToolbar.config.$BACinfo.toggle(500);
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
            launchToolbar.config.$toggleOn.toggle();
            launchToolbar.config.$toggleOff.toggle();
            //            launchToolbar.config.$status.toggle();
            //            launchToolbar.config.$accountName.toggle();
            $funcButts.toggle();
        },
        showBox: function () {
            launchToolbar.config.$uiBox.animate({
                width: "75%"
            }, "slow");
        },
        hideBox: function () {
            launchToolbar.config.$uiBox.animate({
                width: "150px"
            }, "slow");
        },
        clipboardCopy: function (event) {
            var $clickedElement = jQuery(event.target),
                id = $clickedElement.attr('id'),
                variable = '',
                $display = jQuery('<div>').css({
                    display: 'none'
                });

            switch (id) {
                case 'idCombo':
                    variable = this.comboID;
                    break;
                case 'launchID':
                    variable = this.launchID;
                    break;
                case 'copyWebid':
                    variable = this.webID;
                    break;
                case 'copyFolderPath':
                    variable = launchToolbar.config.folderPath;
                    break;
            }
            //            console.log('copy clipboard ' + variable);
            GM_setClipboard(variable, 'text');
            $display.text('COPIED ' + variable);
            launchToolbar.config.$dynoDisplay.toggle().append($display);
            $display.slideToggle(500).delay(3000).slideToggle(500, function () {
                //                $display.empty();
                $display.remove();
                launchToolbar.config.$dynoDisplay.toggle();
            });
        }
    };

    var getBAC = {
        init: function () {
            this.getBAC();
        },
        getBAC: function () {

            jQuery(document).ready(function () {
                console.log('getBAC entered');
                console.log('account page detected');
                //                if (window.location.href.indexOf('AccountDetailPageOverride') > -1) {
                var beginning = 'j_id0_j_id5_',
                    accountID = '',
                    end = '_00N40000002aU57',
                    location = window.location.href,
                    locationText = jQuery.trim(window.location.href),
                    body = '_body',
                    startLocation, endLocation,
                    findID = 'id=',
                    tableID, tableBody,
                    BACvariable = 'BSCtable';

                console.log('location : ' + location);
                console.log('locationText : ' + locationText);
                // search url for account id
                startLocation = location.indexOf(findID) + findID.length;
                endLocation = location.indexOf('&');

                accountID = location.slice(startLocation, endLocation);
                console.log('accountID : ' + accountID);

                tableID = '#' + beginning + '' + accountID + '' + end;
                console.log('tableID : ' + tableID);

                var $testOBJ = jQuery(tableID);
                $testOBJ.css({
                    background: 'purple'
                });

                tableBody = tableID + body;
                var $BACbody = jQuery(tableBody);
                $BACbody.css({
                    background: 'purple'
                });


                //                console.log('testOBJ');
                //                console.log($testOBJ);
                //                var testOBJbody = jQuery(tableID).find('.pbBody');
                //                console.log('testOBJbody');
                //                console.log(testOBJbody);

                setValue(BACvariable, $BACbody.html());

                console.log(getValue(BACvariable));

                //                if (window.location.href.indexOf('closeMe') >= 0) {
                //                    window.close();
                //                }
                console.log(launchToolbar.config.accountPage);
                //                this.win.close();
            });
        }
    };

    if (window.location.hostname === 'cdk.my.salesforce.com') {
        launchToolbar.init();
    }

    //        if (window.location.href.indexOf('visual.force.com/') > 0) {
    if (window.location.hostname === 'cdk--c.na27.visual.force.com') {
        getBAC.init();
    }
})();
