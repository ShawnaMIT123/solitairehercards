import {
  UPDATE_AUTHORIZATION,
  LOGOUT_USER,
  UPDATE_ROOM_PLAYLIST,
  UPDATE_CURRENT_USERS,
  SET_DEVICE_ID,
  DISPLAY_SONG_SEARCH,
  SELECT_PLAYLIST,
  ADD_TRACK_TO_PLAYLIST,
  UPDATE_NEW_PLAYLIST_FORM_DISPLAYED,
  ADD_NEW_ROOM,
  UPDATE_JOIN_FORM_DISPLAYED,
  UPDATE_DRAGGED_CARD,
  REMOVE_CARD_FROM_TABLEAU_COL,
  ADD_CARD_TO_TABLEAU_COL
} from './actions/types'

class Deck{
  constructor(){
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];

    const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let suit in suits) {
      for (let value of values) {
        this.deck.push({suit: `${suits[suit]}`, value, image_url: `/${suits[suit]}/${value}.png`, hidden: true});
      }

    }
  }
  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  // deal(){
  //   return this.deck.pop();
  // }
}
const deck = new Deck();
const cardsintableau = deck.deck.slice(24)
const cardsinpile = deck.deck.slice(0,24)
function cardstotableu() {
      let i = 1
      let obj = {}

     let arr = []
      for(let card of cardsintableau){
        if(Object.keys(obj).length == 0){
          card["hidden"] = false
          obj[i] = [card]
          i++
        } else if (!obj[i]) {
          obj[i] = [card]
        } else if (obj[i].length < i ) {
          if(obj[i].length == i - 1){
            card["hidden"] = false
            obj[i] = obj[i].concat([card])
            i++
          } else {

            obj[i] = obj[i].concat([card])

          }
        }
      }
      return obj
}

// function cardstotableu() {
//       let i = 1
//       let obj = {}
//
//      let arr = []
//       for(let card of cardsintableau){
//         if(Object.keys(obj).length == 0){
//           obj[i] = [card]
//           i++
//         } else if (!obj[i] ) {
//           obj[i] = [card]
//         } else if (obj[i].length < i ) {
//
//           obj[i] = obj[i].concat([card])
//           if(obj[i].length == i){
//             i++
//           }
//         }
//       }
//       return obj
// }
//





const defaultState =  {
deck: deck,
tableau: cardstotableu(),
stockpile:cardsinpile,
draggedCard: null





}


function reducer(state=defaultState, action){
  console.log(action.payload)
  switch (action.type) {
    case "UPDATE_TRACK_RESULTS":
      console.log('updating track results with', action.payload)
        return {...state, results: action.payload}
      case (UPDATE_AUTHORIZATION):
            return Object.assign({}, state, {user: action.payload.user["user"], isLoggedIn: true})
      case (LOGOUT_USER):
            localStorage.removeItem('jwt')
            return Object.assign({}, state, {
              isLoggedIn: false,
              user: {spotify_url: null, display_name: null, uri: null, access_token: null, profile_image: null, username: null, user_id: null}
            })
        case (UPDATE_ROOM_PLAYLIST):
                    return Object.assign({}, state, {rooms: action.payload.rooms})
        case (ADD_NEW_ROOM):
                    return {...state, rooms: [...state.rooms, action.payload.room]}
        case (DISPLAY_SONG_SEARCH):
                    return Object.assign({}, state, {songSearchResults: action.payload.songSearchResults})
      case (UPDATE_CURRENT_USERS):
                    return Object.assign({}, state, {users: action.payload.users})
      case (SET_DEVICE_ID):
                    return Object.assign({}, state, {deviceId: action.payload.deviceId})
      case (UPDATE_NEW_PLAYLIST_FORM_DISPLAYED):
                    return Object.assign({}, state, {newPlaylistFormDisplayed: !state.newPlaylistFormDisplayed})
      case (UPDATE_JOIN_FORM_DISPLAYED):
                    return Object.assign({}, state, {joinFormDisplayed: !state.joinFormDisplayed})
      case (SELECT_PLAYLIST):
                    return Object.assign({}, state, {selectedPlaylist: action.payload.selectedPlaylist})
      case (ADD_TRACK_TO_PLAYLIST):
                    return {...state, rooms:
                          state.rooms.map(room => {
                                if(room.id !== action.payload.track.room_id){
                                      return room
                                }else {
                                      return {
                                            ...room, tracks: room.tracks.concat(action.payload.track)
                                      }
                                }
                          })
                    }
      case (UPDATE_DRAGGED_CARD):
                    return Object.assign({}, state, {draggedCard: action.payload.draggedCard})
      case (REMOVE_CARD_FROM_TABLEAU_COL):
      return {
        ...state,
        tableau: {
          ...state.tableau,
          [parseInt(action.payload.removedCard.colkey)]: state.tableau[action.payload.removedCard.colkey].slice(0, -1)
        }
      }
      case (ADD_CARD_TO_TABLEAU_COL):
      return {
        ...state,
        tableau: {
          ...state.tableau,
          [parseInt(action.payload.newColumn)]: [...state.tableau[action.payload.newColumn].slice(0), action.payload.transferredCard ]
        }
      }



    default:
      return state
  }
}

export default reducer

// action.payload.removedCard.colkey

  // return {...state, tableau:{...state.tableau, {1: state.action.payload.removedCard}}
