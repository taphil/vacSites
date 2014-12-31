$(init);

function init() {
    $("#subFSME").hide();
    $("#subDiphtherie").hide();
    $("#subTetanus").hide();
    $("#subPolio").hide();
    $("#subHepA").hide();
    $("#subHepB").hide();
    $("#subMasern").hide();
    $("#subRoeteln").hide();
}

function cbClick(source) {
    console.log(source);

    var correctSubMenu;
    switch (source.id) {
        case "cbFSME":
            correctSubMenu = "subFSME";
            break;
        case "cbDiphtherie":
            correctSubMenu = "subDiphtherie";
            break;
        case "cbTetanus":
            correctSubMenu = "subTetanus";
            break;
        case "cbPolio":
            correctSubMenu = "subPolio";
            break;
        case "cbHepA":
            correctSubMenu = "subHepA";
            break;
        case "cbHepB":
            correctSubMenu = "subHepB";
            break;
        case "cbMasern":
            correctSubMenu = "subMasern";
            break;
        case "cbRoeteln":
            correctSubMenu = "subRoeteln";
            break;
    }

    if ($('#'+source.id).is(':checked')) {
        $("#"+correctSubMenu).fadeIn();
    } else {
        $("#"+correctSubMenu).fadeOut();
    }
}