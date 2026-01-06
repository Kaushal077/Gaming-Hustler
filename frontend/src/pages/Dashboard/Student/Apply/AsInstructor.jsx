import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiBriefcase, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ScaleLoader } from 'react-spinners';
import { useUser } from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';

const AsInstructor = () => {
    const { currentUser } = useUser();
    const [submittedData, setSubmittedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state for submission status
    const axiosFetch = useAxiosFetch();

    const onSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const experience = e.target.experience.value;

        const data = {
            name,
            email,
            experience,
        };
        axiosFetch.post('/as-instructor', data).then((res) => {
            console.log(res.data);
            setSubmittedData(res.data);
            setSubmissionSuccess(true); // Update submission status to true
        })
        .catch((err) => {
            console.error('Error submitting form:', err);
        });
    };

    useEffect(() => {
        axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then((res) => {
            console.log(res.data);
            setSubmittedData(res.data);
            setLoading(false);
        });
    }, []);

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
    };

    if (loading) {
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
    }

    return (
        <>
            {submissionSuccess && (
                <div className="h-full w-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold">
                        Your application is submitted successfully!
                    </h1>
                </div>
            )}
            {!submittedData?.name && (
                <div className="py-4 min-h-screen flex items-center w-[60%]">
                    <form onSubmit={onSubmit}>
                        <div className="flex w-full">
                            <motion.div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5 }}
                                className="mb-4 w-full"
                            >
                                <label className="text-gray-700" htmlFor="name">
                                    Name
                                </label>
                                <div className="flex items-center mt-1">
                                    <FiUser className="text-gray-500" />
                                    <input
                                        defaultValue={currentUser.name}
                                        disabled
                                        readOnly
                                        className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                                        type="text"
                                        id="name"
                                        name="name"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mb-4 w-full"
                            >
                                <label className="text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <div className="flex items-center mt-1">
                                    <FiMail className="text-gray-500" />
                                    <input
                                        defaultValue={currentUser.email}
                                        disabled
                                        readOnly
                                        className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                                        type="email"
                                        id="email"
                                        name="email"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={inputVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mb-4 w-full"
                        >
                            <label className="text-gray-700" htmlFor="experience">
                                Brief About Yourself
                            </label>
                            <div className="flex items-center mt-1">
                                <FiBriefcase className="text-gray-500" />
                                <textarea
                                    placeholder="Tell us about yourself..."
                                    className="ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none"
                                    id="experience"
                                    name="experience"
                                ></textarea>
                            </div>
                        </motion.div>

                        <div className="text-center flex justify-center ">
                            <motion.button
                                variants={buttonVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="flex items-center px-4 py-2 bg-secondary hover:bg-sky-700 text-white rounded-md focus:outline-none"
                            >
                                <FiSend className="mr-2" />
                                Submit
                            </motion.button>
                        </div>
                    </form>
                </div>
            )}
            {submittedData?.name && (
                <div className="h-screen w-full flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        Your application is submitted <strong className='text-secondary font-roboto underline font-style: italic'> Successfully!</strong>
                    </h1>
                    <p className="text-lg font-semibold">Name: {submittedData?.name}</p>
                    <p className="text-lg font-semibold">Email: {submittedData?.email}</p>
                    <p className="text-lg font-semibold">Experience: {submittedData?.experience}</p>
                    <p>Now you need to wait for a few moments for admin approval</p>
                </div>
            </div>
            )}
            {submittedData?.reject && (
                <div className="">
                    <p>You are not able to join with Instructor</p>
                    <p className='font-bold'>Reason :</p>
                    <div className="w-1/2">
                        {submittedData?.reject}
                    </div>
                    <p className="mt-10">If you think it is a mistake then you can contact with Our admin <span><a href="mailto:admin@rakibul.tech"></a></span></p>
                </div>
            )}
        </>
    );
};

export default AsInstructor;
