var apiBenchmark = require('api-benchmark');
fs = require('fs');
var services = {
  stream: "http://localhost:3000",
  buffer: "http://localhost:2000",
};

var routes = { route1: '/' };

apiBenchmark.measure(services, routes, function(err, results){
  console.log(results);
  apiBenchmark.getHtml(results, function(error, html){
    fs.writeFileSync('resultsStream.html', html);
    // now save it yourself to a file and enjoy
  });
  apiBenchmark.getHtml(results.buffer, function(error, html){
    fs.writeFileSync('resultsBuffer.html', html);
    // now save it yourself to a file and enjoy
  });
});