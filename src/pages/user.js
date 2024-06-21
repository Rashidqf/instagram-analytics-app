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
    const data = async () => {
      try {
        const response = await fetch(
          "https://api.instagram.com/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: "1175082610605703",
              client_secret: "9aa6ff4793844085505fc4338b09c7f2",
              grant_type: "authorization_code",
              redirect_uri: "https://instagram-analytics-app-ggm2.vercel.app/",
              code: code,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const { access_token, user_id } = data;

        // Fetch user profile data
        const userProfileResponse = await fetch(
          `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
        );

        if (!userProfileResponse.ok) {
          throw new Error(`HTTP error! status: ${userProfileResponse.status}`);
        }

        const userData = await userProfileResponse.json();

        // You can now use the userData and access_token, for example by setting a cookie or storing in your database
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    data();
    
  }, [code]);

  // if (!session) return <p>Loading...</p>;
  // if (session.user.role !== "user") return <p>Access Denied</p>;
  // <h1>RAshius</h1>;

  return (
    <div>
      <h1>Rashid knasjkdb</h1>
    </div>
  );
}
