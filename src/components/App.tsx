import React from 'react';
import '../styles/App.css';

function App() {
  return (
    <div className="app">
      
      <header>
        <h1 className="title">WebSocket Playground</h1>
      </header>

      <main>
        <div className="container">
          <select>
            <option value="ws">ws://</option>
            <option value="wss">wss://</option>
          </select>
          <input
            className="server-address"
            placeholder="Enter a WebSocket server address..."
          />
          <button className="server-connect">Connect</button>
        </div>

        <div className="container">
          <textarea
            className="data-view"
            placeholder="Incoming data will appear here..."
            readOnly
          />
          <textarea
            className="data-view"
            placeholder="Enter data to be sent..."
          />
        </div>
      </main>

    </div>
  );
}

export default App;
