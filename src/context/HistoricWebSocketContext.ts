import { createContext } from 'react'

export interface HistoricWebSocketContextValue {
  webSocket: WebSocket | null,
  sentHistory: string[],
  receivedHistory: string[],
  sendMessage: (msg: string) => void
}

export const HistoricWebSocketContext = createContext<HistoricWebSocketContextValue>({
  webSocket: null,
  sentHistory: [],
  receivedHistory: [],
  sendMessage: () => {}
})
