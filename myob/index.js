const fs = require("fs");
const fd = fs.createWriteStream('./output.csv', {flags: 'a'});
const myob = require("./myob");

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('./input.csv')
});

console.log('start...');
lineReader.on('line', function(line){
  console.log(line);
  let newLine;
  let printMsg;
  let validationResult = myob.validateLine(line);
  if(validationResult.code < 0){
  	newLine = `${validationResult.errorMsg}, the original data is, ${line}`;
  	printMsg = "failed";
  } else{
  	newLine = myob.handleLine(validationResult.data);
  	printMsg = "success";
  }
  console.log(printMsg);
  fd.write(newLine+"\n");
});

lineReader.on('close', function(){
	console.log('end...');
});