/*global jQuery, window, document */

(function () {
    // ----------------------------------------
    // BUILD UI BOX
    // ----------------------------------------
    var path = window.location.pathname,
        caseID = path.slice(1), //;
        //    var caseHash = (window.location.href, window.location.pathname),
        //        caseID = caseHash.replace("/", ""),
        enterCommentURL = "https://cdk.my.salesforce.com/00a/e?parent_id=" + caseID + "&retURL=%2F" + caseID,
        $body = jQuery("body"),
        $uiBox = jQuery('<div>').attr({
            id: 'uiBox'
        }).css({
            position: "fixed",
            "z-index": "1100000",
            "background-color": "#FFEC15",
            background: "-moz-linear-gradient(top,  #e5e500,  #ffff00)",
            color: "#000",
            "text-align": "left",
            "font-family": "Arial",
            "font-size": "12px",
            height: "22px",
            width: "0px",
            "font-weight": "bold",
            top: "0",
            right: "0",
            "-moz-border-radius": "10px 0 0 10px",
            "border-radius": "10px 0 0 10px",
            border: "1px #AAA solid",
            "border-right": "0",
            "padding-top": "7px",
            "padding-right": "80px"
        }),
        $toggleOn = jQuery('<div>').attr({
            id: 'toggleOn'
        }).css({
            "float": "left",
            width: "70px",
            margin: "0",
            padding: "0 0 0 4px",
            cursor: "pointer"
        }),
        $toggleOff = jQuery('<div>').attr({
            id: 'toggleOff'
        }).css({
            "float": "left",
            width: "70px",
            margin: "0",
            padding: "0 0 0 8px",
            display: "none",
            cursor: "pointer",
            "border-right": "2px #aaa solid",
            height: "16px"
        }),
        caseNo = jQuery("#cas2_ileinner").text(),
        caseNumber = caseNo.substr(0, 8),
        webID = jQuery("#CF00N40000002aUB4_ileinner a").text(),
        base = "http://websites.cobalt.com/wsm/index.do?webId=",
        us = "&locale=en_US",
        en_ca = "&locale=en_CA",
        fr_ca = "&locale=fr_CA",
        au = "&locale=en_AU",
        nz = "&locale=en_NZ",
        wsmLink,
        //            n = jQuery("#uiBox"),
        pageToChange = jQuery("#00N40000002aU9c_ileinner").text(),
        followUp = jQuery("#00N40000002aU7t_ileinner").text(),
        createdBy = jQuery("#CreatedBy_ileinner a").text(),
        // functions
        // ----------------------------------------,
        $resultBox = jQuery('<div>').attr({
            id: 'resultBox'
        }).css({
            display: "none",
            "float": "right",
            color: "red",
            "background-color": "white",
            padding: "0 15px",
            margin: "2px 0 0 40px",
            "-moz-border-radius": "8px",
            "border-radius": "8px",
            border: "2px #aaa solid",
            cursor: "text"
        }),
        $rawParent = jQuery('#cas28_ileinner'),
        $rawParentLink = $rawParent.find('a'),
        rawParentLaunch = $rawParent.text(),
        $trimParentLaunch = jQuery.trim(rawParentLaunch),
        $childCaseLink = jQuery('#' + caseID + '_RelatedChildCaseList_link'),
        //        $childCaseLinkText = $childCaseLink.find('span'),
        childCases = jQuery.trim(jQuery('#' + caseID + '_RelatedChildCaseList_body').text()),
        $childCase = jQuery('<div>').css({
            color: 'purple',
            'margin-left': '5px'
        }).html('<b>Child Case:</b> Look for related cases'),
        $parentCase = jQuery('<div>').css({
            color: 'red',
            'margin-left': '5px'
        }).html('<b>Parent Case:</b> Look for related cases');
    //    console.log(caseID);

    // ----------------------------------------
    // check for parent / child lanches
    // ----------------------------------------

    //    var rawParentLaunch = jQuery('#cas28_ileinner').text(),
    //        trimParentLaunch = jQuery.trim(rawParentLaunch),
    //        childCases = jQuery('#' + caseID + '_RelatedChildCaseList_body').text();

    //    console.log(caseID);
    //    console.log(caseID + '_RelatedChildCaseList_link');
    //    console.log(caseID + '_RelatedChildCaseList_body');

    if ($trimParentLaunch !== '') {
        //        var R = '<div style ="color:red; margin-left:5px;"><b>CHILD CASE:</b> Look for related cases</div>';
        //    jQuery(".ptBody").after(R);
        jQuery(".ptBody .content").append($parentCase);
        $rawParentLink.css({
            background: 'red',
            color: 'white'
        });
    }

    console.log('childCases : ' + childCases);
    console.log(childCases !== 'No records to display');
    console.log($childCaseLink.text());
    jQuery('#5003300000u0025_RelatedChildCaseList_link').css({
        'background-color': 'purple'
    });
    var listLinks = jQuery('.listHoverLinks');
    var childCaseLink = listLinks.find(".linklet"); //.find("[id*='RelatedChildCaseList_link']");
    console.log('childCaseLink');
    //    console.log(childCaseLink.text());
    console.log(childCaseLink);
    //    .css({
    //        'background-color': 'purple'
    //    });
    jQuery('#5003300000u0025_RelatedAttachmentList_link').attr({
        style: 'background-color: purple;'
    });

    if (childCases !== 'No records to display') {
        //        var W = '<div style ="color:red; margin-left:5px;"><b>PARENT CASE:</b> Look for related cases</div>';
        //    jQuery(".ptBody").after(W);
        jQuery(".ptBody .content").append($childCase);
        $childCaseLink.attr({
            style: 'background-color: purple;'
        });
        //        $childCaseLinkText.css({
        //            background: 'purple'
        //        });
        //        var head = jQuery('head');
        //        var style = jQuery('<style>').attr({
        //            type: 'text/css',
        //            id: 'testMe'
        //        });
        //        style.append('#' + caseID + '_RelatedChildCaseList_link { background: purple; }');
        //        style.append('#5003300000u0025_RelatedChildCaseList_link { background: pink; }');
        //        head.append(style);
        //        jQuery(".ptBody .content").append(W);
    }

    // ----------------------------------------
    // ----------------------------------------

    //    console.log('createdBy : ' + createdBy);
    switch (pageToChange) {
    case "Proof":
        $toggleOn.html('&#9666; PROOF');
        $toggleOff.html('PROOF &#9656;');
        break;
    case "Publish":
        $toggleOn.html('&#9666; PUBLISH');
        $toggleOff.html('PUBLISH &#9656;');
        break;
    default:
        // nothing
        break;
    }

    $toggleOn.on('click', function () {
        $uiBox.animate({
            width: "75%"
        }, "slow");
        //        $uiBox.toggle('fade', 500);
        $toggleOn.toggle();
        $toggleOff.toggle();
        $funcButts.toggle();
        $accountLevel.toggle();
        //        $resultBox.toggle();
    });

    $toggleOff.on('click', function () {
        $uiBox.animate({
            width: "0px"
        }, "slow");
        //        $uiBox.toggle('fade', 500);
        $funcButts.css({
            background: "inherit",
            "text-shadow": "#aaa 0px 0px 0px"
        });
        $toggleOn.toggle();
        $toggleOff.toggle();
        $funcButts.toggle();
        //        $resultBox.hide();
        $accountLevel.toggle();
        //        $resultBox.toggle();
        //        $resultBox.text("");
    });

    $uiBox.append($toggleOn).append($toggleOff);

    // build wsm link
    if (-1 != webID.search("gmcl")) {
        if (-1 != webID.search("-fr")) {
            wsmLink = base + webID + fr_ca;
        } else {
            wsmLink = base + webID + en_ca;
        }
    } else if (-1 != webID.search("holden")) {
        if (-1 != webID.search("holdennz")) {
            wsmLink = base + webID + nz;
        } else {
            wsmLink = base + webID + au;
        }
    } else {
        wsmLink = base + webID + us;
    }

    // ----------------------------------------
    // ----------------------------------------

    var baseManuLoc = "\\\\las-mgmt1.lasisi01a.las.san.dsghost.net\\Associate\\sea\\CS\\graphics\\manufacturers\\",
        nitra = "http://nitra.",
        reload = "/?reload=true",
        idArray = webID.split("-"),
        oem = idArray[0],
        //            _ = webID.substr(webID.indexOf("-") + 1),
        id = webID.substr(webID.indexOf("-") + 1),
        liveSiteURL,
        folderPath;

    // start build liveSiteURL URL and folderPath
    switch (oem) {
    case "gmps":
        liveSiteURL = nitra + "gmpsdealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "gmcl":
        liveSiteURL = nitra + "gmcldealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "vw":
        liveSiteURL = nitra + "vwdealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "hyun":
        liveSiteURL = nitra + "hyundaistores.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "mazda":
        liveSiteURL = nitra + "mazdadealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "lex":
        liveSiteURL = nitra + "lexusdealer.com/" + id + reload;
        folderPath = baseManuLoc + "lexus\\" + id.charAt(0) + "\\" + id;
        break;
    case "k1ia":
        liveSiteURL = nitra + "k1iadealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "b2mw":
        liveSiteURL = nitra + "b2mwdealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "mini":
        liveSiteURL = nitra + "mini-dealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "motp":
        liveSiteURL = nitra + "motorplace.com/" + id + reload;
        folderPath = baseManuLoc + "motorplace\\" + id.charAt(0) + "\\" + id;
        break;
    case "hond":
        liveSiteURL = nitra + "hondadealer.com/" + id + reload;
        folderPath = baseManuLoc + "honda\\" + id.charAt(0) + "\\" + id;
        break;
    case "holden":
        liveSiteURL = nitra + "gmholdendealer.com.au/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "holdennz":
        liveSiteURL = nitra + "gmholdendealer.co.nz/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "nissan":
        liveSiteURL = nitra + "nissandealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    case "toyd":
        liveSiteURL = nitra + "toyotadealer.com/" + id + reload;
        folderPath = baseManuLoc + "toyota\\" + id.charAt(0) + "\\" + id;
        break;
    case "infiniti":
        liveSiteURL = nitra + "infinitidealer.com/" + id + reload;
        folderPath = baseManuLoc + oem + "\\" + id.charAt(0) + "\\" + id;
        break;
    }
    // end build liveSite URL and folderPath

    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // highlight things on page
    // ----------------------------------------
    //    var r = window.location.pathname,
    //    var $comments = jQuery('_RelatedCommentsList_link');
    //    var commentAmount = $comments.find('.count');
    //
    //    if (commentAmount !== 0) {
    //        $comments.css({
    //            background: 'red'
    //        });
    //    }
    //
    //    //        var z = "https://cdk.my.salesforce.com/" + a + "/a?retURL=%2F" + a + "&newOwn=" + createdBy,
    var changeCaseOwner = "https://cdk.my.salesforce.com/" + caseID + "/a?retURL=%2F" + caseID + "&newOwn=" + createdBy,
        //        //            j = "https://cdk.my.salesforce.com/" + a + "/s?retURL=%2F" + a,
        closeCaseLink = "https://cdk.my.salesforce.com/" + caseID + "/s?retURL=%2F",
        //        //            F = jQuery("#00N40000002OuSq_ileinner")[0].innerHTML;
        accountLevel = jQuery("#00N40000002OuSq_ileinner").text(),
        $accountLevel = jQuery('<div>').attr({
            //            class: 'funcButtons',
            id: 'accountLevel'
        }).css({
            display: "none",
            "float": "left",
            padding: "3px 15px 0",
            cursor: "pointer",
            //            "border-right": "2px #aaa solid",
            height: "15px",
            "padding-top": "0px"
        });
    //00N40000002OuSq_ileinner
    //    console.log(changeCaseOwner);
    //    console.log(closeCase);
    //    console.log(accountLevel);

    //    $uiBox.append(closeCaseLink);
    $accountLevel.append(accountLevel);
    $uiBox.append($accountLevel);

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<a href="' + wsmLink + '" target="_new"><div id="webID" class="funcButtons" style="color:gray;" title="Edit in WSM">EDIT</div></a>'); //done

    var $EditLink = jQuery('<a>').attr({
            target: '_new',
            href: wsmLink
        }),
        $Edit = jQuery('<div>').attr({
            id: 'webID',
            class: 'funcButtons',
            title: 'Edit in WSM'
        }).css({
            color: 'gray',
            float: 'right'
        }).text('EDIT');

    $EditLink.append($Edit);
    $uiBox.append($EditLink);
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<div id="resultBox"></div>'); //done
    //    var $resultBox = jQuery('<div>').attr({
    //        id: 'resultBox'
    //    }).css({
    //        display: "none",
    //        "float": "right",
    //        color: "red",
    //        "background-color": "white",
    //        padding: "0 15px",
    //        margin: "2px 0 0 40px",
    //        "-moz-border-radius": "8px",
    //        "border-radius": "8px",
    //        border: "2px #aaa solid",
    //        cursor: "text"
    //    });

    //    $uiBox.append($resultBox); //done
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<div id="caseNumber" class="funcButtons" title="Copy Case Number">' + caseNumber + "</div>"); //done

    var $caseNo = jQuery('<div>').attr({
        id: 'caseNumber',
        class: 'funcButtons',
        title: 'Copy Case Number'
    }).text(caseNumber).css({
        float: 'right'
    });

    $uiBox.append($caseNo); //done
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<div id="idCombo" title="Copy WebID and Case Number">+</div>'); //done

    var $idCombo = jQuery('<div>').attr({
        title: 'Copy WebID and Case Number',
        id: 'idCombo',
        class: 'funcButtons'
    }).css({
        "float": "right",
        height: "15px",
        "padding-top": "0px"
    }).text('+');

    $uiBox.append($idCombo); //done
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<div id="copyWebid" title="Copy WebID">' + webID + "</div>"); //done
    //        $copyWebID.css({
    //            //                "float": "right",
    //            //                padding: "3px 15px 0",
    //            //                cursor: "pointer",
    //            //                "border-right": "2px #aaa solid",
    //            //                height: "15px",
    //            //                "padding-top": "0px"
    //            //            }),

    var $copyWebID = jQuery('<div>').attr({
            id: 'copyWebid',
            title: 'Copy WebID',
            class: 'funcButtons'
        })
        //    .css({
        //        "float": "right",
        //        padding: "3px 15px 0",
        //        cursor: "pointer",
        //        "border - right": "2px #aaa solid",
        //        height: "15px",
        //        "padding-top": "0px",
        //        background: 'purple'
        //    })
        .text(webID);

    $uiBox.append($copyWebID); //done
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //$uiBox.append('<a href="' + liveSiteURL + '" target="_new"><div id="copyProof" class="funcButtons"><img src="http://assets.cobaltnitra.com/teams/repository/export/fda/575f081c91005867320145edef087/fda575f081c91005867320145edef087.png" height="15px" title="View Live Site"/></div></a>'); //done
    //        $uiBox.append('<a href="' + liveSiteURL + '" target="_new"><div id="copyProof" class="funcButtons">' + $desktopIcon + '</div></a>'); //done

    var $desktopIcon = jQuery('<i>').attr({
            class: 'fa fa-desktop fa-lg',
            'aira-hidden': 'true',
            title: 'View Live Site'
        }).css({
            float: 'right'
        }),
        $copyProof = jQuery('<div>').attr({
            id: 'copyProof',
            class: 'funcButtons'
        }).css({
            float: 'right'
        }),
        $liveSite = jQuery('<a>').attr({
            target: '_new',
            href: liveSiteURL,
            //            class: 'funcButtons'
        }).css({
            float: 'right'
        });

    $copyProof.append($desktopIcon);
    $liveSite.append($copyProof);
    $uiBox.append($liveSite);
    // ----------------------------------------
    // ----------------------------------------

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<div id="copyFolderPath" class="funcButtons"><img src="http://dm.cdk.com/inc/images/18x18_Folder.png" height="20px" title="Project Folder Location"/></div></div>'); //done

    var $copyFolderPath = jQuery('<div>').attr({
            id: 'copyFolderPath',
            class: 'funcButtons'
        }).css({
            float: 'right'
        }),
        $folderImage = jQuery('<i>').attr({
            class: 'fa fa-folder-open fa-lg',
            title: 'Project Folder Location'
        }).css({
            float: 'right'
        });

    $copyFolderPath.append($folderImage);
    $uiBox.append($copyFolderPath); //done

    // ----------------------------------------
    // ----------------------------------------
    //        $uiBox.append('<a href="' + enterCommentURL + '" target="_parent"> <div id="commentONCase" class="funcButtons" style="padding-left:12px !important; color:purple !important; font-size:11px !important;" title="Make a Comment">Comment</div> </a>'); //done

    var $commentCaseContainer = jQuery('<div>').attr({
            class: 'funcButtons'
        }).css({
            float: 'right'
        }),
        $commentCase = jQuery('<a>').attr({
            target: '_parent',
            href: enterCommentURL,
            //            class: 'funcButtons'
        }).css({
            float: 'right',
            'text-decoration': 'none'
        }),
        $commentOnCase = jQuery('<div>').attr({
            id: 'commentONCase',
            //            class: 'funcButtons',
            title: 'Make a Comment'
        }).css({
            'padding-left': '12px !important',
            color: 'purple!important',
            'font-size': '11 px!important'
        }).text('Comment');

    $commentCase.append($commentOnCase);
    $commentCaseContainer.append($commentCase);

    $uiBox.append($commentCaseContainer); //done
    // ----------------------------------------
    // ----------------------------------------

    var $changeCaseOwner = jQuery('<a>').attr({
            target: '_parent',
            href: changeCaseOwner
        }).css({
            float: 'right'
        }),
        $closeCase = jQuery('<a>').attr({
            target: '_parent',
            href: changeCaseOwner
        }),

        $followInfo = jQuery('<div>').attr({
            id: 'follow',
            class: 'funcButtons',
            title: 'Resolve Case'
        }).css({
            'padding-left': '12px !important',
            color: 'red !important',
            'font-size': '11px !important'
        }).text(followUp);
    //
    //    if ("Resolve Back to Ticket Owner" === followUp) {
    //        //            $uiBox.append('<a href="' + changeCaseOwner + '" target="_parent"><div id="follow" class="funcButtons" style="padding-left:12px !important; color:red !important; font-size:11px !important;" title="Resolve Case">' + followUp + "</div></a>");
    $changeCaseOwner.append($followInfo);
    $uiBox.append($changeCaseOwner);
    //    } else {
    //        //            $uiBox.append('<a href="' + closeCase + '" target="_parent"><div id="follow" class="funcButtons" style="padding-left:12px !important;  color:red !important; font-size:11px !important;" title="Close Case">' + followUp + "</div></a>");
    //    $closeCase.append($followInfo);
    //    $uiBox.append($closeCase);
    //    }
    //
    //    $uiBox.append('<div id="echelon" style="padding-left:12px; padding-top:0px; float:left; color:blue; font-size:11px;"> <span style="color:orange;">' + accountLevel + "</span></div>");
    //
    //    $uiBox.append('<div id="follow" class="funcButtons" style="padding-left:12px; padding-top:5px; float:left; color:blue; font-size:11px;"> <span style="color:black;">Created By:&nbsp;&nbsp;&nbsp;</span><span id="creator" title="Copy Name">' + createdBy + "</span></div>");

    // functions
    // ----------------------------------------
    //    var funcButts = jQuery(".funcButtons").css({
    //        display: "none",
    //        "float": "right",
    //        padding: "3px 15px 0",
    //        cursor: "pointer",
    //        "border-right": "2px #aaa solid",
    //        height: "15px",
    //        "padding-top": "0px"
    //    });

    $idCombo.click(function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", webID + " " + caseNumber);
    });
    //
    $caseNo.click(function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", caseNumber);
    });
    //
    $copyWebID.click(function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", webID);
    });
    //
    jQuery("#creator").click(function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", createdBy);
    });
    //
    $copyFolderPath.click(function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", folderPath);
    });


    // This should be added last
    $body.append($uiBox);
    var $funcButts = jQuery(".funcButtons").css({
        display: "none",
        "float": "right",
        padding: "3px 15px 0",
        cursor: "pointer",
        "border-right": "2px #aaa solid",
        height: "15px",
        "padding-top": "0px"
    });
})();

