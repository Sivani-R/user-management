import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', company: { name: '' } });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setError('Failed to fetch user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'company.name') {
      setUser({
        ...user,
        company: { ...user.company, name: value }
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, user);
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', user);
      }
      navigate('/');
    } catch (error) {
      setError('Failed to save user.');
    }
  };

  return (
    <div>
      <h2>{userId ? 'Edit User' : 'Add User'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="First Name Last Name" value={user.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input type="text" name="company.name" placeholder="Department" value={user.company.name} onChange={handleChange} required />
        <button type="submit" className="btn">{userId ? 'Update' : 'Add'} User</button>
      </form>
    </div>
  );
};

export default UserForm;
