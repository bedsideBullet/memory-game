import React, { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import Timer from "./components/Timer";
import Scoreboard from "./components/Scoreboard";
import GameBoard from "./components/GameBoard";
import { saveHighScore } from "./utils/storage";
import { INITIAL_TIME, TIME_DECREMENT } from "./constants";
import ScoreboardDrawer from "./components/ScoreboardDrawer";

export default function App() {
	const [category, setCategory] = useState("category1");
	const [level, setLevel] = useState(1);
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

	const handleMatch = () => setScore((s) => s + 1);
	const handleComplete = () => {
		const bonus = Math.floor(timeLeft / 2);
		setScore((s) => s + bonus);
		setTimeout(() => {
			const initials =
				prompt("Enter your initials (3 letters):", "AAA") || "AAA";
			saveHighScore({ initials: initials.slice(0, 3).toUpperCase(), score });
			if (window.confirm("Next level?")) {
				const nextLevel = level + 1;
				setLevel(nextLevel);
				setTimeLeft(INITIAL_TIME - TIME_DECREMENT * (nextLevel - 1));
			} else {
				// reset
				window.location.reload();
			}
		}, 500);
	};

	const handleTick = () => setTimeLeft((t) => t - 1);
	const handleTimeUp = () => {
		alert("Time up! Game over. Score saved.");
		const initials = prompt("Enter your initials (3 letters):", "AAA") || "AAA";
		saveHighScore({ initials: initials.slice(0, 3).toUpperCase(), score });
		window.location.reload();
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-4 flex flex-col items-center">
			<h1 className="text-white text-4xl font-bold mb-4">
				Video Game Memory Match
			</h1>
			<div className="flex gap-6 mb-4">
				<div className="text-white">Level: {level}</div>
				<div className="text-white">Score: {score}</div>
				<Timer
					timeLeft={timeLeft}
					onTick={handleTick}
					onTimeUp={handleTimeUp}
				/>
			</div>
			<CategorySelector selected={category} onSelect={setCategory} />
			<ScoreboardDrawer />
			<GameBoard
				categoryId={category}
				onMatch={handleMatch}
				onComplete={handleComplete}
			/>
			{/* <div className="mt-6 w-full max-w-xs">{ <Scoreboard /> }</div> */}
		</main>
	);
}
