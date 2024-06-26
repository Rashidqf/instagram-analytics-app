// pages/user.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function UserPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  // console.log(code);
  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/auth/instagram?code=${code}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUserData(data.user);
          console.log(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(error.message);
        }
      };

      fetchData();
      console.log("test");
    }
  }, []);
  const authHandler = (err, data) => {
    console.log("testing");
    if (err) {
      console.error("Login failed:", err);
    } else {
      console.log("Login success:", data);
    }
  };

  return (
    <div>
      <h1>Rashid knasjkdb 123</h1>
    </div>
  );
}
