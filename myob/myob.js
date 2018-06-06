const incomeRangeArr = [0, 18200, 37000, 87000, 180000];
const taxRateArr = [0, 0.19, 0.325, 0.37, 0.45];
const dateSplitRegx = /-|–/;
const percentageRegx = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?%$/;
const maxUserName = 100;

const handleIncomeTax = function getMonthlyIncomeTaxByProvideAnnualSalary(annualSalary) {
	//1. insert the salary into the array
	let targetArr;
	if(annualSalary >=0){
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
		console.log("data is invalid");
		return -1;
	}

	//2. get the difference and multiple the tax rate
	let ret = 0;
	for(let i = 0; i < targetArr.length - 1; i++){
		j = i + 1
		let x = targetArr[j] - targetArr[i]
		let mRate = x * taxRateArr[i];
		ret += mRate;
	}
	ret =  Math.round(ret / 12);
	return ret;
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
		recordObj.incomeTax = handleIncomeTax(recordObj.annualSalary);
		recordObj.netIncome = recordObj.grossIncome - recordObj.incomeTax;
		recordObj.super = Math.round(recordObj.grossIncome * convert(recordObj.superRate));
		outputNameArr.push(recordObj);
	}
	console.log(outputNameArr);	
}

const validatePayPeriod = function validatePayPeriodAndReturnResult (mPayPeriod) {
	let mPeriodResult = {
		code: 1,
		msg: 'success'
	};
	let mPayPeriodArr = mPayPeriod.split(dateSplitRegx);
	if(mPayPeriodArr && mPayPeriodArr.length != 2){
		mPeriodResult.code = -10;
		mPeriodResult.msg = "date string format error";
		return mPeriodResult;
	} 

	let [ mDateStartStr, mDateEndStr ]= mPayPeriodArr;
	let mDateStart = new Date(mDateStartStr);
	let mDateEnd = new Date(mDateEndStr);
	if(mDateStart == "Invalid Date" || isNaN(mDateStart) || mDateEnd == "Invalid Date" || isNaN(mDateEnd)){
		mPeriodResult.code = -20;
		mPeriodResult.msg = "start or end date format error";
		return mPeriodResult;
	}

	if(mDateStart.getMonth() != mDateEnd.getMonth()){
		mPeriodResult.code = -30;
		mPeriodResult.msg = "start and end date are not in the same month";
		return mPeriodResult;
	}

	return mPeriodResult;
}

const validateSuperRate = function validateSuperRateAndReturnResult (mSuperRate) {
	let mSuperResult = {
		code: 1,
		msg: 'success'
	};
	/*let x = parseFloat(mSuperRate); 
	if (isNaN(x) || x < 0 || x > 100) { 
		mSuperResult.code = -100;
		mSuperResult.msg = "super rate value is out of range";
		return mSuperResult;
	} 
	var decimalSeparator=".";
	var val=""+x; 
	if(val.indexOf(decimalSeparator)<val.length-3){
		mSuperResult.code = -110;
		mSuperResult.msg = "super rate has too much decimal";
		return mSuperResult;
	}*/
	if (!percentageRegx.test(mSuperRate)) { 
		mSuperResult.code = -100;
		mSuperResult.msg = "super rate value is invalid";
		return mSuperResult;
	} 
	mSuperResult.superRate = parseFloat(mSuperRate)/100;
	return mSuperResult;
}

const validateSalary = function validateSalaryAndReturnResult (mSalary) {
	let mSalaryResult = {
		code: 1,
		msg: 'success'
	};
	if(isNaN(mSalary) || mSalary < 0) {
		mSalaryResult.code = -1000;
		mSalaryResult.msg = "salary is invalid";
		return mSalaryResult
	}

	return mSalaryResult;
}

const validateName = function validateUserNameAndReturnResult (mUserNameStringArr) {
	let mNameResult = {
		code: 1,
		msg: 'success'
	};
	let mUserName = mUserNameStringArr.join(" ")
	if(mUserName.length > maxUserName) {
		mNameResult.code = -10000;
		mNameResult.msg = "user name is too long";
		return mNameResult
	}
	mNameResult.name = mUserName;
	return mNameResult;
}

//InputSample: Ryan,Chen,120000,10%,01 March – 31 March
const validateLine = function validateIfLineIsGoodToProcess (mInputLine) {
	let mResult = {};
	if(!mInputLine){
		mResult.code = -1;
		mResult.errorMsg = 'Input line is empty';
		return mResult;
	} 
	let inputSplitArr = mInputLine.split(",");
	if(inputSplitArr && inputSplitArr.length <= 3){
		mResult.code = -2;
		mResult.errorMsg = 'Input line provides inadequate information';
		return mResult;
	}
	let payPeriod = inputSplitArr.pop();
	let mValidatePeriodResult = validatePayPeriod(payPeriod);
	if(mValidatePeriodResult.code < 0){
		mResult.code = -3;
		mResult.errorMsg = mValidatePeriodResult.msg;
		return mResult;
	}
	let superRate = inputSplitArr.pop();
	let mValidateSuperResult = validateSuperRate(superRate);
	if(mValidateSuperResult.code < 0){
		mResult.code = -4;
		mResult.errorMsg = mValidateSuperResult.msg;
		return mResult;
	}
	let annualSalary = inputSplitArr.pop();
	let mValidateSalaryResult = validateSalary(annualSalary);
	if(mValidateSalaryResult.code < 0){
		mResult.code = -5;
		mResult.errorMsg = mValidateSalaryResult.msg;
		return mResult;
	}
	let mValidateNameResult = validateName(inputSplitArr);
	if(mValidateNameResult.code < 0){
		mResult.code = -6;
		mResult.errorMsg = mValidateNameResult.msg;
		return mResult;
	}

	mResult.code = 1;
	mResult.data = { payPeriod, superRate: mValidateSuperResult.superRate, annualSalary, name: mValidateNameResult.name };
	return mResult;
}

//Output (name, pay period, gross income, income tax, net income, xz):
//OutputSameple: David Rudd,01 March – 31 March,5004,922,4082,450
const handleLine = function getTheOutputLineByReadOneLineFromFile(inputLineObj) {
	let grossIncome = Math.round(inputLineObj.annualSalary / 12);
	let incomeTax = handleIncomeTax(inputLineObj.annualSalary);
	let netIncome = grossIncome - incomeTax;
	let xz = Math.round(grossIncome * inputLineObj.superRate);

	let retArr = [];
	retArr.push(inputLineObj.name);
	retArr.push(inputLineObj.payPeriod);
	retArr.push(grossIncome);
	retArr.push(incomeTax);
	retArr.push(netIncome);
	retArr.push(xz);
	return retArr.join(",");
}


if (typeof module !== 'undefined' && module.exports != null) {
    exports.validatePayPeriod = validatePayPeriod;
    exports.validateSuperRate = validateSuperRate;
    exports.validateSalary = validateSalary;
    exports.validateName = validateName;
    exports.handleIncomeTax = handleIncomeTax;
    exports.validateLine = validateLine;
    exports.handleLine = handleLine;
}




