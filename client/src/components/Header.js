import React from 'react'
import { NavLink } from "react-router-dom"

const Header = () => {
	return (
		<div>
			<ul className="header">
				<li><NavLink to="/jackets">Jackets</NavLink></li>
				<li><NavLink to="/shirts">Shirts</NavLink></li>
				<li><NavLink to="/accessories">Accessories</NavLink></li>
			</ul>
		</div>
	)
}

export default Header
