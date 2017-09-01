/*
  Inert allows you to return/stream files
*/

/*
  import the required packages
*/
const fs = require('fs');
const Inert = require('inert');


/*
  register the plugin after server.connection
*/

server.register(Inert, () => {});


/*
  reply with a file
*/
server.route({
    method: 'GET',
    path: '/file',
    handler: function (request, reply) {

        let path = 'plain.txt';

        return reply.file(path);
    }
});


/*
  file upload and return
*/
server.route({
   method: 'POST',
   path: '/create',
   config: {
      payload:{
            output:'stream',
            parse: true
      },
  },
  handler: function (request, reply) {
      var path="images/"+Date.now()+request.payload.file.hapi.filename;
      var image = fs.createWriteStream(path);
      image.on('finish',function(){
        reply.file(path);
      });
      console.log(request.payload);
      request.payload.file.pipe(image);
  }
});
