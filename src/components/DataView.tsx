import React, { useContext, useState } from 'react'
import { Row, Col, Input, Button } from 'reactstrap'
import ReactJson from 'react-json-view'

import { HistoricWebSocketContext } from '../context/HistoricWebSocketContext'
import '../styles/DataView.css'

function DataView() {
  const [ input, setInput ] = useState('')

  const historicWebSocket = useContext(HistoricWebSocketContext)
  const socketState = historicWebSocket.webSocket?.readyState
  const latestMessage = historicWebSocket.receivedHistory[0] || ''
  
  let isJson = true
  let latestMessageJson = {}
  try {
    latestMessageJson = JSON.parse(latestMessage)
  } catch {
    isJson = false
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.shiftKey && e.code === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function handleSend() {
    if (socketState === WebSocket.OPEN) {
      historicWebSocket.sendMessage(input)
      setInput('')
    }
  }

  return (
    <Row>
      <Col md="6">
        <Row
          className="mb-3"
          noGutters
        >
          <Col>
            <Input
              type="textarea"
              placeholder="Enter data to be sent..."
              value={input}
              rows="20"
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col className="d-flex justify-content-center">
            <Button
              color="info"
              size="md"
              disabled={socketState !== WebSocket.OPEN}
              onClick={handleSend}
            >Send</Button>
          </Col>
        </Row>
      </Col>

      <Col md="6">
        { isJson ?
            <ReactJson
              src={latestMessageJson}
              theme="summerfruit"
              name={null}
              indentWidth={2}
              displayDataTypes={false}
            />
          :
            <Input
              type="textarea"
              placeholder="Incoming data will appear here..."
              value={latestMessage}
              rows="20"
              readOnly
            />
        }
      </Col>
    </Row>
  )
}

export default DataView
