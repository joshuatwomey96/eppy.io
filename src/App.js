import React, { Component } from 'react';
import { Route } from 'react-router';
import { Module } from './components/Episode'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <>
          <Module/>
        </>
    );
  }
}
