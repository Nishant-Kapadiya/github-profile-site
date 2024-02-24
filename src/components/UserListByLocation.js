import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserListByLocation = ({ location }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsersByLocation = async () => {
            try {
                const response = await axios.get(`https://api.github.com/search/users?q=location:${location}`);
                setUsers(response.data.items);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user list by location:', error);
                setLoading(false);
            }
        };

        fetchUsersByLocation();
    }, [location]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>User List from {location}</h1>
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
