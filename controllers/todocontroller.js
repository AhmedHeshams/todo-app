var bodyParser = require('body-parser');
var mongoose   = require("mongoose"); 
var dotenv     = require("dotenv");
dotenv.config();
mongoose.connect(process.env.URI);

// creat a schema
todoSchema = new mongoose.Schema({
    item: String
})

// creat a model
Todo = mongoose.model("Todo", todoSchema);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
app.get("/todo",function(req,res){
    Todo.find({})
    .then(function(data){
        res.render("to-do",{todo:data});
    })
    .catch(function(err){
        console.log(err);
    })
});

app.post("/todo",urlencodedParser,function(req,res){
    // get the data from the view and add it to mongodb
    var newTodo = Todo(req.body).save()
    .then(function(data){
        console.log("item saved");
        res.json(data);
    })
    .catch(function (err) {
        console.log(err);
    });
    
});
app.delete("/todo/:item",function(req,res){
    console.log(req.params.item.trim());
    deletedTodo = Todo.find({item:req.params.item.trim()}).deleteOne()
    .then(function(data){
        console.log("item deleted");
        res.json(data);
    })
    .catch(function (err) {
        console.log(err);
    });
    
    
});
};