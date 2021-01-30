import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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

          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={isDropdownOpen}
            toggle={toggleDropdown}
          >
            <DropdownToggle
              color="info"
              caret
            >{protocol}://</DropdownToggle>
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

          <InputGroupAddon addonType="append">

            <Button
              color="info"
              disabled={!canConnect}
              onClick={() => onConnect(`${protocol}://${host}`)}
            >{socketState === WebSocket.CONNECTING ? 'Connecting...' : 'Connect'}</Button>

            <Button
              color="danger"
              disabled={socketState === WebSocket.CLOSED}
              onClick={() => onCancelClose()}
            >{socketState === WebSocket.OPEN ? 'Close' : 'Cancel'}</Button>
            
          </InputGroupAddon>

        </InputGroup>
      </Col>
    </Row>
  )
}

export default ServerUrl
