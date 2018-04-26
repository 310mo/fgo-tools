var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('fgo-command_cards.sqlite3');

router.get('/', (req, res, next) => {
    //console.log(req.session.skillid);
    if(req.session.skillid!=undefined) {
    db.serialize(() => {
        var q_name = "select * from fgodata where id = "+req.session.skillid;
        db.get(q_name, (err, row_title) => {
            var q = "select * from skilldata where name like '" + req.session.skillid + "-%'";
            db.get(q, (err, row) => {
                if(!err) {
                    var id = Number(row.id)-1+Number(req.session.sairinbefore);
                    var num = req.session.sairinafter-req.session.sairinbefore;
                    var num_s1 = req.session.skill1after-req.session.skill1before;
                    var num_s2 = req.session.skill2after-req.session.skill2before;
                    var num_s3 = req.session.skill3after-req.session.skill3before;
                    console.log('num_s1 = '+ num_s1);
                    if(num>=0) {
                        if(num>0) {
                            var q = "select * from skilldata limit " + num + " offset "+id;
                        }
                        else {
                            var q = "select * from skilldata where name = 'dummy' ";
                        }
                        db.all(q, (err, rows) => {
                            if(!err) {
                                if(num_s1>=0) {
                                    var id_s1 = Number(row.id) - 2 + Number(req.session.skill1before) + 4;
                                    console.log(id_s1);
                                    if(num_s1>0) {
                                        var q_s1 = "select * from skilldata limit " + num_s1 + " offset "+id_s1;
                                    }
                                    else {
                                        var q_s1 = "select * from skilldata where name = 'dummy' ";
                                    }
                                    db.all(q_s1, (err, rows_s1) => {
                                        if(!err) {
                                            if(num_s2>=0) {
                                                var id_s2 = Number(row.id) - 2 + Number(req.session.skill2before) + 4;
                                                if(num_s2>0) {
                                                    var q_s2 = "select * from skilldata limit " + num_s2 + " offset "+id_s2;
                                                }
                                                else {
                                                    var q_s2 = "select * from skilldata where name = 'dummy' ";
                                                }
                                            }
                                            else {
                                                res.render('item/error', {content: '無効な入力です'});
                                            }
                                            db.all(q_s2, (err, rows_s2) => {
                                                if(!err) {
                                                    if(num_s3>=0) {
                                                        var id_s3 = Number(row.id) - 2 + Number(req.session.skill3before) + 4;
                                                        if(num_s3>0) {
                                                            var q_s3 = "select * from skilldata limit " + num_s3 + " offset "+id_s3;
                                                        }
                                                        else {
                                                            var q_s3 = "select * from skilldata where name = 'dummy' ";
                                                        }
                                                    }
                                                    else {
                                                        res.render('item/error', {content: '無効な入力です'});
                                                    }
                                                    db.all(q_s3, (err, rows_s3) => {
                                                        var data = {
                                                            title: row_title.name,
                                                            content: rows,
                                                            content_s1: rows_s1,
                                                            content_s2: rows_s2,
                                                            content_s3: rows_s3
                                                        };
                                                        res.render('item/index', data);
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    res.render('item/error', {content: '無効な入力です'});
                                }
                            }
                        })
                    }
                    else {
                        res.render('item/error', {content: '無効な入力です'});
                    }
                }
                else {
                    res.render('item/error', {content: '無効な入力です'});
                }
            });
        });
    });
    }
    else {
        res.render('item/error', {content: '無効な入力です'});
    }
});

router.get('/set', (req, res, next) => {
    db.serialize(() => {
        db.all("select * from fgodata", (err, rows) => {
            if(!err) {
                var data = {
                    title: 'サーヴァント選択',
                    content: rows
                }
                res.render('item/set', data);
            }
        });
    });
});

router.post('/set', (req, res, next) => {
    var id = req.body.id;
    req.session.skillid = id;
    req.session.sairinbefore = req.body.sairinbefore;
    req.session.sairinafter = req.body.sairinafter;
    req.session.skill1before = req.body.skill1before;
    req.session.skill1after = req.body.skill1after;
    req.session.skill2before = req.body.skill2before;
    req.session.skill2after = req.body.skill2after;
    req.session.skill3before = req.body.skill3before;
    req.session.skill3after = req.body.skill3after;
    console.log(req.session.skillid);
    res.redirect('/item');
});

module.exports = router;