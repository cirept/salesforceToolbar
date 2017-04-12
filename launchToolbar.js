/*global jQuery, window, setTimeout, GM_setClipboard, GM_openInTab, GM_setValue, GM_getValue, GM_info */

// Tampermonkey functions

function openInTab(url) {
    GM_openInTab(url, 'insert');
}

function setValue(variable, val) {
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
                        display: 'none',
                    }),
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
                    }).css({
                        float: 'right',
                        display: 'none'
                    }),
                    $toggleLabel: jQuery('<div>').css({
                        display: 'inline-block',
                        'line-height': '30px',
                        height: '30px',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }).text('TETRA'),
                    // toolbox version
                    $version: jQuery('<span>').text('version: ' + GM_info.script.version),
                    // email launch owner
                    $emailOwner: jQuery('<a>').attr({
                        title: 'Email Owner',
                        class: 'funcButtons myClass click-able'
                    }).css({
                        float: 'right'
                    }),
                    $mailIcon: jQuery('<i>').attr({
                        class: 'fa fa-envelope fa-lg myClass'
                    }),
                    $howToGuide: jQuery('<a>').attr({
                        title: 'Info About Tool',
                        class: 'funcButtons myClass click-able'
                    }).css({
                        float: 'right'
                    }),
                    $howToIcon: jQuery('<i>').attr({
                        class: 'fa fa-question-circle-o fa-lg myClass'
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
                this.launchID = this.$launchID.text(); // launch ID
                this.$webID = jQuery('#CF00N40000002aUF9_ileinner a').css({
                    background: 'rgb(255, 20, 155)',
                    color: 'white'
                });
                this.webID = this.$webID.text(); // web id

                this.comboID = this.launchID + ' ' + this.webID; // combo id
                this.$account = jQuery('#CF00N40000002aUDp_ileinner a').css({
                    background: 'rgb(110, 55, 215)',
                    color: 'white'
                });
                this.accountInfo = this.$account.attr('href'); // account info
                this.accountName = this.$account.text(); // acount name
                this.accountID = this.accountInfo.slice(1); // account id
                this.$webIDtext = jQuery('#00N40000002aUF8_ileinner').css({
                    background: 'rgb(180, 120, 120)',
                    color: 'white',
                    display: 'table'
                });
                this.webIDtext = this.$webIDtext.text(); // webid text
                this.$webnum = jQuery('#00N40000002cgmd_ileinner').css({
                    background: 'rgb(219, 112, 147)',
                    color: 'white',
                    display: 'table'
                });
                this.webnum = this.$webnum.text(); // webnum
                this.$proofDate = jQuery('#00N330000038W91_ileinner').css({
                    background: 'rgb(0, 100, 0)',
                    color: 'white',
                    display: 'table'
                });
                this.proofDateText = this.$proofDate.text(); // proof date
                this.$launchDate = jQuery('#00N33000002yrbp_ileinner').css({
                    background: 'rgb(165, 115, 50)',
                    color: 'white',
                    display: 'table'
                });
                this.launchDateText = this.$launchDate.text(); // launch date
                this.owner = jQuery('#Owner_ileinner').find('[id*="Owner"]').text(); // launch owner name
                this.$builder = jQuery('#CF00N40000002aUE2_ileinner'); // builder
                this.$body = jQuery('body'); // target body tag
                this.$head = jQuery('head'); // target head tag
                this.platformSelector = this.getChecked('platformSelector'); // platform selector
                this.$launchOwner = jQuery('#Owner_ileinner a[id*="Owner"]').attr({
                    class: 'launchOwner'
                });
                this.launchOwnerText = this.$launchOwner.text(); // launch owner
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
                        oem = 'lexus\\';
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
                        oem = 'motorplace\\';
                        break;
                    case 'hond':
                        oemPart = 'hondadealer.com/';
                        oem = 'honda\\';
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
                        oem = 'toyota\\';
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
                    .append('.funcButtons { display: none; padding: 3px 15px 0; border-right: 1px rgb(0, 0, 0) solid; padding-top: 0px; } ')
                    .append('.click-able { cursor: pointer; } ')
                    .append('.myTitle { color: #000000; } ')
                    .append('.listHoverLinks .linklet .count { font-size: 20px !important; } ')
                    .append('.myClass { line-height: 30px;  height: 30px; } ')
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
                launchToolbar.config.$platformToggle.append(launchToolbar.config.$toggleLabel);
                launchToolbar.config.$emailOwner.append(launchToolbar.config.$mailIcon);
                launchToolbar.config.$emailOwner.attr(({
                    href: encodeURI('mailto:' + this.launchOwnerText.replace(' ', '.') + '@cdk.com' + '?cc=Jennifer.Walker@cdk.com&subject=' + this.comboID)
                }));
                launchToolbar.config.$howToGuide.append(launchToolbar.config.$howToIcon);
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
                    .append(launchToolbar.config.$emailOwner)
                    .append(launchToolbar.config.$copyFolderPath)
                    .append(launchToolbar.config.$idCombo)
                    .append(launchToolbar.config.$importantInfo)
                    .append(launchToolbar.config.$dynoDisplay)
                    .append(launchToolbar.config.$BACinfo)
                    .append(launchToolbar.config.$BACtable);
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
                var $funcButts = jQuery('.funcButtons');

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
                    accountName, BACtableData, // = getValue('accountName'); //,
                    self = this;

                setTimeout(function () {
                    accountName = getValue('accountName'); //,
                    BACtableData = getValue(BACvariable);
                    if (BACtableData === 'undefined' || BACtableData === false || accountName === 'undefined' || accountName === false) {
                        // if table is empty
                        console.log('table is empty, running again');
                        //                    getBAC.init();
                        self.BACtable();
                    } else {
                        // if table is not empty
                        console.log('content loaded');
                        launchToolbar.config.$BACtable.html(BACtableData);
                        setTimeout(function () {
                            launchToolbar.config.$clickMe.text('Click for ' + accountName + ' Info');
                            launchToolbar.config.$clickMe.toggle(500);
                        });
                    }
                }, 4000);

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
                    case (event.which === 1):
                        return;
                    case (event.which === 3 || classText.indexOf('liveSite') >= 0):
                        console.log('liveSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 || classText.indexOf('proofSite') > -1):
                        console.log('proofSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 || classText.indexOf('wipSite') > -1):
                        console.log('wipSite switch case');
                        this.copyInfo($clickedElement.attr('href'));
                        break;
                    case (event.which === 3 || classText.indexOf('launchOwner') > -1):
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

                var beginning = 'j_id0_j_id5_',
                    end = '_00N40000002aU57',
                    location = window.location.href,
                    body = '_body',
                    findID = 'id=',
                    BACvariable = 'BSCtable',
                    accountNameText = jQuery('#acc2j_id0_j_id5_ileinner').text(),
                    accountID, tableID, tableBody, startLocation, endLocation, $BACbody, accountName;

                // reset value
                setValue(BACvariable, false);
                setValue('accountName', false);

                accountName = jQuery.trim(accountNameText.slice(0, accountNameText.indexOf('[')));

                // search url for account id
                startLocation = location.indexOf(findID) + findID.length;
                endLocation = location.indexOf('&');
                accountID = location.slice(startLocation, endLocation);
                tableID = '#' + beginning + '' + accountID + '' + end;

                while ((getValue(BACvariable) === 'undefined' || getValue(BACvariable) === false) || (getValue('accountName') === 'undefined' || getValue('accountName') === false)) {
                    console.log('get BAC');
                    tableBody = tableID + body;
                    $BACbody = jQuery(tableBody);
                    setValue(BACvariable, $BACbody.html());
                    setValue('accountName', accountName);
                }
                if (getValue(BACvariable) !== 'undefined' || getValue(BACvariable)) {
                    window.close();
                }
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
