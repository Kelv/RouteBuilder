var models = require("../models/models.js");

module.exports = function(sequelize, DataTypes){
	return sequelize.define('route',
		{ 
            name: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "--> Debe de proporcionar un nombre"}}
            },
            company:{
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "--> Debe de proporcionar una compañia"}}
            },
            path: DataTypes.STRING
		});
}