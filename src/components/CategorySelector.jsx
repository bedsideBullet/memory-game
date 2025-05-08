import React from "react";
import { CATEGORIES } from "../constants";

export default function CategorySelector({ selected, onSelect }) {
	return (
		<div className="flex flex-wrap gap-2 mb-4">
			{CATEGORIES.map((category) => (
				<button
					key={category.id}
					onClick={() => onSelect(category.id)}
					className={`px-3 py-1 rounded ${
						selected === category.id
							? "bg-indigo-500 text-white"
							: "bg-white/20 text-white"
					}`}
				>
					{category.name}
				</button>
			))}
		</div>
	);
}
