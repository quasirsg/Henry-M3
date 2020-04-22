var fs  = require("fs")
var http  = require("http")

http.createServer(function(req, res){
fs.readFile(__dirname+"/images"+req.url, function(err, data){
  if(!!data){
    res.writeHead(200, { 'Content-Type':'image/jpg' })
    res.end(data)
  }else{
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.end("Not Image Found!")
  }

})

}).listen(8000)
