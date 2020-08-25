import React, { useState } from 'react';

import '../styles/App.css';

function App() {
  const [ protocol, setProtocol ] = useState('ws')
  const [ url, setUrl ] = useState('')
  const [ input, setInput ] = useState('')
  const [ socket, setSocket ] = useState<null | WebSocket>(null)
  const [ socketState, setSocketState ] = useState<number>(WebSocket.CLOSED)
  const [ messages, setMessages ] = useState<string[]>([])

  const canConnect = url.length > 0 && socketState === WebSocket.CLOSED
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : ''

  function handleUrlKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && canConnect) {
      e.preventDefault()
      handleConnect()
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value)
  }

  function handleProtocolChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setProtocol(e.target.value)
  }

  function handleConnect() {
    const newSocket = new WebSocket(`${protocol}://${url}`)
    newSocket.onopen = () => setSocketState(WebSocket.OPEN)
    newSocket.onclose = () => setSocketState(WebSocket.CLOSED)
    newSocket.onmessage = newMessage => setMessages(messages => {
      const msg = String(newMessage.data)
      return messages.concat([msg])
    })

    setSocketState(WebSocket.CONNECTING)
    setSocket(newSocket)
  }

  function handleCancelClose() {
    socket?.close()
    setSocket(null)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  function handleSendClick() {
    if (input.length > 0 && socketState === WebSocket.OPEN) {
      socket?.send(input)
      setInput('')
    }
  }

  return (
    <div className="app">
      
      <header>
        <h1 className="title">WebSocket Playground</h1>
      </header>

      <main>
        <div className="container">
          <select
            value={protocol}
            onChange={handleProtocolChange}
          >
            <option value="ws">ws://</option>
            <option value="wss">wss://</option>
          </select>

          <input
            className="url-input"
            placeholder="Enter a WebSocket URL..."
            value={url}
            onChange={handleUrlChange}
            onKeyUp={handleUrlKeyUp}
          />

          <button 
            className="connect"
            onClick={handleConnect}
            disabled={!canConnect}
          >{socketState === WebSocket.CONNECTING ? 'Connecting...' : 'Connect'}</button>

          <button 
            className="cancel-close"
            onClick={handleCancelClose}
            disabled={socketState === WebSocket.CLOSED}
          >{socketState === WebSocket.OPEN ? 'Close' : 'Cancel'}</button>
        </div>

        <div className="container">
          <textarea
            className="data-view"
            placeholder="Incoming data will appear here..."
            value={latestMessage}
            readOnly
          />
          <textarea
            className="data-view"
            placeholder="Enter data to be sent..."
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="container">
          <button
            className="send"
            disabled={socketState !== WebSocket.OPEN}
            onClick={handleSendClick}
          >Send</button>
        </div>
      </main>

    </div>
  );
}

export default App;
