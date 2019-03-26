import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/simpleAction';
import { updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard } from './actions/actionCreators.js';
import { connect } from 'react-redux';
import Tableau from './components/Tableau.js'
import Discard from './components/Discard.js'
import Test from './components/Test.js'
import Foundation from './components/Foundation.js'
import StockPile from './components/StockPile.js'
import {Button, Icon} from 'semantic-ui-react'
import CanvasComponent from './components/CanvasComponent.js'


import { bindActionCreators } from 'redux'


class App extends Component {

      simpleAction = (event) => {
       this.props.simpleAction();
      }



  render() {
    return (
      <div className="App">
      <StockPile {...this.props}/>
      <Foundation {...this.props} />
      <Tableau {...this.props} />
      <Discard {...this.props} />


      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ updateDraggedCard,  removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard }, dispatch)
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
