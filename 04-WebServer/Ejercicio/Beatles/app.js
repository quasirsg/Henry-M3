var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"http://beatlephotoblog.com/photos/2013/05/132.jpg32.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer( function(req, res){
  var api=req.url.split("/")[1];
  var apiBeatle= decodeURI(req.url.split("/")[2])
  var beatle= decodeURI(req.url.split("/")[1])
  var formBeatle=beatleFromForm(req.url)
    if( req.url === '/'){ //Root Page
        res.writeHead(200, { 'Content-Type':'text/html' })
        var html = fs.readFileSync(__dirname +'/index.html');
        res.end(html);
    }else if(req.url === '/api'){ // Index del Api
        res.writeHead(200, { 'Content-Type':'application/json' })
        res.end( JSON.stringify(beatles) );
    } else if(api==="api" && findBeatle(apiBeatle)){ // /api/BEATLE
        res.writeHead(200, { 'Content-Type':'application/json' })
        res.end(JSON.stringify(findBeatle(apiBeatle)) );
    }else if(findBeatle(beatle)){ // /BEATLE
      res.writeHead(200, { 'Content-Type':'text/html' })
      res.end(createProfile(beatle))
    } else if(findBeatle(formBeatle)){ // Beatle desde el form /?beatle=Beatle
      res.writeHead(200, { 'Content-Type':'text/html' })
      res.end(createProfile(formBeatle))
    }
      else{
        res.writeHead(404); //Ponemos el status del response a 404: Not Found
        res.end("Page Don't Found"); //No devolvemos nada más que el estado.
      }

    function findBeatle(beatle){ //Encuentra un Beatle en el arreglo y lo devuelve. Recibe el nombre de un beatle como parametro.s
      if(beatle){
      for(var i in beatles){
        if(beatles[i].name===beatle){
          return beatles[i]
        }}
    }}

    function beatleFromForm(url){ // Genera el nombre del beatle desde el url del get form. Recibe un string del url como parametro
      if(url[1]==="?"){
        return url.split("=")[1].split("+").join(" ")
    }

    }

    function createProfile(beatle){ // Genera el profilPage del Beatle especifico. Recibe un Objeto Beatle de parametro
      var html = fs.readFileSync(__dirname +'/beatle.html', "utf8");
      html=html.replace("{name}", findBeatle(beatle).name)
      html=html.replace("{name}", findBeatle(beatle).name)
      html=html.replace("{birthdate}", findBeatle(beatle).birthdate)
      html=html.replace("{profilePic}", findBeatle(beatle).profilePic)
      return html
    }


}).listen(1337, '127.0.0.1');
