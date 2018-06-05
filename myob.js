const range = [0, 18200, 37000, 87000, 180000];
const rate = [0, 0.19, 0.325, 0.37, 0.45];
const handleTax = function(x){
	//1. insert the salary into the array
	let arr;
	if(x >=0){
		var idx;
		for(let i = 0; i < range.length; i++){
			if(range[i] < x){
				if(i != range.length-1){
					continue;
				} else{
					idx = range.length;
				}
			} else if(range[i] >= x){
				idx = i;
				break;
			}
		}
		arr = range.slice(0, idx)
		arr.push(x);
	} else{
		console.log("data is invalid");
		return -1;
	}

	//2. get the difference and multiple the tax rate
	let ret = 0;
	for(let i = 0; i < arr.length - 1; i++){
		j = i + 1
		let x = arr[j] - arr[i]
		let mRate = x * rate[i];
		ret += mRate;
	}
	ret =  Math.round(ret / 12);
	return ret;
}

// handleTax(0);
// handleTax(1223.121);
// handleTax(18200);
// handleTax(60050);
// handleTax(87000);
// handleTax(180020);

const convertPercentToNumber = function(percentage){
	let percentageNum = parseInt(percentage.slice(0, percentage.length - 1));
	let i = percentageNum/100;
	return i;
}

let inputNameArr = ["David,Rudd,60050,9%,01 March – 31 March", "Ryan,Chen,120000,10%,01 March – 31 March"];
let outputNameArr = [];
for(let i = 0; i < inputNameArr.length; i++){
	let strArr = inputNameArr[i].split(",");
	let obj = {};
	obj.paymentStartDate = strArr.pop();
	obj.superRate = strArr.pop();
	obj.annualSalary = strArr.pop();
	obj.name = strArr.join(" ");
	
	obj.grossIncome = Math.round(obj.annualSalary / 12);
	obj.incomeTax = handleTax(obj.annualSalary);
	obj.netIncome = obj.grossIncome - obj.incomeTax;
	obj.super = Math.round(obj.grossIncome * convertPercentToNumber(obj.superRate));
	outputNameArr.push(obj);
}
console.log(outputNameArr);