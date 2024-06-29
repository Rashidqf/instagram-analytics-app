import InstagramUser from "@/model/UserSchema";
import dbConnect from "@/utils/dbconnect";
import axios from "axios";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  dbConnect();
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }
  try {
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: "1175082610605703",
        client_secret: "9aa6ff4793844085505fc4338b09c7f2",
        grant_type: "authorization_code",
        redirect_uri:
          "https://instagram-analytics-app-mp2b.vercel.app/api/auth/instagram",
        code: code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token, user_id } = response.data;
    const userProfileResponse = await axios.get(
      `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
    );
    const userData = userProfileResponse.data;

    // Save user data to the database
    const newUser = new InstagramUser({
      instagram_user_id: user_id,
      access_token: access_token,
      username: userData.username,
      // Add other fields if available
    });

    await newUser.save();

    res.status(200).json({ user: userData, access_token: access_token });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
