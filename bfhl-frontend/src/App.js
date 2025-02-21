import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(input);
      const res = await axios.post("https://bfhl-backend.onrender.com/bfhl", {
        data: data.data,
      });
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      e.target.checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes("numbers") && (
          <div>
            <h3>Numbers: {numbers.join(", ")}</h3>
          </div>
        )}
        {selectedOptions.includes("alphabets") && (
          <div>
            <h3>Alphabets: {alphabets.join(", ")}</h3>
          </div>
        )}
        {selectedOptions.includes("highest_alphabet") && (
          <div>
            <h3>Highest Alphabet: {highest_alphabet.join(", ")}</h3>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>22BCS12456</h1>
      <textarea
        placeholder='Enter JSON input, e.g., { "data": ["A", "1", "334"] }'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_alphabet"
                onChange={handleOptionChange}
              />
              Highest Alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;