import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("0");
  const [total, setTotal] = useState(0);
  const [operator, setOperator] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // Track user input state

  // Handle number button clicks
  const handleNumberClick = (num) => {
    if (isTyping) {
      setInput(input + num); // Append number
    } else {
      setInput(num.toString()); // Start new input
      setIsTyping(true);
    }
  };

  // Handle operator button clicks
  const handleOperatorClick = (op) => {
    if (input === "") return;
    
    if (operator) {
      calculateResult();
    } else {
      setTotal(parseFloat(input));
    }
    
    setOperator(op);
    setIsTyping(false);
  };

  // Calculate result when "=" is pressed
  const calculateResult = () => {
    if (!operator || input === "") return;

    const num = parseFloat(input);
    let newTotal = total;

    switch (operator) {
      case "+":
        newTotal += num;
        break;
      case "-":
        newTotal -= num;
        break;
      case "*":
        newTotal *= num;
        break;
      case "/":
        if (num !== 0) {
          newTotal /= num;
        } else {
          alert("Cannot divide by zero!");
          return;
        }
        break;
      default:
        return;
    }

    setTotal(newTotal);
    setInput(newTotal.toString()); // Display result
    setOperator(null);
    setIsTyping(false);
  };

  // Clear everything when "C" is pressed
  const clearAll = () => {
    setInput("0");
    setTotal(0);
    setOperator(null);
    setIsTyping(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <p>SUM: {input}</p> {} {/* Display user input */}
      </div>
      <div className="buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}
        <button className="operator" onClick={() => handleOperatorClick("+")}>+</button>
        <button className="operator" onClick={() => handleOperatorClick("-")}>-</button>
        <button className="operator" onClick={() => handleOperatorClick("*")}>×</button>
        <button className="operator" onClick={() => handleOperatorClick("/")}>÷</button>
        <button className="equals" onClick={calculateResult}>=</button>
        <button className="clear" onClick={clearAll}>C</button>
      </div>
    </div>
  );
}

export default Calculator;
