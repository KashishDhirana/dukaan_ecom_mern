export const ServerErrorResponse = ({
	formErrors,
}: {
	formErrors: any;
}): React.ReactNode => {
	return (
		formErrors[0] && (
			<div className="bg-red-50 border border-red-200 p-4 rounded mb-4 col-span-full">
				<h3 className="font-bold text-red-700">
					Please fix the following errors:
				</h3>
				<ul className="list-disc pl-5">
					{Object.keys(formErrors[0]).map((fieldName) => {
						return formErrors?.[0]?.[fieldName].map((err, i) => (
							<li key={`${fieldName}-${i}`} className="text-red-600">
								<span className="capitalize font-medium">{fieldName}: </span>
								{err.message}
							</li>
						));
					})}
				</ul>
			</div>
		)
	);
};
