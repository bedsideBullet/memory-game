import React, { useState } from "react";
import { useTheme } from "./contest/ThemeContext";
import CategorySelector from "./components/CategorySelector";
import Timer from "./components/Timer";
import ScoreboardDrawer from "./components/ScoreboardDrawer";
import GameBoard from "./components/GameBoard";
import { saveHighScore } from "./utils/storage";
import { INITIAL_TIME, TIME_DECREMENT } from "./constants";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
	const { currentTheme } = useTheme();
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
		<main
			className="min-h-screen p-4 flex flex-col items-center"
			style={{
				background: currentTheme.colors.background,
				color: currentTheme.colors.text,
				fontFamily: currentTheme.font,
			}}
		>
			<h1 className="text-4xl font-bold mb-4">Video Game Memory Match</h1>
			<div className="flex gap-6 mb-4">
				<div>Level: {level}</div>
				<div>Score: {score}</div>
				<Timer
					timeLeft={timeLeft}
					onTick={handleTick}
					onTimeUp={handleTimeUp}
				/>
			</div>
			<CategorySelector selected={category} onSelect={setCategory} />
			<ErrorBoundary>
				<ScoreboardDrawer />
			</ErrorBoundary>
			<GameBoard
				categoryId={category}
				onMatch={handleMatch}
				onComplete={handleComplete}
			/>
		</main>
	);
}
