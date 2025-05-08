import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PAIRS_COUNT, CATEGORIES } from "../constants";

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

export default function GameBoard({ categoryId, onMatch, onComplete }) {
	const [cards, setCards] = useState([]);
	const [flipped, setFlipped] = useState([]);
	const [matched, setMatched] = useState([]);

	useEffect(() => {
		// Prepare category placeholders
		let images = [];
		if (categoryId === "all") {
			// Flatten all categories and pick random
			const all = CATEGORIES.slice(0, 5).flatMap((t) => t.images);
			shuffle(all);
			images = all.slice(0, PAIRS_COUNT);
		} else {
			images = CATEGORIES.find((t) => t.id === categoryId).images;
		}
		const pairImages = shuffle([...images, ...images]); // Duplicate images for pairs
		setCards(pairImages.map((img, idx) => ({ id: idx, img })));
		setFlipped([]);
		setMatched([]);
	}, [categoryId]);

	useEffect(() => {
		if (matched.length / 2 === PAIRS_COUNT) {
			onComplete();
		}
	}, [matched]);

	const handleFlip = (card) => {
		if (flipped.includes(card.id) || matched.includes(card.id)) return;
		const newFlipped = [...flipped, card.id];
		setFlipped(newFlipped);
		if (newFlipped.length === 2) {
			const [firstId, secondId] = newFlipped;
			const first = cards.find((c) => c.id === firstId);
			const second = cards.find((c) => c.id === secondId);
			if (first.img === second.img) {
				setMatched([...matched, firstId, secondId]);
				onMatch();
				setFlipped([]);
			} else {
				setTimeout(() => setFlipped([]), 1000);
			}
		}
	};

	// Get placeholder colors for categories
	const getCategoryColor = (img) => {
		for (const category of CATEGORIES) {
			if (category.images.includes(img)) {
				const index = CATEGORIES.indexOf(category);
				const colors = ["#FFB3B3", "#FFDFBF", "#B3FFB3", "#B3D9FF", "#E1B3FF"];
				return colors[index % colors.length]; // Assign colors cyclically
			}
		}
		return "#CCCCCC"; // Default color
	};

	return (
		<div className="w-full flex items-center justify-center p-4">
			<div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] mx-auto border-2 border-gray-300 rounded-lg p-6 bg-white">
				<div className="grid grid-cols-4 gap-4 place-content-center">
					{cards.map((card) => {
						const isFlipped =
							flipped.includes(card.id) || matched.includes(card.id);
						const color = getCategoryColor(card.img);
						return (
							<motion.div
								key={card.id}
								onClick={() => handleFlip(card)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="aspect-square border-2 border-gray-400 rounded-lg flex items-center justify-center shadow-md cursor-pointer text-xs sm:text-sm md:text-base"
								style={{
									backgroundColor: isFlipped ? "white" : color,
									color: isFlipped ? "black" : "white",
									width: "5rem",
									maxWidth: "5rem",
								}}
							>
								{isFlipped && <span className="font-bold">{card.img}</span>}
								{!isFlipped && <span className="font-bold">?</span>}
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