// end functions
// ----------------------------------------

//        var T = (jQuery("#emailBugTeam"), jQuery("#webID"), jQuery("#assignButton")),
//        var $bugTeam = jQuery("#emailBugTeam"),
//            $webID = jQuery("#webID"),
//            $addignButton = jQuery("#assignButton"),
//            E = (jQuery("#jumpLinkDown"), jQuery("#jumpLinkUp"), jQuery("#copyFolderPath")),
//            $jumpLinkDown = jQuery("#jumpLinkDown"),
//            $jumpLinkUp = jQuery("#jumpLinkUp"),
//            $folderPath = jQuery("#copyFolderPath"),
//            Q = jQuery("#copyFolderPath > img"),
//            N = jQuery(".funcButtons"),
//            H = jQuery("#resultBox"),
//            M = jQuery("#toggleOn"),
//            O = jQuery("#toggleOff"),
//            U = jQuery("#idCombo"),
//            $caseNoWebIDCombo = jQuery("#idCombo");
//            I = jQuery("#copyWebid");
//            I = jQuery("#copyWebid");

//        if (
//            //            $caseNoWebIDCombo.css({
//            //                "float": "right",
//            //                padding: "3px 5px 0",
//            //                cursor: "pointer",
//            //                "border-right": "2px #aaa solid",
//            //                height: "15px",
//            //                "padding-top": "0px"
//            //            }), //added
//
//            //
//            //            N.css({
//            //                display: "none",
//            //                "float": "right",
//            //                padding: "3px 15px 0",
//            //                cursor: "pointer",
//            //                "border-right": "2px #aaa solid",
//            //                height: "15px",
//            //                "padding-top": "0px"
//            //            }),
//            //            H.css({
//            //                display: "none",
//            //                "float": "right",
//            //                color: "red",
//            //                "background-color": "white",
//            //                padding: "0 15px",
//            //                margin: "2px 0 0 40px",
//            //                "-moz-border-radius": "8px",
//            //                "border-radius": "8px",
//            //                border: "2px #aaa solid",
//            //                cursor: "text"
//            //            }),
//            //            $toggleOn.css({
//            //                "float": "left",
//            //                width: "70px",
//            //                margin: "0",
//            //                padding: "0 0 0 4px",
//            //                cursor: "pointer"
//            //            }),
//            //            $toggleOff.css({
//            //                "float": "left",
//            //                width: "70px",
//            //                margin: "0",
//            //                padding: "0 0 0 8px",
//            //                display: "none",
//            //                cursor: "pointer",
//            //                "border-right": "2px #aaa solid",
//            //                height: "16px"
//            //            }),
//            //            Q.css({
//            //                "margin-top": "-3px"
//            //            }),
//
//            //            jQuery("#idCombo").click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID + " " + caseNumber);
//            //            }),
//            //            jQuery("#caseNumber").click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", caseNumber);
//            //            }),
//            //            jQuery("#copyWebid").click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID);
//            //            }),
//            //            $copyWebID.click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID);
//            //            }),
//            //            jQuery("#creator").click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", createdBy);
//            //            }),
//            //            $folderPath.click(function () {
//            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", folderPath);
//            //            }),
////            $bugTeam.click(function () {}), void 0 != jQuery("#cas28_ileinner a").html()
//            ) {
//            console.log("child case");
//        }

