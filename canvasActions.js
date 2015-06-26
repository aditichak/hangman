/**
 * [createCanvas description]
 * @return {[type]} [description]
 */

function createCanvas() {
    stage = new Kinetic.Stage({
        container: 'content',
        width: 550,
        height: 300,
        scaleX: checkSize(),
        scaleY: checkSize()
    });

    Globals.stage = stage;

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        width: 200,
        height: 300,
        x: stage.getWidth() / 2,
        y: 350
    });

    var group2 = new Kinetic.Group({
        width: 200,
        height: 300,
        x: stage.getWidth() / 2,
        y: 350
    });

    var circle = createCircle();
    var circle2 = createCircle({
        x: -15,
        y: 40
    });
    var circle3 = createCircle({
        x: 15,
        y: 40
    });
    var line1 = createLine({
        x: 0,
        y: 40
    });
    var smile = createSmile();
    var rightHand = createRightHand();
    var leftHand = createLeftHand();
    var rightLeg = createRightLeg();
    var leftLeg = createLeftLeg();
    var clouds = createClouds();
    var electrocute = createElectrocute();

    group.add(circle);
    group.add(circle2);
    group.add(circle3);
    group.add(line1);
    group.add(smile);
    group.add(rightHand);
    group.add(leftHand);
    group.add(rightLeg);
    group.add(leftLeg);

    layer.add(group);
    layer.add(group2);
    stage.add(layer);
    layer.draw();

    Globals['stageGroup'] = group;
    Globals['stageGroup2'] = group2;
    Globals['stageLayer'] = layer;
    ///
    Globals['head'] = circle;
    Globals['leftEye'] = circle2;
    Globals['rightEye'] = circle3;
    Globals['body'] = line1;
    Globals['smile'] = smile;
    Globals['rightHand'] = rightHand;
    Globals['leftHand'] = leftHand;
    Globals['rightLeg'] = rightLeg;
    Globals['leftLeg'] = leftLeg;
    ///
    var parts = [addHead, addEyes, addSmile, addBody, addHands, addLegs, addClouds];
    return parts;
}

/**
 * [addHead description]
 */

function addHead() {
    animateCircle(Globals['head'], 40);
    unlockKeys();
}

/**
 * [addEyes description]
 */

function addEyes() {
    animateCircle(Globals['leftEye'], 8);
    animateCircle(Globals['rightEye'], 8);
    unlockKeys();
}

/**
 * [addSmile description]
 */

function addSmile() {
    setTimeout(function () {
        unlockKeys();
        animateSmile(Globals['smile']);
    }, 500);
}

/**
 * [addBody description]
 */

function addBody() {
    setTimeout(function () {
        unlockKeys();
        animateLine({
            'item': Globals['body'],
            'x': 0,
            'y': 90,
            'x1': 0,
            'y1': 200
        });
    }, 500);
}

/**
 * [addHands description]
 */

function addHands() {
    setTimeout(function () {
        animateLine({
            'item': Globals['rightHand'],
            'x': 0,
            'y': 120,
            'x1': 60,
            'y1': 80
        });
    }, 500);

    setTimeout(function () {
        unlockKeys();
        animateLine({
            'item': Globals['leftHand'],
            'x': 0,
            'y': 120,
            'x1': -60,
            'y1': 80
        });
    }, 500);
}

/**
 * [addLegs description]
 */

function addLegs() {
    setTimeout(function () {
        animateLine({
            'item': Globals['rightLeg'],
            'x': 0,
            'y': 200,
            'x1': 60,
            'y1': 250
        });
    }, 500);

    setTimeout(function () {
        unlockKeys();
        animateLine({
            'item': Globals['leftLeg'],
            'x': 0,
            'y': 200,
            'x1': -60,
            'y1': 250
        });
    }, 500);
}

/**
 * [addClouds description]
 */

function addClouds() {

    var tween1 = new Kinetic.Tween({
        node: Globals.cloud1,
        duration: 1,
        opacity: 1,
        x: -150,
        y: 0
    });

    tween1.play();

    setTimeout(function () {
        unlockKeys();
        var tween2 = new Kinetic.Tween({
            node: Globals.cloud2,
            duration: 1,
            opacity: 1,
            x: 50,
            y: 0
        });
        tween2.play();
    }, 500);
}

/**
 * [animateShock description]
 * @param  {[type]} counter [description]
 * @return {[type]}         [description]
 */

function animateShock(counter) {    

    Globals['head'].setOpacity(0);
    Globals['leftEye'].setOpacity(0);
    Globals['rightEye'].setOpacity(0);
    Globals['body'].setOpacity(0);
    Globals['smile'].setOpacity(0);
    Globals['rightHand'].setOpacity(0);
    Globals['leftHand'].setOpacity(0);
    Globals['rightLeg'].setOpacity(0);
    Globals['leftLeg'].setOpacity(0);

    if (counter > 3) {
        Globals.elec.setOpacity(1);
        Globals.elec2.setOpacity(0);

        setTimeout(function () {
            openDialog('loss');
        }, 200);

        return false;
    }

    Globals.elec.setOpacity(0);
    Globals.elec2.setOpacity(0);
    var tween1 = new Kinetic.Tween({
        node: Globals.elec,
        duration: 0.4,
        opacity: 1,
        onFinish: function () {
            Globals.elec.setOpacity(0);
            Globals.stageLayer.draw();
            var tween2 = new Kinetic.Tween({
                node: Globals.elec2,
                duration: 0.6,
                opacity: 1,
                onFinish: function () {
                    counter += 1;
                    animateShock(counter);
                }
            });

            tween2.play();
        }
    });

    tween1.play();
}

