"use client";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryProvider = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}
         onError={(error) => console.error(error)}>
			{children}
		</ErrorBoundary>
	);
};

const ErrorFallback = () => {
	return (
		<div>
			<h1>Something went wrong</h1>
			<p>Try refreshing the page</p>
		</div>
	);
};
