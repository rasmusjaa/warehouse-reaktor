import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import Jackets from './Jackets'
import Shirts from './Shirts'
import Accessories from './Accessories'
import My404Component from './My404Component'

const Main = () => {
	return (
	<BrowserRouter>
		<div>
			<Header />
			<div className="content">
				<Switch>
					<Route exact path="/" component={Jackets}/>
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
