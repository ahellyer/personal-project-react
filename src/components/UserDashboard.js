import React from 'react';
import '../index.css'

const UserDashboard = ({ user }) => {return <div className="dashboard">
    <div className="dashboard-wrapper">
      <p><img className="avatar"src={user.avatar_url} alt="user profile "/></p>
      <h1>{user.name === null ? user.login : user.name}</h1>
      {user.bio=== null ? null : <p>{user.bio}</p>}
      {user.location=== null ? null : <p><i className="fas fa-map-marker-alt"></i> {user.location}</p>}
    </div>
  </div>}

export default UserDashboard;
