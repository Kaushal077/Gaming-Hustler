import React, { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [image, setImage] = useState(null);
    const [teamType, setTeamType] = useState('SOLO');
    const [slot, setSlot] = useState(80);
    const [prizePoolFirst, setPrizePoolFirst] = useState('');
    const [prizePoolSecond, setPrizePoolSecond] = useState('');
    const [prizePoolThird, setPrizePoolThird] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [qualifier, setQualifier] = useState('');
    const [quarterFinal, setQuarterFinal] = useState('');
    const [semiFinal, setSemiFinal] = useState('');
    const [grandFinal, setGrandFinal] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);

        toast.promise(
            fetch(API_URL, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success === true) {
                        console.log(data.data.display_url);
                        newData.image = data.data.display_url;
                        newData.instructorName = currentUser.name;
                        newData.instructorEmail = currentUser.email;
                        newData.status = 'pending';
                        newData.submitted = new Date();
                        newData.totalEnrolled = 0;
                        newData.teamType = teamType;
                        newData.slot = slot;
                        newData.prizePoolFirst = prizePoolFirst;
                        newData.prizePoolSecond = prizePoolSecond;
                        newData.prizePoolThird = prizePoolThird;
                        newData.scheduledDate = scheduledDate;
                        newData.qualifier = qualifier;
                        newData.quarterFinal = quarterFinal;
                        newData.semiFinal = semiFinal;
                        newData.grandFinal = grandFinal;
                        axiosSecure.post('/new-class', newData)
                            .then(res => {
                                console.log(res.data);
                            })
                    }
                }),
            {
                pending: 'Submitting your class...',
                success: 'Submitted successfully!',
                error: 'Failed to submit your class',
            }
        )
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleTeamTypeChange = (e) => {
        const type = e.target.value;
        setTeamType(type);
        if (type === 'SOLO') {
            setSlot(80);
        } else if (type === 'DUO') {
            setSlot(40);
        } else {
            setSlot(20);
        }
    };

    const handleSlotChange = (e) => {
        setSlot(e.target.value);
    };

    return (
        <div className="">
            <div className="my-10">
                <h1 className='text-center text-3xl font-bold'>Add Your Tournament</h1>
            </div>

            <form onSubmit={handleFormSubmit} className=" mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-2 w-full gap-3">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Tournament/class Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                            type="text"
                            required
                            placeholder='Your Class Name'
                            name='name'
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="font-bold">Thumbnail Photo</label>
                        <input
                            type="file"
                            required
                            onChange={handleImageChange}
                            name="image"
                            className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Youtube Link
                    </label>
                    <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are support</p>
                    <input
                        required
                        className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="text"
                        placeholder='Your tournament video link'
                        name='videoLink'
                    />
                </div>

                <div className="">
                    <h1 className='text-[12px] my-2 ml-2 text-red-700'>You cannot change your name or email</h1>
                    <div className="grid gap-3 grid-cols-2">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
                                Instructor/Host name
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="text"
                                value={currentUser?.name}
                                readOnly
                                disabled
                                placeholder='Instructor Name'
                                name='instructorName'
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
                                Instructor/Host email
                            </label>
                            <input
                                title='You cannot update your email'
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                readOnly
                                name='instructorEmail'
                            />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 " htmlFor="teamType">
                            Team Type
                        </label>
                        <select
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            value={teamType}
                            onChange={handleTeamTypeChange}
                            name='teamType'
                        >
                            <option value="SOLO">SOLO</option>
                            <option value="DUO">DUO</option>
                            <option value="SQUAD">SQUAD</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="slot">
                            Slot
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            value={slot}
                            onChange={handleSlotChange}
                            name='slot'
                        />
                    </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="prizePoolFirst">
                            Prize Pool (1st Place)
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                ₹
                            </span>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-r-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={prizePoolFirst}
                                onChange={(e) => setPrizePoolFirst(e.target.value)}
                                name='prizePoolFirst'
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="prizePoolSecond">
                            Prize Pool (2nd Place)
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                ₹
                            </span>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-r-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={prizePoolSecond}
                                onChange={(e) => setPrizePoolSecond(e.target.value)}
                                name='prizePoolSecond'
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="prizePoolThird">
                            Prize Pool (3rd Place)
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                ₹
                            </span>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-r-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={prizePoolThird}
                                onChange={(e) => setPrizePoolThird(e.target.value)}
                                name='prizePoolThird'
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="scheduledDate">
                        Scheduled Date and Time
                    </label>
                    <input
                        className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        name='scheduledDate'
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="matchRounds">
                        Match Rounds
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="qualifier">
                                Qualifier
                            </label>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={qualifier}
                                onChange={(e) => setQualifier(e.target.value)}
                                name='qualifier'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="quarterFinal">
                                Quarter Final
                            </label>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={quarterFinal}
                                onChange={(e) => setQuarterFinal(e.target.value)}
                                name='quarterFinal'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="semiFinal">
                                Semi Final
                            </label>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={semiFinal}
                                onChange={(e) => setSemiFinal(e.target.value)}
                                name='semiFinal'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="grandFinal">
                                Grand Final
                            </label>
                            <input
                                className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                                type="number"
                                value={grandFinal}
                                onChange={(e) => setGrandFinal(e.target.value)}
                                name='grandFinal'
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center w-full">
                    <button
                        className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;