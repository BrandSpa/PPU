'use strinct';
var serverExec = require('ssh-exec');
var localExec = require('child_process').exec;
var moment = require('moment');
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

var serverFlow = [
  "cd apps/ppu-pruebas",
  "touch random.js",
  "git add -A",
  "git commit -m 'last update from server at "+ now +"'",
  "git pull --rebase"
].concat(["exit"]).join(' && ');

var localFlow = [
  "git add -A",
  "git commit -m 'last update from local at "+ now +"'",
  "git push origin master"
].concat(["exit"]).join(' && ');

function serverMessages(err, stdout, stderr) {
  if(err) console.log("error: ", err);
  if(stderr) console.log("stderr: ", stderr);
  console.log("stdout: ", stdout);
}

localExec(localFlow, function (err, stdout, stderr) {
  if (err) console.error(err);
  console.log(stdout);

  serverExec(serverFlow, 'deploy@104.131.161.42', serverMessages);
});




