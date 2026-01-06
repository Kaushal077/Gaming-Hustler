import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import './Classes.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChess,
} from "@fortawesome/free-solid-svg-icons";
import ClassesLottie from "./ClassesLottie";

const Classes = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const [classes, setClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => {
        const classesData = res.data;
        axiosFetch
          .get("/instructors")
          .then((res) => {
            const instructorsData = res.data;
            const combinedData = classesData.map((cls) => {
              const instructor = instructorsData.find((ins) => ins.email === cls.instructorEmail);
              return { ...cls, instructorPhotoUrl: instructor?.photoUrl };
            });
            setClasses(combinedData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);


  const handelSelect = (id) => {
    if (!currentUser) {
      return toast.error("Please Login First");
    }
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        const enrolled = res.data.find((item) => item.classes._id === id);
        if (enrolled) {
          return toast.error("Already Enrolled");
        }
        return axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`);
      })
      .then((res) => {
        if (res.data.classId === id) {
          return toast.error("Already Selected");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };

          toast.promise(axiosSecure.post("/add-to-cart", data), {
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
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" pt-3">
      <div
          className="breadcrumbs bg-primary pt-24 mt-20 section-padding bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{
            backgroundImage:
              "url(https://overworld.qodeinteractive.com/wp-content/uploads/2019/12/landing-bckgrd-img.jpg)",
          }}
        >
          <div className="container text-center mx-1">
            <div className="flex flex-col items-center justify-center text-heading font-extrabold">
              <div
                className="flex items-center justify-center pb-5"
                style={{ marginBottom: "-90px" }}
              >
                <FontAwesomeIcon icon={faChess} className="text-[5rem] mr-2" />
                <h2 className="font-chakra-petch text-8xl ">
                  Tournaments
                </h2>
                <FontAwesomeIcon icon={faChess} className="text-[5rem] ml-2" />
              </div>
              <div className="mt-12">
                <ClassesLottie />
              </div>
            </div>
          </div>
        </div>


      <div className="cards grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-20 my-16 w-[90%] mx-auto px-20">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`dark:border-2 relative overflow-hidden text-decoration-none w-[400px] h-[320px] mx-auto ${
              cls.availableSeats < 1 ? "bg-white" : "bg-white"
            } dark:bg-slate-600 rounded-[40px] shadow-lg cursor-pointer card`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <img
              src={cls.image}
              alt="Course Image"
              className="card__image w-full h-[320px]"
            />
            <div
              className={`card__overlay dark:bg-zinc-900  absolute bottom-0 left-0 right-0 z-10 bg-zinc-50 rounded-[40px] translate-y-full transition-transform duration-200 ease-in-out h-2/2 ${
                hoveredCard === index ? "translate-y-0" : ""
              }`}
            >
              <div className="card__header dark:bg-zinc-500 dark:text-white relative flex items-center gap-8 px-4 py-4 rounded-b-[40px] bg-white -translate-y-full transition-transform duration-200 ease-in-out">
                <svg
                  className="card__arc absolute bottom-full dark:hidden right-0 z-10 w-20 h-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="white {dark:red-400}" d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" />
                </svg>
                <img
                  src={cls.instructorPhotoUrl}
                  alt=""
                  className="card__thumb w-12 h-12 rounded-full border-2 
                  p-0.5 border-black dark:border-white"
                />
                <div className="card__header-text">
                  <h3
                    className={`${
                      cls.name.length > 25 ? "text-[14px]" : "text-[16px]"
                    } font-bold card__title`}
                  >
                    {cls.name}
                  </h3>
                  <p className="card__tagline text-gray-500 text-xs dark:text-white">
                    HOST : {cls.instructorName}
                  </p>
                </div>{" "}
              </div>
              <div className="card__description px-4 py-2">
                <div className="details__winnings flex justify-evenly  items-center gap-12 px-3 py-1">
                  <span className="card__status text-gray-600 text-xs dark:text-white">
                    Total Joined
                  </span>
                  <span className="card__status text-gray-600 text-xs dark:text-white">
                    Team Type
                  </span>
                  <span className="card__status text-gray-600 text-xs dark:text-white">
                    Prizepool
                  </span>
                </div>
                <div className="details__winnings flex justify-around items-center gap-12 px-3 py-1 ml-4 text-sm ">
                  <span className="text-secondary -ml-2 font-bold dark:text-white">
                    {cls.totalEnrolled} / {cls.slot}
                  </span>
                  <span className="text-secondary font-bold -mr-4 dark:text-white">
                    {cls.teamType}
                  </span>
                   <span className="text-green-500 font-bold -mr-4">
                    ₹
                    {parseInt(cls.prizePoolFirst) +
                      parseInt(cls.prizePoolSecond) +
                      parseInt(cls.prizePoolThird)}
                  </span>
                </div>
                <div className="view__btn flex justify-evenly items-center px-3 py-4">
                  <Link to={`/class/${cls._id}`}>
                    <button className="btn-epic  w-[130px] max-w-xs h-10  text-left  transform 
                    border-2 border-slate-300
                    rounded-xl
                    translate-y-0 text-decoration-none font-semibold text-sm tracking-wider transition-delay-600 overflow-hidden pb-6">
                      <div className="relative top-4 w-full h-6 uppercase overflow-hidden -mt-1.5">
                        <span className="absolute z-10 w-full text-center   text-white ">
                          View
                        </span>
                        <span className="absolute z-10 w-full text-center text-[#1e0f21] dark:text-white">
                          View
                        </span>
                      </div>
                    </button>
                  </Link>
                  <button
                    onClick={() => handelSelect(cls._id)}
                    title={
                      role === "admin" || role === "instructor"
                        ? "Instructor/Admin Can not be able to select "
                        : cls.availableSeats < 1
                        ? "No seat available"
                        : "You can select this class"
                    }
                    disabled={
                      role === "admin" ||
                      role === "instructor" 
                    }
                    className="btn-epic2 w-2/5 max-w-xs h-10 text-left transform 
                    border-2 border-slate-300 rounded-xl
                    translate-y-0 text-decoration-none font-semibold text-sm tracking-wider  overflow-hidden pb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative  top-4 w-full h-6 uppercase overflow-hidden -mt-1.5">
                      <span className="absolute z-10 w-full text-center  transform translate-y-6 text-white ">
                        Select
                      </span>
                      <span className="absolute z-10 w-full text-center  text-[#1e0f21] dark:text-white">
                        Select
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Classes;
