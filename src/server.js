const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': responseHandler.getIndex,
    '/cats': responseHandler.getCats,
    index: responseHandler.getIndex
};

const onRequest = (request, response) => {
    // request url
    //request.url 
    // parse url
    const parsedUrl = url.parse(request.url);   // pathname, protocol, port, hostname, search, query, into url object
    if (urlStruct[parsedUrl.pathname])  // if there exists this url in the struct
    {
        urlStruct[parsedUrl.pathname](request, response);   // call its response function
    } else {
        urlStruct.index(request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});
