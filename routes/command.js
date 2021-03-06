var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('fgo-command_cards.sqlite3');

router.get('/', (req, res, next) => {
    if(req.session.message != undefined) {
        var q = "select * from fgodata where id IN (?,?,?)";
        var q2 = "select * from fgodata";
        id1 = req.session.message[0];
        id2 = req.session.message[1];
        id3 = req.session.message[2];
        nums = [id1, id2, id3];
    }
    else {
        /*console.log('undefined!');
        var q = "select * from fgodata where id IN (1,2,3)";
        var q2 = "select * from fgodata";*/
        res.render('item/error', {content: '無効な入力です'});
    }
    db.serialize(() => {
        db.all(q, id1, id2, id3, (err, rows) => {
            if(!err) {
                db.all(q2, (err, rows2) => {
                    if(!err) {
                        var data = {
                            title: '戦闘中のサーヴァント',
                            content: rows,
                            content2: rows2,
                            number: nums,
                            color1 : "white",
                            color2 : "white",
                            color3 : "white",
                            color4 : "white",
                            color5 : "white",
                            color6 : "white",
                            color7 : "white",
                            color8 : "white",
                            color9 : "white",
                            color10 : "white",
                            color11 : "white",
                            color12 : "white",
                            color13 : "white",
                            color14 : "white",
                            color15 : "white"
                        }
                        console.log('id is '+rows['id']);
                        console.log('nums = '+nums[0]+', '+nums[1]+', '+nums[2]);
                        res.render('command/index', data);
                    }
                });
            }
        });
    });
});

router.post('/', (req, res, next) => {
    var id1 = req.session.message[0];
    var id2 = req.session.message[1];
    var id3 = req.session.message[2];

    var color = req.body.command;

    console.log('command is '+color);

    if(req.body.before==1) {
        req.session.message[0] = req.body.after;
        id1 = req.body.after;
    }
    else if(req.body.before==2) {
        req.session.message[1] = req.body.after;
        id2 = req.body.after;
    }
    else if(req.body.before==3) {
        req.session.message[2] = req.body.after;
        id3 = req.body.after;
    }
    db.serialize(() => {
        var q = "select * from fgodata where id IN (?,?,?)";
        var q2 = "select * from fgodata";
        db.all(q, id1, id2, id3, (err, rows) => {
            if(!err) {
                db.all(q2, (err, rows2) => {
                    if(!err) {
                        var data = {
                            title: '戦闘中のサーヴァント',
                            content: rows,
                            content2: rows2,
                            number: [id1, id2, id3],
                            color1: req.body.toc1,
                            color2: req.body.toc2,
                            color3: req.body.toc3,
                            color4: req.body.toc4,
                            color5: req.body.toc5,
                            color6: req.body.toc6,
                            color7: req.body.toc7,
                            color8: req.body.toc8,
                            color9: req.body.toc9,
                            color10: req.body.toc10,
                            color11: req.body.toc11,
                            color12: req.body.toc12,
                            color13: req.body.toc13,
                            color14: req.body.toc14,
                            color15: req.body.toc15,
                        }
                        console.log(rows);
                        res.render('command/index', data);
                    }
                });
            }
        });
    });
})

router.get('/set', (req, res, next) => {
    db.serialize(() => {
        db.all("select * from fgodata", (err, rows) => {
            if(!err) {
                var data = {
                    title: 'サーヴァント選択',
                    content: rows
                }
                res.render('command/set', data);
            }
        });
    });
});

router.post('/set', (req, res, next) => {
    var id1 = req.body.servant1;
    var id2 = req.body.servant2;
    var id3 = req.body.servant3;
    req.session.message = [id1, id2, id3];
    console.log(req.session.message[0]);
    res.redirect('/command');
})

module.exports = router;