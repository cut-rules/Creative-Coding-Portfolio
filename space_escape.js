function gameSketch(p) {
    let backgroundImage, endImage;
    let gameState = "playing";
    let agressive = false;
    let xlocation = 0, ylocation = 0;
    let moves = 6;
    let message1 = "", message2 = "";
    let messageTimer1 = -2000, messageTimer2 = -2000;
    const messageDuration = 2000;
    let metPerson = false;
    let zoneRN;
    
    let outcomes = [
        "You materialized inside a planet. Instantly crushed.",
        "You teleported directly into a star. Vaporized on arrival.",
        "You died. I'm not even sure what happened.",
        "You phased halfway into an asteroid. The other half didn't make it.",
        "You reappeared inside a black hole. Say goodbye to time itself.",
        "You teleported into the middle of an ongoing space battle. Missiles incoming.",
        "You ended up inside a sunken spaceship. Oxygen was never an option.",
        "You appeared in a reactor core. At least it was quick.",
        "You re-emerged in the middle of a supernova. Good luck with that.",
        "You teleported to an empty void dimension. There is no escape."
    ];

    let cockpitZones = [
        { name: "Lightspeed", x: 355, y: 730, w: 75, h: 60, message: "You escape." },
        { name: "Fire", x: 570, y: 730, w: 75, h: 60, message: "You fire ... and miss." },
        { name: "Joystick", x: 462, y: 560, w: 76, h: 150, message: "Which direction do you want to move?" },
        { name: "Eject", x: 740, y: 730, w: 50, h: 40, message: "Well that was a bad idea." },
        { name: "Information Screen", x: 365, y: 370, w: 270, h: 185, message: "There seems to be a distress call coming from [2,1].", message2: "It looks like there is a gap in the unidentifiable spacecraft [1,0]" }
    ];

    let buttons = [
        { name: "button1", x: 250, y: 350, w: 200, h: 100, question: "Temp" },
        { name: "button2", x: 550, y: 350, w: 200, h: 100, question: "Temp" },
        { name: "button3", x: 250, y: 550, w: 200, h: 100, question: "Temp" },
        { name: "button4", x: 550, y: 550, w: 200, h: 100, question: "Temp" }
    ];

    let currentZone = "noZone"; 
    let currentScreen = "cockpit";

    p.preload = function() {
        backgroundImage = p.loadImage('pilotcockpitforgame.png');
        endImage = p.loadImage('shipdestroyed.webp');
    };

    p.setup = function() { 
        p.createCanvas(800, 800);
        showText("There is a sea of unusually shaped spacecraft in front of you.");
    };

    p.draw = function() {
        p.background(200);
        if (gameState === "destroyed") {
            p.image(endImage, 0, 0);
        } else {
            p.image(backgroundImage, 0, 0);
        }

        if (p.millis() - messageTimer1 < messageDuration) {
            drawMessage(message1, p.height / 2);
        }
        if (p.millis() - messageTimer2 < messageDuration) {
            drawMessage(message2, p.height / 2 + 60);
        }
    };

    function showText(text) {
        message1 = text;
        messageTimer1 = p.millis();
    }

    function drawMessage(message, yPos) {
        p.fill(0);
        p.rect(0, yPos - 25, p.width, 50);
        p.fill(255);
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(message, p.width / 2, yPos);
    }

    function checkCursor() {
        zoneRN = "0";
        let newZone = "noZone";
        if (currentScreen === "cockpit") {
            for (let zone of cockpitZones) {
                if (isMouseOver(zone)) {
                    newZone = zone.name;
                    zoneRN = zone;
                    break;
                }
            }
        }
        currentZone = newZone;
    }

    function isMouseOver(zone) {
        return p.mouseX > zone.x && p.mouseX < zone.x + zone.w && p.mouseY > zone.y && p.mouseY < zone.y + zone.h;
    }

    function fire() {
        agressive = true;
        showText("It seems to do almost nothing. The ships quickly prepare to attack you back.");
    }

    function lightspeed() {
        showText("You escape.");
        gameState = "escaped";
        currentScreen = "endScreen";
    }

    function eject() {
        showText("You ejected. Then your ship crashed.");
        gameState = "destroyed";
        currentScreen = "endScreen";
    }

    function joystick() {
        currentScreen = "joystickbuttons";
        buttons[0].question = "Up";
        buttons[1].question = "Down";
        buttons[2].question = "Left";
        buttons[3].question = "Right";
    }

    function meetPerson() {
        showText("You pick the pod that was sending the distress signal.");
        showTextLower("The spaceships around it aggressively turn towards you.");
        if (timer === 0) timer = -2;
    }

    function frontscreen() {
        showText(cockpitZones[4].message);
        showTextLower(cockpitZones[4].message2);
    }

    function end(reason) {
        currentScreen = "endScreen";
        showText(reason);
        gameState = "destroyed";
    }

    function escape() {
        if (metPerson) showText("You saved something ... and got away. Nice job!");
        else if (agressive) showText("Well at least you didn't die.");
        else {
            showText("It would have been nice to answer the distress call. That one might come back to bite you.");
            showTextLower("You did escape though.");
        }
        gameState = "escaped";
        currentScreen = "endScreen";
    }
}
