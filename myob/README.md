# How to run
## 1. Environment requirement
	Use the last version of node.js and npm. In myob directory, run the fllowing command to install test framework.
```
npm install
```
## 2. Input
	Place a csv file into the myob folder, name it input.csv, add test records line by line.
## 3. Execution
	Run the following command, it will execute index.js which is the entrance of the program.
```
npm run dev
```
	Check the output.csv which contains the result.
## 4. Test
	Test instance can be checked by issue this command.
```
npm run test
```

# Explanation on how to caculate income tax
1. list taxable income, which is [0, 18200, 37000, 87000, 180000] and tax rate, which is [0, 0.19, 0.325, 0.37, 0.45].
2. get the record's annual salary, insert it into the list at ascending order.
3. loop the income array, let the latter one deduct the former one, get the difference value multiple the tax rate which in same index.
4. when the loop finished, add the results up to get he income tax.

# Further improvement
It would be great to use pipe mechanism, which leverages nodejs's powerful feature of none-blocking IO to deal with big size file.