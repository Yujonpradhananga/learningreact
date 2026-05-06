import './App.css'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type SquareValue = 'X' | 'O' | null

function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateTurns(sq: SquareValue[]): number {
  return sq.filter((s) => !s).length
}

function calculateStatus(winner: SquareValue, turns: number, player: string): string {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}

const useGameStore = create(
  combine({ squares: Array(9).fill(null) as SquareValue[], xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares: SquareValue[] | ((prev: SquareValue[]) => SquareValue[])) => {
        set((state) => ({
          squares: typeof nextSquares === 'function' ? nextSquares(state.squares) : nextSquares
        }))
      },
      setXIsNext: (nextXIsNext: boolean | ((prev: boolean) => boolean)) => {
        set((state) => ({
          xIsNext: typeof nextXIsNext === 'function' ? nextXIsNext(state.xIsNext) : nextXIsNext
        }))
      }
    }
  })
)

interface SquareProps {
  value: SquareValue
  onSquareClick: () => void
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button onClick={onSquareClick}>{value}</button>
  )
}

function Board() {
  const xIsNext = useGameStore((state) => state.xIsNext)
  const setXIsNext = useGameStore((state) => state.setXIsNext)
  const squares = useGameStore((state) => state.squares)
  const setSquares = useGameStore((state) => state.setSquares)
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player: SquareValue = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function restartGame() {
    setSquares(Array(9).fill(null) as SquareValue[])
    setXIsNext(true)
  }

  function handleClick(i: number) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <div>
      <div>{status}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}>
        {squares.map((sq, sqIn) => (
          <Square
            key={sqIn}
            value={sq}
            onSquareClick={() => handleClick(sqIn)}
          />
        ))}
      </div>
      <button onClick={restartGame}>Restart</button>
    </div>
  )
}

export default Board