// ----------------------------------------
// check for parent / child lanches
// ----------------------------------------

//        var P = document.getElementById(a + "_RelatedChildCaseList_link").innerHTML,
//            S = P.replace("]</span></span>", ""),
//            D = S.charAt(S.length - 1);


//var rawParentLaunch = jQuery('#CF00N40000002hyAq_ileinner').text(),
//var rawParentLaunch = jQuery('#cas28_ileinner').text(),
//    trimParentLaunch = jQuery.trim(rawParentLaunch);
//
//if (trimParentLaunch !== '') {
//    var R = '<div style ="color:red; margin-left:5px;"><b>CHILD CASE:</b> Look for related cases</div>';
//    //    jQuery(".ptBody").after(R);
//    jQuery(".ptBody .content").append(R);
//}
//if (x !== 'No records to display') {
//    var W = '<div style ="color:red; margin-left:5px;"><b>PARENT CASE:</b> Look for related cases</div>';
//    //    jQuery(".ptBody").after(W);
//    jQuery(".ptBody .content").append(W);
//}

//var x = jQuery('#' + caseID + '_RelatedChildCaseList_body');
//var v = window.location.pathname,
//    c = v.split('/'),
//    caseID = c[1];
//console.log(caseID);

//console.log(v);
//console.log(x.text());



