var express = require("express");
var app = express()



app.get("/", function(req, res){
  res.send("Hello!")
})

app.get("/welcome/:name", function(req, res){
  res.send(`Welcome ${capitalize(req.params.name)}`)
})
app.get("/hablar/:animal",function(req, res){
  var animals={
    perro:"wuf",
    gato: "meow",
    vaca: "muuu"
  }
  var animal=req.params.animal
  var ruido = animals[animal]
  if(ruido){
    res.send(`El ${animal} hizo ${ruido}`)
  }
  res.redirect("/error")
  } )

app.get("/repeat/:word/:times", function(req, res){
  var string=""
  if(parseInt(req.params.times)){
  for(var i=0; i<req.params.times; i++){
    string+="<p>"+req.params.word+"</p>"
  }}else{
    string="Tenes q poner un numero de veces como ultimo parametro"
  }
  res.send(string)
})
  app.get("/error", function(req, res){
    res.send("Cannot be Found!")
  })
  app.get("*", function(req, res){
    res.redirect("/error")
  })

app.listen(8000)

function capitalize(string){
  return string.slice(0,1).toUpperCase()+string.slice(1)
}
