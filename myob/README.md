# How to run
## 1. Environment requirement
Use the latest version of node.js and npm. In myob directory, run the following command to install test framework.
```
npm install
```
## 2. Input
Puts a csv file into the myob folder, names it input.csv, add test records line by line.
## 3. Execution
Run the following command, it will execute index.js which is the entrance of the program.
```
npm run dev
```
Check the output.csv which contains the result.
## 4. Test
Test folder contains test script, mocha test framework is used to ensure all methods run correctly. By issue this to run the test script.
```
npm run test
```

# Explanation on how to caculate income tax
> 1. List all taxable incomes, which is [0, 18200, 37000, 87000, 180000] and tax rate, which is [0, 0.19, 0.325, 0.37, 0.45].
> 2. Get the record's annual salary, insert it into the list at ascending order.
> 3. Loop the income array, let the latter one deduct the former one, get the difference value multiple the tax rate which in same index.
> 4. When the loop finished, add the results up to get the income tax.

# Further improvement
It would be great to use pipe mechanism, which leverages nodejs's powerful feature of none-blocking IO to deal with big size input file.