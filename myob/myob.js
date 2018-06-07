const incomeRangeArr = [0, 18200, 37000, 87000, 180000];
const taxRateArr = [0, 0.19, 0.325, 0.37, 0.45];
const dateSplitRegx = /-|–/;
const percentageRegx = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?%$/;
const maxUserName = 100;
const responseCodeMap = {
	"success": {code: 1, msg: "success"},
	"undefinedError": {code: -1, msg: "the value is null or undefined"},
	"formatError": {code: -2, msg: "the value format is illegal"},
	"internalError": {code: -3, msg: "the value provided is not obey the rule"},
};

const handleIncomeTax = function getMonthlyIncomeTaxByProvideAnnualSalary(annualSalary) {
	//1. insert the salary into the array
	let targetArr;
	if(!annualSalary){
		return responseCodeMap.undefinedError;
	}
	if(annualSalary >= 0){
		var idx;
		for(let i = 0; i < incomeRangeArr.length; i++){
			if(incomeRangeArr[i] < annualSalary){
				if(i != incomeRangeArr.length-1){
					continue;
				} else{
					idx = incomeRangeArr.length;
				}
			} else if(incomeRangeArr[i] >= annualSalary){
				idx = i;
				break;
			}
		}
		targetArr = incomeRangeArr.slice(0, idx)
		targetArr.push(annualSalary);
	} else{
		return responseCodeMap.formatError;
	}

	//2. get the difference and multiple the tax rate
	let mSum = 0;
	for(let i = 0; i < targetArr.length - 1; i++){
		j = i + 1;
		let x = targetArr[j] - targetArr[i];
		let mRate = x * taxRateArr[i];
		mSum += mRate;
	}
	let mResult = responseCodeMap.success;
	mResult.data =  Math.round(mSum / 12);
	return mResult;
}

const convert = function convertPercentageToNumber(percentage) {
	let percentageNum = parseInt(percentage.slice(0, percentage.length - 1));
	let i = percentageNum/100;
	return i;
}

const test = function testTheSampleInsteadOfFileInput() {
	let inputNameArr = ["David,Rudd,60050,9%,01 March – 31 March", "Ryan,Chen,120000,10%,01 March – 31 March"];
	let outputNameArr = [];
	for(let i = 0; i < inputNameArr.length; i++){
		let inputSplitArr = inputNameArr[i].split(",");
		let recordObj = {};
		recordObj.payPeriod = inputSplitArr.pop();
		recordObj.superRate = inputSplitArr.pop();
		recordObj.annualSalary = inputSplitArr.pop();
		recordObj.name = inputSplitArr.join(" ");
		
		recordObj.grossIncome = Math.round(recordObj.annualSalary / 12);
		recordObj.incomeTax = handleIncomeTax(recordObj.annualSalary).data;
		recordObj.netIncome = recordObj.grossIncome - recordObj.incomeTax;
		recordObj.super = Math.round(recordObj.grossIncome * convert(recordObj.superRate));
		outputNameArr.push(recordObj);
	}
	console.log(outputNameArr);	
}

const validatePayPeriod = function validatePayPeriodAndReturnResult (mPayPeriod) {
	if(!mPayPeriod){
		return responseCodeMap.undefinedError;
	} 
	let mPayPeriodArr = mPayPeriod.split(dateSplitRegx);
	if(mPayPeriodArr && mPayPeriodArr.length != 2){
		return responseCodeMap.formatError;
	} 

	let [ mDateStartStr, mDateEndStr ]= mPayPeriodArr;
	let mDateStart = new Date(mDateStartStr);
	let mDateEnd = new Date(mDateEndStr);
	if(mDateStart == "Invalid Date" || isNaN(mDateStart) || mDateEnd == "Invalid Date" || isNaN(mDateEnd)){
		return responseCodeMap.formatError;
	}

	if(mDateStart.getMonth() != mDateEnd.getMonth()){
		return responseCodeMap.internalError;
	}

	return responseCodeMap.success;;
}

