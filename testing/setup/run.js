var path = require("path"),
    fs = require("fs"),
    exec = require('child_process').exec;

var files = [
    path.resolve(__dirname, "init.js")
];

files = files.concat(
    fs.readdirSync(__dirname + "/../")
        .filter((filename) => /\.spec\.js$/.test(filename))
        .map((filename) => path.resolve(__dirname, "../" + filename))
);

files.push(path.resolve(__dirname, "close.js"));

var spawn = require('child_process').spawn;
var child = spawn('nodeunit', files);

child.stdout.on('data', function(chunk) {
  console.log(chunk.toString("utf8").replace(/\n$/, ""));
});
