import { useState, useEffect } from "react";
import api from '../api';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('me/')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Unauthorized"));
    }, []);

    if (!profile) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {profile.full_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            {profile.role === 'ADMIN' && <button>Admin Dashboard</button>}
        </div>
    );
};

export default Profile;