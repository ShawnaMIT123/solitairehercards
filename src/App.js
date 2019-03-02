import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/simpleAction';
import { connect } from 'react-redux';
import Tableau from './components/Tableau.js'
import {Button, Icon} from 'semantic-ui-react'

class App extends Component {

      simpleAction = (event) => {
       this.props.simpleAction();
      }



  render() {
    return (
      <div className="App">
      <Tableau {...this.props} />






      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
      // <img src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}></img>
            //
            //           <pre>
            //  {
            //   JSON.stringify(this.props)
            //  }
            // </pre>
