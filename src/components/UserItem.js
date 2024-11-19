import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name.split(' ')[0]}</td>
      <td>{user.name.split(' ')[1]}</td>
      <td>{user.email}</td>
      <td>{user.company.name}</td>
      <td>
        <Link to={`/edit/${user.id}`} className="btn">Edit</Link>
        <button onClick={() => onDelete(user.id)} className="btn">Delete</button>
      </td>
    </tr>
  );
};

export default UserItem;
