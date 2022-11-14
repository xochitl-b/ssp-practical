const http =  require('http'), //HTTP server
    express = require('express'), //HAndling HTTP requests & routing
    fs = require('fs'), //File system functionalities
    xmlParse = require('xslt-processor').xmlParse,//XML handling
    xsltProcess = require('xslt-processor').xsltProcess, //XSLT handling
    router = express(); //initialices router
    server = http.createServer(router); // initialize server

router.get('/', function(req, res){
    
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf-8'),
        xsl = fs.readFileSync('menu.xsl', 'utf-8');

        xml = xmlParse(xml);
        xsl = xmlParse(xsl);

        let html = xsltProcess(xml,xsl);

        res.end(html.toString());

});

sever.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    const addr = server.address();
    console.log("server listening at", addr.address + ":" + addr.port)
});