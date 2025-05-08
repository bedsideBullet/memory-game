import { createContext, useState, useContext } from "react";
import { themes } from "../themes/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [themeType, setThemeType] = useState("retro-light");

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
