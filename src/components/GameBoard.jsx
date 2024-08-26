export default function GameBoard({ onSelectSquare, board }) {
  

  // const [gameBoard, setGameBoard] = useState(initialGameBoard)

  // function handleSymbolUpdate(rowIn, colIn){
  //     setGameBoard(prevBoard => {
  //         const newBoard = [...prevBoard.map(innerarray => [...innerarray])]
  //         newBoard[rowIn][colIn] = activePlayerSymbol
  //         return newBoard
  //     })

  //     onSelectSquare()
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
