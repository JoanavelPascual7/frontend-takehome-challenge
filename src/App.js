import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar/FilterBar';
import Users from './components/Users/Users';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://users-app-backend.onrender.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch list of Users');
      }
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="App">
      <h1>Our Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <FilterBar users={users} setFilteredUsers={setFilteredUsers} fetchUsers={fetchUsers} />
          <Users users={filteredUsers} expanded={expanded} toggleExpanded={toggleExpanded} />
        </>
      )}
    </div>
  );
}

export default App;
