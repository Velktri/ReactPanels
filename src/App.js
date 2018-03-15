import React from 'react';
import './App.css';
import Layout from './components/Panel/Layout';

const App = () => {
  return (
    <div className="App">
      <Layout 
        panelSize = {[750, 750]}
        dividerSize = { 2 }
      />
    </div>
  )
}

export default App;