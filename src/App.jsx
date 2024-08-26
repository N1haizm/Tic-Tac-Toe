import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from './components/GameOver'
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }

  return currentPlayer
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState();

  let activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array=> [...array])];

  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSymbolSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSymbolSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbolSquare = gameBoard[combination[2].row][combination[2].column]

    if (firstSymbolSquare && firstSymbolSquare === secondSymbolSquare && firstSymbolSquare === thirdSymbolSquare){
      winner = players[firstSymbolSquare]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((symbol) => (symbol === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
        let currentPlayer = deriveActivePlayer(prevTurns)

        const updatedTurns = [
            { square: { row: rowIndex, col: colIndex }, player: currentPlayer}, 
            ...prevTurns
        ];
        
        return updatedTurns
    });
  }

  function handleRematch(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        [symbol]: newName,
        ...prevPlayers
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
