/*global jQuery, window, setTimeout, GM_setClipboard, GM_openInTab, GM_setValue, GM_getValue, GM_info, setInterval, clearInterval, document */
// Tampermonkey functions

function openInTab(url) {
    GM_openInTab(url);
}

function setValue(variable, val) {
    console.log('set value of "' + variable + '" to ' + val);
    GM_setValue(variable, val);
}

function getValue(variable) {
    return GM_getValue(variable, 'false');
}

(function () {

    var launchToolbar = {
            init: function () {
                this.createElements();
                this.cacheDOM();

                this.getEmail(); //test function
                this.getLogURL(); //test function

                this.buildWSMlink();
                this.buildFolderPath();
                this.openAccountInfoPage();
                this.bindEvents();
                this.addStyles();
                this.buildTool();
                this.attachTool();
                this.switchPlatform();
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
                        'z-index': '9999',
                        background: 'linear-gradient(to left, #FFAFBD , #ffc3a0)',
                        color: '#000',
                        'text-align': 'left',
                        'font-size': '12px',
                        width: '99%',
                        'font-weight': 'bold',
                        '-moz-border-radius': '10px',
                        'border-radius': '10px',
                        border: '1px #000 solid',
                        'padding': '7px 0px',
                        'font-family': '"Montserrat"'
                    }),
                    $toggleOn: jQuery('<div>').attr({
                        id: 'toggleOn',
                        class: 'myClass funcButtons imp'
                    }).css({
                        'line-height': '15px'
                    }).html('<b>Launch</b> <i class="fa fa-angle-right fa-lg">&nbsp;</i><br> version: ' + GM_info.script.version),
                    $toolbarStyles: jQuery('<style>').attr({
                        id: 'qa_toolbox',
                        type: 'text/css'
                    }),
                    $jQueryLink: jQuery('<script>').attr({
                        type: 'text/javascript',
                        src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
                    }),
                    $montFontLink: jQuery('<link>').attr({
                        rel: 'stylesheet',
                        href: 'https://fonts.googleapis.com/css?family=Montserrat:500'
                    }),
                    $accountName: jQuery('<div>').attr({
                        class: 'accountName funcButtons imp click-able',
                        title: 'Copy Account Name'
                    }).css({
                        padding: '3px 15px 0',
                        color: 'rgb(110, 55, 215)',
                        'padding-top': '0px'
                    }).html('<div class="myTitle">Account</div>'),
                    $EditLink: jQuery('<a>').attr({
                        target: '_new',
                        class: 'WSMedit funcButtons myClass',
                        title: 'Edit in WSM'
                    }).css({
                        float: 'right'
                    }).text('EDIT in WSM'),
                    $webIDtext: jQuery('<div>').attr({
                        class: 'webIDtext funcButtons imp click-able',
                        title: 'Copy WebID Text'
                    }).css({
                        color: 'rgb(180, 120, 120)'
                    }).html('<div class="myTitle">WebID Text</div>'),
                    $launchID: jQuery('<div>').attr({
                        class: 'launchID funcButtons imp click-able',
                        title: 'Copy Launch ID'
                    }).css({
                        color: 'rgb(255, 0, 0)'
                    }).html('<div class="myTitle">Launch ID</div>'),
                    $idCombo: jQuery('<div>').attr({
                        title: 'Copy WebID and Launch',
                        class: 'funcButtons myClass idCombo click-able'
                    }).css({
                        float: 'right',
                    }),
                    $plusIcon: jQuery('<i>').attr({
                        class: 'fa fa-plus fa-lg myClass click-able',
                        'aira-hidden': 'true'
                    }).css({
                        float: 'right'
                    }),
                    $copyWebID: jQuery('<div>').attr({
                        title: 'Copy WebID',
                        class: 'copyWebid funcButtons imp click-able'
                    }).css({
                        color: 'rgb(255, 20, 155)'
                    }).html('<div class="myTitle">Web ID</div>'),
                    $webnum: jQuery('<div>').attr({
                        title: 'Copy Webnum',
                        class: 'copyWebnum funcButtons imp click-able'
                    }).css({
                        color: 'rgb(219, 112, 147)'
                    }).html('<div class="myTitle">Webnum</div>'),
                    $proofDate: jQuery('<div>').attr({
                        title: 'Proof Date',
                        class: 'funcButtons imp'
                    }).css({
                        color: 'rgb(0, 100, 0)'
                    }).html('<div class="myTitle">Proof Date</div>'),
                    $launchDate: jQuery('<div>').attr({
                        title: 'Launch Date',
                        class: 'funcButtons imp'
                    }).css({
                        color: 'rgb(165, 115, 50)'
                    }).html('<div class="myTitle">Launch Date</div>'),
                    $wipSite: jQuery('<a>').attr({
                        target: '_new',
                        class: 'wipSite funcButtons click-able myClass',
                        title: 'View WIP Site - RIGHT CLICK TO COPY URL'
                    }).css({
                        float: 'right'
                    }).text('WIP'),
                    $proofSite: jQuery('<a>').attr({
                        target: '_new',
                        class: 'proofSite funcButtons click-able myClass',
                        title: 'View PROOF Site - RIGHT CLICK TO COPY URL'
                    }).css({
                        float: 'right'
                    }).text('PROOF'),
                    $liveSite: jQuery('<a>').attr({
                        target: '_new',
                        class: 'liveSite funcButtons click-able myClass',
                        title: 'View LIVE Site - RIGHT CLICK TO COPY URL'
                    }).css({
                        float: 'right'
                    }).text('LIVE'),
                    $copyFolderPath: jQuery('<div>').attr({
                        class: 'funcButtons copyFolderPath click-able',
                        title: 'Project Folder Location in Manu Folder'
                    }).css({
                        float: 'right',
                        display: 'none'
                    }),
                    $folderImage: jQuery('<i>').attr({
                        class: 'fa fa-folder-open fa-lg myClass'
                    }),
                    $importantInfo: jQuery('<div>').attr({
                        id: 'importantInfo'
                    }),
                    $BACinfo: jQuery('<div>').attr({
                        class: 'BACinfo funcButtons imp click-able'
                    }).html('<div class="myTitle BACinfo">Dealer Code/BAC</div>'),
                    $clickMe: jQuery('<div>').attr({
                        class: 'BACinfo'
                    }).css({
                        //                        display: 'none',
                    }).text('Content Loading'),
                    $BACtable: jQuery('<div>').css({
                        display: 'none',
                        position: 'absolute',
                        'margin-top': '38px',
                        background: 'rgb(255, 255, 255)',
                        border: '1px solid rgb(0, 0, 0)',
                    }),
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
                    }),
                    $platformToggle: jQuery('<div>').attr({
                        class: 'funcButtons platformToggle click-able',
                        title: 'Sets the platform that these --> links lead too'
                    }).addClass('myClass').css({
                        float: 'right',
                        display: 'none'
                    }),
                    $toggleLabel: jQuery('<div>').css({
                        display: 'inline-block',
                        //                        'line-height': '30px',
                        //                        height: '30px',
                        //                        'font-weight': 'bold',
                        //                        'font-size': '12px'
                    }), //.addClass('myClass'), //.text('TETRA'),
                    $arrowIcon: jQuery('<i>').attr({
                        class: 'fa fa-angle-double-right fa-lg myClass',
                        style: 'vertical-align: -1px; margin: 0px 0px 0px 5px;'
                    }),
                    // toolbox version
                    $version: jQuery('<span>').text('version: ' + GM_info.script.version),
                    // email launch owner
                    //                    $emailOwner: jQuery('<a>').attr({
                    //                        title: 'Email Owner (Opens in Default Mail Program)',
                    //                        class: 'funcButtons myClass click-able'
                    //                    }).css({
                    //                        float: 'right'
                    //                    }),
                    //                    $mailIcon: jQuery('<i>').attr({
                    //                        class: 'fa fa-envelope fa-lg myClass'
                    //                    }).prepend('O'),
                    $salesforceEmailOwner: jQuery('<a>').attr({
                        title: 'Email Owner (Opens in a New Tab)',
                        class: 'funcButtons myClass click-able'
                    }).css({
                        float: 'right'
                    }),
                    $salesforceEmailIcon: jQuery('<i>').attr({
                        class: 'fa fa-envelope-o fa-lg myClass'
                    }).prepend('SF'),
                    $howToGuide: jQuery('<a>').attr({
                        title: 'Info About Tool',
                        class: 'funcButtons myClass click-able'
                    }).css({
                        float: 'right'
                    }),
                    $howToIcon: jQuery('<i>').attr({
                        class: 'fa fa-question-circle-o fa-lg myClass'
                    }),
                    //log call or chat
                    $logActivity: jQuery('<a>').attr({
                        title: 'Info About Tool',
                        class: 'funcButtons myClass click-able'
                    }).css({
                        float: 'right'
                    }),
                    $logActivityIcon: jQuery('<i>').attr({
                        class: 'fa fa-edit fa-lg myClass'
                    }).prepend('LOG')
                };
            },
            cacheDOM: function () {
                // launch stuff
                this.$launchID = jQuery('#Name_ileinner').css({
                    background: 'rgb(255, 0, 0)',
                    color: 'white',
                    display: 'table'
                }).addClass('myClass2');
                this.launchID = this.$launchID.text(); // launch ID
                console.log('this.launchID : ' + this.launchID);

                this.$webID = jQuery('#CF00N40000002aUF9_ileinner a').css({
                    background: 'rgb(255, 20, 155)',
                    color: 'white'
                }).addClass('myClass2');
                this.webID = this.$webID.text(); // web id
                console.log('this.webID : ' + this.webID);

                this.launchSFID = window.location.pathname;
                console.log('this.launchSFID : ' + this.launchSFID);

                this.comboID = this.launchID + ' ' + this.webID; // combo id
                this.$account = jQuery('#CF00N40000002aUDp_ileinner a').css({
                    background: 'rgb(110, 55, 215)',
                    color: 'white'
                }).addClass('myClass2');

                this.accountInfo = this.$account.attr('href'); // account info
                this.accountName = this.$account.text(); // acount name
                this.accountID = this.accountInfo.slice(1); // account id
                this.$webIDtext = jQuery('#00N40000002aUF8_ileinner').css({
                    background: 'rgb(180, 120, 120)',
                    color: 'white',
                    display: 'table'
                }).addClass('myClass2');
                this.webIDtext = this.$webIDtext.text(); // webid text

                this.$webnum = jQuery('#00N40000002cgmd_ileinner').css({
                    background: 'rgb(219, 112, 147)',
                    color: 'white',
                    display: 'table'
                }).addClass('myClass2');
                this.webnum = this.$webnum.text(); // webnum

                this.$proofDate = jQuery('#00N330000038W91_ileinner').css({
                    background: 'rgb(0, 100, 0)',
                    color: 'white',
                    display: 'table'
                }).addClass('myClass2');
                this.proofDateText = this.$proofDate.text(); // proof date

                this.$launchDate = jQuery('#00N33000002yrbp_ileinner').css({
                    background: 'rgb(165, 115, 50)',
                    color: 'white',
                    display: 'table'
                }).addClass('myClass2');
                this.launchDateText = this.$launchDate.text(); // launch date

                this.$builder = jQuery('#CF00N40000002aUE2_ileinner'); // builder
                this.$body = jQuery('body'); // target body tag
                this.$head = jQuery('head'); // target head tag
                this.platformSelector = this.getChecked('platformSelector'); // platform selector
                this.$launchOwner = jQuery('#Owner_ileinner a[id*="Owner"]').attr({
                    class: 'launchOwner'
                });
                //Launch owner hover info
                this.launchMouseover = jQuery('#Owner_ileinner a[id*="Owner"]').attr('onmouseover');
                this.launchOwnerID = this.$launchOwner.attr('href').slice(1); // launch owner ID
                this.launchOwnerText = this.$launchOwner.text(); // launch owner



            },
            getEmail: function () {
                var ajaxRequestURL = this.launchMouseover.split("'")[3],
                    self = this, // can be re-written to loop through array to find info.
                    emailAddress;

                jQuery.ajax({
                    url: ajaxRequestURL,
                    context: document.body,
                    success: function (data) {
                        var trList = jQuery('<div>').html(data).find('.detailList').find('tr');
                        emailAddress = jQuery(trList[1]).find('a').text();


                        /// ----------------------------------------
                        //build salesForce Link
                        // add to url link
                        // find id "a1E33000002eEQo_RelatedHistoryList"
                        var id = self.launchSFID.slice(1) + '_RelatedHistoryList',
                            emailLink = jQuery('#' + id).find('input[value="Send an Email"]').attr('onclick').split("'")[1];

                        //                        console.log(email);
                        //                console.log(jQuery('#' + id).find('input[value="Send an Email"]').attr('onclick').split("'")[1]);
                        emailLink = emailLink + '&p24=' + emailAddress + '&p4=Jennifer.Walker@cdk.com;Erika.Myrick@cdk.com&p6=' + self.comboID;
                        //                        emailLink = emailLink + '&p24=eric.tanaka@cdk.com&p4=Ian.Gahagan@cdk.com;jun.kim@cdk.com;jennifer.walker@cdk.com&p6=' + self.comboID;

                        //                console.log(emailLink);
                        launchToolbar.config.$salesforceEmailOwner.attr(({
                            //                    href: encodeURI('mailto:' + emailAddress + '?cc=Jennifer.Walker@cdk.com&subject=' + self.comboID)
                            href: encodeURI(emailLink),
                            target: '_blank'
                        }));
                        //                        console.log('email link : ' + launchToolbar.config.$emailOwner.attr('href'));
                        //                &p24='+emailAddress+'&p4=Jennifer.Walker%40cdk.com&p6='+self.comboID
                        /// ----------------------------------------

                        //build default email link
                        //                        fa-envelope-o

                        //                        launchToolbar.config.$emailOwner.attr(({
                        //                            href: encodeURI('mailto:' + emailAddress + '?cc=Jennifer.Walker@cdk.com&subject=' + self.comboID)
                        //                            //                    href: encodeURI(emailLink)
                        //                        }));

                    }
                });

                //                launchToolbar.config.$emailOwner.attr(({
                //                    href: encodeURI('mailto:' + emailAddress + '?cc=Jennifer.Walker@cdk.com&subject=' + self.comboID)
                //                    //                    href: encodeURI(emailLink)
                //                }));

            },
            getLogURL: function () {
                //Log note
                //a1E33000002eDfr_RelatedHistoryList
                var logID = this.launchSFID.replace('/', '#') + '_RelatedHistoryList';
                console.log('logID : ' + logID);
                var logURL = jQuery(logID).find('input[value="Log a Call"]').attr('onclick').split("'")[1];
                console.log('logURL : ' + logURL);
            },
            buildWSMlink: function () {
                var base = 'http://websites.cobalt.com/wsm/index.do?webId=',
                    wsmLink = '';

                if (-1 != this.webID.search('gmcl')) {
                    if (-1 != this.webID.search('-fr')) {
                        wsmLink = base + this.webID + '&locale=fr_CA';
                    } else {
                        wsmLink = base + this.webID + '&locale=en_CA';
                    }
                } else if (-1 != this.webID.search('holden')) {
                    if (-1 != this.webID.search('holdennz')) {
                        wsmLink = base + this.webID + '&locale=en_NZ';
                    } else {
                        wsmLink = base + this.webID + '&locale=en_AU';
                    }
                } else {
                    wsmLink = base + this.webID + '&locale=en_US';
                }

                launchToolbar.config.$EditLink.attr({
                    href: wsmLink
                });
            },
            buildFolderPath: function () {
                var //oem = this.oem,
                    platformSelector = this.platformSelector ? '&nextGen=true' : '&nextgen=false',
                    nitra = 'http://nitra.',
                    wip = 'wip.',
                    proof = 'proof.',
                    reload = '/?reload=true',
                    baseManuLoc = '\\\\las-mgmt1.lasisi01a.las.san.dsghost.net\\Associate\\sea\\CS\\graphics\\manufacturers\\',
                    oem = this.webID.split('-')[0],
                    id = this.webID.substr(this.webID.indexOf('-') + 1),
                    oemPart;

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
                }

                launchToolbar.config.folderPath = baseManuLoc + oem + '\\' + id.charAt(0) + '\\' + id;

                launchToolbar.config.$wipSite.attr({
                    href: nitra + wip + oemPart + id + reload + platformSelector
                });
                launchToolbar.config.$proofSite.attr({
                    href: nitra + proof + oemPart + id + reload + platformSelector
                });
                launchToolbar.config.$liveSite.attr({
                    href: nitra + oemPart + id + reload + platformSelector
                });
            },
            openAccountInfoPage: function () {
                var host = window.location.hostname,
                    protocol = window.location.protocol,
                    openThis = protocol + '//' + host + '' + this.accountInfo;
                openInTab(openThis);
            },
            bindEvents: function () {
                launchToolbar.config.$idCombo.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$launchID.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$copyWebID.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$accountName.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$copyFolderPath.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$webIDtext.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$webnum.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$wipSite.on('mousedown', this.clipboardLinkCopy.bind(this));
                launchToolbar.config.$wipSite.bind('contextmenu', function () {
                    return false;
                });
                launchToolbar.config.$proofSite.on('mousedown', this.clipboardLinkCopy.bind(this));
                launchToolbar.config.$proofSite.bind('contextmenu', function () {
                    return false;
                });
                launchToolbar.config.$liveSite.on('mousedown', this.clipboardLinkCopy.bind(this));
                launchToolbar.config.$liveSite.bind('contextmenu', function () {
                    return false;
                });
                this.$launchOwner.on('mousedown', this.clipboardLinkCopy.bind(this));
                this.$launchOwner.bind('contextmenu', function () {
                    return false;
                });
                launchToolbar.config.$BACinfo.on('click', this.clipboardCopy.bind(this));
                launchToolbar.config.$platformToggle.on('click', this.flipTheSwitch.bind(this));
                launchToolbar.config.$platformToggle.on('click', this.buildFolderPath.bind(this));
            },
            addStyles: function () {
                launchToolbar.config.$toolbarStyles
                    // general toolbox styles
                    .append('.funcButtons { display: none; padding: 0px 15px; border-right: 1px rgb(0, 0, 0) solid; padding-top: 0px; } ')
                    .append('.click-able { cursor: pointer; } ')
                    .append('.myTitle { color: #000000; } ')
                    .append('.listHoverLinks { font-size: 1rem; } ')
                    .append('.listHoverLinks .linklet .count { font-weight: bold; } ')
                    .append('.myClass { line-height: 30px;  height: 30px; } ')
                    .append('.myClass2 { font-size: 1rem; } ')
                    .append('.myClass:hover { font-weight: bold; } ')
                    .append('.imp { float: left !important; } '); // end
            },
            buildTool: function () {
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
                launchToolbar.config.$platformToggle.append(launchToolbar.config.$toggleLabel).append(launchToolbar.config.$arrowIcon);
                //                launchToolbar.config.$emailOwner.append(launchToolbar.config.$mailIcon);

                launchToolbar.config.$salesforceEmailOwner.append(launchToolbar.config.$salesforceEmailIcon); //tester

                launchToolbar.config.$howToGuide.append(launchToolbar.config.$howToIcon);

                launchToolbar.config.$logActivity.append(launchToolbar.config.$logActivityIcon); //tester

                launchToolbar.config.$uiBox.append(launchToolbar.config.$toggleOn)
                    .append(launchToolbar.config.$webIDtext)
                    .append(launchToolbar.config.$accountName)
                    .append(launchToolbar.config.$launchID)
                    .append(launchToolbar.config.$copyWebID)
                    .append(launchToolbar.config.$webnum)
                    .append(launchToolbar.config.$proofDate)
                    .append(launchToolbar.config.$launchDate)
                    .append(launchToolbar.config.$howToGuide)
                    .append(launchToolbar.config.$wipSite)
                    .append(launchToolbar.config.$proofSite)
                    .append(launchToolbar.config.$liveSite)
                    .append(launchToolbar.config.$platformToggle)
                    .append(launchToolbar.config.$EditLink)
                    //                    .append(launchToolbar.config.$emailOwner)

                    .append(launchToolbar.config.$salesforceEmailOwner) //tester
                    //                    .append(launchToolbar.config.$logActivity) //tester

                    .append(launchToolbar.config.$copyFolderPath)
                    .append(launchToolbar.config.$idCombo)
                    .append(launchToolbar.config.$importantInfo)
                    .append(launchToolbar.config.$dynoDisplay)
                    .append(launchToolbar.config.$BACinfo)
                    .append(launchToolbar.config.$BACtable);

                jQuery(':last');
            },
            attachTool: function () {
                this.$head.append(launchToolbar.config.$toolbarStyles);
                this.$head.append(launchToolbar.config.$jQueryLink);
                this.$head.append(launchToolbar.config.$montFontLink);
                this.$body.prepend(launchToolbar.config.$placeholder);
                this.$body.prepend(launchToolbar.config.$uiBox);
            },
            switchPlatform: function () {
                launchToolbar.config.$toggleLabel.css({
                    color: this.platformSelector ? 'purple' : 'blue'
                }).text(this.platformSelector ? 'NEXTGEN' : 'TETRA');
            },
            startTool: function () {
                var $funcButts = jQuery('.funcButtons'),
                    BACvariable = 'BSCtable';

                setValue('accountName', false);
                setValue(BACvariable, false);

                setTimeout(function () {
                    $funcButts.toggle();

                    launchToolbar.config.$placeholder.slideToggle("slow");
                    launchToolbar.config.$uiBox.slideToggle("slow", function () {
                        if (jQuery(this).is(':visible')) {
                            jQuery(this).css({
                                display: 'inline-block'
                            });
                        }
                    });
                }, 2000);
            },
            BACtable: function () {
                var BACvariable = 'BSCtable',
                    accountName, BACtableData,
                    dataGathered = false,
                    attempts = 1,
                    gatherInfo;

                setTimeout(function () {
                    /// set interval start
                    gatherInfo = setInterval(function () {
                        accountName = getValue('accountName');
                        BACtableData = getValue(BACvariable);

                        if (BACtableData === 'undefined' || BACtableData === false || accountName === 'undefined' || accountName === false) {
                            // if table is empty
                            attempts += 1;

                            if (attempts === 10) {
                                clearInterval(gatherInfo);
                            }
                        } else {
                            dataGathered = true;
                            // if table is not empty
                            console.log('content loaded');
                            launchToolbar.config.$BACtable.html(BACtableData);
                            launchToolbar.config.$clickMe.fadeOut(200, function () {
                                launchToolbar.config.$clickMe.text('Click for ' + accountName + ' Info').fadeIn(200);
                            });
                            clearInterval(gatherInfo);
                        }
                    }, 2000); //set interval end

                }, 2000); //set time out end
            },
            // ----------------------------------------
            // TIER 2
            // ----------------------------------------
            clipboardCopy: function (event) {
                var $clickedElement = jQuery(event.delegateTarget),
                    classText = $clickedElement.attr('class');

                switch (true) {
                    case (classText.indexOf('idCombo') > -1):
                        console.log('switch case');
                        this.copyInfo(this.comboID);
                        break;
                    case (classText.indexOf('launchID') > -1):
                        this.copyInfo(this.launchID);
                        break;
                    case (classText.indexOf('copyWebid') > -1):
                        this.copyInfo(this.webID);
                        break;
                    case (classText.indexOf('accountName') > -1):
                        this.copyInfo(this.accountName);
                        break;
                    case (classText.indexOf('copyFolderPath') > -1):
                        this.copyInfo(launchToolbar.config.folderPath);
                        break;
                    case (classText.indexOf('webIDtext') > -1):
                        this.copyInfo(this.webIDtext);
                        break;
                    case (classText.indexOf('Webnum') > -1):
                        this.copyInfo(this.webnum);
                        break;
                    case (classText.indexOf('BACinfo') > -1):
                        launchToolbar.config.$BACtable.toggle(1000);
                        break;
                    default:
                        console.log('nothing copied');
                }
            },
            clipboardLinkCopy: function (event) {
                var $clickedElement = jQuery(event.delegateTarget),
                    classText = $clickedElement.attr('class');

                switch (true) {
                    case (event.which === 3 && classText.indexOf('liveSite') >= 0):
                        console.log('liveSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 && classText.indexOf('proofSite') > -1):
                        console.log('proofSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 && classText.indexOf('wipSite') > -1):
                        console.log('wipSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 && classText.indexOf('launchOwner') > -1):
                        console.log('launchOwner switch case');
                        this.copyInfo(this.launchOwnerText);
                        break;
                    default:
                        console.log('nothing copied');
                }
            },
            flipTheSwitch: function () {
                // set saved variable to opposite of current value
                this.platformSelector = !this.getChecked('platformSelector');
                this.setChecked(this.platformSelector);
                // set toggle
                this.switchPlatform();
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
            },
            getChecked: function (variableName) {
                // grabs isNextGen value
                var a = getValue(variableName);
                return a;
            },
            setChecked: function (bool) {
                // sets isNextGen value
                setValue('platformSelector', bool);
            }
        },
        getBAC = {
            init: function () {
                this.getBAC();
            },
            getBAC: function () {
                var BACvariable = 'BSCtable',
                    findID = 'id=',
                    counter = 0,
                    gatherData, accountID, tableID, tableBody, startLocation, endLocation, $BACbody, accountName;

                // reset value
                setValue(BACvariable, false);
                setValue('accountName', false);

                // set interval start
                gatherData = setInterval(function () {

                    var location = window.location.href,
                        accountNameText = jQuery('#acc2j_id0_j_id5_ileinner').text();

                    if (location.indexOf('cdk--c.na27.visual.force.com') > -1) {
                        accountName = jQuery.trim(accountNameText.slice(0, accountNameText.indexOf('[')));

                        // search url for account id
                        startLocation = location.indexOf(findID) + findID.length;
                        endLocation = location.indexOf('&');
                        accountID = location.slice(startLocation, endLocation);
                        tableID = '#' + 'j_id0_j_id5_' + '' + accountID + '' + '_00N40000002aU57';

                        console.log('get BAC');
                        tableBody = tableID + '_body';
                        $BACbody = jQuery(tableBody);
                        setValue(BACvariable, $BACbody.html());
                        setValue('accountName', accountName);

                        counter += 1;
                        console.log(counter);

                        if (counter === 10) {
                            console.log('counter limit reached');
                            clearInterval(gatherData);
                        }

                        if (getValue(BACvariable) !== false && getValue('accountName') !== false) {
                            console.log('window is okay to close');
                            clearInterval(gatherData);
                            window.close();
                        }
                    }

                }, 1000); //set interval end
            }
        };


    if (window.location.hostname === 'cdk.my.salesforce.com') {
        launchToolbar.init();
    }

    // ----------------------------------------
    if (window.location.hostname === 'cdk--c.na27.visual.force.com') {
        getBAC.init();
    }
    // ----------------------------------------

})();
