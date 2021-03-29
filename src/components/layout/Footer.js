import React from "react";
import { Layout } from "antd";
const { Footer: Ftr } = Layout;

class Footer extends React.Component {
	render() {
		return (
			<div style={{ position: 'relative', height: '12vh', width: '100%' }}>
				<Ftr className='footer'>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '90%' }}>
						<a href="https://www.dukeaml.com/" target="_blank" style={{ color: 'black' }}>Duke Applied Machine Learning ©</a>
					</div>
				</Ftr>
			</div>
		);
	}
};

export default Footer;