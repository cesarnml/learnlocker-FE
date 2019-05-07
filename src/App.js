import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GlobalStyle from './components/mixins';
import LandingPage from './pages/Landing';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Social from './pages/Social';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost/SinglePost'
import Navbar from './components/navigation/Navbar';
import { customContainer } from './components/mixins';
import { composedIndexRedirect as index } from './components/authentication/indexRedirect';
import { composedHomeRedirect as home } from './components/authentication/homeRedirect';
import useInterval from './components/hooks/useInterval';
import { fetchUser } from './actions';

const App = ({ fetchUser, modal }) => {
  const { isAuthOpen, isEditOpen } = modal;

  useEffect(() => {
    // initial fetch user when you refresh browser
    fetchUser();
  }, [fetchUser]);

  useInterval(() => {
    // fetches user information every 5 minutes to reduce number of server requests
    fetchUser();
  }, 300000);

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden');
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto');
  }

  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route component={home(LandingPage)} exact path='/' />
        <Route component={index(Home)} path='/home' />
        <Route component={index(Browse)} path='/browse' />
        <Route component={index(Social)} path='/social' />
        <Route component={index(Profile)} path='/profile/:id' />
        <Route component={index(SinglePost)} path='/status/:id' />
        <Route component={index(Settings)} path='/settings' />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = ({ modal }) => ({ modal });

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser }
  )(App)
);

const Container = styled.div`
  ${customContainer()};
`;
