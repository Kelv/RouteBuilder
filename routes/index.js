var models = require("../models/models.js");
var express = require('express');
var router = express.Router();

router.param('drinkId', function(req, res, next, drinkId){
    models.drink.find({
        where: { id: Number(drinkId)}
    }).then(function(drink){
        if(drink){
            req.drink = drink;
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
//    res.render('routes', );
});

router.get('/editor', function(req, res, next){
    res.render('drinks', {});
});

router.post('/newDrink', function(req, res, next){
    var coords = JSON.parse(req.body.data);
    var dir = req.body.address;
    res.render('drinks/newDrink', { local: { name: "", telephone: "", latitude: coords.lat, longitude: coords.lng, address: dir} });
});

router.post('/saveDrink', function(req, res, next){
    var drink = models.drink.build(req.body.local);
    drink.save({fields: ["name", "telephone", "address", "description", "schedule", "latitude", "longitude"]}).
    then(function(){
        res.redirect('drinks');
    });
    console.log(drink);
});

router.get('/drinks',function(req, res, next){
    models.drink.findAll().then(function(drinks){
        res.render('drinks/list', { drinks: drinks });
    });
});

router.get('/drinks/:drinkId(\\d+)/edit',function(req, res, next){
    models.drink.findAll().then(function(drinks){
       res.render('drinks/editDrink', { local: req.drink });
    });
});

router.put('/drinks/:drinkId(\\d+)', function(req, res){
    console.log(req.drink);
    req.drink.name = req.body.local.name;
    req.drink.telephone = req.body.local.telephone;
    req.drink.address = req.body.local.address;
    req.drink.description = req.body.local.description;
    req.drink.schedule = req.body.local.schedule;
    req.drink.latitude = req.body.local.latitude;
    req.drink.longitude = req.body.local.longitude;
    
    var drink = req.drink;
    
    drink.save({fields: ["name", "telephone", "address", "description", "schedule", "latitude", "longitude"]})
    .then(function(){
        res.redirect('/drinks');
    });
});

router.delete('/drinks/:drinkId(\\d+)', function(req, res){
    req.drink.destroy().then(function(){
        res.redirect('/drinks');
    }).catch(function(error){next(error)});
});

module.exports = router;