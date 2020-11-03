import React from 'react'
import { Route, NavLink, BrowserRouter, Redirect } from "react-router-dom"
import Home from './Home'
import Jackets from './Jackets'
import Shirts from './Shirts'
import Accessories from './Accessories'
import My404Component from './My404Component'

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

const Main = () => {
	return (
	<BrowserRouter>
		<div>
			<Header />
			<div className="content">
				<Route exact path="/" component={Home}/>
				<Route path="/jackets" component={Jackets}/>
				<Route path="/shirts" component={Shirts}/>
				<Route path="/accessories" component={Accessories}/>
				<Route path='/404' component={My404Component} />
				<Redirect from='*' to='/404' />
			</div>
			<Footer />
		</div>
	</BrowserRouter>
	)
}

export default Main
