import React from 'react';

const Metamask = (props) => {

	return(
		<div id="metamask_container">
			<div className="col-md-6 col-lg-4" id="metamask_sub_container">
				<p id="metamask_header">Oops! Something went wrong.</p>
				<img id="metamask_icon" src="/images/metamask.png" alt="" />
				<p id="metamask_description">
				{props.error ?
					'Could not find any external ethereum wallet installed. Please install an external wallet like metamask to continue using Mantis.' :
					props.lock ? 'Metamask seems to be locked. Please unlock your wallet to proceed.' :
					<div>
						<p>The service is currently available only on a mainnet fork. Please connect your metamask wallet to:</p>
						<p>RPC URL: http://13.232.139.91:8545</p>
						<p>Chain id: 31337</p>
					</div>
				}</p>
			</div>
		</div>
	);

}

export default Metamask;