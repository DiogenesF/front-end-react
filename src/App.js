import React from 'react';
import Main from "./components/MainComponent";
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