// ----------------------------------------

// ----------------------------------------
// ----------------------------------------

//    var t = window.location.href,
//        a = t.split("/")[3];
//
//    t.search("cdk.my.salesforce.com/500?") && (jQuery("document").ready(function () {
//
//        var e = jQuery("#userNavLabel")[0].innerHTML,
//            t = jQuery("#cas1_ileinner a")[1].innerHTML,
//            a = jQuery("#CF00N40000002aU5w_ileinner")[0].innerHTML;
//
//        "&nbsp;" == a && jQuery("#CF00N40000002aU5w_ileinner").css("backgroundColor", "#FFF85E"), t == e && jQuery("#CF00N40000002aU5w_ileinner").dblclick(function () {
//            jQuery("#CF00N40000002aU5w").val(t);
//        }), setTimeout(function () {
//            jQuery("#toggleOn").trigger("click");
//        }, 5);
//    }), e());

// ----------------------------------------
// ----------------------------------------


// TO DO CREATE finding feature for attachments

//    var path = window.location.pathname,
//        caseID = path.slice(1),
//        a = r.slice(1),
//        o = document.getElementById(caseID + "_RelatedCommentsList_link").innerHTML,
//        o = document.getElementById(a + "_RelatedCommentsList_link").innerHTML,
//        i = o.replace("]</span></span>", ""),
//        n = i.charAt(i.length - 1),
//        d = jQuery("#cas7_ileinner")[0].innerHTML;

//    "0" != n && "Closed" != d && (document.getElementById(a + "_RelatedCommentsList_link").style.backgroundColor = "red");
//    "0" != n && "Closed" != d && (document.getElementById(caseID + "_RelatedCommentsList_link").style.backgroundColor = "red");

//    var l = document.getElementById(a + "_RelatedAttachmentList_link").innerHTML,
//    var l = document.getElementById(caseID + "_RelatedAttachmentList_link").innerHTML,
//        p = l.replace("]</span></span>", ""),
//        c = p.charAt(p.length - 1);
//    "0" != c && (document.getElementById(a + "_RelatedAttachmentList_link").style.backgroundColor = "gold");
//    "0" != c && (document.getElementById(caseID + "_RelatedAttachmentList_link").style.backgroundColor = "gold");



/*
id = CF00N40000002aUE2_ileinner = builder name
id = CF00N40000002cgmH_ileinner = QA Builder
id = 00N40000002aUE1_ileinner = Build Status
id = 00N40000002aUF8_ileinner = WebID
id = 00N40000002cgmE_ileinner = proto loop number
id = 00N40000002cglV_ileinner = dealerCode
launch case search = a1E
*/
