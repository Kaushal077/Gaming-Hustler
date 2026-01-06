import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useUser } from '../../hooks/useUser';

const KEY = import.meta.env.VITE_IMG_TOKEN;
const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`; // Define API_URL here

const EnrollForm = () => {
    const [classId, setClassId] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [teamName, setTeamName] = useState('');
    const [player1IGN, setPlayer1IGN] = useState('');
    const [player2IGN, setPlayer2IGN] = useState('');
    const [player3IGN, setPlayer3IGN] = useState('');
    const [player4IGN, setPlayer4IGN] = useState('');
    const [emailID, setEmailID] = useState('');
    const [discordID, setDiscordID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();

    const handleSelect = (id) => {
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data.classId === id) {
                    return toast.error('Already Selected');
                } else {
                    const data = {
                        classId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    }

                    toast.promise(
                        axiosSecure.post('/add-to-cart', data),
                        {
                            pending: 'Selecting...',
                            success: {
                                render({ data }) {
                                    return `Selected Successfully`;
                                }
                            },
                            error: {
                                render({ data }) {
                                    return `Error: ${data.message}`;
                                }
                            }
                        }
                    );
                }
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!teamName || !player1IGN || !emailID || !discordID) {
            toast.error('Please fill all required fields');
            return;
        }
    
        let teamLogoUrl = '';
        if (teamLogo) {
            const formData = new FormData();
            formData.append('image', teamLogo);
    
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    teamLogoUrl = data.data.display_url;
                } else {
                    toast.error('Failed to upload team logo');
                    return;
                }
            } catch (error) {
                console.error('Error uploading team logo:', error);
                toast.error('Error uploading team logo');
                return;
            }
        }

    //     axiosSecure.post('/store-form-data', {
    //         teamName,
    //         player1IGN,
    //         player2IGN,
    //         player3IGN,
    //         player4IGN,
    //         emailID,
    //         discordID,
    //         phoneNumber,
    //         classId,
    //         teamLogo: teamLogoUrl
    //     }).then(res => {
    //         if (res.data.success) {
    //             handleSelect(classId);
    //             navigate('/cart');
    //         } else {
    //             toast.error('Error storing form data');
    //         }
    //     }).catch(err => {
    //         toast.error('Error storing form data');
    //     });



    const formData = {
        teamName,
        player1IGN,
        player2IGN,
        player3IGN,
        player4IGN,
        emailID,
        discordID,
        phoneNumber,
        classId,
        teamLogo: teamLogoUrl,
        user: {
            id: currentUser.id, // Assuming currentUser has an id property
            email: currentUser.email
        }
    };

    try {
        const response = await axiosSecure.post('/store-form-data', formData);
        console.log(response.data);
        if (response.data.success) {
            handleSelect(classId);
            navigate('/cart');
        } else {
            toast.error('Error storing form data');
        }
    } catch (error) {
        console.error('Error storing form data:', error);
        if (error.response) {
            console.error('Server response:', error.response.data);
        }
        toast.error('Error storing form data');
    }
}

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const maxSize = 50 * 1024;

            if (file.size > maxSize) {
                toast.error('File size should not exceed 50KB');
                return;
            }

            const formData = new FormData();
            formData.append('image', file);

            const reader = new FileReader();

            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };

            reader.readAsDataURL(file);
            setTeamLogo(file);

            fetch(API_URL, {
                method: 'POST',
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log('Image uploaded:', data.data.display_url);
                } else {
                    console.error('Error uploading image:', data.error);
                    toast.error('Failed to upload team logo');
                }
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                toast.error('Failed to upload team logo');
            });
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-900 py-36">
                <div className="w-full max-w-3xl p-8 border-t-10 border-b-10 border-l-2 border-r-2 border-blue-500 rounded-lg shadow-lg bg-gray-800">
                    <div className="flex items-center mb-8">
                        <img src="/gh-logo.png" alt="Logo" className="h-20 w-20" />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-white">CAMPUS CHAMPIONSHIP</h2>
                            <h5 className="text-sm text-gray-400">Organised by GAMING HUSTLER</h5>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-4">Team Details:</h3>

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <label htmlFor="file" className="text-white cursor-pointer">
                                <span className="inline-block p-2 rounded-full bg-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 7.7l-1.9 1.9-1.9-1.9a2 2 0 0 1 2.8 0l1.9 1.9 1.9-1.9a2 2 0 0 1 2.8 0l1.9 1.9 1.9-1.9a2 2 0 0 1 2.8 0L23 10.8M18 13v3m0-3h-3m3 0v-3m0 3h-3m12-3c0 3.3-2.6 6-6 6s-6-2.7-6-6a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1 6 6a6 6 0 0 1 6 6" />
                                    </svg>
                                </span>
                                <span className="ml-2 text-gray-400">Team logo:</span>
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="w-1/3">
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Team Logo Preview"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            )}
                        </div>

                        <div className="w-1/3">
                            <label htmlFor="teamName" className="text-white">
                                Team name*:
                            </label>
                            <input
                                type="text"
                                id="teamName"
                                name="teamName"
                                required
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="player1IGN" className="text-white">
                            IGN of player 1*:
                        </label>
                        <input
                            type="text"
                            id="player1IGN"
                            name="player1IGN"
                            required
                            value={player1IGN}
                            onChange={(e) => setPlayer1IGN(e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="player2IGN" className="text-white mt-4">
                            IGN of player 2:
                        </label>
                        <input
                            type="text"
                            id="player2IGN"
                            name="player2IGN"
                            value={player2IGN}
                            onChange={(e) => setPlayer2IGN(e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="player3IGN" className="text-white mt-4">
                            IGN of player 3:
                        </label>
                        <input
                            type="text"
                            id="player3IGN"
                            name="player3IGN"
                            value={player3IGN}
                            onChange={(e) => setPlayer3IGN(e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="player4IGN" className="text-white mt-4">
                            IGN of player 4:
                        </label>
                        <input
                            type="text"
                            id="player4IGN"
                            name="player4IGN"
                            value={player4IGN}
                            onChange={(e) => setPlayer4IGN(e.target.value)}
                            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
    
                        <h2 className="text-xl font-semibold text-white mb-4">Contact Info:</h2>
    
                        <div className="mb-4">
                            <label htmlFor="emailID" className="text-white">
                                Email ID*:
                            </label>
                            <input
                                type="email"
                                id="emailID"
                                name="emailID"
                                required
                                value={emailID}
                                onChange={(e) => setEmailID(e.target.value)}
                                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label htmlFor="discordID" className="text-white">
                                Discord ID*:
                            </label>
                            <input
                                type="text"
                                id="discordID"
                                name="discordID"
                                required
                                value={discordID}
                                onChange={(e) => setDiscordID(e.target.value)}
                                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
    
                        <div className="mb-6">
                            <label htmlFor="phoneNumber" className="text-white">
                                Phone no:
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                pattern="[0-9]{10}"
                                title="10 digit phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <small className="text-gray-400">Country code: India (+91)</small>
                        </div>
    
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </>
        );
    };
    
    export default EnrollForm;
    
