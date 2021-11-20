import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './pages/GameScreen';
import Login from './pages/Login';
import Header from './components/Header';
import ConfigWindow from './pages/ConfigWindow';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ ConfigWindow } />
        <Route path="/game" component={ GameScreen } />
        <Route path="/feedback" component={ FeedBack } />
      </Switch>
    </div>
  );
}
