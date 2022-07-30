import { useState, useEffect } from 'react'
import styled from 'styled-components';

const Card = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	`
const Balance = styled.article`
	border-radius: 20px;
	background: var(--Softred);
	padding: 10px;
	&::after{
		content: url("logo.svg");
		width: 3rem;
		height: 3rem;
		position: absolute;
		right: 1rem;
		top: 1rem
	}
	`
const Spending = styled.article`
	border-radius: 20px;
	background: var(--Verypaleorange);
	padding: 10px;
	`
const Graphic = styled.ul`
	padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	height: 8rem;
	li{
		transition: height .3s ease-in-out, color .3s ease-in-out;
		border-radius: 5px;
		width: 30px;
		height: 0;
		background: var(--Softred);
		&::marker{
			font-size: 0;
		}
		&::after{
			content: attr(data-day);
		}
	}
	`

function App() {
	const [data, setData] = useState("");
	let max = null;

	const dayOfWeekName = new Date().toLocaleString('en-US', { weekday: 'short' }).toLocaleLowerCase();

	useEffect(() => {
		const getData = async () => await fetch("data.json").then(res => res.json()).then(info => setData(info));
		getData();
	}, []);

	useEffect(() => {
		console.log("asd");
		if (data !== "") {
			let maxNumber = data.reduce((acc, cur) => acc > cur.amount ? acc : cur.amount, 0);
			for (let i of data) i.amount === maxNumber && (max = i);

			document.querySelectorAll("ul li").forEach(i => {
				i.getAttribute("data-day") === dayOfWeekName && (i.style.background = "var(--Cyan)")
				i.getAttribute("data-day") === max.day && (i.style.height = "100%");
				let dayData = data.find(el => el.day === i.getAttribute("data-day"));
				i.style.height = `${(dayData.amount * 100) / max.amount}%`;
			});
			console.log(max);
		}
	}, [data, max]);

	function handleEdit(e) {
		// console.log(e.target.name, max.day);
		// console.log(Number(e.target.value));
		Number(e.target.value) > max.amount && (max = { day: e.target.name, amount: Number(e.target.value) });
		if (max.day === e.target.name) {
			console.log("same day");
		}
		document.querySelector(`[data-day="${e.target.name}"]`).style.height = `${(Number(e.target.value) * 100) / max.amount}%`;
	}

	return (
		<Card>
			<Balance>
				<h3><span>My balance</span><br /><span>$921.48</span></h3>
			</Balance>

			<Spending>
				<h1>Spending - Last 7 days</h1>

				<Graphic>
					<li data-day="mon"></li>
					<li data-day="tue"></li>
					<li data-day="wed"></li>
					<li data-day="thu"></li>
					<li data-day="fri"></li>
					<li data-day="sat"></li>
					<li data-day="sun"></li>
				</Graphic>

				<hr />
				<h2><span>Total this month</span><br /><span>$478.33</span></h2>
				<p><span>+2.4%</span><br /><span>from last month</span></p>
			</Spending>
			<form>
				<label>
					Monday
					<input type="number" name='mon' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Tuesday
					<input type="number" name='tue' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Wednesday
					<input type="number" name='wed' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Thursday
					<input type="number" name='thu' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Friday
					<input type="number" name='fri' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Saturday
					<input type="number" name='sat' onChange={e => handleEdit(e)} />
				</label>
				<label>
					Sunday
					<input type="number" name='sun' onChange={e => handleEdit(e)} />
				</label>
			</form>
		</Card>
	);
}

export default App