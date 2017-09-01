/*
  hapi allows you to do #littleNodeThings really quickly and easily; smaller than express

  npm install --save hapi

*/

/*
  node bootstrapping: npm init
*/


/*
  base server
*/
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
    port: 8080
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});



/*
  route with variable in the payload

*/
server.route({
    method: 'POST',
    path:'/newuser',
    handler: function (request, reply) {
        var result;
        var username = request.payload.username; //could be null
        var password = request.payload.password;
        reply(result);

    }
});





/*
  route with variable in URL

*/
server.route({
  method: 'GET',
  path: '/users/{id}',
  handler: function(request,reply){
    reply(request.params.id)
  }
})
