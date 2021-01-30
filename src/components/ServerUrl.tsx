import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

type Props = {
  socketState: number,
  onConnect: (url: string) => void
  onCancelClose: () => void
}

function ServerUrl(props: Props) {
  const { socketState, onConnect, onCancelClose } = props

  const [ protocol, setProtocol ] = useState('wss')
  const [ host, setHost ] = useState('echo.websocket.org')

  const canConnect = host.length > 0 && socketState === WebSocket.CLOSED

  function handleProtocolChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProtocol(e.target.value)
  }
  
  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHost(e.target.value)
  }
  function handleUrlKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && canConnect) {
      e.preventDefault()
      onConnect(`${protocol}://${host}`)
    }
  }

  return (
    <Row className="mb-4">
      <Col>
        <InputGroup>
        
          {/* <Input
            type="select"
            value={protocol}
            onChange={handleProtocolChange}
          >
            <option value="wss">wss://</option>
            <option value="ws">ws://</option>
          </Input> */}

          <InputGroupButtonDropdown
            addonType="prepend"
            // isOpen={isDropdownOpen}
            // toggle={toggleDropdown}
          >
            <DropdownToggle caret>{protocol}://</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>wss://</DropdownItem>
              <DropdownItem>ws://</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>

          <Input
            type="text"
            placeholder="Enter a WebSocket host..."
            value={host}
            onChange={handleUrlChange}
            onKeyUp={handleUrlKeyUp}
          />

          <Button
            disabled={!canConnect}
            onClick={() => onConnect(`${protocol}://${host}`)}
          >{socketState === WebSocket.CONNECTING ? 'Connecting...' : 'Connect'}</Button>

          <Button
            onClick={() => onCancelClose()}
            disabled={socketState === WebSocket.CLOSED}
          >{socketState === WebSocket.OPEN ? 'Close' : 'Cancel'}</Button>
        </InputGroup>
      </Col>
    </Row>
  )
}

export default ServerUrl
