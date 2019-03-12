
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
  ADD_CARD_TO_TABLEAU_COL,
  ADD_CARD_TO_FOUNDATION,
  REVEAL_CARD_IN_TABLEAU
} from './types'

export function updateDraggedCard(card){
        return ({type: UPDATE_DRAGGED_CARD, payload: {draggedCard: card}})
}

export function removeCardfromTableauColumn(card){
        return ({type: REMOVE_CARD_FROM_TABLEAU_COL, payload: { removedCard: card }})
}

export function addCardToTableauColumn(card, key){
        return ({type: ADD_CARD_TO_TABLEAU_COL, payload: { transferredCard: card, newColumn: key}})
}
export function revealCardInTableau(card, key){
        return ({type: REVEAL_CARD_IN_TABLEAU, payload: { transferredCard: card, newColumn: key}})
}
export function addCardToFoundation(card, key){
        return ({type: ADD_CARD_TO_FOUNDATION, payload: { transferredCard: card, newColumn: key}})
}


//
// export function currentUser(){
//   return (dispatch) => {
//     return fetch(`${API_ROOT}/auth`, {
//       headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//       // console.log(json)
//       if (!json.error){
//         return dispatch({type: UPDATE_AUTHORIZATION, payload: {user: json}})
//       }
//     })
//   }
// }
// export function sendDeviceId(deviceId){
//   return ({type: SET_DEVICE_ID, payload: {deviceId: deviceId}})
// }
// export function displayNewPlaylistForm(){
//   return ({type: UPDATE_NEW_PLAYLIST_FORM_DISPLAYED})
// }
// export function exitNewPlaylistForm(){
//   return ({type: UPDATE_NEW_PLAYLIST_FORM_DISPLAYED})
// }
// export function displayJoinForm(){
//   return ({type: UPDATE_JOIN_FORM_DISPLAYED})
// }
// export function exitJoinForm(){
//   return ({type: UPDATE_JOIN_FORM_DISPLAYED})
// }
// export function selectPlaylistRoom(id){
//         return ({type: SELECT_PLAYLIST, payload: {selectedPlaylist: id}})
// }
// export function addTrackToPlaylistActionCable(track){
//         return ({type: ADD_TRACK_TO_PLAYLIST, payload: {track: track}})
// }
// export function addRoomToSiteActionCable(room){
//         return ({type: ADD_NEW_ROOM, payload: {room: room}})
// }
//
// export function getRoomTracks(){
//   return (dispatch) => {
//     return fetch(`${API_ROOT}/rooms`, {
//       headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//
//       console.log("rooms", json)
//       if (!json.error){
//         return dispatch({type: UPDATE_ROOM_PLAYLIST, payload: {rooms: json}})
//       }
//     })
//   }
// }
//
// export function getCurrentUsers(){
//   return (dispatch) => {
//     return fetch(`${API_ROOT}users/index`, {
//       headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//       console.log(json)
//       if (!json.error){
//         return dispatch({type: UPDATE_CURRENT_USERS, payload: {users: json}})
//       }
//     })
//   }
// }
//
// export function logoutUser(){
//   return (dispatch) => {
//     return fetch(`${API_ROOT}login/logout`, {
//       headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//       // console.log(json)
//       if (!json.error){
//         return dispatch({type: LOGOUT_USER})
//       }
//     })
//   }
// }
//
// export function searchSongs(term, room_id){
//   return (dispatch) => {
//     return fetch(`${API_ROOT}/users/browserBar`, {
//          method: 'POST', // or 'PUT'
//          body: JSON.stringify(term), // data can be `string` or {object}!
//          headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//          console.log("json", json)
//            let resultsJSON = json["tracks"].items.map((track)=>{
//                 return {"title": track.name,
//                 "img_url": track.album.images[0].url,
//               "artist": track.artists.map(artist => artist.name).join(", "),
//               "spotify_uri": track.uri,
//             "album": track.album.name,
//             "duration_ms": track.duration_ms,
//             "key": track.uri,
//             "room_id": room_id
//       }})
//       if (!json.error){
//         return dispatch({type: DISPLAY_SONG_SEARCH, payload: {songSearchResults: resultsJSON}})
//       }
//
//     })
//   }
// }
