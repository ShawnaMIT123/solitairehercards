import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/simpleAction';
import { updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn } from './actions/actionCreators.js';
import { connect } from 'react-redux';
import Tableau from './components/Tableau.js'
import {Button, Icon} from 'semantic-ui-react'

import { bindActionCreators } from 'redux'


class App extends Component {

      simpleAction = (event) => {
       this.props.simpleAction();
      }



  render() {
    return (
      <div className="App">
      <Tableau {...this.props} />

      <pre>
{
JSON.stringify(this.props.tableau)
}
</pre>





      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ updateDraggedCard,  removeCardfromTableauColumn, addCardToTableauColumn}, dispatch)
    }
}
// const mapDispatchToProps = dispatch => ({
//   return {
//      ...bindActionCreators({ updateDraggedCard }, dispatch)
//    }
// })

export default connect(mapStateToProps, mapDispatchToProps)(App);
      // <img src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}></img>
            //
            //           <pre>
            //  {
            //   JSON.stringify(this.props)
            //  }
            // </pre>
