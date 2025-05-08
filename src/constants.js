export const INITIAL_TIME = 30;
export const TIME_DECREMENT = 5;
export const PAIRS_COUNT = 8;

export const CATEGORIES = [
	{
		id: "category1",
		name: "Franchise One",
		images: Array.from({ length: PAIRS_COUNT }, (_, i) => `t1i${i + 1}`),
	},
	{
		id: "category2",
		name: "Franchise Two",
		images: Array.from({ length: PAIRS_COUNT }, (_, i) => `t2i${i + 1}`),
	},
	{
		id: "category3",
		name: "Franchise Three",
		images: Array.from({ length: PAIRS_COUNT }, (_, i) => `t3i${i + 1}`),
	},
	{
		id: "category4",
		name: "Franchise Four",
		images: Array.from({ length: PAIRS_COUNT }, (_, i) => `t4i${i + 1}`),
	},
	{
		id: "category5",
		name: "Franchise Five",
		images: Array.from({ length: PAIRS_COUNT }, (_, i) => `t5i${i + 1}`),
	},
	{
		id: "all",
		name: "All Games",
		images: [] /* filled dynamically in GameBoard */,
	},
];
