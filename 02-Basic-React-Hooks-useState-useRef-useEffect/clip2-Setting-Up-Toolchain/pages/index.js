import React, { useState, useEffect } from "react";

const InputElement = () => {
  const [inputText, setInputText] = useState("");
  const [historyList, setHistoryList] = useState([]);

  const random_boolean = Math.random() >= 0.5;
  const [isLoading, setIsLoading] = useState(random_boolean === true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <input
        onChange={(e) => {
          setInputText(e.target.value);
          setHistoryList([...historyList, e.target.value]);
        }}
        placeholder="Enter Some Text"
      />
      <br />
      {inputText}
      <hr />
      <br />
      <ul>
        {historyList.map((rec) => {
          return <div>{rec}</div>;
        })}
      </ul>
    </div>
  );
};

export default InputElement;
