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
		border-radius: 5px;
		width: 30px;
		height: 100%;
		background: var(--Softred);
		&::marker{
			font-size: 0;
		}
	}
	`

function App() {

	const dayOfWeekName = new Date().toLocaleString('en-US', { weekday: 'short' });

	useEffect(() => {
		fetch("data.json").then(res => res.json()).then(data => {
			let total = 0;
			for (let i of data) {
				total += i.amount;
			}
			console.log(total);
			console.log(total * 2);
		});
	}, []);

	return (
		<Card>
			<Balance>
				<h3><span>My balance</span><br /><span>$921.48</span></h3>
			</Balance>

			<Spending>
				<h1>Spending - Last 7 days</h1>

				<Graphic>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</Graphic>

				<hr />

				<h2><span>Total this month</span><br /><span>$478.33</span></h2>
				<p><span>+2.4%</span><br /><span>from last month</span></p>
			</Spending>
		</Card>
	)
}

export default App
