import { useState } from "react";

function Display(props){
  return(
    <div >
      {props.message}
    </div>
    );
}

function Button(props){
  return (
    <button onClick={() => props.onClickFunction(props.value)}>
      {props.value}
    </button>
  );
}

function OperationButton(props){
  return (
    <button onClick={() => props.onClickFunction(props.value)}> 
      {props.value}
    </button>
  );
}

function  parseCalculationString(s) {
  // --- Parse a calculation string into an array of numbers and operators
  console.log("calculation string " + s);
  s = ""+s;
  var calculation = [],
      current = '';
  for (var i = 0, ch; ch = s.charAt(i); i++) {
      if ('^*/+-'.indexOf(ch) > -1) {
          if (current == '' && ch == '-') {
              current = '-';
          } else {
              calculation.push(parseFloat(current), ch);
              current = '';
          }
      } else {
          current += s.charAt(i);
      }
  }
  if (current != '') {
      calculation.push(parseFloat(current));
  }
  return calculation;
}

function calculate(calc) {
  // --- Perform a calculation expressed as an array of operators and numbers
  var ops = [{'^': (a, b) => Math.pow(a, b)},
             {'*': (a, b) => a * b, '/': (a, b) => a / b},
             {'+': (a, b) => a + b, '-': (a, b) => a - b}],
      newCalc = [],
      currentOp;
  for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < calc.length; j++) {
          if (ops[i][calc[j]]) {
              currentOp = ops[i][calc[j]];
          } else if (currentOp) {
              newCalc[newCalc.length - 1] = 
                  currentOp(newCalc[newCalc.length - 1], calc[j]);
              currentOp = null;
          } else {
              newCalc.push(calc[j]);
          }
          console.log(newCalc);
      }
      calc = newCalc;
      newCalc = [];
  }
  if (calc.length > 1) {
      console.log('Error: unable to resolve calculation');
      return calc;
  } else {
      return calc[0];
  }
}

function App() {
  const [oldValue, newValue] = useState(0);
  const calcString = (param) => newValue(oldValue + param);
  var calculateResult = calculate(parseCalculationString(oldValue));
  const reset = () => newValue(0);
  // oldValue = calculateResult;
  console.log("jdhkfh" + oldValue);
  return (
    <>
    <Display message={oldValue}/>
    <Display message={calculateResult}/>
    <div>............................</div>
    <Button value = {"1"} onClickFunction={calcString}/>
    <Button value = {"2"} onClickFunction={calcString}/>
    <Button value = {"3"} onClickFunction={calcString}/>
    <Button value = {"4"} onClickFunction={calcString}/>
    <Button value = {"5"} onClickFunction={calcString}/>
    <p>
    <OperationButton value = {"+"} onClickFunction={calcString}/>
    <OperationButton value = {"-"} onClickFunction={calcString}/>
    <OperationButton value = {"/"} onClickFunction={calcString}/>
    <OperationButton value = {"*"} onClickFunction={calcString}/>
    </p>
    <p>
    <Button value = "Reset" onClickFunction={reset}/>  
    {/* <Button value = "Result" onClickFunction={calculateResult}/>  */}
    </p>
    </>
  );
}

export default App;
