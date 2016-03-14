var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/

// var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/); 								
// var DB_name 	= (url[6] || null);
// var user 		= (url[2] || null);
// var pwd 		= (url[3] || null);
// var protocol 	= (url[1] || null);
// var dialect 	= (url[1] || null);
// var port 		= (url[5] || null);
// var host 		= (url[4] || null);
// var storage 	= process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

// Usar BBDD SQLite o Prostgres
// var sequelize = new Sequelize(DB_name, user, pwd, 
// 	{ dialect:  protocol,
// 	  protocol: protocol,
// 	  port:   	port,
// 	  host: 	host,
// 	  storage: 	storage,	// Solo SQLite
// 	  omitNull: true	    // Solo Postgres
// 	}
// );

var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "route.sqlite"});

var route = sequelize.import(path.join(__dirname, 'route'));
var local = sequelize.import(path.join(__dirname, 'local'));
var valoration = sequelize.import(path.join(__dirname, 'valoration'));
var image = sequelize.import(path.join(__dirname, 'image'));

exports.route = route;
exports.local = local;
exports.valoration = valoration;
exports.image = image;

sequelize.sync();