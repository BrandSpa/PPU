'use strinct';
var serverExec = require('ssh-exec');
var localExec = require('child_process').exec;
var moment = require('moment');
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

var serverFlow = [
  "cd apps/ppu-pruebas",
  "touch random.js",
  "git add -A",
  "git commit -m 'last update from server on "+ now +"'",
  "git pull origin master"
].join(' && ');


function serverMessages(err, stdout, stderr) {
  if(err) console.log("error: ", err);
  if(stderr) console.log("stderr: ", stderr);
  console.log("stdout: ", stdout);
}

localExec('git add -A && git commit -m "last update from local"', function (err, stdout, stderr) {
  if (err) console.error(err);
  console.log(stdout);
});

serverExec(serverFlow, 'deploy@104.131.161.42', serverMessages);


