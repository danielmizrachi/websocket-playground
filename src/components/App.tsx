import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import useHistoricWebSocket from '../hooks/useHistoricWebSocket'
import { HistoricWebSocketContext } from '../context/HistoricWebSocketContext'
import ServerUrl from './ServerUrl'
import DataView from './DataView'
import '../styles/App.css'

function App() {
  const [ url, setUrl ] = useState<string | null>(null)

  const historicWebSocket = useHistoricWebSocket(url)

  return (
    <Container fluid="sm">
      
      <Row>
        <Col>
          <h1 className="text-center font-weight-bold mt-3 mb-4">WebSocket Playground</h1>
        </Col>
      </Row>

      <HistoricWebSocketContext.Provider value={historicWebSocket}>

        <ServerUrl
          onConnect={url => setUrl(url)}
          onClose={() => setUrl(null)}
        />

        <DataView />

      </HistoricWebSocketContext.Provider>

    </Container>
  )
}

export default App
