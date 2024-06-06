// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setProfile({ ...userDoc.data(), displayName: user.displayName });
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>User Profile</h2>
            {profile && (
                <div>
                    <p><strong>Display Name:</strong> {profile.displayName}</p>
                    <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
