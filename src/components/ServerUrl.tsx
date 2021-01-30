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
  DropdownItem,
  DropdownItemProps
} from 'reactstrap'

type ServerUrlProps = {
  socketState: number,
  onConnect: (url: string) => void
  onCancelClose: () => void
}

function ServerUrl(props: ServerUrlProps) {
  const { socketState, onConnect, onCancelClose } = props

  const [ protocol, setProtocol ] = useState('wss')
  const [ host, setHost ] = useState('echo.websocket.org')
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)

  const canConnect = host.length > 0 && socketState === WebSocket.CLOSED

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
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
            isOpen={isDropdownOpen}
            toggle={toggleDropdown}
          >
            <DropdownToggle caret>{protocol}://</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setProtocol('wss')}>
                wss://
              </DropdownItem>
              <DropdownItem onClick={() => setProtocol('ws')}>
                ws://
              </DropdownItem>
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
