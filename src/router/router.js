import React from 'react';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../components/home';
import Wallet from '../components/wallet';
import Page from '../components/page';
import Header from '../components/header';

const renderHeader = (path) => {
	switch(path){
		case '/home':
			return 'Leverage';
		case '/wallet':
			return 'Wallet';
		default:
			return 'Page Not Found';				
	}
}

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div>
			{path != '/' && <Navbar />}
			{path != '/' && <Header header={renderHeader(path)} />}
      <Switch>
				<Route path="/" component={Page} exact />
        <Route path="/home" component={Home} />
				<Route path="/wallet" component={Wallet} />
      </Switch>
		</div>
	);
}

const App = withRouter(Layout);

const AppRouter = () => (
  <BrowserRouter>
  	<App />
  </BrowserRouter>
);

export default AppRouter;