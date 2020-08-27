import React, { useState } from 'react'

import '../styles/App.css'
import ServerUrl from './ServerUrl'
import DataView from './DataView'

function App() {
  const [ socket, setSocket ] = useState<null | WebSocket>(null)
  const [ socketState, setSocketState ] = useState<number>(WebSocket.CLOSED)
  const [ messages, setMessages ] = useState<string[]>([])

  function handleConnect(url: string) {
    const newSocket = new WebSocket(url)
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

  function handleSend(input: string) {
    socket?.send(input)
  }

  return (
    <div className="app">
      
      <header>
        <h1 className="title">WebSocket Playground</h1>
      </header>

      <main>
        <div className="container">
          <ServerUrl
            socketState={socketState}
            onConnect={handleConnect}
            onCancelClose={handleCancelClose}
          />
        </div>

        <div className="container">
          <DataView
            socketState={socketState}
            messages={messages}
            onSend={handleSend}
          />
        </div>
      </main>

    </div>
  )
}

export default App
