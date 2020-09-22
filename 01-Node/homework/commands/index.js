const fs = require('fs');
const request = require('request');
module.exports = {
    pwd: function (args, done) {
        done(process.cwd())
    },
    date: function (args, done) {
        done(Date())
    },
    ls: function (args, done) {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            var output = '';
            files.forEach(function (file) {
                //   process.stdout.write(file.toString() + "\n");
                output = output + file.toString() + "\n";
            })

            done(output);
            // process.stdout.write("prompt > ");
        });
    },
    echo: function (args,done) {
        // process.stdout.write(args.join(' '));
        done(args.join(' '))
    },
    cat: function (args,done) {
        // ['bash.js]
        fs.readFile(args[0], 'utf-8', function (err, data) {
            if (err) throw err;
            // process.stdout.write(data);
            // process.stdout.write(" \n prompt > ");
            done(data);
        });
    },
    head: function (args,done) {
        fs.readFile(args[0], 'utf-8', function (err, data) {
            if (err) throw err;
            var lines = data.split("n").splice(0, args[1] || 5).join('\n');
            // process.stdout.write(lines);
            // process.stdout.write(" \n prompt > ");
            done(lines);
        })
    },
    tail: function (args,done) {
        fs.readFile(args[0], 'utf-8', function (err, data) {
            if (err) throw err;
            var lines = data.split('\n');
            var lastLines = lines.splice(lines.length - 5).join('\n');
            // process.stdout.write(lastLines);
            // process.stdout.write(" \n prompt > ");
            done(lastLines);
        })
    },
    curl: function (args,done) {
        request(args[0], function (error, response, body) {
            if (error) throw error;

            done(body);
        })
    }
}