const commands = require('./commands');
const done = function(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt >');
};
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' ');
  var cmd = args.shift();
  // console.log(args, cmd);

  commands[cmd](args,done);
  // process.stdout.write('\nprompt >')
});