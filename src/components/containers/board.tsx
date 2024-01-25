"use client";
import { useState, useEffect } from "react";
import Square from "./square";

export type Player = "X" | "O" | null;

// the function analyses the winner square values and returns a winner if it aligns horizontally or vertically in either of three lines
// OR
// if it aligns diagonally
const getWinner = (squares: Player[]): Player => {
	if (!squares) return null;
	const line = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let result: Player = null;
	for (let i = 0; i < line.length; i++) {
		const [a, b, c] = line[i];
		if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
			result = squares[a];
		}
	}
	return result;
};

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [currPlayer, setCurrPlayer] = useState<"X" | "O" | null>(
		Math.floor(Math.random() * 1) === 0 ? "X" : "O"
	);
	const [winner, setWinner] = useState<Player | "BOTH">(null);

	useEffect(() => {
		const W: Player = getWinner(squares);
		if (W) {
			setWinner(W);
		}
		if (!W && !squares.filter((S) => !S).length) {
			setWinner("BOTH");
		}
	}, [squares]);

	const setSquareValue = (index: number): void => {
		const newData = squares.map((val, i) =>
			i === index ? (squares[i] = currPlayer) : val
		);
		setSquares(newData);
		setCurrPlayer(currPlayer === "X" ? "O" : "X");
		return;
	};

	const reset = () => {
		setSquares(Array(9).fill(null));
		setWinner(null);
		setCurrPlayer(Math.floor(Math.random() * 1) === 0 ? "X" : "O");
	};

	return (
		<div className="text-white px-24 flex items-center flex-col text-center">
			{!winner && (
				<p className="my-3 text-3xl">
					Player{" "}
					<span
						className={currPlayer === "X" ? "text-green-500" : "text-blue-500"}>
						{currPlayer}
					</span>
					`s turn
				</p>
			)}

			{/* if there is a winner display a Congratulations message to the player  */}
			{winner && winner !== "BOTH" && (
				<p className="my-3 text-2xl">
					Congratulations Player{" "}
					<span
						className={currPlayer === "X" ? "text-green-500" : "text-blue-500"}>
						{currPlayer}
					</span>{" "}
					won 🥳🎆✨🎉🎊
				</p>
			)}

			{/* if there winner is both then there us no winner  */}
			{winner && winner === "BOTH" && (
				<p className="my-3 text-2xl">
					Congratulations <span className="text-red-500">{winner}</span>
					Players <span className="text-red-500">lost</span>{" "}
				</p>
			)}

			<div className="grid grid-cols-3 max-w-fit shadow-lg shadow-blue-300 gap-0">
				{squares.map((_, i) => (
					<Square
						key={i}
						winner={winner}
						value={squares[i]}
						setSquareValue={() => setSquareValue(i)}
					/>
				))}
			</div>
			<div className="my-6">
				<button
					className="w-full py-2 px-16 text-2xl bg-red-500"
					onClick={reset}>
					RESET
				</button>
			</div>
		</div>
	);
}
