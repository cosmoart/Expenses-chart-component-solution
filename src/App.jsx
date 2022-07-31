import { useState, useEffect } from 'react'
import styled from 'styled-components';
import dataJSON from "../data.json";

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
		position: relative;
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
			position: absolute;
			bottom: -1rem;
		}
		&::before{
			content: attr(data-amount);
		}
	}
	`
const EditForm = styled.form`
	display: flex;
    flex-direction: column;
	position: absolute;
    bottom: 0;
    right: 0;
	background: red;
    padding: 1rem;
    margin: 2rem;
    border-radius: 10px;
	`
const EditFormItem = styled.label`
	display: flex;
    justify-content: space-between;
	gap: 1rem;
	span::first-letter{
		text-transform: uppercase;
	}
	input{
		width: 5rem;
		text-align:right;
	}
	`



function App() {
	const dayOfWeekName = new Date().toLocaleString('en-US', { weekday: 'short' }).toLocaleLowerCase();
	const [data, setData] = useState(dataJSON);

	let max = null;

	useEffect(() => {
		let maxNumber = data.reduce((acc, cur) => acc > cur.amount ? acc : cur.amount, 0);
		for (let i of data) i.amount === maxNumber && (max = i);

		document.querySelectorAll("ul li").forEach(i => {
			i.getAttribute("data-day") === dayOfWeekName && (i.style.background = "var(--Cyan)")
			i.getAttribute("data-day") === max.day && (i.style.height = "100%");
			let dayData = data.find(el => el.day === i.getAttribute("data-day"));
			i.style.height = `${(dayData.amount * 100) / max.amount}%`;
		});

	}, [data, max]);

	function handleEdit(e) {
		setData(data.map(i => i.day === e.target.name ? { ...i, amount: Number(e.target.value) } : i));
		Number(e.target.value) > max.amount && (max = { day: e.target.name, amount: Number(e.target.value) });
	}

	return (
		<>
			<Card>
				<Balance>
					<h3><span>My balance</span><br /><span>$921.48</span></h3>
				</Balance>

				<Spending>
					<h1>Spending - Last 7 days</h1>

					<Graphic>
						{data.map((item, id) => <li data-day={item.day} data-amount={item.amount} id={item.day + id} key={id + 10}></li>)}
					</Graphic>

					<hr />
					<h2><span>Total this month</span><br /><span>$478.33</span></h2>
					<p><span>+2.4%</span><br /><span>from last month</span></p>
				</Spending>
			</Card>
			<EditForm>
				{
					dataJSON.map((item, id) =>
						<EditFormItem key={id + 20}>
							<span>{item.day}</span>
							<input type="number" name={item.day} onChange={e => handleEdit(e)} placeholder={item.amount} />
						</EditFormItem>)
				}
			</EditForm>
		</>
	);
}

export default App