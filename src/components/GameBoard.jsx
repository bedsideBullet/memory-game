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
		// prepare category images
		let images = [];
		if (categoryId === "all") {
			// flatten all and pick random
			const all = CATEGORIES.slice(0, 5).flatMap((t) => t.images);
			shuffle(all);
			images = all.slice(0, PAIRS_COUNT);
		} else {
			images = CATEGORIES.find((t) => t.id === categoryId).images;
		}
		const pairImages = shuffle([...images, ...images]);
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

	return (
		<div className="grid grid-cols-4 gap-4">
			{cards.map((card) => {
				const isFlipped =
					flipped.includes(card.id) || matched.includes(card.id);
				return (
					<motion.div
						key={card.id}
						onClick={() => handleFlip(card)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`aspect-square bg-white/20 border-2 border-white/30 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm cursor-pointer ${
							isFlipped ? "bg-white" : ""
						}`}
					>
						{isFlipped && (
							<img
								src={`/assets/${card.img}.png`}
								alt={card.img}
								className="object-contain h-3/4"
							/>
						)}
					</motion.div>
				);
			})}
		</div>
	);
}
