import React from 'react';
import '../UsersList/UsersList.css';

//let className = `users ${otraClase}`;

class User extends React.Component {

  render() {
    let className = "users";
    if (!this.props.user.active) {
      className += " inactive";
    } else {
      className += " active";
    }

    return(
      <div>
        <div className={`color-point ${this.props.user.color}`} style={{ background:this.props.user.color }}></div>
        <div className={className}>
          <h5 className="users-name">{this.props.user.name}</h5>
          {this.props.user.active === "false" && 
          <div className="inactive-div">
            <div className="white-point"></div>
            <div className=" inactive"></div>
            </div>}
        </div>
      </div>
    );
  }
}

export default User;

