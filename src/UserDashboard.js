import React from 'react';
import './index.css'

const UserDashboard = ({ user }) => {return <div>
  <p><img className="avatar"src={user.avatar}/></p>
  <h1>Hello, {user.name}</h1>

  </div>}

export default UserDashboard;
