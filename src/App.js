import React from "react";

let def = 25;
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      intervalId: 0,
      minutes: "25",
      seconds: "0",
      breakLength: "5",
      break: true,
      sessionLength: 25,
      ended: false,
      timer: "25:00"
    }
    this.handlePlay = this.handlePlay.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleIncBreakLength = this.handleIncBreakLength.bind(this);
    this.handleDecBreakLength = this.handleDecBreakLength.bind(this);
    this.handleIncSessionLength = this.handleIncSessionLength.bind(this);
    this.handleDecSessionLength = this.handleDecSessionLength.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    clearInterval(this.state.intervalId);
    def = 25;
    this.setState({
      started: false,
      intervalId: 0,
      minutes: "25",
      seconds: "0",
      breakLength: "5",
      break: true,
      sessionLength: 25,
      ended: false,
      timer: def + ":00"
    })
  }
  handlePlay() {
    if (this.state.started === false) {
      this.setState({
        started: true
      })
      let intervalId = setInterval(this.handleDecrease, 1000);
      this.setState({
        intervalId: intervalId
      });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({
        started: false
      })
    }
  }
  handleDecrease() {
    if (this.state.break === true & //handleBreak
      Number(this.state.minutes) === 0 &
      Number(this.state.seconds) === 0) {
      const audio = document.getElementsByClassName("audio-element")[0];
      audio.play();
      if (Number(this.state.breakLength) === 1) {
        this.setState({
          break: false,
          minutes: 1,
          seconds: 0
        })
      } else {
        this.setState({
          break: false,
          minutes: this.state.breakLength,
          seconds: 59
        })
      }
    } else if (this.state.break === false & //handleEnd
      Number(this.state.minutes) === 0 &
      Number(this.state.seconds) === 0) {
      const audio = document.getElementsByClassName("audio-element")[0];
      audio.play();
      clearInterval(this.state.intervalId)
      this.setState({
        ended: true
      })
    } else if (Number(this.state.seconds) === 0) { //handle sec 0
      this.setState({
        seconds: 59,
        minutes: Number(this.state.minutes) - 1
      })
    } else {

      this.setState({
        seconds: Number(this.state.seconds) - 1
      })
    }
    let min = this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes;
    let sec = this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds;
    this.setState({
      timer: min + ":" + sec
    })
  }
  handleIncBreakLength() {
    if (Number(this.state.breakLength) === 60) {

    } else {
      this.setState({
        breakLength: Number(this.state.breakLength) + 1
      })

    }
  }
  handleDecBreakLength() {
    if (Number(this.state.breakLength) === 1) {

    } else {
      this.setState({
        breakLength: Number(this.state.breakLength) - 1
      })
    }
  }
  handleIncSessionLength() {
    if (Number(this.state.minutes) === 60) {

    } else {
      def++;
      this.setState({
        minutes: Number(this.state.minutes) + 1,
        sessionLength: Number(this.state.minutes) + 1,

        timer: def + ":00"
      })
    }
  }
  handleDecSessionLength() {
    if (Number(this.state.minutes) === 1) {

    } else {
      def--;
      this.setState({
        minutes: Number(this.state.minutes) - 1,
        sessionLength: Number(this.state.minutes) - 1,
        timer: def + ":00"
      })
    }
  }
  render() {
    return ( <
      div >
      <
      audio id = "beep" > < source src = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" / > < /audio > <
      div className = "row" >
      <
      h3 id = "break-label" > Break Length < /h3> <
      h3 id = "session-label" > Session Length < /h3> < /
      div > <
      div className = "row" >
      <
      button id = "break-decrement"
      onClick = {
        this.handleDecBreakLength
      } > dec
      break </button> <
      h3 id = "break-length" > {
        this.state.breakLength
      } < /h3> <
      button id = "break-increment"
      onClick = {
        this.handleIncBreakLength
      } > inc
      break </button>

        <
        button id = "session-decrement"
      onClick = {
        this.handleDecSessionLength
      } > dec sess < /button> <
      h3 id = "session-length" > {
        this.state.sessionLength
      } < /h3> <
      button id = "session-increment"
      onClick = {
        this.handleIncSessionLength
      } > inc sess < /button> < /
      div > <
      div id = "timer-label"
      className = "row" >
      <
      h2 > Session < /h2> < /
      div > <
      div className = "row" >
      <
      h1 id = "time-left" > {
        this.state.timer
      } <
      /h1> < /
      div > <
      div className = "row" >
      <
      button id = "play_stop"
      onClick = {
        this.handlePlay
      } > P / S < /button> <
      button id = "reset"
      onClick = {
        this.handleReset
      } > reset < /button> < /
      div > <
      /div>
    )
  }
}

function App() {
  return ( <
    div className = "App" >
    <
    Timer / >
    <
    /div>
  );
}
export default App;
