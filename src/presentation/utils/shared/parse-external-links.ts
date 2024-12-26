import { parseMultipleValues } from "./parse-multiple-values";

export const parseExternalLinks = (input: string | null): string[] => {
    if (!input) return [];

    try {
        const links = parseMultipleValues(input);

        // Validate and filter valid URLs
        return links.filter((link) => {
            try {
                new URL(link);
                return true;
            } catch {
                console.warn(`Invalid URL skipped: ${link}`);
                return false;
            }
        });
    } catch (error) {
        console.error("Error parsing external links:", error);
        return [];
    }
};