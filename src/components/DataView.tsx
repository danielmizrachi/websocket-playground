import React, { useState } from 'react'
import ReactJson from 'react-json-view'

import '../styles/DataView.css'

type Props = {
  socketState: number,
  messages: string[],
  onSend: (input: string) => void
}

function DataView(props: Props) {
  const { socketState, messages, onSend } = props

  const [ input, setInput ] = useState('')

  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : ''
  
  let isJson = true
  let latestMessageJson = {}
  try {
    latestMessageJson = JSON.parse(latestMessage)
  } catch {
    isJson = false
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.shiftKey && e.code === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  function handleSend() {
    if (socketState === WebSocket.OPEN) {
      onSend(input)
      setInput('')
    }
  }

  return (
    <div className="data-view-container">
      <div className="textarea-container">
        <textarea
          className="textarea"
          placeholder="Enter data to be sent..."
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <div className="send-container">
          <button
            className="send"
            disabled={socketState !== WebSocket.OPEN}
            onClick={handleSend}
          >Send</button>
        </div>
      </div>

      <div className="textarea-container">
        { isJson ?
            <ReactJson
              src={latestMessageJson}
              theme="summerfruit"
              name={null}
              indentWidth={2}
              displayDataTypes={false}
            />
          :
            <textarea
              className="textarea"
              placeholder="Incoming data will appear here..."
              value={latestMessage}
              readOnly
            />
        }
      </div>
    </div>
  )
}

export default DataView
