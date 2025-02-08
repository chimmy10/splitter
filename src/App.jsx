import Calculate from "./Calculate";

function App() {
	return (
		<div className="bg-green-100 min-h-screen sm:pb-10">
			<img
				src="images/logo.svg"
				className="mx-auto py-12 lg:pb-16"
				alt="the logo"
			/>
			<Calculate />
		</div>
	);
}

export default App;
