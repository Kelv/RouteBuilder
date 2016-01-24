var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/); 								
var DB_name 	= (url[6] || null);
var user 		= (url[2] || null);
var pwd 		= (url[3] || null);
var protocol 	= (url[1] || null);
var dialect 	= (url[1] || null);
var port 		= (url[5] || null);
var host 		= (url[4] || null);
var storage 	= process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

// Usar BBDD SQLite o Prostgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{ dialect:  protocol,
	  protocol: protocol,
	  port:   	port,
	  host: 	host,
	  storage: 	storage,	// Solo SQLite
	  omitNull: true	    // Solo Postgres
	}
);

//var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "route.sqlite"});

var route = sequelize.import(path.join(__dirname, 'route'));

exports.route = route;

sequelize.sync().then(function(){
    route.count().then(function(count){
        if(count == 0){
            route.create({
                name: "J. F. Kennedy",
                company: "Omsa"
            }).then(function(){console.log("Base de datos inicializada");});
        }
    });
});