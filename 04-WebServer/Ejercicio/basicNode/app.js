var http = require("http")
var fs = require("fs")

http.createServer( function(req, res){
  if(req.url==="/"){
    fs.readFile(__dirname+"/html/index.html", function(err, data){
      res.writeHead(200, { 'Content-Type':'text/html' })
      res.end(data);
    })

}else if(req.url==="/doge"){
  fs.readFile(__dirname+"/html/doge.html", function(err, data){
    res.writeHead(200, { 'Content-Type':'text/html' })
    res.end(data);
  })
}else if(req.url==="/about"){
  fs.readFile(__dirname+"/html/about.html", function(err, data){
    res.writeHead(200, { 'Content-Type':'text/html' })
    res.end(data);
  })
}else{
  fs.readFile(__dirname+"/html/error.html", function(err, data){
    res.writeHead(404, { 'Content-Type':'text/html' })
    res.end(data);
  })
  }
}).listen(3000)
