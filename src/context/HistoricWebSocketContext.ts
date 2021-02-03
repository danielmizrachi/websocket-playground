import { createContext } from 'react'

export interface HistoricWebSocket {
  webSocket: WebSocket | null,
  sentHistory: string[],
  receivedHistory: string[],
  sendMessage: (msg: string) => void
}

export const HistoricWebSocketContext = createContext<HistoricWebSocket>({
  webSocket: null,
  sentHistory: [],
  receivedHistory: [],
  sendMessage: () => {}
})
