"use client";
// import { signIn, useSession } from "next-auth/react";
import store from "@/stores";
import { useRouter, redirect } from "next/navigation";
import { fetchUser, login } from "@/stores/user-store";
import Link from "next/link";
import { useFormik } from "formik";
import { loginValidation } from "./loginValidation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading/Loading";

const LoginPage = () => {

  const dispatch = useDispatch();
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
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      handleSubmit();
    },
  });



  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email: formik.values.email,
        password: formik.values.password
      });

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.name)
      localStorage.setItem("userid", res.data.user.id)
      localStorage.setItem("useremail", res.data.user.email)
      window.location.reload();

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
    <div className="flex justify-center items-center h-full">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        {error!= "" && (
            <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
            >
  
                 {error}
            </div>
        )}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">
                Sign in to our platform
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
                Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
                Not registered?
                <Link
                    href="/signup"
                    className="text-blue-700 hover:underline"
                >
                    Create account
                </Link>
            </div>
        </form>
    </div>
</div>
  );
};

export default LoginPage;
