'use client'
import { env } from '@/env.mjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import io, { type Socket } from 'socket.io-client'

export interface WebSocketContextProps {
  lobbySocket: Socket | null
}

interface WebSocketProviderProps {
  children: React.ReactNode
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined)

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [lobbySocket, setLobbySocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newlobbySocket = io(`${env.NEXT_PUBLIC_API_URL}/lobby`)

    setLobbySocket(newlobbySocket)

    return () => {
      newlobbySocket.disconnect()
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ lobbySocket }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export { WebSocketProvider }
