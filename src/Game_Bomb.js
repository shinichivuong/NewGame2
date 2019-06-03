var arrBombs = [];
var timeBB = [];
bomup = [];
bomleft = [];
bomright = [];
bomdown = [];
var sizelefts = [];
var sizeups = [];
var sizedowns = [];
var sizerights = [];
creatBoom = function (game) {
    if (timer - mycurrentime > 0.5) {
        timeBB[timeBB.length] = 0;
        cc.audioEngine.playEffect(res.Sound_creatBoom);
        boom = new cc.Sprite.create(res.Boom_png);
        boom.setAnchorPoint(cc.p(0.5, 0.5));
        boom.setTag(h);
        boom.setPosition(cc.p(x_sprite, y_sprite - 10));
        game.addChild(boom);
        arrBombs.push(boom);


        var sizeleft = countBoomSize;
        var sizeright = countBoomSize;
        var sizeup = countBoomSize;
        var sizedown = countBoomSize;
        sizelefts.push(sizeleft);
        sizerights.push(sizeright);
        sizeups.push(sizeup);
        sizedowns.push(sizedown);
        var boomleft = cc.Sprite.create("res/Bomb/bombbang_left" + sizeleft + ".png");
        boomleft.setAnchorPoint(cc.p(1, 0.5));
        boomleft.setPosition(cc.p(x_sprite, y_sprite - 10));
        boomleft.setVisible(false);
        game.addChild(boomleft);
        bomleft.push(boomleft);

        var boomright = cc.Sprite.create("res/Bomb/bombbang_right" + sizeright + ".png");
        boomright.setAnchorPoint(cc.p(0, 0.5));
        boomright.setPosition(cc.p(x_sprite, y_sprite - 10));
        boomright.setVisible(false);
        game.addChild(boomright);
        bomright.push(boomright);

        var boomup = cc.Sprite.create("res/Bomb/bombbang_up" + sizeup + ".png");
        boomup.setAnchorPoint(cc.p(0.5, 0));
        boomup.setPosition(cc.p(x_sprite, y_sprite - 10));
        boomup.setVisible(false);
        game.addChild(boomup);
        bomup.push(boomup);

        var boomdown = cc.Sprite.create("res/Bomb/bombbang_down" + sizedown + ".png");
        boomdown.setAnchorPoint(cc.p(0.5, 1));
        boomdown.setPosition(cc.p(x_sprite, y_sprite - 10));
        boomdown.setVisible(false);
        game.addChild(boomdown);
        bomdown.push(boomdown);
        mycurrentime = timer;
    }
},
    boomSize = function (i) {
        bomleft[i].setVisible(true);
        bomdown[i].setVisible(true);
        bomup[i].setVisible(true);
        bomright[i].setVisible(true);

    },
    checkwave = function (i) {
//left
        var rectleft = cc.rect(bomleft[i].getPositionX() + 25 - bomleft[i].getContentSize().width,
            bomleft[i].getPositionY() - 10,
            bomleft[i].getContentSize().width - 25,
            bomleft[i].getContentSize().height - 25);
        if (checkWaveMap(rectleft) == false) {
            sizelefts[i] -= 1;
            if (sizelefts[i] >= 1) {
                cc.log("sizeleft" + sizelefts[i]);
                bomleft[i].setTexture("res/Bomb/bombbang_left" + sizelefts[i] + ".png");
                checkwave(i);
            }
            if (sizelefts[i] <1) {
                bomleft[i].setTexture("");
            }
        }
//right
        var rectright = cc.rect(arrBombs[i].getPositionX(),
            arrBombs[i].getPositionY() - 10,
            bomright[i].getContentSize().width - 25,
            bomright[i].getContentSize().height - 25);

            if (checkWaveMap(rectright) == false) {
                sizerights[i] -= 1;
                cc.log("right" + sizerights[i]);

                if (sizerights[i] >= 1) {
                    bomright[i].setTexture("res/Bomb/bombbang_right" + sizerights[i] + ".png");
                    checkwave(i);
                }
                if (sizerights[i] < 1) {
                    bomright[i].setTexture("");

                }
            }

        //up
        var rectup = cc.rect(arrBombs[i].getPositionX() - 10,
            arrBombs[i].getPositionY(),
            bomup[i].getContentSize().width - 25,
            bomup[i].getContentSize().height - 25);

        if (checkWaveMap(rectup) == false) {
            sizeups[i] -= 1;
            cc.log("up" + sizeups[i]);

            if (sizeups[i] >= 1) {
                bomup[i].setTexture("res/Bomb/bombbang_up" + sizeups[i] + ".png");
                checkwave(i);
            }
            if (sizeups[i] < 1) {
                bomup[i].setTexture("");

            }
        }
        //down
        var rectdown = cc.rect(arrBombs[i].getPositionX() - 10,
            arrBombs[i].getPositionY() + 25 - bomdown[i].getContentSize().height,
            bomdown[i].getContentSize().width - 25,
            bomdown[i].getContentSize().height - 25);

        if (checkWaveMap(rectdown) == false) {

            sizedowns[i] -= 1;
            cc.log("down" + sizedowns[i]);

            if (sizedowns[i] >= 1) {
                bomdown[i].setTexture("res/Bomb/bombbang_down" + sizedowns[i] + ".png");
                checkwave(i);
            }
            if (sizedowns[i] < 1) {
                bomdown[i].setTexture("");

            }
        }
        // }
    },
    checkWaveMap = function (rect) {
        for (var j = 0; j < arrrectMap.length; j++) {
            if (arrrectMap[j].visible == true) {
                if (arrrectMap[j].getTag().toString() == "1" || arrrectMap[j].getTag().toString() == "2" || arrrectMap[j].getTag().toString() == "3") {
                    var rectMap = cc.rect(arrrectMap[j].getPositionX() - arrrectMap[j].getContentSize().width / 2 * arrrectMap[j].getScaleX(),
                        arrrectMap[j].getPositionY() - arrrectMap[j].getContentSize().height / 2 * arrrectMap[j].getScaleY(),
                        arrrectMap[j].getContentSize().width * arrrectMap[j].getScaleX(),
                        arrrectMap[j].getContentSize().height * arrrectMap[j].getScaleY());
                    if (cc.rectIntersectsRect(rect, rectMap)) {
                        return false;
                    }

                }
            }

        }
        return true;
    };
