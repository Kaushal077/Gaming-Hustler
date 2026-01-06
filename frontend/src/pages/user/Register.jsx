import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlinePicture,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleLogin from "../../components/Social/GoogleLogin";
import LottieAnimation from "./LottieAnimation";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdGamepad } from "react-icons/md";

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const Register = () => {
  useTitle("Register | Yoga Master - Unleashed Your Inner Self");
  const { signUp, error, setError, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // State to hold the email validation error
  const [emailError, setEmailError] = useState("");

  // Watch the email input field
  const email = watch("email", "");

  // Function to check if the email is already registered
  const checkEmail = async (email) => {
    try {
        const response = await axios.get(`http://localhost:3000/check-email?email=${email}`);
        if (response.status === 200) {
            if (response.data.exists) {
                setEmailError('Email is alerady used');
            } else {
                setEmailError('');
            }
        } else {
            setEmailError('An error occurred while checking the email');
        }
    } catch (err) {
        console.error(err);
        setEmailError('An error occurred while checking the email');
    }
};

  // Debounce the checkEmail function
  const debouncedCheckEmail = debounce(checkEmail, 500);

  // Call debouncedCheckEmail whenever the email changes and is not empty
  useEffect(() => {
    if (email && email.trim().length > 0) {
      debouncedCheckEmail(email);
    } else {
      setEmailError("");
    }
  }, [email, debouncedCheckEmail]);

  const onSubmit = (data) => {
    setError("");
    toast.promise(
      signUp(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            return updateUser(data.name, data.photoUrl).then(() => {
              const userImp = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                gender: data.gender,
                address: data.address,
                role: "user",
                phone: data.phone,
              };

              if (user.email && user.displayName) {
                return axios
                  .post("http://localhost:3000/new-user", userImp)
                  .then(() => {
                    navigate("/");
                    return "Registration successful!";
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }
            });
          }
        })
        .catch((err) => {
          setError(err.code);
          throw new Error(err);
        }),
      {
        pending: "Please wait...",
        success: "Registration successful!",
        error: "Registration failed!",
      }
    );
  };

  const password = watch("password", "");

  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-[500px] sm:h-[600px] md:h-[700px] lg:h-[400px] rounded-3xl"
        style={{
          backgroundImage:
            'url("https://themes.envytheme.com/tinja/wp-content/themes/tinja/assets/img/banner-bg1.jpg")',
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-center items-center rounded-3xl">
          <h1
            className="text-heading text-4xl sm:text-6xl text-center pt-40 text-3.5xl font-extrabold flex items-center"
            style={{ marginBottom: "-30px" }}
          >
            <SiGnuprivacyguard className="mr-2" /> SignUp Here{" "}
            <MdGamepad className="ml-2" />
          </h1>
          <LottieAnimation />
        </div>
      </div>
      <div>
        <div className="text-center mb-8 mt-10 pt-5">
          <h1 className="font-chakra-petch text-3xl sm:text-5xl font-semibold text-orange-500 mb-2 dark:text-primary">
            Welcome Esports Athelete
          </h1>
          <h2 className="font-roboto text-xl sm:text-3xl font-bold text-secondary">
            Before Participating In any of E-Sports Event.
            <span className="text-gray-500 font-roboto text-xl sm:text-3xl mb-8">
              Please Register Yourself..
            </span>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl mx-auto mb-10">
          <div className="w-full sm:w-auto rounded-lg bg-opacity-50 bg-black backdrop-blur-lg shadow-lg border-4 border-sky-700 mb-8 sm:mb-4 dark:border-4 border-#101820-900">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-1">
              {error && (
                <p className="text-red-900 font-bold text-center mb-4 dark:text-red-500">
                  {error}
                </p>
              )}
              <div className="flex items-center gap-5">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-white font-bold mb-2"
                  >
                    <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                    Name
                  </label>
                  <input
                    placeholder="Enter your name"
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white font-bold mb-2"
                  >
                    <AiOutlineMail className="inline-block mr-2 mb-1 text-lg " />
                    Email
                  </label>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  {emailError && (
                    <p className="text-red-900 text-center mb-4 dark:text-red-500">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-white font-bold mb-2 "
                  >
                    <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                    Password
                  </label>
                  <input
                    placeholder="Enter Password"
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-white font-bold mb-2 "
                  >
                    <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                    Confirm Password
                  </label>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-900 text-sm w-full mt-1 dark:text-red-500">
                      <p>{errors.confirmPassword.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-white font-bold mb-2"
                  >
                    <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                    Phone Number
                  </label>
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    {...register("phone", { required: true })}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="photoUrl"
                    className="block text-white font-bold mb-2 "
                  >
                    <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                    Photo URL
                  </label>
                  <input
                    placeholder="Photo URL"
                    type="text"
                    {...register("photoUrl")}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="gender"
                  className="block text-white font-bold mb-2"
                >
                  <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                  Gender
                </label>
                <select
                  {...register("gender", { required: true })}
                  className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-white font-bold mb-2"
                >
                  <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
                  Address
                </label>
                <textarea
                  {...register("address", { required: true })}
                  className="w-full border resize-none border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  rows="3"
                  placeholder="Enter your address"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-secondary hover:bg-sky-700 text-white py-2 px-4 rounded-md"
                >
                  Register
                </button>
                {errors.password && (
                  <div className="text-red-900 text-sm w-full mt-1 dark:text-red-500">
                    <p>
                      Password must be at least 6 characters long, contain a{" "}
                      <br /> capital letter, and a special character.
                    </p>
                  </div>
                )}
              </div>
            </form>
            <p className="text-center mb-2 text-white">
              Already have an account?{" "}
              <Link to="/login" className="underline text-heading">
                Login
              </Link>
            </p>
            <GoogleLogin />
          </div>
          <img
            src="https://demo2.wpopal.com/gamico/wp-content/uploads/2023/12/h3_img-9.png"
            alt="Image"
            className="max-w-md h-auto mx-auto sm:ml-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
