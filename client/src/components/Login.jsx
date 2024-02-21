// Login.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const { login } = useUser(); // Access the login function from UserContext

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Must enter email'),
    password: yup
      .string()
      .required('Must enter a password')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setLoginError(true);
            throw new Error('Login failed');
          }
        })
        .then((userData) => {
          if (userData && userData.token) {
            // Call the login function to set the user data
            login(userData.token);

            // Optionally, you can store user data in localStorage if needed
            localStorage.setItem('id', userData.user_id);

            navigate('/');
          } else {
            console.error('User data is missing token');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  });

  return (
    <section className="flex items-center justify-center my-40">
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 bg-[#101F3C] ">
        <div className="sm:w-1/2 px-8">
          <h2 className="font-bold text-2xl text-[#F44F10]"> Login </h2>
          {loginError ? <div className="text-red-800 mt-5">Invalid username or password</div> : null}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 ">
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
            <label className="text-white" htmlFor="password">Password</label>
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
            <button type="submit" className="bg-[#F44F10] rounded-xl hover:bg-[#e9835b] text-white py-2">
              Login
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 items-centre text-gray-500">
            <hr></hr>
            <p className="text-center">OR</p>
            <hr></hr>
          </div>
          <div className="flex justify-between item centre gap-6 my-8">
            <p className="text-white" >
              Don't have an account?
              <Link className="hover:bg-[#F44F10] px-4 py-3 rounded-lg transition" to="/sign_up">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="sm:block hidden w-1/2">
          <img
            className="rounded-2xl h-full"
            src="https://img.freepik.com/free-photo/cardano-blockchain-platform_23-2150411956.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
