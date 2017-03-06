/*global jQuery, window, document */

jQuery(window).bind("load", function () {
    function e() {
        // ----------------------------------------
        // BUILD UI BOX
        // ----------------------------------------
        var caseHash = (window.location.href, window.location.pathname),
            caseID = caseHash.replace("/", ""),
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
                width: "70px",
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
            }),
            $toggleOff = jQuery('<div>').attr({
                id: 'toggleOOff'
            }),
            caseNo = jQuery("#cas2_ileinner")[0].innerHTML,
            caseNumber = caseNo.substring(0, 8),
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
            createdBy = jQuery("#CreatedBy_ileinner a").text();

        // This should be added last
        $uiBox.append($toggleOn).append($toggleOff);
        $body.append($uiBox);

        // ----------------------------------------
        // ----------------------------------------

        console.log('createdBy : ' + createdBy);
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

        //        var z = "https://cdk.my.salesforce.com/" + a + "/a?retURL=%2F" + a + "&newOwn=" + createdBy,
        var changeCaseOwner = "https://cdk.my.salesforce.com/" + a + "/a?retURL=%2F" + a + "&newOwn=" + createdBy,
            //            j = "https://cdk.my.salesforce.com/" + a + "/s?retURL=%2F" + a,
            closeCase = "https://cdk.my.salesforce.com/" + a + "/s?retURL=%2F" + a,
            //            F = jQuery("#00N40000002OuSq_ileinner")[0].innerHTML;
            accountLevel = jQuery("#00N40000002OuSq_ileinner")[0].innerHTML;

        console.log(changeCaseOwner);
        console.log(closeCase);
        console.log(accountLevel);

        var $EditLink = jQuery('<a>').attr({
                target: '_new'
            }),
            $Edit = jQuery('<div>').attr({
                id: 'webID',
                class: 'funcButtons',
                title: 'Edit in WSM'
            }).css({
                color: 'gray'
            }),
            $resultBox = jQuery('<div>').attr({
                id: 'resultBox'
            }),
            $caseNo = jQuery('div').attr({
                id: 'caseNumber',
                class: 'funcButtons',
                title: 'Copy Case Number'
            }).text(caseNumber),
            $idCombo = jQuery('<div>').attr({
                title: 'Copy WebID and Case Number',
                id: 'idCombo'
            }).text('+'),
            $copyWebID = jQuery('<div>').attr({
                id: 'copyWebid',
                title: 'Copy WebID'
            }).text(webID),
            $liveSite = jQuery('<a>').attr({
                target: '_new'
            }),
            $openImage = jQuery('<i>').attr({
                class: 'fa fa-desktop',
                title: 'View Live Site'
            }),
            $copyFolderPath = jQuery('<div>').attr({
                id: 'copyFolderPath',
                class: 'funcButtons'
            }),
            $folderImage = jQuery('<i>').attr({
                class: 'fa fa-folder-open',
                title: 'Project Folder Location'
            }),
            $commentCase = jQuery('<a>').attr({
                target: '_parent',
                href: enterCommentURL
            }),
            $commentOnCase = jQuery('<div>').attr({
                id: 'commentONCase',
                class: 'funcButtons',
                title: 'Make a Comment'
            }).css({
                'padding-left': '12px !important',
                color: 'purple!important',
                'font-size': '11 px!important'
            }).text('Comment'),
            $follow = jQuery('<div>').attr({
                id: 'follow',
                class: 'funcButtons',
                title: 'Resolve Case'
            }).css({
                'padding-left': '12px !important',
                color: 'red !important',
                'font-size': '11px !important'
            }).text(followUp),
            $changeCaseOwner = jQuery('<a>').attr({
                target: '_parent',
                href: changeCaseOwner
            }),
            $closeCase = jQuery('<a>').attr({
                target: '_parent',
                href: changeCaseOwner
            });

        $uiBox.append('<a href="' + wsmLink + '" target="_new"><div id="webID" class="funcButtons" style="color:gray;" title="Edit in WSM">EDIT</div></a>'); //done

        //        $uiBox.append('<div id="resultBox"></div>'); //done
        $uiBox.append($resultBox); //done

        //        $uiBox.append('<div id="caseNumber" class="funcButtons" title="Copy Case Number">' + caseNumber + "</div>"); //done
        $uiBox.append($caseNo); //done

        //        $uiBox.append('<div id="idCombo" title="Copy WebID and Case Number">+</div>'); //done
        $uiBox.append($idCombo); //done

        //        $uiBox.append('<div id="copyWebid" title="Copy WebID">' + webID + "</div>"); //done
        $uiBox.append($copyWebID); //done

        $uiBox.append('<a href="' + liveSiteURL + '" target="_new"><div id="copyProof" class="funcButtons"><img src="http://assets.cobaltnitra.com/teams/repository/export/fda/575f081c91005867320145edef087/fda575f081c91005867320145edef087.png" height="15px" title="View Live Site"/></div></a>'); //done

        //        $uiBox.append('<div id="copyFolderPath" class="funcButtons"><img src="http://dm.cdk.com/inc/images/18x18_Folder.png" height="20px" title="Project Folder Location"/></div></div>'); //done
        $uiBox.append($copyFolderPath.append($folderImage)); //done

        //        $uiBox.append('<a href="' + enterCommentURL + '" target="_parent"> <div id="commentONCase" class="funcButtons" style="padding-left:12px !important; color:purple !important; font-size:11px !important;" title="Make a Comment">Comment</div> </a>'); //done
        $uiBox.append($commentCase.append($commentOnCase)); //done

        if ("Resolve Back to Ticket Owner" === followUp) {
            //            $uiBox.append('<a href="' + changeCaseOwner + '" target="_parent"><div id="follow" class="funcButtons" style="padding-left:12px !important; color:red !important; font-size:11px !important;" title="Resolve Case">' + followUp + "</div></a>");
            $uiBox.append($changeCaseOwner.append($follow));
        } else {
            //            $uiBox.append('<a href="' + closeCase + '" target="_parent"><div id="follow" class="funcButtons" style="padding-left:12px !important;  color:red !important; font-size:11px !important;" title="Close Case">' + followUp + "</div></a>");
            $uiBox.append($closeCase.append($follow));
        }

        $uiBox.append('<div id="echelon" style="padding-left:12px; padding-top:0px; float:left; color:blue; font-size:11px;"> <span style="color:orange;">' + accountLevel + "</span></div>");

        $uiBox.append('<div id="follow" class="funcButtons" style="padding-left:12px; padding-top:5px; float:left; color:blue; font-size:11px;"> <span style="color:black;">Created By:&nbsp;&nbsp;&nbsp;</span><span id="creator" title="Copy Name">' + createdBy + "</span></div>");

        //        var T = (jQuery("#emailBugTeam"), jQuery("#webID"), jQuery("#assignButton")),
        var $bugTeam = jQuery("#emailBugTeam"),
            $webID = jQuery("#webID"),
            $addignButton = jQuery("#assignButton"),
            //            E = (jQuery("#jumpLinkDown"), jQuery("#jumpLinkUp"), jQuery("#copyFolderPath")),
            $jumpLinkDown = jQuery("#jumpLinkDown"),
            $jumpLinkUp = jQuery("#jumpLinkUp"),
            $folderPath = jQuery("#copyFolderPath"),
            Q = jQuery("#copyFolderPath > img"),
            N = jQuery(".funcButtons"),
            H = jQuery("#resultBox"),
            //            M = jQuery("#toggleOn"),
            //            O = jQuery("#toggleOff"),
            //            U = jQuery("#idCombo"),
            $caseNoWebIDCombo = jQuery("#idCombo");
        //            I = jQuery("#copyWebid");
        //            I = jQuery("#copyWebid");

        if ($caseNoWebIDCombo.css({
                "float": "right",
                padding: "3px 5px 0",
                cursor: "pointer",
                "border-right": "2px #aaa solid",
                height: "15px",
                "padding-top": "0px"
            }), $copyWebID.css({
                "float": "right",
                padding: "3px 15px 0",
                cursor: "pointer",
                "border-right": "2px #aaa solid",
                height: "15px",
                "padding-top": "0px"
            }), N.css({
                display: "none",
                "float": "right",
                padding: "3px 15px 0",
                cursor: "pointer",
                "border-right": "2px #aaa solid",
                height: "15px",
                "padding-top": "0px"
            }), H.css({
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
            }), $toggleOn.css({
                "float": "left",
                width: "70px",
                margin: "0",
                padding: "0 0 0 4px",
                cursor: "pointer"
            }), $toggleOff.css({
                "float": "left",
                width: "70px",
                margin: "0",
                padding: "0 0 0 8px",
                display: "none",
                cursor: "pointer",
                "border-right": "2px #aaa solid",
                height: "16px"
            }), Q.css({
                "margin-top": "-3px"
            }), $toggleOn.click(function () {
                $uiBox.animate({
                    width: "75%"
                }, "slow"), $toggleOn.toggle(), $toggleOff.toggle(), N.toggle();
            }), $toggleOff.click(function () {
                $uiBox.animate({
                        width: "70px"
                    }, "slow"),
                    jQuery(".funcButtons").css({
                        background: "inherit",
                        "text-shadow": "#aaa 0px 0px 0px"
                    }), $toggleOn.toggle(),
                    $toggleOff.toggle(),
                    N.toggle(),
                    H.hide(),
                    H.text("");
            }),
            jQuery("#idCombo").click(function () {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID + " " + caseNumber);
            }),
            jQuery("#caseNumber").click(function () {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", caseNumber);
            }),
            //            jQuery("#copyWebid").click(function () {
            //                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID);
            //            }),
            $copyWebID.click(function () {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", webID);
            }),
            jQuery("#creator").click(function () {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", createdBy);
            }),
            $folderPath.click(function () {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", folderPath);
            }),
            $bugTeam.click(function () {}), void 0 != jQuery("#cas28_ileinner a").html()) {
            console.log("child case");
            var R = '<p style ="color:red; margin-left:5px;"><b>CHILD CASE:</b> Look for related cases</p>';
            jQuery(".ptBody").after(R);
        }
        var P = document.getElementById(a + "_RelatedChildCaseList_link").innerHTML,
            S = P.replace("]</span></span>", ""),
            D = S.charAt(S.length - 1);
        if ("0" != D) {
            var W = '<p style ="color:red; margin-left:5px;"><b>PARENT CASE:</b> Look for related cases</p>';
            jQuery(".ptBody").after(W);
        }
    }
    var t = window.location.href,
        a = t.split("/")[3];
    t.search("cdk.my.salesforce.com/500?") && (jQuery("document").ready(function () {
        var e = jQuery("#userNavLabel")[0].innerHTML,
            t = jQuery("#cas1_ileinner a")[1].innerHTML,
            a = jQuery("#CF00N40000002aU5w_ileinner")[0].innerHTML;
        "&nbsp;" == a && jQuery("#CF00N40000002aU5w_ileinner").css("backgroundColor", "#FFF85E"), t == e && jQuery("#CF00N40000002aU5w_ileinner").dblclick(function () {
            jQuery("#CF00N40000002aU5w").val(t);
        }), setTimeout(function () {
            jQuery("#toggleOn").trigger("click");
        }, 5);
    }), e());

    // ----------------------------------------
    // ----------------------------------------

    var r = window.location.pathname,
        a = r.slice(1),
        o = document.getElementById(a + "_RelatedCommentsList_link").innerHTML,
        i = o.replace("]</span></span>", ""),
        n = i.charAt(i.length - 1),
        d = jQuery("#cas7_ileinner")[0].innerHTML;
    "0" != n && "Closed" != d && (document.getElementById(a + "_RelatedCommentsList_link").style.backgroundColor = "red");
    var l = document.getElementById(a + "_RelatedAttachmentList_link").innerHTML,
        p = l.replace("]</span></span>", ""),
        c = p.charAt(p.length - 1);
    "0" != c && (document.getElementById(a + "_RelatedAttachmentList_link").style.backgroundColor = "gold");
});


/*
id = CF00N40000002aUE2_ileinner = builder name
id = CF00N40000002cgmH_ileinner = QA Builder
id = 00N40000002aUE1_ileinner = Build Status
id = 00N40000002aUF8_ileinner = WebID
id = 00N40000002cgmE_ileinner = proto loop number
id = 00N40000002cglV_ileinner = dealerCode
*/
