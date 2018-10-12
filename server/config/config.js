//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://asdf:Asdfqwert1@ds125073.mlab.com:25073/cen3031'//place the URI of your mongo database here.
  }, 
  openCage: {
    key: 'fb8e838e13fe4f279c3f8f41f78d5cc5' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 8080
};