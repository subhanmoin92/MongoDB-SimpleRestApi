const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

//connect to the database
const db = mongojs('Restaurants', ['restaurants']);

const app = express();
//make a middleware for body bodyParser
//creatng a port
const port = 3000;

app.use(bodyParser.json());

//creating a route for home
app.get('/', function(req, res, next){
  res.send('Hello, please use the api');
});


/*************************************************
LISTING THE PRODUCTS
***************************************************/


//listing all the products
app.get('/api/restaurants', function(req, res, next){
  db.restaurants.find(function(err,docs){
    if(err){
      res.send(err);
    }
    console.log('Restaurants found are ');
    res.json(docs);
  });
});



//get single post
app.get('/api/restaurants/:id', function(req, res, next){
  db.restaurants.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,doc){
    if(err){
      res.send(err);
    }
    console.log('Restaurant found are ');
    res.json(doc);
  });
});


/*************************************************
ADDING, UPDATING, DELETING PRODUCTS
**************************************************/
//adding a product
app.post('/api/restaurants', function(req, res, next){
  db.restaurants.insert(req.body, function(err,doc){
    if(err){
      res.send(err);
    }
    console.log('Adding Restaurant')
    res.json(doc);
  });
});

//update the product
app.put('/api/restaurants/:id', function(req, res, next){
  db.restaurants.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
    update:{
      $set:{
        name: req.body.name,
        cuisine: req.body.cuisine,
        restaurant_id: req.body.restaurant_id
        }},
        new: true}, function(err,doc){
          if(err){
            res.send(err);
          }
          console.log("Updating Restaurant");
          res.json(doc);
        });
      });


//delete the product
app.delete('/api/restaurants/:id', function(req, res, next){
  db.restaurants.remove({_id: mongojs.ObjectId(req.params.id)}, function(err,doc){
    if(err){
      res.send(err);
    }
    console.log("Deleting Restaurant");
    res.json(doc);
  });
});


app.listen(port, function(){
  console.log("Server started on port : "+port);
});
