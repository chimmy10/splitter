import { useDispatch, useSelector } from "react-redux";
import { setBill, setCustom, setPeople, setPercent, setReset } from "./Slice";

function Calculate() {
	const dispatch = useDispatch();
	const bill = useSelector((state) => state.tip.bill);
	const people = useSelector((state) => state.tip.people);
	const custom = useSelector((state) => state.tip.custom);
	const percent = useSelector((state) => state.tip.percent);

	console.log(custom, percent);

	const totalTip =
		Number(bill) > 0 &&
		Number(people) > 0 &&
		(percent === 0
			? custom && !isNaN(custom)
				? (Number(custom) / 100) * Number(bill)
				: 0
			: !isNaN(percent)
			? (Number(percent) / 100) * Number(bill)
			: 0);

	const tipPerPerson =
		Number(bill) > 0 && Number(people) > 0 ? totalTip / Number(people) : 0;

	const total =
		Number(bill) > 0 && Number(people) > 0 && totalTip > 0
			? (Number(bill) + totalTip) / Number(people)
			: 0;

	return (
		<div className="max-w-sm sm:max-w-md lg:max-w-4xl lg:flex lg:justify-between lg:gap-11 mx-auto bg-white rounded-3xl px-7 py-7">
			<div className="lg:max-w-sm">
				<label htmlFor="bill" className="text-lg font-semibold text-green-800">
					Bill
				</label>
				<br />
				<div className="relative w-full mb-7 mt-1">
					<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-slate-400 font-bold">
						$
					</span>
					<input
						id="bill"
						type="text"
						placeholder="0"
						className="w-full pl-12 pr-5 py-3 border text-green-800 font-bold text-2xl border-white placeholder:font-bold placeholder:text-xl placeholder:text-slate-400 rounded-md bg-green-50 focus:outline-none focus:border-green-500 text-right"
						onChange={(e) => {
							const value = e.target.value;

							// Allow only numbers and a single decimal point
							if (/^\d*\.?\d*$/.test(value)) {
								dispatch(setBill(value)); // Store value as string to avoid losing decimal points
							}
						}}
						value={bill}
					/>
				</div>
				<label htmlFor="bill" className="text-lg font-semibold text-green-800">
					Select Tip %
				</label>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-7 mt-3">
					<button
						onClick={() => dispatch(setPercent(5))}
						className={`text-white font-bold text-2xl py-3 px-10 rounded-md flex justify-center items-center hover:bg-green-600 ${
							percent === 5 ? "bg-green-600" : "bg-green-900"
						}`}
					>
						5%
					</button>
					<button
						onClick={() => dispatch(setPercent(10))}
						className={`text-white font-bold text-2xl py-3 px-10 rounded-md flex justify-center items-center hover:bg-green-600 ${
							percent === 10 ? "bg-green-600" : "bg-green-900"
						}`}
					>
						10%
					</button>
					<button
						onClick={() => dispatch(setPercent(15))}
						className={`text-white font-bold text-2xl py-3 px-10 rounded-md flex justify-center items-center hover:bg-green-600 ${
							percent === 15 ? "bg-green-600" : "bg-green-900"
						}`}
					>
						15%
					</button>
					<button
						onClick={() => dispatch(setPercent(25))}
						className={`text-white font-bold text-2xl py-3 px-10 rounded-md flex justify-center items-center hover:bg-green-600 ${
							percent === 25 ? "bg-green-600" : "bg-green-900"
						}`}
					>
						25%
					</button>
					<button
						onClick={() => dispatch(setPercent(50))}
						className={`text-white font-bold text-2xl py-3 px-10 rounded-md flex justify-center items-center hover:bg-green-600 ${
							percent === 50 ? "bg-green-600" : "bg-green-900"
						}`}
					>
						50%
					</button>
					<input
						type="number"
						placeholder="Custom"
						className="bg-green-50 border border-white text-green-700 text-right placeholder:text-center font-bold text-2xl py-3 pl-5 pr-5 lg:pr-1 lg:pl-3 rounded-md focus:outline-none focus:border-green-500"
						onChange={(e) => dispatch(setCustom(+e.target.value))}
						value={custom || ""}
					/>
				</div>
				<label
					htmlFor="people"
					className="text-lg font-semibold text-green-800"
				>
					Number of People
				</label>
				<br />
				<div className="relative w-full mb-7">
					<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-slate-400 font-bold">
						<img src="images/icon-person.svg" alt="A profile" />
					</span>
					<input
						id="people"
						type="text"
						placeholder="0"
						className="w-full pl-12 pr-5 py-3 border text-green-800 font-bold text-2xl border-white placeholder:font-bold placeholder:text-xl placeholder:text-slate-400 rounded-md bg-green-50 focus:outline-none focus:border-green-500 text-right"
						onChange={(e) => dispatch(setPeople(+e.target.value))}
						value={people}
					/>
				</div>
			</div>
			<div className="bg-green-900 px-5 lg:px-10 lg:py-12 py-8 rounded-2xl lg:w-full lg:flex lg:flex-col lg:justify-between">
				<div>
					<div className="flex justify-between items-center mb-4">
						<div className="text-white font-semibold text-[17px] flex flex-col">
							<h1>Tip Amount</h1>
							<span className="text-slate-400 text-[14px]">/ person</span>
						</div>
						<div className="text-[35px] font-bold text-green-300 flex items-center gap-1">
							<div className="text-2xl">$</div>
							<div>{tipPerPerson.toFixed(2)}</div>
						</div>
					</div>
					<div className="flex justify-between items-center mb-7">
						<div className="text-white font-semibold text-[17px] flex flex-col">
							<h1>Total</h1>
							<span className="text-slate-400 text-[14px]">/ person</span>
						</div>
						<div className="text-[35px] font-bold text-green-300 flex items-center gap-1">
							<div className="text-2xl">$</div>
							<div>{total.toFixed(2)}</div>
						</div>
					</div>
				</div>
				<button
					onClick={() => dispatch(setReset())}
					className="bg-green-300 w-full py-2 text-xl font-bold text-green-900 rounded-md hover:text-green-300 transform transition-all duration-300 ease-in-out hover:scale-102 hover:bg-green-700 hover:shadow-lg"
				>
					RESET
				</button>
			</div>
		</div>
	);
}

export default Calculate;
