import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './applications/App';
import reportWebVitals from './applications/reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(process.env.REACT_APP_ENVIRONMENT === 'develop' ? console.log : undefined);
