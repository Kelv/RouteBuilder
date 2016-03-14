var models = require("../models/models.js");

module.exports = function(sequelize, DataTypes){
	return sequelize.define('valoration',
		{
            local_id: {
                type: DataTypes.INTEGER,
                validate: { notEmpty: {msg: "--> Debe de proporcionar un local"}}
            },
            comment: {
                type: DataTypes.TEXT,
                validate: { notEmpty: {msg: "--> Debe de comentar"}}
            },
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 3.0
            }
		});
}