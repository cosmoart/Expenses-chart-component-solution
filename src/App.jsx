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
	position: relative;
	border-radius: 20px;
	background: var(--Softred);
	padding: 10px 20px;
	margin: 20px 0;
	&::after{
		content: url("logo.svg");
		height: 3rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}
	`
const Spending = styled.article`
	border-radius: 20px;
	background: var(--Verypaleorange);
	padding: 10px 20px;
	`
const Graphic = styled.ul`
	padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	height: 100px;
	margin-bottom: 30px;
	gap: 10px;
	li{
		cursor: pointer;
		position: relative;
		transition: height .3s ease-in-out, color .3s ease-in-out;
		border-radius: 4px;
		width: 35px;
		height: 0;
		background: var(--Softred);
		&::marker{
			font-size: 0;
		}
		&::after{
			content: attr(data-day);
			position: absolute;
			bottom: -22px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 14px;
			opacity: .8;
		}
		&::before{
			content: attr(data-amount);
			font-weight: bold;
			background: var(--Darkbrown);
			color: var(--Verypaleorange);
			border-radius: 3px;
			padding: 3px 6px;
			font-size: 14px;
			position: absolute;
			left: 50%;
			top: 0;
			opacity: 0;
			transform:translateX(-50%) scale(.5);
			transition: .3s ease-in-out;
		}
		&:hover::before{
			top: -30px;
			transform: translateX(-50%) scale(1);
			opacity: 1;
		}
		&:hover{
			filter: brightness(1.2);
		}
	}
	`
const EditForm = styled.form`
	font-weight: bold;
    color: var(--Verypaleorange);
    background: var(--Softred);
    gap: 7px;
	display: flex;
    flex-direction: column;
	position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
    margin: 40px;
    border-radius: 10px;
	transition: transform .2s ease-in-out, opacity .2s ease-in-out;
	`
const EditFormItem = styled.label`
	display: flex;
    justify-content: space-between;
	gap: 25px;
	span::first-letter{
		text-transform: uppercase;
	}
	input{
		width: 5rem;
		text-align:right;
		font-weight: bold;
    	border-radius: 3px;
    	border: none;
		color: var(--Darkbrown)
	}
	`
const EditButton = styled.button`
	cursor: pointer;
	position: absolute;
	width: 42px;
    height: 42px;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;
    border-radius: 50%;
    border: none;
    padding: 7px;
	background: var(--Darkbrown);
	transition: filter .1s ease-in-out, transform .1s ease-in-out;
	img{
		width: 100%;
		object-fit: contain;
		filter: invert(1)
	}
	&:hover{
		filter: brightness(1.5);
	}
	&:active{
		transform: scale(.9);
	}
	`
const Subtitle = styled.h3`
	font-weight: bold;
	margin: 10px 0;
	color: var(--Verypaleorange);
	span:first-child{
		font-size: 12px;
		font-weight: 400;
	}
	span:last-child{
		font-size: 1.5rem;
		font-weight: 600;
	}
	`
const Total = styled.h2`
	span:first-child{
		font-weight: 400;
		font-size: 14px
	}
	span:last-child{
		font-weight: 600;
		font-size: 2rem;
	}
`
const SpendingFooter = styled.footer`
	display: flex;
	justify-content: space-between;
    align-items: center;
	font-size: 14px;
	span:first-child{
		font-weight: 600;
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
			i.id === max.day && (i.style.height = "100%");
			i.style.height = `${(data[i.id].amount * 100) / max.amount}%`;
		});

	}, [data]);

	function handleEdit(e) {
		setData(data.map((i, index) => index === Number(e.target.id) ? { ...i, amount: e.target.value } : i));
		Number(e.target.value) > max.amount && (max = { day: e.target.id, amount: Number(e.target.value) });
	}

	function handleEditButton() {
		document.querySelector(".editForm").classList.toggle("hidden");
	}

	return (
		<>
			<Card>
				<Balance className='test'>
					<Subtitle><span>My balance</span><br /><span>$921.48</span></Subtitle>
				</Balance>

				<Spending>
					<h1>Spending - Last {data.length} days</h1>

					<Graphic>
						{data.map((item, id) => <li data-day={item.day} data-amount={item.amount} id={id} key={id + 10}></li>)}
					</Graphic>

					<hr />
					<SpendingFooter>
						<Total><span>Total this month</span><br /><span>$478.33</span></Total>
						<p><span>+2.4%</span><br /><span>from last month</span></p>
					</SpendingFooter>
				</Spending>
			</Card>
			<EditButton><img src="edit.svg" alt="Edit" onClick={handleEditButton} /></EditButton>
			<EditForm className='editForm hidden'>
				{
					dataJSON.map((item, id) =>
						<EditFormItem key={id + 20}>
							<span>{item.day}</span>
							<input type="number" name={item.day} id={id} onChange={e => handleEdit(e)} placeholder={item.amount} />
						</EditFormItem>)
				}
			</EditForm>
		</>
	);
}

export default App