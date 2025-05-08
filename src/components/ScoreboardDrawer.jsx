import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const ScoreboardDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scores, setScores] = useState([]);

	useEffect(() => {
		const storedScores = JSON.parse(localStorage.getItem("scoreboard")) || [];
		setScores(storedScores);
	}, []);

	const toggleDrawer = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<button
				onClick={toggleDrawer}
				className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg"
			>
				{isOpen ? <FaTimes /> : <FaBars />}
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "tween", duration: 0.3 }}
						className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-40 p-4 overflow-y-auto"
					>
						<h2 className="text-xl font-bold mb-4">🏆 Scoreboard</h2>
						<ul className="space-y-2 mb-6">
							{scores.length === 0 ? (
								<li className="text-gray-500">No scores yet</li>
							) : (
								scores.map((entry, idx) => (
									<li key={idx} className="flex justify-between">
										<span className="font-mono">{entry.initials}</span>
										<span>Score: {entry.score}</span>
										<span>Lvl: {entry.level}</span>
									</li>
								))
							)}
						</ul>

						<h2 className="text-xl font-bold mb-2">🎮 How to Play</h2>
						<p className="text-sm text-gray-700">
							Match pairs of images before time runs out. Each match earns 1
							point. Bonus points are awarded based on remaining time. Select a
							categoty and advance through increasingly difficult levels with
							less time. Try to beat the top 5 scores!
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ScoreboardDrawer;
