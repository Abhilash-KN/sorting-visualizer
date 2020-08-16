import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Visualizer from './components/Visualizer';

function App() {
	return (
		<Provider store={store}>
			<Visualizer />
		</Provider>
	);
}

export default App;
