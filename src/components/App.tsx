import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import ServerUrl from './ServerUrl'
import DataView from './DataView'
import '../styles/App.css'

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
    <Container fluid="sm">
      
      <Row>
        <Col>
          <h1 className="text-center font-weight-bold">WebSocket Playground</h1>
        </Col>
      </Row>

      <ServerUrl
        socketState={socketState}
        onConnect={handleConnect}
        onCancelClose={handleCancelClose}
      />

      <DataView
        socketState={socketState}
        messages={messages}
        onSend={handleSend}
      />

    </Container>
  )
}

export default App
