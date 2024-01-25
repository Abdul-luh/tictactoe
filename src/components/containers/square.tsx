import { Player } from "./board";

type Props = {
	key?: number;
	winner: Player | "BOTH";
	value: Player;
	setSquareValue: (i: number) => void;
};

export default function Square({ winner, value, setSquareValue }: Props) {
	return !value ? (
		<button
			onClick={(e) => setSquareValue(e.button)}
			className="border border-white w-24 h-24 text-3xl"
			disabled={Boolean(winner)}
		/>
	) : (
		<button
			className={
				"border border-white w-24 h-24 text-3xl" +
				(value === "X"
					? " text-green-600 bg-blue-950"
					: " text-blue-500 bg-green-950")
			}
			disabled>
			{value}
		</button>
	);
}
