import { useState, useEffect } from 'react';
import { Layout } from './styles/Layout';
import Header from './components/Header';
import GameDataTable from './components/Game-List/GameDataTable';
import { useSocket } from './context/SocketContext';


type TGameBoard = {
  id: number;
  name: string;
  creator: string;
  players: string[];
  maxPlayers: number;
  currentPlayerTurn: string;
  deck?: string[];
  discardPile?: string[];
  status: "waiting" | "in progress" | "finished";
  started: boolean;
};


function App() {
  const [gameboardData, setGameboardData] = useState<TGameBoard[]>();
  const { on, emit, off } = useSocket();


  const handleGameboards = (data: TGameBoard[]) => {
    setGameboardData(data);
  };
  
  const requestGameboards = () => {
    emit('Get-Game-List', null);
  };
  
  useEffect(() => {
    on('Game-List', handleGameboards);
    requestGameboards();
  
    return () => {
      off('Game-List');
    };
  }, [on, off, requestGameboards]);


  return (
    <Layout>
      <Header />
      <GameDataTable Games={gameboardData} />
    </Layout>
  );
}

export default App;
