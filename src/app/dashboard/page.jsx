"use client"
import Loading from '@/components/loading/Loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter, redirect } from "next/navigation";
const Dashboard = () => {



  const router = useRouter()

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(localStorage.getItem("token")) 
    if(!(localStorage.getItem("token") && localStorage.getItem("username") && localStorage.getItem("userid") && localStorage.getItem("useremail") ) ) {
      router.push("/login")
    }
    setLoading(false)
    fetchData()
  }, [])








  const [news, setNews] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [useremail, setUseremail] = useState(localStorage.getItem("useremail"))
  const fetchData = async () => {
    setLoading(true);

    await axios
      .get(`http://localhost:8000/api/user/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNews(res.data.news);
        console.log(news);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
  

    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  
    return formattedDate;
  }

  if(!token) {
    router.push("/login")
  }

  if ( loading) {
    return (
      <Loading />
    );
  }

  
  function avatar(name) {
    const names = name.split(" ");

    let initials = "";
    for (let i = 0; i < names.length; i++) {
      if (names[i].length > 0) {
        initials += names[i][0].toUpperCase();
      }
    }
    return initials;
  }


  return (
    <div>
      <div className="bg-gray-100"></div>

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className=" inline-block w-full text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  ">
              <div className="p-3">
                <p className="text-base font-semibold leading-none text-gray-900 mb-5 ">
                  <div className="relative mr-3 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-purple-500 rounded-full ">
                    <span className="font-medium text-white ">
                      {avatar(username)}
                    </span>
                  </div>
                  <p href="#">{username}</p>
                </p>
                <p className="text-sm font-normal mb-5">
                  <p href="#" className="hover:underline">
                    {useremail}
                  </p>
                </p>

                <ul className="flex text-sm mt-5">
                  <li className="me-2">
                    <p href="#" className="hover:underline">
                      <span className="font-semibold text-gray-900 ">
                        {news.length}
                      </span>
                      <span>News</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div data-popper-arrow></div>
            </div>

            <div className="my-4"></div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white shadow-sm  block w-full p-6  rounded-lg border border-gray-200  hover:bg-gray-100">
              <div className="grid gap-4		">
                <div className="p-4">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.length > 0 &&
                          news.map((item, key) => (
                            <tr key={key} className="bg-white border-b ">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {item.title}
                              </th>
                              <td className="px-6 py-4">
                                {formatDate(item.created_at)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard