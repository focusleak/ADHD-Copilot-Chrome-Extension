import { useEffect } from "react";

export const useTheme = (theme) => {
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
};