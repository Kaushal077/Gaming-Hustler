import { FaUsers } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceD6,
  faClipboardUser,
  faRectangleList,
  faTrophy,
  faUserCheck,
  faClock,
  faCalendar,
  faTriangleExclamation,
  faCampground,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import SingleLottie from "./SingleLottie";


const SingleClass = () => {
  const [instructor, setInstructor] = useState({});
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    `https://www.youtube.com/embed/8BdQ-HawbT0?si=hNts9Wq8dZJBeTOW?autoplay=1`
  );
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  // useEffect(() => {
  //   if (course) {
  //     setVideoUrl(`https://www.youtube.com/embed/${course.videoLink}`);
  //   }
  // }, [course, setVideoUrl]);


  useEffect(() => {
    // Fetch instructor data if not already available
    if (!instructor.photoUrl) {
      axiosFetch.get(`/instructors/${course.instructorId}`) // Adjust the API endpoint as necessary
        .then((res) => {
          const instructorData = res.data;
          setInstructor(instructorData); // Update the instructor state with the fetched data
        })
        .catch((err) => console.log(err));
    }
 }, [instructor, course.instructorId, axiosFetch]);

  const openVideo = () => {
    setVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoOpen(false);
  };

const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT");
      const data = await response.json();
      setLeaderboardData(data.slice(0, 5)); // Assuming your API returns an array of leaderboard entries
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
    }
  };

  const handelSelect = (id) => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));
    if (!currentUser) {
      return toast.error("Please Login First");
    }
    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        if (res.data.classId === id) {
          return toast.error("Already Selected");
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          return toast.error("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };

          toast.promise(
            axiosSecure.post("/add-to-cart", data).then((res) => {
              console.log(res.data);
            }),

            {
              pending: "Selecting...",
              success: {
                render({ data }) {
                  return `Selected Successfully`;
                },
              },
              error: {
                render({ data }) {
                  return `Error: ${data.message}`;
                },
              },
            }
          );
        }
      });
  };
  return (
    <>
      <div className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto">
        <div
          className="breadcrumbs bg-primary pt-24 mt-20 section-padding bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{
            backgroundImage:
              "url(https://themedox.com/mykd/wp-content/uploads/2023/10/breadcrumb_bg01.jpg)",
          }}
        >
          <div className="container text-center mx-1">
            <div className="flex flex-col items-center justify-center text-heading font-extrabold">
              <div
                className="flex items-center justify-center pb-5"
                style={{ marginBottom: "-90px" }}
              >
                <FontAwesomeIcon icon={faDiceD6} className="text-[2rem] mr-2" />
                <h2 className="font-chakra-petch text-6xl">
                  TOURNAMENT DETAILS
                </h2>
                <FontAwesomeIcon icon={faDiceD6} className="text-[2rem] ml-2" />
              </div>
              <div className="mt-1">
                <SingleLottie />
              </div>
            </div>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs  section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={course.image}
                      alt=""
                      className="rounded-md object-fut w-full h-full block border-8 border-sky-700 "
                    />
                  </div>
                  <h3 className="font-bold text-3xl font-chakra-petch dark:text-white">
                    {course.name}
                  </h3>
                  <div className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src={
                              instructor.photoUrl || "path/to/default/image.jpg"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                              e.target.src = "/gh-logo.png";
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className=" text-secondary  ">
                          Host
                          <a className=" text-black dark:text-white">
                            : {course.instructorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className=" text-secondary  ">
                        Last Update:
                        <a className="text-black ml-1 dark:text-white">
                          {(() => {
                            const date = new Date(course.submitted);
                            const day = date.getDate();
                            const month = date.toLocaleString("default", {
                              month: "long",
                            }); // Get the full month name
                            const year = date.getFullYear();
                            return `${day} ${month} ${year}`; // Format as "day month year"
                          })()}
                        </a>
                      </span>
                    </div>
                  </div>
                  <br />
                  <div className="flex-1 space-x-3 flex items-center">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="text-red-700 text-xl animate-pulse"
                    />
                    <div className=" text-black font-semibold dark:text-white">
                      Before Participating please go through{" "}
                      <a href="#rules" className="text-red-600 underline">
                        Rules
                      </a>
                      .
                    </div>
                  </div>
                  <div className="nav-tab-wrapper mt-3 ">
                    <div className="flex flex-wrap gap-4 bg-sky-700 px-24 py-8 rounded-xl">
                      <div className=" bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold p-10">
                        <FaUsers className="text-black text-3xl" />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Team Type
                          </div>
                        </div>
                        <div className="flex-none font-Quicksand text-red-600 text-md font-extrabold">
                          {course.teamType}
                        </div>
                      </div>

                      <div className="bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold p-10">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-black text-3xl"
                        />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Check-In
                          </div>
                        </div>
                        <div className="flex-none font-Quicksand text-red-600 text-md font-extrabold">
                          Before-10min
                        </div>
                      </div>

                      <div className="bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold p-10">
                        <FontAwesomeIcon
                          icon={faRectangleList}
                          className="text-black text-3xl"
                        />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Slot
                          </div>
                        </div>
                        <div className="flex-none font-Quicksand text-red-600 text-md font-extrabold">
                          {course.slot}
                        </div>
                      </div>

                      <div className="bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold p-10">
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className="text-black text-3xl"
                        />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Prize-pool
                          </div>
                        </div>
                        <div className="flex-none font-Quicksand text-red-600 text-md font-extrabold">
                          ₹{" "}
                          {parseInt(course.prizePoolFirst) +
                            parseInt(course.prizePoolSecond) +
                            parseInt(course.prizePoolThird)}
                        </div>
                      </div>

                      <div className="bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold p-10">
                        <FontAwesomeIcon
                          icon={faUserCheck}
                          className="text-black text-3xl"
                        />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Alerady In
                          </div>
                        </div>
                        <div className="flex-none font-Quicksand text-red-600 text-md font-extrabold">
                          {course.totalEnrolled} / {course.slot}
                        </div>
                      </div>

                      <div className="bg-blue-300  border border-white shadow-[12px_17px_51px_rgba(234,84,9,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg] w-[223px] h-[170px] flex flex-col items-center justify-center text-white font-bold py-10">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-black text-3xl"
                        />
                        <div className="flex-1 space-x-3 flex items-center">
                          <div className=" text-black text-xl font-extrabold underline">
                            Scheduled
                          </div>
                        </div>
                        <div className="flex-none text-red-600 font-Quicksand text-whitetext-md font-extrabold">
                          {/* Assuming course.scheduledDate is in a format that Date can parse */}
                          {(() => {
                            const date = new Date(course.scheduledDate);
                            const dateString = date.toLocaleDateString(); // e.g., "4/1/2023"
                            const timeString = date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            }); // e.g., "2:30 PM"
                            return (
                              <>
                                <div>{dateString}</div>
                                <div>{timeString}</div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    <div id="tabs-content ">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className=" text-2xl mt-8 font-bold">
                            Tournament Descriptions
                          </h3>
                          <p className="mt-4">
                            "Gaming Hustler" is not your average esports
                            tournament website. We offer a unique approach to
                            tournament details that sets us apart from others.
                            Our platform provides comprehensive tournament
                            information, including match rounds customization,
                            team type selection, slots allocation, prize pool
                            distribution, and scheduled dates. What makes us
                            stand out is our focus on empowering hosts and
                            participants alike, ensuring a seamless and
                            rewarding esports experience. Join Gaming Hustler
                            today and elevate your esports journey to new
                            heights!
                          </p>
                          <div className="bg-sky-700 space-y-6 p-8 rounded-md my-8 text-white">
                            <h4 className=" text-2xl font-extrabold ">
                              Match-Rounds
                            </h4>
                            <ul className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <FontAwesomeIcon
                                    icon={faCampground}
                                    className="text-3xl"
                                  />
                                </div>
                                <div className="flex-1 text-2xl mt-2 font-extrabold">
                                  Qualifier - [{course.qualifier}]
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <FontAwesomeIcon
                                    icon={faCampground}
                                    className="text-3xl"
                                  />
                                </div>
                                <div className="flex-1 text-2xl mt-2 font-extrabold">
                                  Quarter-Final - [{course.quarterFinal}]
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <FontAwesomeIcon
                                    icon={faCampground}
                                    className="text-3xl"
                                  />
                                </div>
                                <div className="flex-1 text-2xl mt-2 font-extrabold">
                                  Semi-Final - [{course.semiFinal}]
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <FontAwesomeIcon
                                    icon={faCampground}
                                    className="text-3xl"
                                  />
                                </div>
                                <div className="flex-1 text-2xl mt-2 font-extrabold">
                                  Grand-Final - [{course.grandFinal}]
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className=" text-2xl">Prize-Distribution</h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                              <div className=" bg-white  rounded px-5 py-[18px] flex   shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  <img
                                    src="https://i.ibb.co/6s4D4jL/1st-prize.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </div>
                                <span className="flex-1 text-black font-bold">
                                  First-Prize
                                  <br />₹ {course.prizePoolFirst}
                                </span>
                              </div>
                              <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  <img
                                    src="https://i.ibb.co/ZG1Rwk5/2nd-place.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </div>
                                <span className="flex-1 text-black font-bold">
                                  Second-Prize
                                  <br />₹ {course.prizePoolSecond}
                                </span>
                              </div>
                              <div className=" bg-white  rounded pl-3 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  <img
                                    src="https://i.ibb.co/fCdqDwv/3rd-place.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </div>
                                <span
                                  className="flex-1 text-black font-bold"
                                  id="rules"
                                >
                                  Third-Prize
                                  <br />₹ {course.prizePoolThird}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className=" text-3xl font-extrabold font-roboto mt-5">
                          How To Join?
                        </h4>
                        <p className="mt-4 text-lg font-bold">
                          Joining a gaming-hustler tournament is easy. However
                          before joining please ensure the following:
                          <br />
                          First of all register and make a account.
                          <br />
                          Team profile for the particular game has been created
                          and all members have been invited and added
                          <br />
                          To join a tournament follow these steps:
                          <br />
                          Step 1: Navigate to the 'tournaments page' and select
                          your preferred tournament.
                          <br />
                          Step 2: Click on Join Tournament.
                          <br />
                          Step 3: Fill the slots with the desired team members.
                          <br />
                          Step 4: Click on the 'Join' button.
                          <br />
                          You will receive a confirmation message on email.
                          <br />
                        </p>
                      </div>

                      <div className="pb-5">
                        <div
                          id="tab2"
                          className="tab-content bg-sky-700 rounded-lg p-5 mt-5 text-white"
                        >
                          <h3 className=" text-3xl font-extrabold font-roboto ">
                            Rules
                          </h3>
                          <p className="mt-4">
                            🚫Emergency pickup/bagpack are disallowed. Teams
                            using this feature will get minus 10 points in the
                            same match🚫
                            <br />
                            1. All 4 players must record their whole gameplay
                            with sound & background apps (at least thrice in a
                            match) unedited/uncropped POV will be needed if
                            asked🚫
                            <br />
                            2. Screenshots of results are compulsory\*Management
                            can ask whenever it will be needed
                            <br />
                            3. If you were killed by a hacker, provide suitable
                            recording & death cam (mandatory), video should be
                            convincing enough to our management, without your
                            recording we will not take any action
                            <br />
                            5. Team up and hacking will lead to disqualification
                            <br />
                            6. All 4 players must join the room 5 mins in
                            advance otherwise, we will not be responsible if any
                            player is sitting in your slot
                            <br />
                            7. No complaints will be entertained for any players
                            sitting in your slot after start time
                            <br />
                            8. In any case of dispute last decision is up to the
                            admin
                            <br />
                            9. Should drop on the allotted drop locations
                            <br />
                            \*If any team faces the drop clash with other teams
                            will lead to 0 points to the particular day
                            <br />
                            10 You must agree all terms and conditions mentioned
                            above before playing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             {/* right side */}
             <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="wdiget custom-text space-y-5 ">
                    <div
                      className="h-[220px] rounded relative block border-8 border-sky-700 "
                      onClick={openVideo}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={course.image}
                        alt=""
                        className="block w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {videoOpen && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
                            <button
                              onClick={closeVideo}
                              className="absolute top-4 right-4 bg-white rounded-full p-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 dark:text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <iframe
                              title="YouTube Video"
                              src={videoUrl}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        {!videoOpen && (
                          <img src="/play.png" alt="" className="h-16 w-16" />
                        )}
                      </div>
                    </div>
                    <div className=" flex space-x-3 border-b border-[#ECECEC] mb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FontAwesomeIcon icon={faUsersViewfinder} />
                          <div className=" text-black font-semibold dark:text-white">
                          Watch our livestreams here
                          </div>
                        </div>
                        <a
                      href="#"
                      className="text-red-500 hover:bg-red-900 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                      </div>
                    <button
                      onClick={() => handelSelect(course._id)}
                      title={
                        role === "admin" || role === "instructor"
                          ? "Instructor/Admin Can not be able to select "
                            ? course.availableSeats < 1
                            : "No seat avalible"
                          : "You can select this classes"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        course.availableSeats < 1
                      }
                      className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white hover:bg-sky-700 rounded-md"
                    >
                      Join now
                    </button>
                    <ul className="flex space-x-4 items-center pt-3 ">
                      <li className=" text-black font-semibold dark:text-white">
                        Share On:
                      </li>
                      <li>
                      <a href="#instagram">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="text-pink-400 hover:bg-pink-800 p-2 rounded-full transition-colors duration-300 text-3xl"
                        />
                      </a>
                      </li>
                      <li>
                      <a href="#instagram">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="text-blue-400 hover:bg-sky-600 p-2 rounded-full transition-colors duration-300 text-3xl"
                        />
                      </a>
                      </li>
                      <li>
                      <a href="#instagram">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-blue-600 hover:bg-sky-900 p-2 rounded-full transition-colors duration-300 text-3xl"
                        />
                      </a>
                      </li>
                      <li>
                      <a href="#instagram">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className="text-green-400 hover:bg-green-800 p-2 rounded-full transition-colors duration-300 text-3xl"
                        />
                      </a>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-secondary">
                    <h1 className="text-4xl text-white font-bold dark:text-black">
                      Leaderboard
                    </h1>
                    <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              #
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Logo
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Points
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboardData.map((entry, index) => (
                            <tr
                              key={index}
                              className={
                                index < 3
                                  ? `bg-${
                                      ["green-200", "blue-200", "yellow-200"][
                                        index
                                      ]
                                    }`
                                  : index % 2 === 0
                                  ? "bg-gray-100"
                                  : ""
                              }
                            >
                              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                {index + 1}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                <img
                                  src={entry.logo}
                                  alt={entry.name}
                                  className="w-10 h-10 rounded-full"
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                {entry.name}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                {entry.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;

