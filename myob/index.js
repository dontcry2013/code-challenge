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
  	newLine = `${validationResult.msg}, the original data is, ${line}`;
  	printMsg = "failed";
  } else{
  	newLineObj = myob.handleLine(validationResult.data);
    if(newLineObj.code > 0){
      printMsg = "success";
      newLine = newLineObj.data;
    } else{
      printMsg = "failed";
      newLine = `handleLine error, the original data is, ${line}`;
    }
  }
  console.log(printMsg);
  fd.write(newLine+"\n");
});

lineReader.on('close', function(){
	console.log('end...');
});