"use client";
import Board from "@/components/containers/board";
import { useState, useEffect } from "react";

export default function Home() {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setOpen(false);
		}, 1300);
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			{open && (
				<div className="absolute w-full h-full bg-opacity-50 flex items-center justify-center backdrop-blur">
					<div className="p-24  bg-stone-950 text-6xl uppercase">
						<p>
							<span className="text-blue-500">tic</span>
							<span className="text-green-500">tac</span>
							<span className="text-red-500">toe</span>
						</p>
					</div>
				</div>
			)}
			<Board />
		</main>
	);
}
