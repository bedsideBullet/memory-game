import React, { useEffect } from "react";

export default function Timer({ timeLeft, onTick, onTimeUp }) {
	useEffect(() => {
		if (timeLeft <= 0) {
			onTimeUp();
			return;
		}
		const timer = setTimeout(() => onTick(), 1000);
		return () => clearTimeout(timer);
	}, [timeLeft]);

	return <div className="text-white text-xl">Time: {timeLeft}s</div>;
}
