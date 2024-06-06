// // src/components/Welcome.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db, updateProfile, setDoc, sendEmailVerification, doc } from '../firebaseConfig';
// import { getDoc } from 'firebase/firestore';

// const Welcome = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editing, setEditing] = useState(false);
//     const [verificationSent, setVerificationSent] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const user = auth.currentUser;
//             if (user) {
//                 const userDoc = await getDoc(doc(db, "users", user.uid));
//                 setProfile({ ...userDoc.data(), displayName: user.displayName });
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const isProfileIncomplete = !profile || !profile.displayName || !profile.photoURL;

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const user = auth.currentUser;
//             if (user) {
//                 await updateProfile(user, { displayName: profile.displayName });
//                 await setDoc(doc(db, "users", user.uid), profile, { merge: true });
//                 setEditing(false);
//                 alert("Profile updated successfully!");
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update profile!");
//         }
//     };

//     const handleSendVerificationEmail = async () => {
//         try {
//             const user = auth.currentUser;
//             if (user) {
//                 await sendEmailVerification(user);
//                 setVerificationSent(true);
//                 alert("Verification email sent. Please check your inbox.");
//             }
//         } catch (error) {
//             switch (error.code) {
//                 case 'auth/invalid-email':
//                     alert("Invalid email address.");
//                     break;
//                 case 'auth/user-not-found':
//                     alert("User not found.");
//                     break;
//                 case 'auth/too-many-requests':
//                     alert("Too many requests. Try again later.");
//                     break;
//                 default:
//                     alert("Error sending verification email: " + error.message);
//             }
//             console.error(error);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Welcome to Expense Tracker</h2>
//             {loading && <p>Loading...</p>}
//             {isProfileIncomplete && (
//                 <p>Your profile is incomplete. <button onClick={() => navigate('/complete-profile')}>Click here to complete</button></p>
//             )}
//             {!isProfileIncomplete && !loading && (
//                 <div>
//                     <p>Welcome, {profile.displayName}!</p>
//                     {profile && (
//                         <>
//                             <button onClick={() => setEditing(true)}>Edit Profile</button>
//                             {editing && (
//                                 <form onSubmit={handleSubmit}>
//                                     <input
//                                         type="text"
//                                         placeholder="Display Name"
//                                         value={profile.displayName}
//                                         onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
//                                         required
//                                     />
//                                     <input
//                                         type="url"
//                                         placeholder="Profile Photo URL"
//                                         value={profile.photoURL}
//                                         onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
//                                         required
//                                     />
//                                     <button type="submit">Save Changes</button>
//                                 </form>
//                             )}
//                         </>
//                     )}
//                     {!auth.currentUser.emailVerified && !verificationSent && (
//                         <button onClick={handleSendVerificationEmail}>Verify Email</button>
//                     )}
//                     {verificationSent && (
//                         <p>Verification email sent. Please check your inbox.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Welcome;
// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, updateProfile, setDoc, sendEmailVerification, doc } from '../firebaseConfig';
import { getDoc } from 'firebase/firestore';

const Welcome = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setProfile({ ...userDoc.data(), displayName: user.displayName, emailVerified: user.emailVerified });
                setEmailVerified(user.emailVerified);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const isProfileIncomplete = !profile || !profile.displayName || !profile.photoURL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName: profile.displayName });
                await setDoc(doc(db, "users", user.uid), profile, { merge: true });
                setEditing(false);
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update profile!");
        }
    };

    const handleSendVerificationEmail = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                setVerificationSent(true);
                alert("Verification email sent. Please check your inbox.");
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert("Invalid email address.");
                    break;
                case 'auth/user-not-found':
                    alert("User not found.");
                    break;
                case 'auth/too-many-requests':
                    alert("Too many requests. Try again later.");
                    break;
                default:
                    alert("Error sending verification email: " + error.message);
            }
            console.error(error);
        }
    };

    const handleRefreshStatus = async () => {
        try {
            await auth.currentUser.reload();
            const user = auth.currentUser;
            setEmailVerified(user.emailVerified);
            if (user.emailVerified) {
                alert("Email successfully verified!");
            } else {
                alert("Email not verified yet.");
            }
        } catch (error) {
            console.error("Error refreshing user status: ", error);
        }
    };

    return (
        <div className="container">
            <h2>Welcome to Expense Tracker</h2>
            {loading && <p>Loading...</p>}
            {isProfileIncomplete && (
                <p>Your profile is incomplete. <button onClick={() => navigate('/complete-profile')}>Click here to complete</button></p>
            )}
            {!isProfileIncomplete && !loading && (
                <div>
                    <p>Welcome, {profile.displayName}!</p>
                    {profile && (
                        <>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                            {editing && (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Display Name"
                                        value={profile.displayName}
                                        onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="url"
                                        placeholder="Profile Photo URL"
                                        value={profile.photoURL}
                                        onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
                                        required
                                    />
                                    <button type="submit">Save Changes</button>
                                </form>
                            )}
                        </>
                    )}
                    {!auth.currentUser.emailVerified && !verificationSent && (
                        <button onClick={handleSendVerificationEmail}>Verify Email</button>
                    )}
                    {verificationSent && !emailVerified && (
                        <>
                            <p>Verification email sent. Please check your inbox.</p>
                            <button onClick={handleRefreshStatus}>Refresh Verification Status</button>
                        </>
                    )}
                    {emailVerified && (
                        <p>User verified!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Welcome;