//pha tuong
destroybox = function () {
    for (var j = 0; j < arrrectMap.length; j++) {
        if (arrrectMap[j].visible == true) {
            if (arrrectMap[j].getTag().toString() == "4") {
                var rectMap = cc.rect(arrrectMap[j].getPositionX() - arrrectMap[j].getContentSize().width / 2 * arrrectMap[j].getScaleX(),
                    arrrectMap[j].getPositionY() - arrrectMap[j].getContentSize().height / 2 * arrrectMap[j].getScaleY(),
                    arrrectMap[j].getContentSize().width * arrrectMap[j].getScaleX(),
                    arrrectMap[j].getContentSize().height * arrrectMap[j].getScaleY());
                if (checkBomNew(rectMap) == false) {
                    arrrectMap[j].setVisible(false);
                }
            }
        }
    }
},
    bomwave = function (rect) {
        for (var j = 0; j < arrrectMap.length; j++) {
            if (arrrectMap[j].visible == true) {
                if (arrrectMap[j].getTag().toString() == "1" || arrrectMap[j].getTag().toString() == "2" || arrrectMap[j].getTag().toString() == "3") {
                    var rectMap = cc.rect(arrrectMap[j].getPositionX() - arrrectMap[j].getContentSize().width / 2 * arrrectMap[j].getScaleX(),
                        arrrectMap[j].getPositionY() - arrrectMap[j].getContentSize().height / 2 * arrrectMap[j].getScaleY(),
                        arrrectMap[j].getContentSize().width * arrrectMap[j].getScaleX(),
                        arrrectMap[j].getContentSize().height * arrrectMap[j].getScaleY());
                    if (cc.rectIntersectsRect(rect, rectMap)) {
                        return false;
                    }
                }
            }

        }
        return true;
    },
    checkBombSmall = function () {// check khong cho dat boom trung nhau
        var rectHero = cc.rect(player.getPositionX() - player.getContentSize().width / 2 * player.getScaleX(),
            player.getPositionY() - player.getContentSize().width / 2 * player.getScaleY(),
            player.getContentSize().width * player.getScaleX(),
            player.getContentSize().width * player.getScaleY());// kich thuoc qua boom do nguoi choi se dat
        for (var j = 0; j < arrBombs.length; j++) {
            if (arrBombs[j].visible == true) {
                var rectMap = cc.rect(arrBombs[j].getPositionX() - arrBombs[j].getContentSize().width / 2 * arrBombs[j].getScaleX(),
                    arrBombs[j].getPositionY() - arrBombs[j].getContentSize().height / 2 * arrBombs[j].getScaleY(),
                    arrBombs[j].getContentSize().width * arrBombs[j].getScaleX(),
                    arrBombs[j].getContentSize().height * arrBombs[j].getScaleY());
                if (cc.rectIntersectsRect(rectHero, rectMap)) {
                    return false;
                }
            }
        }
        return true;
    },
    checkBoom = function (rect) {
        for (var i = 0; i < arrBombs.length; i++) {
            if (arrBombs[i].visible == true) {
                var recBombWidth = cc.rect(arrBombs[i].getPositionX() - arrBombs[i].getContentSize().width / 2 * arrBombs[i].getScaleX(),
                    arrBombs[i].getPositionY() - player.getContentSize().width / 2 * arrBombs[i].getScaleY(),
                    arrBombs[i].getContentSize().width * arrBombs[i].getScaleX(),
                    player.getContentSize().width / 2 * arrBombs[i].getScaleY());
                var recBombheight = cc.rect(arrBombs[i].getPositionX() - player.getContentSize().width / 2 * arrBombs[i].getScaleX(),
                    arrBombs[i].getPositionY() - arrBombs[i].getContentSize().height / 2 * arrBombs[i].getScaleY(),
                    player.getContentSize().width / 2 * arrBombs[i].getScaleX(),
                    arrBombs[i].getContentSize().height * arrBombs[i].getScaleY());

                if (cc.rectIntersectsRect(rect, recBombWidth) || cc.rectIntersectsRect(rect, recBombheight)) {
                    return false;
                }
            }

        }
        return true;
    },
    checkBomNew = function (rect) {
        for (var i = 0; i < arrBombs.length; i++) {
            if (arrBombs[i].visible == true) {
                var rectleft = cc.rect(arrBombs[i].getPositionX() - bomleft[i].getContentSize().width,
                    arrBombs[i].getPositionY() - bomleft[i].getContentSize().height / 2,
                    bomleft[i].getContentSize().width - 25,
                    bomleft[i].getContentSize().height - 30);

                var rectright = cc.rect(arrBombs[i].getPositionX(),
                    arrBombs[i].getPositionY() - bomright[i].getContentSize().height / 2,
                    bomright[i].getContentSize().width - 25,
                    bomright[i].getContentSize().height - 30);

                var rectup = cc.rect(arrBombs[i].getPositionX() - bomup[i].getContentSize().width / 2,
                    arrBombs[i].getPositionY(),
                    bomup[i].getContentSize().width - 30,
                    bomup[i].getContentSize().height - 25);

                var rectdown = cc.rect(arrBombs[i].getPositionX() - bomdown[i].getContentSize().width / 2,
                    arrBombs[i].getPositionY() - bomdown[i].getContentSize().height,
                    bomdown[i].getContentSize().width - 30,
                    bomdown[i].getContentSize().height - 25);
                if (cc.rectIntersectsRect(rect, rectleft) || cc.rectIntersectsRect(rect, rectright) || cc.rectIntersectsRect(rect, rectup) || cc.rectIntersectsRect(rect, rectdown)) {
                    return false;
                }
            }
        }
    };


//