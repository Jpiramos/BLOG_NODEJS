const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser=require("body-parser");
const connection = require("./database/database.js");
const CategoriesController= require("./categories/CategoriesController.js");
const ArticlesContoller= require("./articles/ArticlesController.js");
const Article = require("./articles/Article.js");
const Category = require("./categories/Category.js");

//static
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");

//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão com Banco de dados bem sucedida!")
    }).catch((error)=>{
        console.log(error);
    });

app.use("/",CategoriesController);

app.use("/",ArticlesContoller);




app.get("/",(req,res)=>{
    Article.findAll({
        order:[
            ["id","desc"]
        ]
    }).then((articles=>{

           Category.findAll().then((categories)=>{
            res.render("index",{articles:articles, categories:categories})
           })
    }));
});

app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then((article)=>{
        if(article!=undefined){
            Category.findAll().then((categories)=>{
                res.render("article",{article:article, categories:categories});
               });
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    })
})

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(category=>{
        if(category!=undefined){
            Category.findAll().then(categories=>{
                res.render("index",{articles:category.articles, categories: categories})
            });
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

app.listen(8080,()=>{
    console.log("O servidor esta rodando!")
});


app.use(express.json({limit: '250mb'}));
app.use(express.urlencoded({limit: '250mb'}));