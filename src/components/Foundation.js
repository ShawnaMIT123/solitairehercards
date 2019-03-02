import React from 'react'
import { connect } from 'react-redux'


class Foundation extends React.Component {

 //  renderTrack = (roomid) => {
 //        let room = this.findRoom(roomid)
 //
 //    return room[0].tracks.map(track => {
 //          console.log("track", track)
 //      return <TableItem key={track.id} track={track} {...this.props}/>
 //    })
 //  }
 //
 //  findRoom = (roomid) => {
 //      return this.props.rooms.filter((room)=>(room.id == roomid))
 //
 // }



  render() {
    console.log("Table", this.props)
    return (
      <Table basic='very'  compact='very' size='small' collapsing inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell><Icon  name='clock outline' inverted/></Table.HeaderCell>
            <Table.HeaderCell>Added By</Table.HeaderCell>
            <Table.HeaderCell>Listen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
{this.props.selectedPlaylist ? this.renderTrack(this.props.selectedPlaylist) : null}
        </Table.Body>
      </Table>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.selectedPlaylist
  }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(Foundation)
