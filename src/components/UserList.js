import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://api.github.com/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user list:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <a href={user.html_url}>{user.login}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
