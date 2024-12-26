import { useState, useEffect } from "react";

export const useProgress = (isLoading: boolean) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!isLoading) {
			setProgress(0);
			return;
		}

		// Simulate progress
		setProgress(10); // Start with initial progress

		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				// Slowly increase progress but never reach 100%
				if (oldProgress >= 90) {
					return oldProgress;
				}
				return Math.min(oldProgress + Math.random() * 10, 90);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [isLoading]);

	// When loading completes, jump to 100%
	useEffect(() => {
		if (!isLoading && progress > 0) {
			setProgress(100);
		}
	}, [isLoading, progress]);

	return progress;
};
