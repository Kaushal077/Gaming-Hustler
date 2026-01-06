import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import praveerImage from '../../assets/praveer.jpeg';
import kaushalImage from '../../assets/kaushal.jpeg';
import nityaImage from '../../assets/nitya.jpeg';

const Developers = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const handleSlideChange = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  const teamMembers = [
    {
      id: 1,
      name: 'Praveer Kishore',
      job: 'Web Developer',
      enroll: 'A45349521001',
      image: praveerImage,
    },
    {
      id: 2,
      name: 'Kaushal mandal',
      job: 'Web Developer',
      enroll: 'A45349521002',
      image: kaushalImage,
    },
    {
      id: 3,
      name: 'Nityanand Kumar',
      job: 'UI Designer',
      enroll: 'A45349521005',
      image: nityaImage,
    },
  ];

  return (
    <>
    <div className="">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white">
          Our <span className="text-secondary">developers</span>
        </h1>
        <i>
          <img
            src="https://www.gamerji.com/img/title-shape.png"
            alt="Title Shape"
            className="mx-auto my-4"
          />
        </i>
      </div>
    <div className="container mx-auto max-w-7xl px-4 pb-10">
      <div className="relative">
        <div
          className={`flex transition-transform duration-1000 ${
            activeSlide === 1 ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="bg-[url('https://playerx.qodeinteractive.com/elementor/wp-content/uploads/2018/06/h2-background-img-1.jpg')] rounded-lg shadow-lg p-6 transition-transform duration-300 hover:translate-y-[-15px] border-4 border-secondary"              >
                <div className="flex flex-col items-center ">
                  <div className="w-32 h-32 rounded-full bg-sky-700 p-1 mb-4 ">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sky-300">{member.job}</p>
                  <p className="text-red-300 font-chakra-petch text-extrabold">{member.enroll}</p>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:bg-sky-900 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                      href="#"
                      className="text-blue-400 hover:bg-sky-600 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a
                      href="#"
                      className="text-pink-400 hover:bg-pink-800 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                      href="#"
                      className="text-purple-700 hover:bg-purple-900 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex transition-transform duration-1000 ${
            activeSlide === 2 ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {teamMembers.slice(3, 6).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:translate-y-[-15px]"
              >
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-sky-700 p-1 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sky-300">{member.job}</p>
                  <p className="text-red-300 font-chakra-petch text-extrabold">{member.enroll}</p>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:bg-sky-700 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                      href="#"
                      className="text-blue-400 hover:bg-sky-700 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a
                      href="#"
                      className="text-pink-400 hover:bg-pink-800 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                      href="#"
                      className="text-purple-700 hover:bg-purple-900 hover:text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Developers;