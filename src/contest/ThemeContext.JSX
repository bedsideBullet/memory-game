import { createContext, useState, useContext, useEffect } from "react";
import { themes } from "../themes/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const getSystemDefaultTheme = () => {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		return prefersDark ? "retro-dark" : "retro-light";
	};

	const getStoredTheme = () => {
		return localStorage.getItem("selectedTheme") || getSystemDefaultTheme();
	};

	const [themeType, setThemeType] = useState(getStoredTheme);

	useEffect(() => {
		// Persist theme selection
		localStorage.setItem("selectedTheme", themeType);
	}, [themeType]);

	const value = {
		currentTheme: themes[themeType],
		setThemeType,
		themeType,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
