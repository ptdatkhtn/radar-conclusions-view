import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from "./store/GlobalState";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ConclusionsView from "./components/ConclusionsView/ConclusionsView";

// http://localhost:3008/?node=194688

const renderApp = (nid) => {
  return (
    <React.StrictMode>
      <DataProvider node={nid}>
        <ConclusionsView />
      </DataProvider>
    </React.StrictMode>
  )
}

const appElements = document.getElementsByClassName('conclusions-tab')

const defaultRadarId = (/node=\d+/.test(document.location.href) && document.location.href.replace(/^.*node=(\d+).*$/, '$1')) || null

for (let el of appElements) {
  ReactDOM.render(
      renderApp(
        el.hasAttribute('data-radarid') ? el.getAttribute('data-radarid') : defaultRadarId
      ),
      el
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
