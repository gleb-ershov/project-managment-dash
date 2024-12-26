export const ProjectsListSkeleton = () => (
	<div className="space-y-6">
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div className="h-10 bg-gray-200 rounded-md md:col-span-2 animate-pulse" />
			<div className="flex gap-2">
				<div className="h-10 bg-gray-200 rounded-md flex-1 animate-pulse" />
				<div className="h-10 bg-gray-200 rounded-md flex-1 animate-pulse" />
			</div>
		</div>

		<div className="space-y-4">
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className="h-32 bg-gray-200 rounded-lg animate-pulse"
				/>
			))}
		</div>
	</div>
);