const validateSuperRate = function validateSuperRateAndReturnResult (mSuperRate) {
	if(!mSuperRate){
		return responseCodeMap.undefinedError;
	} 
	if (!percentageRegx.test(mSuperRate)) { 
		return responseCodeMap.formatError;
	} 
	let mSuperResult = responseCodeMap.success;
	mSuperResult.data = parseFloat(mSuperRate)/100;
	return mSuperResult;
}

const validateSalary = function validateSalaryAndReturnResult (mSalary) {
	if(!mSalary){
		return responseCodeMap.undefinedError;
	}
	if(isNaN(mSalary) || mSalary < 0) {
		return responseCodeMap.formatError;
	}
	return responseCodeMap.success;
}

const validateName = function validateUserNameAndReturnResult (mUserNameStringArr) {
	if(!mUserNameStringArr){
		return responseCodeMap.undefinedError;
	}
	let mUserName = mUserNameStringArr.join(" ")
	if(mUserName.length > maxUserName) {
		return responseCodeMap.formatError;	
	}
	let mNameResult = responseCodeMap.success;
	mNameResult.data = mUserName
	return mNameResult;
}

//InputSample: Ryan,Chen,120000,10%,01 March – 31 March
const validateLine = function validateIfLineIsGoodToProcess (mInputLine) {
	let mResult = {};
	if(!mInputLine){
		return responseCodeMap.undefinedError;
	}
	if(typeof mInputLine != 'string'){
		return responseCodeMap.formatError;
	}
	let inputSplitArr = mInputLine.split(",");
	if(inputSplitArr && inputSplitArr.length <= 3){
		return responseCodeMap.formatError;
	}
	let payPeriod = inputSplitArr.pop();
	let mValidatePeriodResult = validatePayPeriod(payPeriod);
	if(mValidatePeriodResult.code < 0){
		return mValidatePeriodResult;
	}
	let superRate = inputSplitArr.pop();
	let mValidateSuperResult = validateSuperRate(superRate);
	if(mValidateSuperResult.code < 0){
		return mValidateSuperResult;
	}
	superRate = mValidateSuperResult.data;
	let annualSalary = parseFloat(inputSplitArr.pop());
	let mValidateSalaryResult = validateSalary(annualSalary);
	if(mValidateSalaryResult.code < 0){
		return mValidateSalaryResult;
	}
	let mValidateNameResult = validateName(inputSplitArr);
	if(mValidateNameResult.code < 0){
		return mValidateNameResult;
	}
	let name = mValidateNameResult.data;
	mResult.code = 1;
	mResult.data = { payPeriod, superRate, annualSalary, name };
	return mResult;
}

//Output (name, pay period, gross income, income tax, net income, xz):
//OutputSameple: David Rudd,01 March – 31 March,5004,922,4082,450
const handleLine = function getTheOutputLineByReadOneLineFromFile(inputLineObj) {
	if(!inputLineObj){
		return responseCodeMap.undefinedError;	
	}
	if(typeof inputLineObj != 'object' || !inputLineObj.annualSalary || !inputLineObj.superRate || !inputLineObj.name || !inputLineObj.payPeriod){
		return responseCodeMap.formatError;
	}
	let grossIncome = Math.round(inputLineObj.annualSalary / 12);
	let incomeTax = handleIncomeTax(inputLineObj.annualSalary).data;
	let netIncome = grossIncome - incomeTax;
	let xz = Math.round(grossIncome * inputLineObj.superRate);

	let inputLineStringArr = [];
	inputLineStringArr.push(inputLineObj.name);
	inputLineStringArr.push(inputLineObj.payPeriod);
	inputLineStringArr.push(grossIncome);
	inputLineStringArr.push(incomeTax);
	inputLineStringArr.push(netIncome);
	inputLineStringArr.push(xz);
	let resp = responseCodeMap.success;
	resp.data = inputLineStringArr.join(",");
	return resp
}

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = {
		validatePayPeriod,
		validateSuperRate,
		validateSalary,
		validateName,
		handleIncomeTax,
		validateLine,
		handleLine,
    }
}




