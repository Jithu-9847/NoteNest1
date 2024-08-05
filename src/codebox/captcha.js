// Captcha.js
import React, { useState, useEffect } from 'react';

function Captcha({ onVerify }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setQuestion(`${num1} + ${num2}`);
    setAnswer(num1 + num2);
    setUserAnswer('');
    onVerify(false);
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleVerify = () => {
    if (parseInt(userAnswer) === answer) {
      onVerify(true);
    } else {
      alert('Incorrect CAPTCHA, please try again.');
      generateCaptcha();
    }
  };

  return (
    <div>
      <p>Solve the CAPTCHA to proceed:</p>
      <p>{question}</p>
      <input type="text" value={userAnswer} onChange={handleChange} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default Captcha;