/////////////////////////////////////////

/**
 * [createElectrocute description]
 * @return {[type]} [description]
 */

function createElectrocute() {
    var src1 = 'electric-shock1.png';
    var src2 = 'electric-shock2.png';

    var human1 = new Image();
    human1.onload = function () {

        var elec = new Kinetic.Image({
            x: -116,
            y: 10,
            image: human1,
            width: 232,
            height: 240,
            opacity: 0
        });

        // we add it asynchronously here
        Globals.elec = elec;
        Globals.stageGroup2.add(elec);
        Globals.stageLayer.draw();
    };
    human1.src = src1;

    var human2 = new Image();
    human2.onload = function () {

        var elec2 = new Kinetic.Image({
            x: -116,
            y: 10,
            image: human2,
            width: 232,
            height: 240,
            opacity: 0
        });

        // we add it asynchronously here
        Globals.elec2 = elec2;
        Globals.stageGroup2.add(elec2);
        Globals.stageLayer.draw();
    };
    human2.src = src2;

}

/**
 * [createClouds description]
 * @return {[type]} [description]
 */

function createClouds() {

    var cloud1 = new Image();
    cloud1.onload = function () {
        var cloud = new Kinetic.Image({
            x: -100,
            y: 0,
            image: cloud1,
            width: 98,
            height: 100,
            opacity: 0
        });

        // we add it asynchronously here
        Globals.cloud1 = cloud;
        Globals.stageGroup.add(cloud);
        Globals.stageLayer.draw();
    };
    cloud1.src = "cloud.png";

    var cloud2 = new Image();
    cloud2.onload = function () {
        var clouds = new Kinetic.Image({
            x: 200,
            y: 0,
            image: cloud2,
            width: 98,
            height: 100,
            opacity: 0
        });

        // we add it asynchronously here
        Globals.cloud2 = clouds;
        Globals.stageGroup.add(clouds);
        Globals.stageLayer.draw();
    };

    cloud2.src = "clouds.png";
}

/**
 * [createLine description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */

function createLine(obj) {

    var line = new Kinetic.Line({
        points: [0, 90, 0, 90],
        stroke: Globals.lineColor,
        strokeWidth: 4,
        lineCap: 'mitter'
    });

    return line;

}

/**
 * [createCircle description]
 * @param  {[type]}   obj [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */

function createCircle(obj, fn) {

    var circle;
    if (obj === undefined) {
        circle = new Kinetic.Circle({
            x: 0,
            y: 50,
            radius: 0,
            opacity: 0,
            fill: 'transparent',
            stroke: Globals.lineColor,
            strokeWidth: 3
        });
    } else {
        circle = new Kinetic.Circle({
            x: obj.x,
            y: obj.y,
            radius: 0,
            opacity: 0,
            fill: 'transparent',
            stroke: Globals.lineColor,
            strokeWidth: 2
        });
    }

    return circle;
}

/**
 * [createSmile description]
 * @return {[type]} [description]
 */

function createSmile() {

    var smile = new Kinetic.Shape({
        drawFunc: function (context) {
            context.beginPath();
            context.moveTo(-20, 60);
            context.bezierCurveTo(-20, 70, 0, 80, 20, 70);
            // KineticJS specific context method
            context.fillStrokeShape(this)
        },
        fill: 'transparent',
        stroke: Globals.lineColor,
        strokeWidth: 2,
        opacity: 0
    });

    return smile;

}

/**
 * [createRightHand description]
 * @return {[type]} [description]
 */

function createRightHand() {

    var line = new Kinetic.Line({
        points: [0, 120, 0, 120],
        stroke: Globals.lineColor,
        strokeWidth: 4,
        lineCap: 'mitter'
    });

    return line;

}

/**
 * [createLeftHand description]
 * @return {[type]} [description]
 */

function createLeftHand() {

    var line = new Kinetic.Line({
        points: [0, 120, 0, 120],
        stroke: Globals.lineColor,
        strokeWidth: 4,
        lineCap: 'mitter'
    });

    return line;
}

/**
 * [createRightLeg description]
 * @return {[type]} [description]
 */

function createRightLeg() {

    var line = new Kinetic.Line({
        points: [0, 200, 0, 200],
        stroke: Globals.lineColor,
        strokeWidth: 4,
        lineCap: 'mitter'
    });

    return line;
}

/**
 * [createLeftLeg description]
 * @return {[type]} [description]
 */

function createLeftLeg() {

    var line = new Kinetic.Line({
        points: [0, 200, 0, 200],
        stroke: Globals.lineColor,
        strokeWidth: 4,
        lineCap: 'mitter'
    });

    return line;
}

/**
 * [animateCircle description]
 * @param  {[type]} item   [description]
 * @param  {[type]} radius [description]
 * @return {[type]}        [description]
 */

function animateCircle(item, radius) {
    var tween = new Kinetic.Tween({
        node: item,
        duration: 1,
        radius: radius,
        opacity: 1
    });

    tween.play();
}

/**
 * [animateLine description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */

function animateLine(obj) {
    var tween = new Kinetic.Tween({
        node: obj.item,
        duration: 1,
        points: [obj.x, obj.y, obj.x1, obj.y1]
    });

    tween.play();
}

/**
 * [animateSmile description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */

function animateSmile(item) {
    var tween = new Kinetic.Tween({
        node: item,
        duration: 1,
        opacity: 1
    });

    tween.play();
}

////////////////////////////////////