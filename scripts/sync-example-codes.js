"use strict";
var exec = require('child_process').exec;
var fs = require('fs');

let serviceURLPart = 'http://runstant.com/GLBoost/projects';


var data = JSON.parse(fs.readFileSync('examples/example-list.json', 'utf8'));

console.log(data);

for (let category in data) {

  for (let example in data[category]) {
    let exampleName = data[category][example];
    let url = `${serviceURLPart}/${category}-${exampleName}/script`;

    let filepath = `./examples/${category}/${exampleName}/main.js`;
    //exec(`curl -f ${url} -o ${filepath}`, function(err, stdout, stderr){
    exec(`curl -f ${url}`, function(err, stdout, stderr){

      if (stdout.match(/^<!DOCTYPE html>/)) {
       // console.log("MATCH!");
        return;
      }

      exec(`cat <<EOF > ${filepath}
${stdout}
EOF`);
    });

  }
}