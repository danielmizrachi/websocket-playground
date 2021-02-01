import { createContext, useEffect, useState } from 'react'

interface HistoricWebSocketContext {
  webSocket: WebSocket | null,
  sentHistory: string[],
  receivedHistory: string[],
  sendMessage: (msg: string) => void
}

/**
 * Creates a React context for a WebSocket which logs its send/receive history to two string arrays
 * @param url WebSocket URL to connect to
 */
function useHistoricWebSocket(url: string | undefined) {
  const [ webSocket, setWebSocket ] = useState<WebSocket | null>(null)
  const [ sentHistory, setSentHistory ] = useState<string[]>([])
  const [ receivedHistory, setReceivedHistory ] = useState<string[]>([])

  useEffect(() => {
    if (url) {
      const newWebSocket = new WebSocket(url)

      newWebSocket.onmessage = msgEvent => {
        const msg = String(msgEvent.data)
        setReceivedHistory(prevState => prevState.concat([msg]))
      }

      newWebSocket.onclose = () => {
        setWebSocket(null)
      }

      setWebSocket(newWebSocket)
    } else {
      setWebSocket(null)
    }
  }, [url])

  useEffect(() => {
    return () => {
      webSocket?.close()
    }
  }, [webSocket])

  const sendMessage = (msg: string) => {
    if (webSocket) {
      webSocket.send(msg)
      setSentHistory(prevState => prevState.concat([msg]))
    }
  }

  const context = createContext<HistoricWebSocketContext>({ webSocket, sentHistory, receivedHistory, sendMessage })

  return context
}

export default useHistoricWebSocket
