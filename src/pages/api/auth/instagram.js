import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  if (code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      {
        client_id: "1175082610605703",
        client_secret: "9aa6ff4793844085505fc4338b09c7f2",
        grant_type: "authorization_code",
        redirect_uri: "https://instagram-analytics-app-r9ld.vercel.app/",
        code: code,
      }
    );
    console.log(response);

    const { access_token, user_id } = response.data;

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
}
