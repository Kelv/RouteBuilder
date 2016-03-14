var models = require("../models/models.js");

module.exports = function(sequelize, DataTypes){
	return sequelize.define('local',
		{ 
            name: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "--> Debe de proporcionar un nombre"}}
            },
            telephone: DataTypes.STRING,
            address: DataTypes.STRING,
            description: DataTypes.STRING,
            schedule: DataTypes.STRING,
            latitude: {
                type: DataTypes.FLOAT,
                validate: { notEmpty: {msg: "--> Este campo no puede estar en blanco"}}
            },
            longitude: {
                type: DataTypes.FLOAT,
                validate: { notEmpty: {msg: "--> Este campo no puede estar en blanco"}}
            },
            rating: DataTypes.FLOAT,
            local_type: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "--> Este campo no puede estar en blanco"}},
                defaultValue: ""
            }
		});
}