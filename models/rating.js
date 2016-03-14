var models = require("../models/models.js");

module.exports = function(sequelize, DataTypes){
	return sequelize.define('rating',
		{ 
            local_id: {
                type: DataTypes.INTEGER,
                validate: { notEmpty: {msg: "--> Debe de proporcionar un local"}}
            },
            votes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            avg_rating: {
                DataTypes.INTEGER,
                defaultValue: 0
            }
		});
}