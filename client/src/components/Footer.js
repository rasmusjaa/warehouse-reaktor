import React from 'react'

const Footer = () => {
	return (
		<div className="footer">
			<h3>Warehouse</h3>
			<p>Stock situation by color:<br />
				<span className="green">In stock</span><br />
				<span className="orange">Less than 10</span><br />
				<span className="red">Out of stock</span><br />
			</p>
		</div>
	)
}

export default Footer
