
import React, { useState, useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import GoogleLogin from "../../components/Social/GoogleLogin";
import LottieAnimation from "./LottieAnimation";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdGamepad } from "react-icons/md";
const Login = () => {
  useTitle("Login | Gaming Hustler - Level Up Your game");
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, setError, loader, setLoader, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByEmail(formData.email);
      if (user) {
        setUser(user);
        navigate(location.state?.from || "/dashboard");
      }
    };
    if (formData.email) {
      checkUserExists();
    }
  }, [formData.email]);

  const handelSubmit = (e) => {
    setError("");
    e.preventDefault();
    login(formData.email, formData.password)
      .then(() => {
        navigate(location.state?.from || "/dashboard");
      })
      .catch((err) => {
        setError(err.code);
        setLoader(false);
      });
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-[500px] sm:h-[600px] md:h-[700px] lg:h-[400px] rounded-3xl"style={{
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
            <SiGnuprivacyguard className="mr-2" /> LogIn Here{" "}
            <MdGamepad className="ml-2" />
          </h1>
          <LottieAnimation />
        </div>
      </div>
      <div>
        <div className="text-center mb-8 mt-10 pt-5">
          <h1 className="font-chakra-petch text-3xl sm:text-5xl font-semibold text-orange-500 mb-2 dark:text-primary">
            Welcome Back Gamers
          </h1>
          <h2 className="font-roboto text-xl sm:text-3xl font-bold text-secondary">
            Good to see you back..
            <span className="text-gray-500 font-roboto text-xl sm:text-3xl mb-8">
              Please login to continue.
            </span>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl mx-auto mb-10">
          <div className="w-full sm:w-auto rounded-lg bg-opacity-50 bg-black backdrop-blur-lg shadow-lg border-4 border-sky-700 mb-8 sm:mb-0 dark:border-4 border-#101820-900">
            <form onSubmit={handelSubmit} className="p-6 space-y-1">
              {error && (
                <p className="text-red-900 font-bold text-center mb-4 dark:text-red-500">
                  {error}
                </p>
              )}
              <label htmlFor="email" className="text-white">
                <span>Enter your email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border outline-none rounded-lg text-black border-gray-200 p-4 text-sm shadow-sm"
                  style={{ marginBottom: "10px" }}
                  placeholder="Enter email"
                />
              </label>
              <label htmlFor="password" className="text-white">
                <span>Enter your Password:</span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg outline-none border text-black border-gray-200 p-4 text-sm shadow-sm"
                  style={{ marginBottom: "10px" }}
                  placeholder="Enter password"
                />
              </label>
              <button
                type="submit"
                className="block w-full rounded-lg bg-secondary px-5 py-3 text-lg font-medium text-white hover:bg-sky-700 hover:text-white"
                style={{ marginBottom: "10px" }}
              >
                Sign in
              </button>
              <p className="text-center text-lg text-white dark:text-gray-500">
                No account?
<Link className="underline text-heading" to="/register">
                  Sign up
                </Link>
              </p>
            </form>
            <GoogleLogin />
          </div>
          <img
            src="https://demo2.wpopal.com/gamico/wp-content/uploads/2023/12/h2_img6.png"
            alt="Image"
            className="max-w-md h-auto mx-auto sm:ml-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
