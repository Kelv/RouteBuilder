// Libraries
var models = require("../models/models.js");
var local_controller = require("../controllers/local_controller");
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var busboy = require("connect-busboy");
var multer = require('multer');

router.param('drinkId', function(req, res, next, drinkId){
    models.local.find({
        where: { id: Number(drinkId)}
    }).then(function(local){
        if(local){
            req.local = local;
            next();
        }
    }).catch(function(error){next(error)});

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', {title: "Route"});
});

router.post('/new', function(req, res, next){
    res.render('maps/new', { route: { name: "", company: "", path: req.body.data }});
});

router.post('/save', function(req, res, next){
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
});

router.get('/editor', function(req, res, next){
    res.render('local', {});
});

router.get('/local/:drinkId(\\d+)/logo',    local_controller.logo_loader);
router.put('/uploadLogo/:drinkId(\\d+)',    local_controller.logo_upload);
router.get('/local/:drinkId(\\d+)/edit',    local_controller.edit);
router.get('/local/new',                    local_controller.new);
router.get('/local',                        local_controller.index);
router.put('/local/:drinkId(\\d+)',         local_controller.update);
router.delete('/local/:drinkId(\\d+)',      local_controller.delete);
router.post('/local/create',                local_controller.create);
// router.put('/uploadLogo/:drinkId(\\d+)',    local_controller.logo_edit);

module.exports = router;