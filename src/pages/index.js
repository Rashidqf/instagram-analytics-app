"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginPage from "@/component/buttonLogin";
import { getFacebookProfile } from "./api/instagram/test";
import Link from "next/link";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { code } = router.query;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/buiseness/userdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (code) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/auth/instagram?code=${code}`);
          setUserData(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
        }
      };
      fetchUserData();
    }
    // const data = async () => {
    //   try {
    //     const response = await axios.post(
    //       "https://api.instagram.com/oauth/access_token",
    //       {
    //         client_id: "1175082610605703",
    //         client_secret: "9aa6ff4793844085505fc4338b09c7f2",
    //         grant_type: "authorization_code",
    //         redirect_uri: "https://instagram-analytics-app.vercel.app/user",
    //         code: code,
    //       }
    //     );
    //     console.log("rssponse", response);
    //     const { access_token, user_id } = response.data;x
    //     // console.log(response);

    //     // Fetch user profile data
    //     const userProfileResponse = await axios.get(
    //       `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
    //     );

    //     const userData = userProfileResponse.data;

    //     // You can now use the userData and access_token, for example by setting a cookie or storing in your database

    //   } catch (error) {
    //     console.error("Error fetching access token: test", error);
    //   }
    // };
    // data();
  }, [code]);

  // const handleLogin = async () => {
  //   window.location.href =
  //     "https://api.instagram.com/oauth/authorize?client_id=1175082610605703&redirect_uri=https://www.opdagverden.dk/log-ind&scope=user_profile,user_media&response_type=code";
  //   // try {
  //   //   const response = await axios.post('/api/instagram/instagramapi');
  //   //   // setData(response.data);
  //   //   console.log(response);
  //   // } catch (error) {
  //   //   // setError('Failed to fetch data');
  //   //   console.error('Error fetching data:', error);
  //   // } finally {
  //   //   setLoading(false);
  //   //   console.log("test");
  //   // }
  // };

  // const fetchInstagramData = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get("/api/instagram/basicapi");
  //     setData(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     setError("Failed to fetch data");
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchInstagramData();
  // }, []);

  // useEffect(() => {
  //   const data = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://www.instagram.com/rashid.yousufzai/?__a=1`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       console.log(response);
  //       return response;
  //     } catch (error) {
  //       console.error("Error fetching Instagram data:", error);
  //       return null;
  //     }
  //   };
  //   data();

  //   const accessToken =
  //     "EAAD6sRzGOv0BO1nzA7R8BxJH5WCT5A6kNqfKq50i1DCYck1qI3CZA51MZARkT3QB6IGJANLBWkToBTxq0cR92WsbYqt9FlhbJ4AZBUwDExtosvlB9gwZAo2ZBsZAjcc2ZBAzcSThP08JlmWXwJuJY45zhn7f1nOSelhCShB7c4hVGQ0fRvniLTSnIGVwQW53Q3FfdGb6uVxviRH6Tfqy6zxiOEHUXcZBAU621ZB57zQCSVtz3ZCrqZCuMjtk0H6aNnwKMoQ";
  //   if (accessToken) {
  //     getFacebookProfile(accessToken)
  //       .then((data) => setProfile(data))
  //       .catch((error) => console.error(error));
  //   }
  // }, []);

  return (
    <>
      {/* <LoginPage /> */}
      {/* <h1>Rashid</h1> */}
      {/* {profile && (
        <div>
          <h3>Instagram Data</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )} */}

      {/* <div>
        {error && <p>{error}</p>}
        {userData ? (
          <div>
            <h1>Welcome, {userData.username}</h1>
            <p>User ID: {userData.id}</p>
          </div>
        ) : (
          <p>...Loading updated</p>
        )}
      </div> */}
      <h1>UserData{userData}</h1>

      <div className="mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={profile?.picture?.data?.url}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {profile?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {profile?.id}
          </span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
