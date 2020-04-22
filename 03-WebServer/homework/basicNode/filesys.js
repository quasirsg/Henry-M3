var fs  = require("fs")

console.log(__dirname)

var text = fs.readFileSync(__dirname+"/text.txt", "utf8")

console.log(text)

console.log("Antes")
console.log(fs.readFileSync(__dirname + "/text.txt", "utf8"))
console.log("Despues")

console.log("Antes")
fs.readFile(__dirname + "/text.txt", "utf8", function(err, data){
  console.log(data)
  })
console.log("Despues")
