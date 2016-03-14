var models = require("../models/models.js");

module.exports = function(sequelize, DataTypes){
	return sequelize.define('image',
		{ 
            local_id: {
                type: DataTypes.INTEGER,
                validate: { notEmpty: {msg: "--> Debe de proporcionar un local"}}
            },
            path: {
                type: DataTypes.STRING(512),
                validate: { notEmpty: {msg: "--> La ruta no es valida"}}
            },
            image_type: {
                type: DataTypes.STRING,
                defaultValue: ""
            }
		});
}