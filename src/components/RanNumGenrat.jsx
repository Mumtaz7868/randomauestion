import React from "react";
import { useState, useEffect } from "react";
import "./RanNumGenrat.css";
const RanNumGenrat = () => {
	const [question, setQuestion] = useState("");
	const [data, setData] = useState("");
	const [state, setState] = useState("");
	const [answer, setAnswer] = useState("");
	const [counter, setCounter] = useState(0);
	const [cwrong, setCwrong] = useState(0);
	const operators = ["+", "-", "*", "/"];
	let digits = question.replace(/[/+*-]/g, "");
	useEffect(() => {
		// handlclick();
		expresion();
		if (answer === "Correct") {
			setCounter(counter + 1);
		}
		if (answer === "Wrong") {
			setCwrong(cwrong + 1);
		}
		setState(digits);
	}, [question]);
	const randomNumber = () => {
		return Math.floor(Math.random() * 9) + 1;
	};
	const randomOperator = () => {
		return operators[Math.floor(Math.random() * 4)];
	};
	const number = () => {
		let arr = [];
		for (let i = 0; i < 4; i++) {
			arr.push(randomNumber());
		}
		return arr;
	};
	const operator = () => {
		let arr = [];
		for (let i = 0; i < 3; i++) {
			let a = randomOperator();
			arr.push(a);
		}
		return arr;
	};
	const expresion = () => {
		let numbers = number();
		const operators = operator();
		let result = "";
		for (let i = 0; i < 3; i++) {
			if (i < 2) {
				result += numbers[i] + operators[i];
			} else {
				result += numbers[i] + operators[i] + numbers[i + 1];
			}
		}
		console.log(result);
		return result;
	};
	const handlclick = () => {
		let expression = expresion();
		// console.log(expression, "'express'");
		let count = 0;
		for (let i = 0; i < expression.length; i++) {
			if (expression[i] === "/") {
				let num1 = expression[i - 1];
				let num2 = expression[i + 1];
				if (num1 % num2 === 0) {
					setQuestion(expression);
					// eslint-disable-next-line no-eval
					setData(eval(expression));
				} else if (num1 % num2 !== 0) {
					handlclick();
				}
			} else if (expression[i] !== "/") {
				count += 1;
			}
		}
		if (count === 7) {
			setQuestion(expression);
			// eslint-disable-next-line no-eval
			setData(eval(expression));
		} else if (count === 5 || count === 4) {
			handlclick();
			setQuestion(question);
			setData(eval(question));
		}
		setAnswer("");
	};
	const handleSubmit = () => {
		handlclick();
		if (eval(state) === data) {
			setAnswer("Correct");
		} else {
			setAnswer("Wrong");
		}
	};
	const handlChange = (e) => {
		let value = e.target.value;
		setState(value);
	};
	return (
		<>
			<div className="flex flex-col bg-blue-500 h-screen  text-center items-center overflow-auto ">
				<h1 className="mt-16 text-4xl lg:text-4xl">
					Choose three of these operators(+-/*) and write them in the input
				</h1>
				<h1 className="mt-14 text-4xl lg:text-3xl">
					{digits} Answer is = {data}
				</h1>
				<input
					className="h-16 w-80 lg:h-14 lg:w-72  pl-2 mt-8 border-none outline-none rounded-lg font-bold  text-2xl lg:text-lg"
					onChange={handlChange}
					type="text"
					value={state}
				/>
				{/* {eval(state)} */}
				<button
					className="h-16 w-80 lg:h-14 lg:w-72  mt-4 p-2 border-none bg-white rounded-lg font-bold text-2xl lg:text-lg"
					onClick={() => handlclick()}
				>
					Next Question
				</button>
				<button
					className="h-16 w-80 lg:h-14 lg:w-72  mt-4 p-2 border-none bg-white rounded-lg font-bold text-2xl lg:text-lg"
					onClick={() => {
						handleSubmit();
					}}
					type="submit"
				>
					Submit
				</button>
				<p className="mt-5 font-bold text-3xl lg:text-2xl ">{answer}</p>
				<br />
				<p className="font-bold text-xl lg:text-lg">
					Attempt correct: {counter}
				</p>
				<br />
				<p className="font-bold text-xl lg:text-lg">Attempt wrong: {cwrong}</p>
			</div>
		</>
	);
};
export default RanNumGenrat;
