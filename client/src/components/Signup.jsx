import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Signup() {
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { signup } = useUser(); // Access the signup function from UserContext

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Must enter email'),
    username: yup.string().required('Must enter a username').max(15),
    password: yup
      .string()
      .required('Must enter a password')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      signup(values, () => {
        setSignupSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      });
    },
  });

  return (
    <section className="flex items-center justify-center my-40">
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 bg-[#101F3C]">
        <div className="sm:w-1/2 px-8">
          <h2 className="font-bold text-2xl text-[#F44F10]">SignUp</h2>

          {signupSuccess ? (
            <div className="alert alert-success text-orange-700 mt-5">
              Sign-up successful! Redirecting to sign-in...
            </div>
          ) : null}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8">
            <label className="text-white" htmlFor="username">Username</label>
            <input
              className="p-2 rounded-xl border w-full"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-900">{formik.errors.username}</div>
            ) : null}
            <label className="text-white" htmlFor="email">Email address</label>
            <input
              className="p-2 rounded-xl border w-full"
              id="email"
              name="email"
              type="text"
              placeholder="emailaddress"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-900">{formik.errors.email}</div>
            ) : null}
            <label className="text-white"  htmlFor="password">Password</label>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-900">{formik.errors.password}</div>
            ) : null}

            <button
              type="submit"
              className="bg-[#F44F10]  rounded-xl text-white py-2"
            >
              SignUp
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 items-centre text-gray-500">
            <hr></hr>
            <p className="text-center">OR</p>
            <hr></hr>
          </div>
          <div className="flex justify-between item centre gap-6 my-8">
            <p className="text-white" >
              Already registered?
              <Link
                className="hover:bg-[#F44F10] px-4 py-3 rounded-lg transition"
                to="/login"
              >
                LogIn
              </Link>
            </p>
          </div>
        </div>

        {/* right image */}
        <div className="sm:block hidden w-1/2">
          <img
            className="h-full rounded-2xl"
            src="https://img.freepik.com/free-photo/cardano-blockchain-platform_23-2150411956.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Signup;
