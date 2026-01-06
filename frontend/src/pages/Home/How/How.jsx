import React from "react";
import "./How.css";
import image1 from "../../../assets/icon-1.png";

const How = () => {
  return (
    <div className="section-wrapper mt-12">
      <div className="hiw text-secondary">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white">
          Soon <span className="text-secondary">It will</span> Be
        </h1>
        <div className="w-[40%] text-center mx-auto my-4 flex flex-col items-center dark:text-grey-500">
          <h2 className="about-title">
            It's easier than you think.{" "}
            <strong>Just 4 easy steps to follow.</strong>{" "}
          </h2>
          <i>
            <img
              src="https://www.gamerji.com/img/title-shape.png"
              alt="Title Shape"
              className="mx-auto my-2"
            />
          </i>
        </div>
      </div>
      <div className="steps border-secondary border-4">
        <div className="containerhow">
          <div className="cardhow">
            <div className="container-imagehow">
              <img
                src={image1}
                alt="icon"
                className="hiw-img-bor"
                loading="lazy"
              />
            </div>
            <p>SignUp</p>
          </div>
          <img
            src="https://pixner.net/begam/images/line-two.png"
            alt="arrow"
            className="hiw-img"
            loading="lazy"
          />
          <div className="cardhow">
            <div className="container-imagehow">
              <img
                src="https://pixner.net/begam/images/how-icon-2.png"
                className="hiw-img-bor"
                alt="icon"
                loading="lazy"
              />
            </div>
            <p>Deposit</p>
          </div>
          <img
            src="https://pixner.net/begam/images/line-two.png"
            alt="arrow"
            className="hiw-img"
            loading="lazy"
          />
          <div className="cardhow">
            <div className="container-imagehow">
              <img
                src="https://pixner.net/begam/images/how-icon-3.png"
                alt="icon"
                className="hiw-img-bor"
                loading="lazy"
              />
            </div>
            <p>Compete</p>
          </div>
          <img
            src="https://pixner.net/begam/images/line-two.png"
            alt="arrow"
            className="hiw-img"
            loading="lazy"
          />
          <div className="cardhow">
            <div className="container-imagehow">
              <img
                src="https://pixner.net/begam/images/how-icon-4.png"
                alt=" icon"
                loading="lazy"
                className="hiw-img-bor"
              />
            </div>
            <p>GetPaid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
