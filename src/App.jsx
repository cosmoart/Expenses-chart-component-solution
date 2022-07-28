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
		transition: height .2s ease-in-out;
		border-radius: 5px;
		width: 30px;
		height: 80%;
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

	const [max, setMax] = useState({ day: "mon", amount: 0 });

	const dayOfWeekName = new Date().toLocaleString('en-US', { weekday: 'short' }).toLocaleLowerCase();

	useEffect(() => {
		const getData = async () => {
			await fetch("data.json").then(res => res.json()).then(data => {
				setData(data);
				let maxNumber = data.reduce((acc, cur) => acc > cur.amount ? acc : cur.amount, 0);
				for (const i of data) i.amount === maxNumber && setMax(i);
			});
			console.log(max);
		}
		getData();
	}, []);

	useEffect(() => {
		document.querySelectorAll("ul li").forEach(i => {
			i.getAttribute("data-day") === dayOfWeekName && (i.style.background = "var(--Cyan)")
			i.getAttribute("data-day") === max.day && (i.style.height = "100%");

			// i.style.height = `${}%`;
		});
		console.log(max);
	}, [max]);


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
		</Card>
	)
}

export default App