var models = require("../models/models.js");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', {title: "Route"});
});

router.post('/new', function(req, res, next){
    console.log(req);
    res.render('maps/new', { route: { name: "", company: "", path: req.body.data }});
});

router.post('/save', function(req, res, next){
    console.log(req);
    var route = models.route.build(
           req.body.route);
    route.save({fields: ["name", "company", "path"]})
    .then(function(){
        res.redirect('/list');
    });
});

router.get('/list', function(req, res, next){
    models.route.findAll().then(function(routes){
        res.render('maps/routes', { routes: routes });
    });
//    res.render('routes', );
});

module.exports = router;