"use client";
import store from "@/stores";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import {  registerValidation } from "./registerValidation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading/Loading";

const RegisterPage = () => {

  const router = useRouter()

  const [loading, setLoading] = useState(true)


  
  useEffect(() => {
    console.log(localStorage.getItem("token")) 
    if(localStorage.getItem("token")  ) {
      router.push("/");
    }else {
      setLoading(false)
    }
  }, [])

  const { status } = false;
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: ""
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      handleSubmit();
    },
  });



  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        email: formik.values.email,
        password: formik.values.password,
        name: formik.values.name
      });

      router.push("/login")

    } catch (error) {
      console.error(error.response);



      if (error.response && error.response.data) {
        const { status, message } = error.response.data;
        console.log('Status:', status);
        console.log('Message:', message);
        setError(message)
      } else {
        console.error('An error occurred:', error.message);
        setError(error.message)
      }
    }
  };


  if(loading) {
    return (
      <>
        <Loading />
      </>
    )
  }


  return (
    <div className="flex justify-center items-center">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        {/* {errors.length > 0 && (
            <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
            >
                <span className="font-medium">Danger alert!</span>{" "}
                Change a few things up and try submitting again.
            </div>
        )} */}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">
                Sign up to our platform
            </h5>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                >
                    Your email
                </label>
                <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    placeholder="Email"
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                />

                {formik.errors.email && (
                    <p className="text-xs text-red-600 dark:text-white">
                        {formik.errors.email}
                    </p>
                )}
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                >
                    Name
                </label>
                <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                    placeholder="Name"
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                />

                {formik.errors.name && (
                    <p className="text-xs text-red-600 dark:text-white">
                        {formik.errors.name}
                    </p>
                )}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                />
                {formik.errors.password && (
                    <p className="text-xs text-red-600 dark:text-white">
                        {formik.errors.password}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Register
            </button>
            <div className="text-sm font-medium text-gray-500">
            Already registered? 
                <Link
                    href="/login"
                    className="text-blue-700 hover:underline"
                >
                    Sign In
                </Link>
            </div>
        </form>
    </div>
</div>
  );
};

export default RegisterPage;
