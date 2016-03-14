var models = require('../models/models.js');

exports.new = function(req, res, next){
    res.render('local/new', { local: { name: "", telephone: "", latitude: "", longitude: "", address: "" } });
};

exports.create = function (req, res, next) {
    var local = models.local.build(req.body.local);
    req.pipe(req.busboy);

    local.save({fields: ["name", "telephone", "address", "description", "schedule", "latitude", "longitude", "local_type"]})
    .then(function(){
        res.redirect('../local/'+ local.id + '/logo');
    });
};

exports.edit = function(req, res, next){
    models.image.find({
        where: { local_id: req.local.id, image_type: "logo" }
    }).then(function(image){
        if(image){
            req.image = image;
        }
        res.render('local/edit', { local: req.local, image: (image)? image : { path: ""} });
    }).catch(function(error){next(error)});
};

exports.update = function(req, res){
    req.local.name = req.body.local.name;
    req.local.local_type = req.body.local.local_type;
    req.local.telephone = req.body.local.telephone;
    req.local.address = req.body.local.address;
    req.local.description = req.body.local.description;
    req.local.schedule = req.body.local.schedule;
    req.local.latitude = req.body.local.latitude;
    req.local.longitude = req.body.local.longitude;
    
    var local = req.local;
    
    local.save({fields: ["name", "telephone", "address", "description", "schedule", "latitude", "longitude", "local_type"]})
    .then(function(){
        res.redirect('/local');
    });
}

exports.delete = function(req, res){
    models.image.destroy({ where: { local_id: req.local.id }});
    req.local.destroy().then(function(){
        res.redirect('/local');
    }).catch(function(error){next(error)});
};

exports.index = function(req, res, next){
    models.local.findAll().then(function(locals){
        res.render('local/list', { locals: locals });
    });
};

exports.logo_upload = function(req, res, next){
    var local = req.local;
    models.image.find({
        where: { local_id: req.local.id, image_type: "logo" }
    }).then(function(image){
        if(image){
            req.image = image;
        }else{
            req.image = models.image.build();
        }
        req.image.local_id = local.id;
        req.image.image_type = "logo";

        upload(req, res, function(err){
            if(err){
                console.log('error uploading file');
            }else{
                req.image.save({fields : ["local_id", "path", "image_type"]});    
            }        
        });
        if(image){
            res.redirect('/local/' + local.id + '/edit');
        }else{
            res.redirect('../local');
        }
    }).catch(function(error){next(error)});
};

exports.logo_loader = function(req, res, next){
    var local = req.local;

    res.render('local/logo', { local: local });
};