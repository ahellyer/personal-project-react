import React from 'react';
import '../index.css'

const UserDashboard = ({ user }) => {return <div>
  <p><img className="avatar"src={user.avatar}/></p>
  <h1>Hello, {user.name === null ? 'friend' : user.name}</h1>
  <p>{user.bio}</p>
  <p>location: {user.location}</p>

  </div>}

export default UserDashboard;
