import React from "react";
import { connect } from "react-redux";

class Timer extends React.Component {

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let time =  `${hours}:${minutes}:${seconds}`
    return time;
  }

  render() {
    return (
      <div>
        {this.secondsToTime(this.props.timer.seconds)}
      </div>
    );
  }
}

export default Timer;
