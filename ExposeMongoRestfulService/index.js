var express = require('express');
var app = express();
//app.set('view engine', 'pug');
var cors = require('cors')

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// define person schema with specified attributes

var personSchema = mongoose.Schema({
    fname: String,
    age: Number,
    nationality: String
 });
 var Person = mongoose.model("persons", personSchema);

 //curl -X POST --data "name=Manvi Aarna&age=5&nationality=INDIAN" http://localhost:3000/cperson
 // create record with data mentioned in url script

 app.post('/cperson', function(req, res){
   console.log("req posted with ",req)
    var personInfo = req.body; //Get the parsed information
    console.log("person posted with ",personInfo)
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        res.json({
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          fname: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         console.log("data is about to be saved with ::",newPerson)
       newPerson.save(function(err, Person){
          if(err)
          res.json({message: "Sorry no record added  :: ",err})
          else
          res.json({message: "Person added :: ",type: "success"})
       });
    }
 });
// update a particular record withy reord id 
// curl -X PUT --data "fname=AKShahi&age=3000&nationality=INDIAN" http://localhost:3000/persons/5bb3255b04e0692ad566223d
 app.put('/persons/:id', function(req, res){
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
       if(err) res.json({message: "Error in updating person with id " + req.params.id});
       res.json(response);
    });
 });
// get all person 
 //curl -X GET  http://localhost:3000/AllPerson
 app.get('/AllPerson', function(req, res){
    Person.find(function(err, response){
       res.json(response);
    });
 });
// get all person 
 //curl -X GET  http://localhost:3000/APerson
 app.get('/APerson', function(req, res){
    Person.find(req.body,function(err, response){
        if(Object.keys(response).length>0){
       res.json(response);
    }
       else{
           res.json({message: "Sorry no record found  :: ",criteria:req.body})
       }
    });
 });
//delete specific person
 //curl -X DELETE  http://localhost:3000/persons/5bb3151bcf2f652594301bb2
 app.delete('/persons/:id', function(req, res){
    Person.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else res.json({message: "Person with id " + req.params.id + " removed."});
    });
 });

 


app.listen(3003);

