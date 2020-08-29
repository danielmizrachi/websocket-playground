import React, { useState } from 'react'

import '../styles/ServerUrl.css'

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

  function handleProtocolChange(e: React.ChangeEvent<HTMLSelectElement>) {
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
    <div className="url-container">
      <select
        value={protocol}
        onChange={handleProtocolChange}
      >
        <option value="wss">wss://</option>
        <option value="ws">ws://</option>
      </select>

      <input
        className="url-input"
        placeholder="Enter a WebSocket host..."
        value={host}
        onChange={handleUrlChange}
        onKeyUp={handleUrlKeyUp}
      />

      <button
        className="connect"
        onClick={() => onConnect(`${protocol}://${host}`)}
        disabled={!canConnect}
      >{socketState === WebSocket.CONNECTING ? 'Connecting...' : 'Connect'}</button>

      <button
        className="cancel-close"
        onClick={() => onCancelClose()}
        disabled={socketState === WebSocket.CLOSED}
      >{socketState === WebSocket.OPEN ? 'Close' : 'Cancel'}</button>
    </div>
  )
}

export default ServerUrl
