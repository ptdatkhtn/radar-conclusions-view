import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from "./store/GlobalState";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ConclusionsView from "./components/ConclusionsView/ConclusionsView";

// http://localhost:3008/?node=194688

const renderApp = (nid, axisLabel3, axisLabel4, axisLabel5, axisLabel6, axisLabel1, axisLabel1a, axisLabel1b, axisLabel2, axisLabel2a, axisLabel2b  ) => {
  return (
    <React.StrictMode>
      <DataProvider node={nid}>
        <ConclusionsView 
          axisLabel3={axisLabel3} 
          axisLabel4={axisLabel4} 
          axisLabel5={axisLabel5} 
          axisLabel6={axisLabel6} 
          axisLabel1={axisLabel1}
          axisLabel1a={axisLabel1a}
          axisLabel1b={axisLabel1b}
          axisLabel2={axisLabel2}
          axisLabel2a={axisLabel2a}
          axisLabel2b={axisLabel2b}
        />
      </DataProvider>
    </React.StrictMode>
  )
}

const appElements = document.getElementsByClassName('conclusions-tab')

for (let el of appElements) {
  ReactDOM.render(
      renderApp(
          el.getAttribute('data-radarid'),
          el.getAttribute('data-AxisLabel3'),
          el.getAttribute('data-AxisLabel4'),
          el.getAttribute('data-AxisLabel5'),
          el.getAttribute('data-AxisLabel6'),
          el.getAttribute('data-AxisLabel1'),
          el.getAttribute('data-AxisLabel1a'),
          el.getAttribute('data-AxisLabel1b'),
          el.getAttribute('data-AxisLabel2'),
          el.getAttribute('data-AxisLabel2a'),
          el.getAttribute('data-AxisLabel2b')
      ),
      el
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
