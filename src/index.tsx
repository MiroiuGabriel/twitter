import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './hooks/UserContext';
import { TweetsProvider } from './hooks/TweetsContext';
// console.log = (l: any) => document.write(l);

const MemoizedApp = memo(App);

ReactDOM.render(
	<React.StrictMode>
		<TweetsProvider>
			<UserProvider>
				<MemoizedApp />
			</UserProvider>
		</TweetsProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
