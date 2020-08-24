import React from 'react';
import '../styles/App.css';

function App() {
  return (
    <div className="app">
      
      <header>
        <h1>WebSocket Playground</h1>
      </header>

      <main>
        <div id="server-address">
          <label htmlFor="server-address-input">Server address: </label>
          <select>
            <option value="ws">ws://</option>
            <option value="wss">wss://</option>
          </select>
          <input
            id="server-address-input"
            placeholder="Enter the WebSocket server address to connect to..."
          />
        </div>

        <div id="data-container">
          <textarea
            id="data-incoming"
            placeholder="Incoming data will appear here..."
            readOnly
          />
          <textarea
            id="data-outgoing"
            placeholder="Enter data to be sent..."
          />

          <br />

          <input
            type="radio"
            id="data-type-json"
            name="data-type"
            value="json"
            checked
          />
          <label htmlFor="data-type-json">JSON</label>
          <input
            type="radio"
            id="data-type-plaintext"
            name="data-type"
            value="plaintext"
          />
          <label htmlFor="data-type-plaintext">Plaintext</label>
        </div>
      </main>

    </div>
  );
}

export default App;
