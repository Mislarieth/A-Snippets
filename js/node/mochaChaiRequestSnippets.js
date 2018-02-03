/*
  mocha and chai allow you to unit test

  okay so npm install --save-dev mocha chai request

  ---What do they do?---
  mocha: testing
  chai: assertion "expect"
  request: http requests


  "scripts": {
    "test": "./node_modules/.bin/mocha tests --reporter spec",
    "start": "nodejs index.js"
  },

*/


/*
  setup
*/

var expect  = require("chai").expect;
var request = require("request");
var api = require("./api");

/*
    doing sync calls on local code
*/
describe("Major feature", function(){
  it("isolated part of feature", function(){
    var thing = api.function(inputVariable);

    expect(thing).to.equal(expectedOutput);
  });
});



/*
  doing async calls on a server

  body is the reply, response is all the http shit
*/

describe("Major async feature", function(){
  var url="http://localhost:3000/hexToRGB";
  it("returns status 200", function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("isolated part of async feature", function(done){
    request(url, function(error, response, body) {
      expect(body).to.equal(expectedOutput);
      done();
    });
  });
});


/*
  Same thing but POST request
*/
describe("/create_user route", function(){
    var url=config._rootURL+"create_user";
    it("returns status 200", function(done) {
      request.post({url:url}, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("says completed on post", function(done){
      request.post({url:url, form:{
        username: "username"
      }}, function(error, response, body){
        expect(body).to.equal("received");
        done();
      });
    });
  });
