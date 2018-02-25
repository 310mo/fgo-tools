var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('fgo-command_cards.sqlite3');

router.get('/', (req, res, next) => {
    if(req.session.message != undefined) {
        var q = "select * from fgodata where id IN (?,?,?)";
        id1 = req.session.message[0];
        id2 = req.session.message[1];
        id3 = req.session.message[2];
    }
    else {
        console.log('undefined!');
        var q = "select * from fgodata where id IN (1,2,3)";
    }
    db.serialize(() => {
        db.all(q, id1, id2, id3, (err, rows) => {
            if(!err) {
                var data = {
                    title: 'メンバー',
                    content: rows,
                    nums: [id1, id2, id3]
                }
                console.log(rows);
                res.render('command/index', data);
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

    if(id1==req.body.before) {
        req.session.message[0] = req.body.after;
        id1 = req.body.after;
    }
    else if(id2==req.body.before) {
        req.session.message[1] = req.body.after;
        id2 = req.body.after;
    }
    else if(id3==req.body.before) {
        req.session.message[2] = req.body.after;
        id3 = req.body.after;
    }
    db.serialize(() => {
        var q = "select * from fgodata where id IN (?,?,?)";
        db.all(q, id1, id2, id3, (err, rows) => {
            if(!err) {
                var data = {
                    title: 'メンバー',
                    content: rows,
                }
                console.log(rows);
                res.render('command/index', data);
            }
        });
    });
})

router.get('/set', (req, res, next) => {
    var data = {
        title: 'スタメン登録'
    }
    res.render('command/set', data);
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