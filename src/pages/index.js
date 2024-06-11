"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginPage from "@/component/buttonLogin";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    window.location.href = authUrl;
};

  const fetchInstagramData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/instagram/basicapi'); // Changed from post to get
      setData(response.data);
      console.log(response);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramData();
  }, []);
  
  return (
    <>
    <LoginPage/>
      {/* <h1>Rashid</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h3>Instagram Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>

        
      )}
       <div>
            <h1>Instagram Basic Display API with Next.js</h1>
            <button onClick={handleLogin}>Login with Instagram</button>
        </div> */}
    </>
  );
}
