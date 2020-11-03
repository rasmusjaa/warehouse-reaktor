import React, { useState, useEffect } from 'react'
import { Route, NavLink, BrowserRouter, Redirect, Switch } from "react-router-dom"
import Home from './Home'
import My404Component from './My404Component'
import functions from './../services/products'

const Header = () => {
	return (
		<div>
			<ul className="header">
				<li><NavLink exact to="/">Home</NavLink></li>
				<li><NavLink to="/jackets">Jackets</NavLink></li>
				<li><NavLink to="/shirts">Shirts</NavLink></li>
				<li><NavLink to="/accessories">Accessories</NavLink></li>
			</ul>
		</div>
	)
}

const Footer = () => {
	return (
		<div className="footer">
			<h3>Footer</h3>
		</div>
	)
}

const Product = ({id, name, color, price, manufacturer, availability}) => {
	return (
		<>
			<div className="col">
				<span className="grid-header-mobile">id:&nbsp;</span>
				{id}				
			</div>
			<div className="col">
				<span className="grid-header-mobile">name:&nbsp;</span>
				{name}				
			</div>
			<div className="col">
				<span className="grid-header-mobile">color:&nbsp;</span>
				{color.join(', ')}		
			</div>
			<div className="col">
				<span className="grid-header-mobile">price:&nbsp;</span>
				{price}				
			</div>
			<div className="col">
				<span className="grid-header-mobile">manufacturer:&nbsp;</span>
				{manufacturer}				
			</div>
			<div className="col">
				<span className="grid-header-mobile">availability:&nbsp;</span>
				{availability}				
			</div>
			<div className="col mobile">
			</div>
		</>
	)
}

const ProductTable = ({ getFunction }) => {
	const [products, setProducts] = useState([])
	
	useEffect(() => {
			getFunction()
			.then(initialProducts => {
				setProducts(initialProducts)
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	console.log(products);
	return (
		<div className="grid">
			<div className="col grid-header">id</div>
			<div className="col grid-header">name</div>
			<div className="col grid-header">color</div>
			<div className="col grid-header">price</div>
			<div className="col grid-header">manufacturer</div>
			<div className="col grid-header">availability</div>
			{products.map((product) =>
				<Product key={product.id} id={product.id}  name={product.name} color={product.color} price={product.price} manufacturer={product.manufacturer} availability={product.availability}/>
			)}
		</div>
	)
}

const Jackets = () => {
	return (
	  <div>
		<h1>Jackets</h1>
		<ProductTable getFunction={functions.getJackets} />
	  </div>
	)
}

const Shirts = () => {
	return (
	  <div>
		<h1>Shirts</h1>
		<ProductTable getFunction={functions.getShirts} />
	  </div>
	)
}

const Accessories = () => {
	return (
	  <div>
		<h1>Accessories</h1>
		<ProductTable getFunction={functions.getAccessories} />
	  </div>
	)
}

const Main = () => {
	return (
	<BrowserRouter>
		<div>
			<Header />
			<div className="content">
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/jackets" component={Jackets}/>
				<Route path="/shirts" component={Shirts}/>
				<Route path="/accessories" component={Accessories}/>
				<Route path='/404' component={My404Component} />
				<Redirect from='/*' to='/404' />
			</Switch>
			</div>
			<Footer />
		</div>
	</BrowserRouter>
	)
}

export default Main
