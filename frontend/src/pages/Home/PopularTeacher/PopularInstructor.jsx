import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMailBulk, FaVoicemail } from "react-icons/fa";
import img from '../../../assets/home/girl.jpg'

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  console.log(instructors);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get("/popular-instructors")
      .then((data) => {
        setInstructors(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-center text-secondary">
          Our <span className="text-black dark:text-white">Hosts</span>{" "}
        </h1>
        <div className="w-[40%] text-center mx-auto my-2">
        <p className="text-gray-500">
            Frequently <strong>Tounaments Organiser.</strong>
          </p>
        </div>
        <i>
            <img src="https://www.gamerji.com/img/title-shape.png" alt="Title Shape" className="mx-auto" />
        </i>
      </div>

      {
        instructors ? <><div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 mx-auto w-[90%] gap-6 ">
        {instructors?.map((instructor, i) => (
          <div
            key={i}
            className="bg-[url('https://html.vecurosoft.com/gamio/demo/assets/img/bg/timetable-bg-1.jpg')] flex text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md border-4 border-white"
          >
            <div className="flex flex-col gap-6 md:gap-8">
              <img
                className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                src={instructor?.instructor?.photoUrl || `${img}`}
                alt=""
              />
              <div className="flex flex-col text-center">
                <div className="font-medium text-lg text-white ">
                  {instructor?.instructor?.name}
                </div>
                <div className="text-sky-300  whitespace-nowrap">
                  Host
                </div>
                <div className="text-red-300 mb-4 whitespace-nowrap">
                  Total Students : {instructor?.totalEnrolled}
                </div>
                <div className="flex flex-row items-center justify-center gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                <a
                      href="#"
                      className="text-blue-600 hover:bg-sky-700 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                    <FaEnvelope />
                  </a>
                  <a
                      href="#"
                      className="text-blue-400 hover:bg-sky-700 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                    <FaFacebook />
                  </a>
                  <a
                      href="#"
                      className="text-pink-400 hover:bg-pink-800 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))} 
      </div></> : <p>No Instructor Available</p>
      }
    </div>
  );
};

export default PopularInstructor;
