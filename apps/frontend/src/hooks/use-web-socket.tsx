import {
  WebSocketContext,
  WebSocketContextProps,
} from '@/context/websocket-context'
import { useContext } from 'react'

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
