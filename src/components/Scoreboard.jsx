import React from "react";
import { getHighScores } from "../utils/storage";

export default function Scoreboard() {
	const scores = getHighScores();
	return (
		<div className="bg-white/20 p-4 rounded">
			<h2 className="text-white font-bold mb-2">High Scores</h2>
			<ol className="list-decimal list-inside text-white">
				{scores.map((s, i) => (
					<li key={i}>
						{s.initials}: {s.score}
					</li>
				))}
			</ol>
		</div>
	);
}
