const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const moment = require("moment");
const nodemailer = require("nodemailer");
const Post = require("../models/post");
const Email = require("../models/mail");
const multer = require("../controllers/multer");
const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "mail.3qs.co.ke",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

router.post('/:id/green', async(req,res)=>{
    let newValue = await Post.findOneAndUpdate({_id: req.params.id}, {$inc: {likeCount:1}}, {new:true})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

router.post('/:id/red', async(req,res)=>{
    let newValue = await Post.findOneAndUpdate({_id: req.params.id}, {$inc: {dislikeCount:1}}, {new:true})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

router.post('/reach', async(req,res)=>{
    try {
        let { email } = req.body;
        let newMail = new Email({ email });
        let existingMail = await Email.findOne({email:email});

        if(existingMail){
            res.status(201).json({
                message: "Email Already Exists"
            })
        } else {
            newMail.save().then(()=>{
                let message = {
                    from: process.env.USER_EMAIL,
                    to: newMail.email,
                    subject: "Welcome to The Three Quality Services (“3QS”) Newsletter!",

                    html: "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\"><head>\n" +
                        "<!--[if gte mso 15]>\n" +
                        "<xml>\n" +
                        "<o:OfficeDocumentSettings>\n" +
                        "<o:AllowPNG/>\n" +
                        "<o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                        "</o:OfficeDocumentSettings>\n" +
                        "</xml>\n" +
                        "<![endif]-->\n" +
                        "<meta charset=\"UTF-8\"/>\n" +
                        "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\n" +
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n" +
                        "<title>*|MC:SUBJECT|*</title>\n" +
                        "<style>          img{-ms-interpolation-mode:bicubic;} \n" +
                        "          table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} \n" +
                        "          .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} \n" +
                        "          p, a, li, td, blockquote{mso-line-height-rule:exactly;} \n" +
                        "          p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} \n" +
                        "          @media only screen and (max-width: 480px){\n" +
                        "            body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} \n" +
                        "          }\n" +
                        "          .mcnPreviewText{display: none !important;} \n" +
                        "          .bodyCell{margin:0 auto; padding:0; width:100%;}\n" +
                        "          .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} \n" +
                        "          .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} \n" +
                        "          a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} \n" +
                        "            body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}\n" +
                        "            p{margin:0; padding:0;} \n" +
                        "            table{border-collapse:collapse;} \n" +
                        "            td, p, a{word-break:break-word;} \n" +
                        "            h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} \n" +
                        "            img, a img{border:0; height:auto; outline:none; text-decoration:none;} \n" +
                        "            a[href^=\"tel\"], a[href^=\"sms\"]{color:inherit; cursor:default; text-decoration:none;} \n" +
                        "            li p {margin: 0 !important;}\n" +
                        "            .ProseMirror a {\n" +
                        "                pointer-events: none;\n" +
                        "            }\n" +
                        "            @media only screen and (max-width: 480px){\n" +
                        "                body{width:100% !important; min-width:100% !important; } \n" +
                        "                body.mobile-native {\n" +
                        "                    -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;\n" +
                        "                }\n" +
                        "                body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {\n" +
                        "                    user-select: auto;\n" +
                        "                    -webkit-user-select: auto;\n" +
                        "                }\n" +
                        "                colgroup{display: none;}\n" +
                        "                img{height: auto !important;}\n" +
                        "                .mceWidthContainer{max-width: 660px !important;}\n" +
                        "                .mceColumn{display: block !important; width: 100% !important;}\n" +
                        "                .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}\n" +
                        "                .mceColumn-forceSpan .mceButton a{min-width:0 !important;}\n" +
                        "                .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} \n" +
                        "                .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} \n" +
                        "                .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}\n" +
                        "                .mceImage, .mceLogo{width: 100% !important; height: auto !important;} \n" +
                        "                .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}\n" +
                        "                .mceText, .mceText p{font-size: 16px !important; line-height: 140% !important;}\n" +
                        "                h1{font-size: 30px !important; line-height: 120% !important;}\n" +
                        "                h2{font-size: 26px !important; line-height: 120% !important;}\n" +
                        "                h3{font-size: 20px !important; line-height: 125% !important;}\n" +
                        "                h4{font-size: 18px !important; line-height: 125% !important;}\n" +
                        "            }\n" +
                        "            @media only screen and (max-width: 640px){\n" +
                        "                .mceClusterLayout td{padding: 4px !important;} \n" +
                        "            }\n" +
                        "            div[contenteditable=\"true\"] {outline: 0;}\n" +
                        "            .ProseMirror .empty-node, .ProseMirror:empty {position: relative;}\n" +
                        "            .ProseMirror .empty-node::before, .ProseMirror:empty::before {\n" +
                        "                position: absolute;\n" +
                        "                left: 0;\n" +
                        "                right: 0;\n" +
                        "                color: rgba(0,0,0,0.2);\n" +
                        "                cursor: text;\n" +
                        "            }\n" +
                        "            .ProseMirror .empty-node:hover::before, .ProseMirror:empty:hover::before {\n" +
                        "                color: rgba(0,0,0,0.3);\n" +
                        "            }\n" +
                        "            .ProseMirror h1.empty-node:only-child::before,\n" +
                        "            .ProseMirror h2.empty-node:only-child::before,\n" +
                        "            .ProseMirror h3.empty-node:only-child::before,\n" +
                        "            .ProseMirror h4.empty-node:only-child::before {\n" +
                        "                content: 'Heading';\n" +
                        "            }\n" +
                        "            .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {\n" +
                        "                content: 'Start typing...';\n" +
                        "            }\n" +
                        "            a .ProseMirror p.empty-node::before, a .ProseMirror:empty::before {\n" +
                        "                content: '';\n" +
                        "            }\n" +
                        "            .mceText, .ProseMirror {\n" +
                        "                white-space: pre-wrap;\n" +
                        "            }\n" +
                        "body, #bodyTable { background-color: rgb(244, 244, 244); }.mceText, .mceLabel { font-family: \"Helvetica Neue\", Helvetica, Arial, Verdana, sans-serif; }.mceText, .mceLabel { color: rgb(0, 0, 0); }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-48 .mceInput + .mceErrorMessage { margin-top: -24px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type=\"radio\"], .mceInput[type=\"checkbox\"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p { color: rgb(0, 0, 0); font-family: \"Helvetica Neue\", Helvetica, Arial, Verdana, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; text-align: center; direction: ltr; }.mceText h1 { color: rgb(0, 0, 0); font-family: \"Times New Roman\", Times, Baskerville, Georgia, serif; font-size: 48px; font-weight: bold; line-height: 1.5; text-align: center; direction: ltr; }\n" +
                        "@media only screen and (max-width: 480px) {\n" +
                        "            .mceText p { font-size: 16px !important; line-height: 1.5 !important; }\n" +
                        "          }\n" +
                        "@media only screen and (max-width: 480px) {\n" +
                        "            .mceText h1 { font-size: 31px !important; line-height: 1.5 !important; }\n" +
                        "          }\n" +
                        "@media only screen and (max-width: 480px) {\n" +
                        "            .mceBlockContainer { padding-left: 16px !important; padding-right: 16px !important; }\n" +
                        "          }\n" +
                        "#dataBlockId-11 p, #dataBlockId-11 h1, #dataBlockId-11 h2, #dataBlockId-11 h3, #dataBlockId-11 h4, #dataBlockId-11 ul { text-align: center; }\n" +
                        "@media only screen and (max-width: 480px) {\n" +
                        "        .mobileClass-63 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-63 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-63 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}\n" +
                        "      }</style>\n" +
                        "<script>!function(){function o(n,i){if(n&&i)for(var r in i)i.hasOwnProperty(r)&&(void 0===n[r]?n[r]=i[r]:n[r].constructor===Object&&i[r].constructor===Object?o(n[r],i[r]):n[r]=i[r])}try{var n=decodeURIComponent(\"%7B%0A%22ResourceTiming%22%3A%7B%0A%22comment%22%3A%20%22Clear%20RT%20Buffer%20on%20mPulse%20beacon%22%2C%0A%22clearOnBeacon%22%3A%20true%0A%7D%2C%0A%22AutoXHR%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20XHRs%20requested%20using%20FETCH%22%2C%0A%22monitorFetch%22%3A%20true%2C%0A%22comment%22%3A%20%22Start%20Monitoring%20SPAs%20from%20Click%22%2C%0A%22spaStartFromClick%22%3A%20true%0A%7D%2C%0A%22PageParams%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20all%20SPA%20XHRs%22%2C%0A%22spaXhr%22%3A%20%22all%22%0A%7D%0A%7D\");if(n.length>0&&window.JSON&&\"function\"==typeof window.JSON.parse){var i=JSON.parse(n);void 0!==window.BOOMR_config?o(window.BOOMR_config,i):window.BOOMR_config=i}}catch(r){window.console&&\"function\"==typeof window.console.error&&console.error(\"mPulse: Could not parse configuration\",r)}}();</script>\n" +
                        "                              <script>!function(a){var e=\"https://s.go-mpulse.net/boomerang/\",t=\"addEventListener\";if(\"True\"==\"True\")a.BOOMR_config=a.BOOMR_config||{},a.BOOMR_config.PageParams=a.BOOMR_config.PageParams||{},a.BOOMR_config.PageParams.pci=!0,e=\"https://s2.go-mpulse.net/boomerang/\";if(window.BOOMR_API_key=\"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA\",function(){function n(e){a.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!a.BOOMR||!a.BOOMR.version&&!a.BOOMR.snippetExecuted){a.BOOMR=a.BOOMR||{},a.BOOMR.snippetExecuted=!0;var i,_,o,r=document.createElement(\"iframe\");if(a[t])a[t](\"load\",n,!1);else if(a.attachEvent)a.attachEvent(\"onload\",n);r.src=\"javascript:void(0)\",r.title=\"\",r.role=\"presentation\",(r.frameElement||r).style.cssText=\"width:0;height:0;border:0;display:none;\",o=document.getElementsByTagName(\"script\")[0],o.parentNode.insertBefore(r,o);try{_=r.contentWindow.document}catch(O){i=document.domain,r.src=\"javascript:var d=document.open();d.domain='\"+i+\"';void(0);\",_=r.contentWindow.document}_.open()._l=function(){var a=this.createElement(\"script\");if(i)this.domain=i;a.id=\"boomr-if-as\",a.src=e+\"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA\",BOOMR_lstart=(new Date).getTime(),this.body.appendChild(a)},_.write(\"<bo\"+'dy onload=\"document._l();\">'),_.close()}}(),\"400\".length>0)if(a&&\"performance\"in a&&a.performance&&\"function\"==typeof a.performance.setResourceTimingBufferSize)a.performance.setResourceTimingBufferSize(400);!function(){if(BOOMR=a.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var e=\"\"==\"true\"?1:0,t=\"\",n=\"yxuel6yx3cojazqvicmq-f-8292a1043-clientnsv4-s.akamaihd.net\",i=\"false\"==\"true\"?2:1,_={\"ak.v\":\"37\",\"ak.cp\":\"1513051\",\"ak.ai\":parseInt(\"963350\",10),\"ak.ol\":\"0\",\"ak.cr\":118,\"ak.ipv\":4,\"ak.proto\":\"h2\",\"ak.rid\":\"127998aa\",\"ak.r\":36095,\"ak.a2\":e,\"ak.m\":\"x\",\"ak.n\":\"essl\",\"ak.bpcip\":\"197.232.69.0\",\"ak.cport\":61553,\"ak.gh\":\"23.210.93.92\",\"ak.quicv\":\"\",\"ak.tlsv\":\"tls1.3\",\"ak.0rtt\":\"\",\"ak.csrc\":\"-\",\"ak.acc\":\"\",\"ak.t\":\"1712668825\",\"ak.ak\":\"hOBiQwZUYzCg5VSAfCLimQ==EfPl4TC0WTGz69FwmxkXzv1i7xfJ0UJnaRLB355IftX088AK2m5QdNmFUdGc4DVTC01iGXpwWgYjFV9Ow/EDKZ3oLC0KssBbzIa+GsfOFh3UEsQPZjYzLxxJ5o9SJTrgfwxvhGLMDWVJjwbanDf5WEyOhozytvEV6O1pH1C1POEKlAGkYl8SPvEQEng56wtThgrdMHuAIAGqClsson0oU5QQf+qzmwnFLBhEUwRBz60qHCtKLdILFjHtSDNXibDpoe9zrtc3yzLFGPANtJLhva3C2cgjDJHeQYXyKLr3tTitAKBryiwnL/Gg+EDu9YzchEKBVWKuccIaFkVRPFM1w31uZz7/QBdTL88oc4czTNThYd4CaGevQXdPCVjmAZHh/iK1QJBUX9t14Pw+57XAd7B1ZIxs47K+48PmwOljUuI=\",\"ak.pv\":\"31\",\"ak.dpoabenc\":\"\",\"ak.tf\":i};if(\"\"!==t)_[\"ak.ruds\"]=t;var o={i:!1,av:function(e){var t=\"http.initiator\";if(e&&(!e[t]||\"spa_hard\"===e[t]))_[\"ak.feo\"]=void 0!==a.aFeoApplied?1:0,BOOMR.addVar(_)},rv:function(){var a=[\"ak.bpcip\",\"ak.cport\",\"ak.cr\",\"ak.csrc\",\"ak.gh\",\"ak.ipv\",\"ak.m\",\"ak.n\",\"ak.ol\",\"ak.proto\",\"ak.quicv\",\"ak.tlsv\",\"ak.0rtt\",\"ak.r\",\"ak.acc\",\"ak.t\",\"ak.tf\"];BOOMR.removeVar(a)}};BOOMR.plugins.AK={akVars:_,akDNSPreFetchDomain:n,init:function(){if(!o.i){var a=BOOMR.subscribe;a(\"before_beacon\",o.av,null,null),a(\"onbeacon\",o.rv,null,null),o.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script></head>\n" +
                        "<body>\n" +
                        "<!--*|IF:MC_PREVIEW_TEXT|*-->\n" +
                        "<!--[if !gte mso 9]><!----><span class=\"mcnPreviewText\" style=\"display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;\">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->\n" +
                        "<!--*|END:IF|*-->\n" +
                        "<center>\n" +
                        "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"bodyTable\" style=\"background-color: rgb(244, 244, 244);\">\n" +
                        "<tbody><tr>\n" +
                        "<td class=\"bodyCell\" align=\"center\" valign=\"top\">\n" +
                        "<table id=\"root\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody data-block-id=\"15\" class=\"mceWrapper\"><tr><td align=\"center\" valign=\"top\" class=\"mceWrapperOuter\"><!--[if (gte mso 9)|(IE)]><table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"660\" style=\"width:660px;\"><tr><td><![endif]--><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:660px\" role=\"presentation\"><tbody><tr><td style=\"background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover\" class=\"mceWrapperInner\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"14\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0\" class=\"mceColumn\" data-block-id=\"-10\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" class=\"mceBlockContainer\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color:transparent\" role=\"presentation\" data-block-id=\"2\"><tbody><tr><td style=\"min-width:100%;border-top:20px solid transparent\" valign=\"top\"></td></tr></tbody></table></td></tr><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px\" class=\"mceBlockContainer\" align=\"center\" valign=\"top\"><img data-block-id=\"3\" width=\"224.6166950596252\" height=\"auto\" style=\"width:224.6166950596252px;height:auto;max-width:224.6166950596252px !important;display:block\" alt=\"Logo\" src=\"https://mcusercontent.com/059817b19145863287c9bd4b1/images/7d480a7d-a8bb-bb0d-f11a-fc8b237521f0.png\" class=\"mceLogo\"/></td></tr><tr><td style=\"background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" class=\"mceBlockContainer\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color:transparent\" role=\"presentation\" data-block-id=\"4\"><tbody><tr><td style=\"min-width:100%;border-top:20px solid transparent\" valign=\"top\"></td></tr></tbody></table></td></tr><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px\" class=\"mceBlockContainer\" valign=\"top\"><div data-block-id=\"5\" class=\"mceText\" id=\"dataBlockId-5\" style=\"width:100%\"><h1 class=\"last-child\">Welcome Aboard</h1></div></td></tr><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px\" class=\"mceBlockContainer\" valign=\"top\"><div data-block-id=\"6\" class=\"mceText\" id=\"dataBlockId-6\" style=\"width:100%\"><p>As a subscriber, you're now part of our exclusive community where we share exciting updates, news, offers and insider insights directly to your inbox.</p><p><br/></p><p>Here's what you can expect from us:</p><p><br/></p><p>1. <strong>Fresh Updates</strong>: Stayin the loop with the latest news, events, and developments from 3QS. Whether it's product launches, industry trends, or company announcements, you'll be the first to know.</p><p><br/></p><p>2. <strong>Helpful Resources</strong>: Gain access to valuable resources, tips, and guides curated to enhance your experience with our products/services and enrich your knowledge.</p><p><br/></p><p>3. <strong>Community Engagement</strong>: Join the conversation! We encourage you to share your thoughts, feedback, and ideas with us. Your input is invaluable as we strive to improve and tailor our offerings to better serve you.</p><p class=\"last-child\"><br/></p></div></td></tr><tr><td style=\"background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" class=\"mceBlockContainer\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color:transparent\" role=\"presentation\" data-block-id=\"8\"><tbody><tr><td style=\"min-width:100%;border-top:20px solid transparent\" valign=\"top\"></td></tr></tbody></table></td></tr><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0\" class=\"mceLayoutContainer\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"9\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"24\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"margin-bottom:24px\" class=\"mceColumn\" data-block-id=\"-9\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td align=\"center\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"\" role=\"presentation\" class=\"mceClusterLayout\" data-block-id=\"-8\"><tbody><tr><td style=\"padding-left:24px;padding-top:0;padding-right:24px\" data-breakpoint=\"63\" valign=\"top\" class=\"mobileClass-63\"><a href=\"https://www.facebook.com/threequalityservices/\" style=\"display:block\" target=\"_blank\" data-block-id=\"-5\"><img width=\"40\" height=\"auto\" style=\"border:0;width:40px;height:auto;max-width:40px !important;display:block\" alt=\"Facebook icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/facebook-filled-dark-40.png\" class=\"mceImage\"/></a></td><td style=\"padding-left:24px;padding-top:0;padding-right:24px\" data-breakpoint=\"63\" valign=\"top\" class=\"mobileClass-63\"><a href=\"https://twitter.com/ThreeQualitySvc/\" style=\"display:block\" target=\"_blank\" data-block-id=\"-6\"><img width=\"40\" height=\"auto\" style=\"border:0;width:40px;height:auto;max-width:40px !important;display:block\" alt=\"Twitter icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/twitter-filled-dark-40.png\" class=\"mceImage\"/></a></td><td style=\"padding-left:24px;padding-top:0;padding-right:24px\" data-breakpoint=\"63\" valign=\"top\" class=\"mobileClass-63\"><a href=\"https://www.linkedin.com/in/david-kanyanjua-6932a64/\" style=\"display:block\" target=\"_blank\" data-block-id=\"-7\"><img width=\"40\" height=\"auto\" style=\"border:0;width:40px;height:auto;max-width:40px !important;display:block\" alt=\"LinkedIn icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/linkedin-filled-dark-40.png\" class=\"mceImage\"/></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style=\"padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px\" class=\"mceLayoutContainer\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"13\" id=\"section_cf4a817544ff213d4163d82dacde31e3\" class=\"mceFooterSection\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"12\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0;margin-bottom:12px\" class=\"mceColumn\" data-block-id=\"-3\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0\" class=\"mceBlockContainer\" align=\"center\" valign=\"top\"><img data-block-id=\"10\" width=\"109.99999999999999\" height=\"auto\" style=\"width:109.99999999999999px;height:auto;max-width:110px !important;display:block\" alt=\"Logo\" src=\"https://mcusercontent.com/059817b19145863287c9bd4b1/images/7d480a7d-a8bb-bb0d-f11a-fc8b237521f0.png\" class=\"mceLogo\"/></td></tr><tr><td style=\"padding-top:12px;padding-bottom:12px;padding-right:16px;padding-left:16px\" class=\"mceBlockContainer\" align=\"center\" valign=\"top\"><div data-block-id=\"11\" class=\"mceText\" id=\"dataBlockId-11\" style=\"display:inline-block;width:100%\"><p class=\"last-child\"><em><span style=\"font-size: 12px\">Copyright (C) 2024 Three Quality Services Ltd. All rights reserved.</span></em><br/><span style=\"font-size: 12px\">Find us at </span><em><span style=\"font-size: 12px\">www.3qs.co.ke</span></em><br/><br/><span style=\"font-size: 12px\">Our mailing address is:</span><br/><span style=\"font-size: 12px\">info@3qs.co.ke</span><br/><br/></p></div></td></tr><tr><td class=\"mceLayoutContainer\" align=\"center\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"-2\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td class=\"mceColumn\" data-block-id=\"-11\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td align=\"center\" valign=\"top\"><div><div data-block-id=\"12\"><a href=\"http://eepurl.com/iLuvNw\" target=\"_blank\" rel=\"noopener noreferrer\"><img style=\"max-width:100%\" width=\"137\" height=\"53\" alt=\"Email Marketing Powered by Mailchimp\" title=\"Mailchimp Email Marketing\" src=\"https://cdn-images.mailchimp.com/monkey_rewards/intuit-mc-rewards-1.png\"/></a></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>\n" +
                        "</td>\n" +
                        "</tr>\n" +
                        "</tbody></table>\n" +
                        "</center>\n" +
                        "<script type=\"text/javascript\"  src=\"/wlda5S/4mg/HoB/gPp59bTv/Vaw1krfkDwY3ut/QnNbb2hwcAY/CAl/jJzoGY0o\"></script></body></html>"
                }
                let sent = transporter.sendMail(message);
                if(sent){
                    res.status(201).json({
                        message: 'You have successfully subscribed to out newsletter. Check your email for more news and updates'
                    });
                } else {
                    res.status(201).json({
                        message: 'An error has occurred while subscribing. Try again later.'
                    })
                }
            });
        }
    } catch(err) {
        res.status(500).json({
            error: 'Something Went Wrong. PLease Try Again Later'
        });
    }
})

module.exports = router