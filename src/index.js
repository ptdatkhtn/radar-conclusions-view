import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from "./store/GlobalState";
import reportWebVitals from './reportWebVitals';
import ConclusionsView from "./components/ConclusionsView/ConclusionsView";
import './scss/global-styles.scss';
import './translations'
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

const appElements = document.getElementsByClassName('radar-conclusions-app')

const defaultRadarId = (/node=\d+/.test(document.location.href) && document.location.href.replace(/^.*node=(\d+).*$/, '$1')) || null

for (let el of appElements) {
  ReactDOM.render(
      renderApp(
        el.hasAttribute('data-radar-id') ? el.getAttribute('data-radar-id') : defaultRadarId
      ),
      el
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
