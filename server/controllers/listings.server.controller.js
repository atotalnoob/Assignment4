
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

//save the coordinates (located in req.results if there is an address property) 
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
  

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  var lsts = mongoose.model('Listings', Listing.schema);
      var params = req.params.listingId;
      lsts.findById(params, function (e, result) {
        if (!e) {
          req.listing = result;
          res.json(req.listing);
        }
        else{
          console.error(e);
          res.status(404).send(e);
        }
    });
};

/* Update a listing - Complete the three tasks*/
exports.update = function(req, res) {
  var listing = req.listing;
  var body = req.body;
var id = req.params.listingId;
console.log("body: "+ JSON.stringify(body));
  var lsts = mongoose.model('Listings', Listing.schema);
  lsts.findByIdAndUpdate(id,{$set:{code:body.code}},function (e, result) {
    console.log("Result: " + result);
    if (!e) {
      req.listing = result;  
      console.log(result);
      res.json(req.listing);
    }
    else{
      console.error(e);
      res.status(404).send(e);
    }
      });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;
  var listing = req.listing;

  var lsts = mongoose.model('Listings', Listing.schema);
  lsts.find({},null,{sort:{"code":1}}, function (e, result) {
    if (!e) {
      
      req.listing = result;   
    }
    else{
      res.status(404).send(e);
    }
      });
res.json(req.listing);
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  var lsts = mongoose.model('Listings', Listing.schema);
  lsts.find({},null,{sort:{"code":1}}, function (e, result) {
    if (!e) {
      req.listing = result;        
      res.json(req.listing);
    }
    else{
      console.error(e);
      res.status(404).send(e);
    }
      });

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};