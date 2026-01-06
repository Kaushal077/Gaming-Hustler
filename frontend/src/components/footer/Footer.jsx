import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
  faPlaystation,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import FooterImage from "../../assets/footer-bg.jpg";
import footerdown from "../../assets/footer-bottom-img.png";
import Carousel from "./Carousel";
import { FaInfoCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white">
          Our <span className="text-secondary">Sponsors</span>
        </h1>
        <i>
          <img
            src="https://www.gamerji.com/img/title-shape.png"
            alt="Title Shape"
            className="mx-auto my-4"
          />
        </i>
      </div>
      <Carousel />
      <footer
        id="footer"
        className="bg-center bg-cover h-auto rounded-t-3xl mt-10"
        style={{ backgroundImage: `url(${FooterImage})` }}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-4 justify-center items-center p-4">
          <div className="lg:w-1/2 ml-6">
            <div className="flex items-center">
              <FaInfoCircle className="text-4xl text-blue-300  pb-3" />
              <h2 className="text-2xl font-oswald font-bold mb-4 text-blue-300 underline">
                About Us
              </h2>
            </div>
            <p className="text-lg font-semibold text-white">
              Gaming Hustlers is your ultimate destination for Esports, offering
              a unique blend of competitive gaming, community, and learning
              opportunities. Whether you're a beginner seeking guidance or a
              seasoned pro aiming for glory, our platform is designed to cater
              to all gaming enthusiasts. With a dedicated team of passionate
              gamers and tech experts, we bring together local, state, national,
              and global tournaments, creating a vibrant community where every
              game is a battlefield for glory. Join us at Gaming Hustlers, where
              gaming is more than just a game—it's a journey of discovery,
              growth, and unforgettable moments.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="py-16 mt-1">
              <div className="container mx-auto">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      className="footer-link mx-2 mb-2 bg-secondary hover:bg-sky-700 text-white rounded-md px-4 py-2 relative transition-colors duration-200"
                      onClick={() => (window.location.href = "#")}
                    >
                      Home
                    </button>
                    <button
                      className="footer-link mx-2 mb-2 bg-secondary hover:bg-sky-700 text-white rounded-md px-4 py-2 relative transition-colors duration-200"
                      onClick={() => (window.location.href = "/classes")}
                    >
                      Tournaments
                    </button>
                    <button
                      className="footer-link mx-2 mb-2 bg-secondary hover:bg-sky-700 text-white rounded-md px-4 py-2 relative transition-colors duration-200"
                      onClick={() => (window.location.href = "/instructors")}
                    >
                      Hosts
                    </button>
                    <button
                      className="footer-link mx-2 mb-2 bg-secondary hover:bg-sky-700 text-white rounded-md px-4 py-2 relative transition-colors duration-200"
                      onClick={() => (window.location.href = "#FAQ")}
                    >
                      FAQ
                    </button>

                    <div className="pt-4 text-center flex justify-center gap-6">
                      <a href="#facebook">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-blue-500 text-3xl" // Increased icon size
                        />
                      </a>
                      <a href="#twitter">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="text-blue-400 text-3xl" // Increased icon size
                        />
                      </a>
                      <a href="#youtube">
                        <FontAwesomeIcon
                          icon={faYoutube}
                          className="text-red-500 text-3xl" // Increased icon size
                        />
                      </a>
                      <a href="#instagram">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="text-pink-500 text-3xl" // Increased icon size
                        />
                      </a>
                      <a href="#playstation">
                        <FontAwesomeIcon
                          icon={faPlaystation}
                          className="text-blue-600 text-3xl" // Increased icon size
                        />
                      </a>
                      <a href="#steam">
                        <FontAwesomeIcon
                          icon={faSteam}
                          className="text-purple-900 text-3xl" // Increased icon size
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="bg-[#1B1320]/80 py-6 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Want to become a Tournament Host?</h3>
            <p className="text-gray-300 text-sm mb-2">Contact us at:</p>
            <a href="mailto:kaushalmandal13590@gmail.com" className="text-primary hover:text-primary-light font-medium text-lg">
              kaushalmandal13590@gmail.com
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom bg-[#1B1320] py-4 text-center px-24">
          <div className="container mx-auto flex justify-between items-center">
            <p className="copyright text-white font-oswald uppercase text-sm font-medium ">
              Copyright © 2024{" "}
              <a href="/home" className="text-blue-300">
                Gaming-Hustlers
              </a>
              . all rights reserved
            </p>
            <figure className="footer-bottom-img">
              <img
                src={footerdown}
                alt="Online payment companies logo"
                className="mx-auto"
              />
            </figure>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
