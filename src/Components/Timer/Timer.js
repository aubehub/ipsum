import React from 'react';
import '../App/App.css';

class Timer extends React.Component {
  
  render(){
    const numbers = this.props.timer?.toString().split('');

    return (
      <div className="timer">
        <h2>{numbers?.map((n, idx) => 
          <span className={`number-${idx}`} key={idx}>{n}</span>
          )}</h2>
      </div>
    )
  }
}

export default Timer;