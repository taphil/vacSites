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

    $("#btnIcs").click(btnIcsClick);
    $("#btnText").click(btnTextClick);
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

function btnIcsClick() {
    var cal = ics();

    //TODO kernma
    /* add all reminders */
    cal.addEvent('Demo Event', 'This is an all day event', '', '1/21/2015', '1/21/2015');
    cal.addEvent('Demo Event', 'This is thirty minut event', '', '1/20/2015 5:30 pm', '1/20/2015 6:00 pm');

    cal.download("impf_erinnerung");
}

function btnTextClick() {
    //TODO kernma
}