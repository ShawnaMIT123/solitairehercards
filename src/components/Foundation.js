import React from "react";
import { connect } from "react-redux";

class Foundation extends React.Component {
  onDragStart = (ev, card) => {
    ev.dataTransfer.setData("card", JSON.stringify(card));
    this.props.updateDraggedCard(card);
  };

  onDragOver = (ev, card) => {
    ev.preventDefault();
  };

  onDrop = (ev, card, key) => {
    console.log("key", key);

    let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
    let cardUnderneath = card;
    let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

    let stackindex = null;

    if (cardUnderneath == "layout") {
      console.log("keyexist", key);
      stackindex = parseInt(key) + 1;
    } else {
      console.log("keynotexist");
      stackindex = parseInt(key);
    }
    let draggedCardIndex =
      suits.findIndex(suit => suit === draggedCard.suit) + 1;
    let arr = this.props.foundation[stackindex];

    if (arr.length == 0) {
      /// if stack empty
      if (draggedCard.value == 1) {
        // if ace

        this.props.addCardToFoundation(draggedCard, stackindex);
        if (
          this.props.discard
            .map(card => card.image_url)
            .includes(draggedCard.image_url)
        ) {
          this.props.removeCardFromDiscard();
        } else {
          let arr2 = this.props.tableau[parseInt(draggedCard.colkey)];
          let draggedCardNumIndex = arr2.findIndex(
            card => card.image_url === draggedCard.image_url
          );
          let draggedCards = arr2.slice(draggedCardNumIndex);
          let num = arr2.length - draggedCardNumIndex;

          console.log("num", num);

          this.props.removeCardfromTableauColumn(draggedCard, num);
          // this.props.removeCardfromTableauColumn(draggedCard)
        }
      }
    } else {
      let last_card = arr[arr.length - 1];
      let lastCardIndex = suits.findIndex(suit => suit === last_card.suit) + 1;
      if (
        draggedCard.value == last_card.value + 1 &&
        draggedCardIndex == lastCardIndex
      ) {
        this.props.addCardToFoundation(draggedCard, stackindex);
        if (
          this.props.discard
            .map(card => card.image_url)
            .includes(draggedCard.image_url)
        ) {
          this.props.removeCardFromDiscard();
        } else {
          let arr2 = this.props.tableau[parseInt(draggedCard.colkey)];
          let draggedCardNumIndex = arr2.findIndex(
            card => card.image_url === draggedCard.image_url
          );
          let draggedCards = arr2.slice(draggedCardNumIndex);
          let num = arr2.length - draggedCardNumIndex;

          this.props.removeCardfromTableauColumn(draggedCard, num);
        }
      }
    }
  };

  renderFoundationLayout = () => {
    let row = [];
    let left = 480;
    for (let i = 0; i < 4; i++) {
      let divStyle = {
        position: "absolute",
        width: "100px",
        height: "135px",
        top: "50px"
      };

      left += 120;
      divStyle["left"] = left;

      row.push(
        <p
          className="rectangle"
          key={i}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, `layout`, i)}
          style={divStyle}
        />
      );
    }
    return row;
  };

  renderFoundationCards = () => {
    let row = [];
    let left = 480;

    for (let key in this.props.foundation) {
      left += 120;
      for (let card of this.props.foundation[key]) {
        let divStyle = {
          position: "absolute",
          width: "100px",
          height: "135px",
          top: "50px"
        };

        divStyle["left"] = left;

        row.push(
          <img
            key={card.image_url}
            src={
              card.hidden
                ? process.env.PUBLIC_URL + "/backofcard.png"
                : process.env.PUBLIC_URL + `${card.image_url}`
            }
            onDragOver={e => this.onDragOver(e, card)}
            onDragStart={e => this.onDragStart(e, card, key)}
            draggable="true"
            style={divStyle}
            onDrop={e => this.onDrop(e, card, key)}
          />
        );
      }
    }
    return row;
  };

  render() {
    return (
      <div>
        {this.renderFoundationLayout()}
        {this.renderFoundationCards()}
      </div>
    );
  }
}

export default Foundation;
