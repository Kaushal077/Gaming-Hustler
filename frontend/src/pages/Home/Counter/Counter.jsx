import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import image1 from "../../../assets/constantly-icon-01.png";
import image2 from "../../../assets/constantly-icon-02.png";
import image3 from "../../../assets/constantly-icon-03.png";
import image4 from "../../../assets/constantly-icon-04.png";

const Counter = () => {
  const [isInViewport, setIsInViewport] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white">
          We <span className="text-secondary">Constantly</span> Growing
        </h1>
        <div className="w-[40%] text-center mx-auto my-4 flex flex-col items-center">
          <p className="text-gray-500">
            Providing the best <strong>Esports experience for gamers.</strong>
          </p>
          <i>
            <img
              src="https://www.gamerji.com/img/title-shape.png"
              alt="Title Shape"
              className="mx-auto my-2 pb-7"
            />
          </i>
        </div>
      </div>
      <div
        className="md:h-[300px] h-full my-11 bg-none m-28 rounded-3xl"
        style={{
          marginTop: "-50px",
          backgroundImage: `linear-gradient(to bottom, transparent 30%, #195190 60%)`,
        }}
        ref={counterRef}
      >
        <div className="md:h-[300px] text-white  flex justify-center items-center bg-opacity-40 relative">
          <div className="flex md:flex-row flex-col py-7 gap-16">
            <div className="text-center relative">
              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 rounded-full w-[70px] h-[70px] bg-[#ff28288b] flex justify-center items-center animate-pulse z-10"></div>
              <div className="absolute top-[-25px] mt-2 left-1/2 transform -translate-x-1/2 rounded-full w-[50px] h-[50px] bg-[#ff2828] flex justify-center items-center z-20">
                <img
                  src={image1}
                  alt="logo"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div
                style={{
                  borderRadius: "50%",
                  padding: "50px",
                  backgroundColor: "rgb(3,105,161)",
                  display: "inline-block",
                }}
              >
                {isInViewport && (
                  <h1 className="text-5xl font-bold">
                    <CountUp duration={2} end={50} />
                    k+
                  </h1>
                )}
                <p className="font-bold text-lg">
                  Total <br />
                  users
                </p>
              </div>
            </div>
            <div className="text-center relative">
              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 rounded-full w-[70px] h-[70px] bg-[#ff28288b] flex justify-center items-center animate-pulse z-10"></div>
              <div className="absolute top-[-25px] mt-2 left-1/2 transform -translate-x-1/2 rounded-full w-[50px] h-[50px] bg-[#ff2828] flex justify-center items-center z-20">
                <img
                  src={image2}
                  alt="logo"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div
                style={{
                  borderRadius: "50%",
                  padding: "50px",
                  backgroundColor: "rgb(3,105,161)",
                  display: "inline-block",
                }}
              >
                {isInViewport && (
                  <h1 className="text-5xl font-bold">
                    <CountUp duration={1} end={15} />
                    k+
                  </h1>
                )}
                <p className="font-bold text-lg">
                  Winning <br /> Distributed
                </p>
              </div>
            </div>
            <div className="text-center relative">
              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 rounded-full w-[70px] h-[70px] bg-[#ff28288b] flex justify-center items-center animate-pulse z-10"></div>
              <div className="absolute top-[-25px] mt-2 left-1/2 transform -translate-x-1/2 rounded-full w-[50px] h-[50px] bg-[#ff2828] flex justify-center items-center z-20">
                <img
                  src={image3}
                  alt="logo"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div
                style={{
                  borderRadius: "50%",
                  padding: "50px",
                  backgroundColor: "rgb(3,105,161)",
                  display: "inline-block",
                }}
              >
                {isInViewport && (
                  <h1 className="text-5xl font-bold">
                    <CountUp duration={1} end={20} />
                    k+
                  </h1>
                )}
                <p className="font-bold text-lg">
                  Match <br />
                  Hosted
                </p>
              </div>
            </div>
            <div className="text-center relative">
              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 rounded-full w-[70px] h-[70px] bg-[#ff28288b] flex justify-center items-center animate-pulse z-10"></div>
              <div className="absolute top-[-25px] mt-2 left-1/2 transform -translate-x-1/2 rounded-full w-[50px] h-[50px] bg-[#ff2828] flex justify-center items-center z-20">
                <img
                  src={image4}
                  alt="logo"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div
                style={{
                  borderRadius: "50%",
                  padding: "50px",
                  backgroundColor: "rgb(3,105,161)",
                  display: "inline-block",
                }}
              >
                {isInViewport && (
                  <h1 className="text-5xl font-bold">
                    <CountUp duration={2} end={90} />%
                  </h1>
                )}
                <p className="font-bold text-lg">
                  Successful <br /> Tournaments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
