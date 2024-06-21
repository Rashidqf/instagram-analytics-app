// pages/user.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UserPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    // if (code) {
    //   // Fetch user data using the authorization code
    //   const fetchUserData = async () => {
    //     try {
    //       const response = await axios.get(`/api/auth/instagram?code=${code}`);
    //       setUserData(response.data.user);
    //     } catch (error) {
    //       console.error("Error fetching user data:", error);
    //       setError("Failed to fetch user data");
    //     }
    //   };
    //   fetchUserData();
    // }
    const data = async () => {
      try {
        const response = await axios.post(
          "https://api.instagram.com/oauth/access_token",
          {
            client_id: "1175082610605703",
            client_secret: "9aa6ff4793844085505fc4338b09c7f2",
            grant_type: "authorization_code",
            redirect_uri: "https://instagram-analytics-app-ggm2.vercel.app/",
            code: code,
          }
        );
        console.log(response);
        const { access_token, user_id } = response.data;
        // console.log(response);

        // Fetch user profile data
        const userProfileResponse = await axios.get(
          `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
        );

        const userData = userProfileResponse.data;

        // You can now use the userData and access_token, for example by setting a cookie or storing in your database

        res.status(200).json({ user: userData, access_token: access_token });
      } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ error: "Failed to fetch access token" });
      }
    };
  }, [code]);

  if (!session) return <p>Loading...</p>;
  if (session.user.role !== "user") return <p>Access Denied</p>;

  return <div>Welcome, User {session.user.name}</div>;
}
