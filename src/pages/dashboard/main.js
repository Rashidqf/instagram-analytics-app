"use client";
import loader from "@/component/loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/api/buiseness/userdata?username=${inputValue}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setData(data);
      setPost(data.mediaDetails.business_discovery.media.data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {/* input field */}
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username "
                required
              />
              <button
                onClick={fetchData}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-900"
              >
                Search
              </button>
            </div>
          </form>

          {/* Show loader while loading */}
          {loading && <div className="text-center mt-4">Loading...</div>}

          {/* user detail */}
          {data && (
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="border-b px-4 pb-6">
                <div className="text-center my-4">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                    src={
                      data.businessDetails.business_discovery
                        .profile_picture_url ||
                      "https://randomuser.me/api/portraits/women/21.jpg"
                    }
                    alt=""
                  />
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                      {post.username}
                    </h3>
                    <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          className=""
                          d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                        />
                      </svg>
                      {data.businessDetails.business_discovery.biography ||
                        "test"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 px-2">
                  <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                    Followers :{" "}
                    {data.businessDetails.business_discovery.followers_count ||
                      "test"}
                  </button>
                  <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                    Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* post details */}
          <div className="flex justify-center flex-wrap">
            {post.length > 0 &&
              post.map((post, index) => (
                <Link
                  href={post.permalink}
                  key={post.id}
                  className="max-w-xs containerp m-5 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div>
                    <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                      {post.username}
                    </h1>
                    <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
                      {post.caption}
                    </p>
                  </div>
                  <img
                    className="w-full cursor-pointer"
                    src={post.media_url}
                    alt=""
                  />
                  <div className="flex p-4 justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-10 rounded-full"
                        src={post.media_url}
                        alt="sara"
                      />
                      <h2 className="text-gray-800 font-bold cursor-pointer">
                        {post.username}
                      </h2>
                    </div>
                  </div>
                  <div className="flex space-x-2 pl-4">
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-gray-600 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </span>
                      <p className="text-black">{post?.comments_count}</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <p className="text-black">{post.like_count}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
