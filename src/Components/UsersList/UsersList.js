import React from 'react';
import './UsersList.css';
import  User from '../User/User';

class UserList extends React.Component {

  render(){

    return(
      <div className="users-list">
        {this.props.registeredUserName !=="" &&  
        <div className="point-user-admin">
          <div className="color-point" style={{ background:this.props.registeredUserColor }}></div>       
          <h5 className="admin">Admin</h5>
        </div>
        }
        <div className="users">
          {
          this.props.users.sort((u,v) => u.name > v.name ? 1 : -1).map(user => {
            return <User user={user} key={user.name} />
          })
        }
        </div>
      </div>
    );
  }
}


export default UserList;