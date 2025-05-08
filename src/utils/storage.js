export const getHighScores = () => {
	const stored = JSON.parse(localStorage.getItem("highScores") || "[]");
	return stored;
};

export const saveHighScore = (entry) => {
	const scores = getHighScores();
	scores.push(entry);
	scores.sort((a, b) => b.score - a.score);
	const top5 = scores.slice(0, 5);
	localStorage.setItem("highScores", JSON.stringify(top5));
};
