import Router from './router/router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import Metamask from './components/metamask';
import configureStore from './store/configureStore.js';
import {getAccounts, enableMetamask, getNetwork} from './utils';
import {setAccount} from './actions/account';

const {store, persistor} = configureStore();

const onBeforeLift = async() => {
	try{
		await enableMetamask();
		const account = await getAccounts();
		store.dispatch(setAccount(account));
	}
	catch(e){
		console.log(e);
	}
}

const App = () => {
	const promise = new Promise(async(resolve, reject) => {
		if(typeof web3 !== 'undefined'){
			try{
				await getNetwork();
				resolve(
					<Provider store={store}>
						<PersistGate 
				      loading={<Metamask lock={true} />}
				      onBeforeLift={onBeforeLift}
				      persistor={persistor}>
								<Router />
						</PersistGate>
					</Provider>
				);
			}
			catch(e){
				resolve(<Metamask />);
			}
		}
		else{
			 resolve(<Metamask error={true} />);
		}
	});
	return promise;
}

export default App;
