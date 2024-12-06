import React, { useState } from "react";
import './App.css';
import { FaTrash } from 'react-icons/fa'; // Importing the trash icon

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddTransaction = () => {
    const parsedAmount = parseFloat(amount);
    if (!text || isNaN(parsedAmount)) {
      alert("Please enter a valid transaction name and amount.");
      return;
    }

    const newTransaction = {
      text,
      amount: parsedAmount,
    };
    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTransaction();
    }
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  const balance = income - expense;

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <h2 style={{ color: balance < 0 ? "red" : "#4caf50" }}>
        Your Balance: ${balance.toFixed(2)}
      </h2>
      <div className="income-expense">
        <div>
          <h3>Income</h3>
          <p style={{ color: "green" }}>${income.toFixed(2)}</p>
        </div>
        <div>
          <h3>Expense</h3>
          <p style={{ color: "red" }}>${expense.toFixed(2)}</p>
        </div>
      </div>
      <h3>History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <div className={`transaction-indicator ${transaction.amount < 0 ? 'negative' : 'positive'}`}></div>
            <span className="transaction-text">{transaction.text}</span>
            <span className="transaction-amount" style={{ color: transaction.amount < 0 ? "red" : "green" }}>
              {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
            </span>
            <button className="delete-button" onClick={() => handleDeleteTransaction(index)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <h3>Add New Transaction</h3>
      <label>
        Text:
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </label>
      <button className="add-button" onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  );
};

export default App;