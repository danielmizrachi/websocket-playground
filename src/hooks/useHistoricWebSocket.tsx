import { useEffect, useState } from 'react'
import { HistoricWebSocketContextValue } from '../context/HistoricWebSocketContext'

/**
 * Creates and manages a WebSocket which logs its send/receive history to two string arrays
 * @param url WebSocket URL to connect to
 */
function useHistoricWebSocket(url: string | null): HistoricWebSocketContextValue {
  const [ webSocket, setWebSocket ] = useState<WebSocket | null>(null)
  const [ sentHistory, setSentHistory ] = useState<string[]>([])
  const [ receivedHistory, setReceivedHistory ] = useState<string[]>([])

  useEffect(() => {
    if (url !== null) {
      const newWebSocket = new WebSocket(url)

      newWebSocket.addEventListener('message', msgEvent => {
        const msg = String(msgEvent.data)
        setReceivedHistory(prevState => prevState.concat([msg]))
      })

      newWebSocket.addEventListener('close', () => {
        setWebSocket(null)
      })

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

  return { webSocket, sentHistory, receivedHistory, sendMessage }
}

export default useHistoricWebSocket
