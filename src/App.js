import React, { Component } from 'react';
import axios from 'axios';
import Newsfeed from './components/Newsfeed';
import { Grommet } from 'grommet';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

import { Container } from './components/mixins';

class App extends Component {
  componentDidMount() {
    const api = 'https://still-shynin-still-strugglin.herokuapp.com/';
    axios
      .get(api)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Container>
        <Navbar />
        <Switch>
          <Route component={LandingPage} exact path="/" />
          <Route component={Newsfeed} path="/news-feed" />
        </Switch>
      </Container>
    );
  }
}

export default App;
