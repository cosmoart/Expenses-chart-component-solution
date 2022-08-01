import { useState, useEffect } from 'react'
import styled from 'styled-components';
import dataJSON from "../data.json";

const Card = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding-bottom: 1.6rem;
	`
const Balance = styled.article`
	position: relative;
	border-radius: 1.25rem;
	background: var(--Softred);
	padding: 1.6rem 2rem 1.2rem 2.1rem;
	margin: 1.25rem 0;
	&::after{
		content: url("logo.svg");
		height: 3rem;
		position: absolute;
		right: 2.3rem;
		top: 50%;
		transform: translateY(-50%);
	}
	h3 span:first-child{
		font-size: 1.1rem;
		margin-bottom: 0.8rem;
    	display: inline-block;
	}
	h3 span:last-child{
		font-size: 2rem;
	}
	`
const Spending = styled.article`
	border-radius: 1.25rem;
	background: var(--Verypaleorange);
	padding: 0.625rem 2.625rem 2rem 2.625rem;
	h1{
		font-size: 2rem;
		margin-bottom: 3.9rem;
	}
	`
const Graphic = styled.ul`
	padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	height: 9.375rem;
	margin-bottom: 1.875rem;
	gap: 1.125rem;
	li{
		cursor: pointer;
		position: relative;
		transition: height .3s ease-in-out, color .3s ease-in-out;
		border-radius: 0.25rem;
		width: 3.125rem;
		height: 0;
		background: var(--Softred);
		&::marker{
			font-size: 0;
		}
		&::after{
			content: attr(data-day);
			position: absolute;
			bottom: -1.375rem;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.875rem;
			opacity: .8;
		}
		&::before{
			content: attr(data-amount);
			font-weight: bold;
			background: var(--Darkbrown);
			color: var(--Verypaleorange);
			border-radius: 0.188rem;
			padding: 0.188rem 0.375rem;
			font-size: 0.875rem;
			position: absolute;
			left: 50%;
			top: 0;
			opacity: 0;
			transform:translateX(-50%) scale(.5);
			transition: .3s ease-in-out;
		}
		&:hover::before{
			top: -1.875rem;
			transform: translateX(-50%) scale(1);
			opacity: 1;
			filter: brightness(.75);
		}
		&:hover{
			filter: brightness(1.3);
		}
	}
	`
const EditForm = styled.form`
	font-weight: bold;
    color: var(--Verypaleorange);
    background: var(--Softred);
    gap: 0.7rem;
	display: flex;
    flex-direction: column;
	position: absolute;
    bottom: 0;
    right: 0;
    padding: 2rem;
    margin: 3rem;
    border-radius: 0.6rem;
	transition: transform .2s ease-in-out, opacity .2s ease-in-out;
	`
const EditFormItem = styled.label`
	display: flex;
    justify-content: space-between;
	gap: 1.563rem;
	font-size: 1.5rem;
	span::first-letter{
		text-transform: uppercase;
	}
	input{
		font-size: 1.2rem;
		width: 5rem;
		text-align:right;
		font-weight: bold;
    	border-radius: 0.188rem;
    	border: none;
		color: var(--Darkbrown)
	}
	`
const EditButton = styled.button`
	cursor: pointer;
	position: absolute;
	width: 3.6rem;
    height: 3.6rem;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;
    border-radius: 50%;
    border: none;
    padding:0.6rem;
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
	margin: 0.625rem 0;
	color: var(--Verypaleorange);
	span:first-child{
		font-size: 0.75rem;
		font-weight: 400;
	}
	span:last-child{
		font-size: 1.5rem;
		font-weight: 600;
	}
	`
const SpendingFooter = styled.footer`
	display: flex;
	justify-content: space-between;
    align-items: flex-end;
	font-size: 0.875rem;
	p span:first-child{
		font-size: 1rem;
		font-weight: 600;
		margin-left: 5.1rem;
		margin-bottom: 0.8rem;
    	display: inline-block;
	}
	p span:last-child{
		font-size: 1.13rem;
	}
	h2 span:first-child{
		opacity: .7;
		font-weight: 400;
		font-size: 1.2rem;
	}
	h2 span:last-child{
		font-weight: 600;
		font-size: 3rem;
	}
	`

function App() {
	const dayOfWeekName = new Date().toLocaleString('en-US', { weekday: 'short' }).toLocaleLowerCase();
	const [data, setData] = useState(dataJSON);

	let max = null;

	useEffect(() => {
		max = data.reduce((a, b) => (a.amount > b.amount) ? a : b);

		document.querySelectorAll("ul li").forEach(i => {
			i.getAttribute("data-day") === dayOfWeekName && (i.style.background = "var(--Cyan)");
			console.log(i.id, max.day, i.id === max.day);
			i.id === max.day && (i.style.height = "100%");
			i.style.height = `${(data[i.id].amount * 100) / max.amount}%`;
		});

	}, [data, max]);

	function handleEdit(e) {
		Number(e.target.value) > Number(max.amount) && (max = { day: e.target.id, amount: Number(e.target.value) });
		setData(data.map((i, index) => index === Number(e.target.id) ? { ...i, amount: Number(e.target.value) } : i));
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

					<hr style={{ "opacity": "0.4", "margin": "3rem 0 2rem" }} />
					<SpendingFooter>
						<h2><span>Total this month</span><br /><span>$478.33</span></h2>
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