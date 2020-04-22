const fs = require('fs');
const request = require('request');

module.exports = {
  pwd: function (args, done) {
    done(process.env.PWD);
  },
  date: function(args, done) {
    done(Date());
  },
  exit: function(args, done) {
    process.exit();
  },
  ls: function(args, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      let output = '';
      files.forEach(function(file) {
        output = output + file.toString() + "\n";
      })
      done(output);    
    });
  },
  echo: function(args, done) {
    done(args.join(' '))
  },
  cat: function(args, done) {
    fs.readFile(args[0], 'utf8', function(err, data){ 
      if (err) throw err;
      done(data);
    }); 
  },
  head: function(args, done) {
    fs.readFile(args[0], 'utf8', function(err, data){ 
      if (err) throw err;
      var lines = data.split('\n').splice(0, args[1] || 10).join('\n');
      done(lines);
    }); 
  },
  curl: function(args, done) {
    request(args[0], function (error, response, body) {
      if (error) throw err;
      done(body);
    });
  }
}