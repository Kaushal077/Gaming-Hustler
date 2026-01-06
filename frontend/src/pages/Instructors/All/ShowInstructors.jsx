import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faDiceD6,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import LottieAnimation from "./LottieAnimation";


const ShowInstructors = () => {
  const axiosInstance = useAxiosFetch();
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    axiosInstance.get("/instructors").then((res) => setInstructors(res.data));
  }, []);
  return (
    <>
     <div
          className="breadcrumbs bg-primary pt-24 mt-20 section-padding bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{
            backgroundImage:
              "url(https://overworld.qodeinteractive.com/wp-content/uploads/2020/01/main-home-bckgd-img.jpg)",
          }}
        >
          <div className="container text-center mx-1">
            <div className="flex flex-col items-center justify-center text-heading font-extrabold">
              <div
                className="flex items-center justify-center pb-5"
                style={{ marginBottom: "-90px" }}
              >
                <FontAwesomeIcon icon={faUserSecret} className="text-[5rem] mr-2" />
                <h2 className="font-chakra-petch text-7xl">
                  Tournament Hosts
                </h2>
                <FontAwesomeIcon icon={faUserSecret} className="text-[5rem] ml-2" />
              </div>
              <div className="mt-12">
                <LottieAnimation />
              </div>
            </div>
          </div>
        </div>
    <div className="mt-12 dark:bg-black w-[80%] mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-10 ">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="max-w-sm mb-4">
            <div className="card relative h-64 w-[370px] rounded-3xl perspective-2000">
              {/* Front Part */}
              <div className="front absolute p-4 w-full h-full text-center text-white  rounded-3xl backface-hidden bg-#18518F">
                <div className="column mb-10">
                  <div className="mb-2">
                    <img
                      src={instructor.photoUrl}
                      alt={instructor.name}
                      className="w-12 h-12 rounded-full mx-auto text-gray-900"
                    />
                  </div>
                  <div className="title font-light tracking-wide leading-relaxed  text-lg">
                    {instructor.name}
                  </div>
                  <div className="description text-sm">HOST</div>
                  <div className="absolute h-5 w-full top-[160px] -left-0 rounded-b-3xl bg-gray-600 "></div>
                  <div className="item absolute h-4 w-[200px] top-[145px] right-20 rounded-t-3xl bg-red-500"></div>
                </div>
                <div className="flex justify-center items-center h-[95px] w-[370px] pt-2 -ml-4 rounded-b-3xl text-sm font-medium bg-zinc-400">
                  <a href="#" className="px-4">
                    View Profile
                  </a>
                </div>
              </div>

              {/* Back Part */}
              <div className="back absolute flex justify-between items-center h-full w-full rounded-3xl text-white bg-gray-800 pl-5 transform -rotate-y-180 backface-hidden ">
                <div className="flex-1 text-center">
                  <div className="">
                    <img
                      src={instructor.photoUrl}
                      alt={instructor.name}
                      className="w-12 h-12 rounded-full mx-auto text-gray-900  border-2 border-white"
                    />
                  </div>
                  <div className="text-lg font-medium tracking-wide pt-2">
                    {instructor.name}
                  </div>
                  <div className="mx-auto mt-[-5px] p-1 w-20 text-sm">HOST</div>
                  <hr className="mx-auto h-[1.6px] w-14 rounded-full bg-white" />
                </div>
                <div className="right flex justify-center items-start flex-col flex-1 h-full text-sm font-semibold tracking-wide text-gray-800 rounded-tr-3xl rounded-br-3xl bg-gray-200">
                  <p className="ml-8 mt-0">{instructor.address}</p>
                  <p className="ml-8 mt-4">
                    {instructor.phone? instructor.phone : "Not Provided"}
                  </p>
                  <p className="ml-8 mt-4">{instructor.email}</p>
                </div>
                <div className="item absolute flex justify-center items-center ml-40 w-8  h-full rounded-tr-3xl rounded-br-3xl bg-gray-600">
                  <div className="absolute flex flex-col items-center justify-around w-6 h-[100px]  text-lg text-gray-800 rounded-3xl bg-white">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <FontAwesomeIcon icon={faPhone} />
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="absolute h-[120px] w-4 mr-12 rounded-tl-3xl rounded-bl-3xl bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ShowInstructors;