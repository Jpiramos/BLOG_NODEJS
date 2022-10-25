const sequelize = require("sequelize");
const connection = require("../database/database")
const Category= require("../categories/Category.js")

const Article = connection.define("articles",{
    title:{
        type:sequelize.STRING,
        allowNull:false
    },slug:{
        type: sequelize.STRING,
        allowNull:false
    },body:{
        type:sequelize.TEXT,
        allowNull:false
    }
});

Category.hasMany(Article); // n:1
Article.belongsTo(Category); //1:1


module.exports = Article;