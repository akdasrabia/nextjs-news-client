"use client";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";


const Navbar = () => {

  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false)
  const [token, setToken] = useState("")







  useEffect(() => {
    console.log(localStorage.getItem("token")) 
    if(localStorage.getItem("token") && localStorage.getItem("username") && localStorage.getItem("userid") && localStorage.getItem("useremail")  ) {
      setStatus(true)
    }else {
      setStatus(false)
    }

  }, [])


  const logout = async () => {
    try {
      let tkn = localStorage.getItem("token");
      const res = await axios.get('http://localhost:8000/api/logout', {
        headers: {
          Authorization: `Bearer ${tkn}`,
        }
      });
      console.log(res);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      localStorage.removeItem("useremail");
      router.push("/")
      setStatus(false)
    } catch (error) {
      console.error('Logout error:', error);
      // Hata durumunda yapılacak işlemleri buraya ekleyebilirsiniz.
    }
  };





  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>NEWS</Link>

      <div className={styles.links}>
        {status === true ? (
          <>
                      <Link className={styles.link} href="/create">
              Create
            </Link>
            <Link className={styles.link} href="/dashboard">
              Dashboard
            </Link>
            <a  onClick={ logout} className={styles.link} href="#">
              Logout
            </a>
          </>
        ) : (
          <>
            <Link className={styles.link} href="/login">
              Login
            </Link>
            <Link href="/register" onClick={ logout} className={styles.link} >
              Register
            </Link>
          </>
          
        )}







      </div>
    </div>
  );
};

export default Navbar;
