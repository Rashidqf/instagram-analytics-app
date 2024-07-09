import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: "1207756877256989",
      clientSecret: "94a64b4bf3e52a7c76f0acf3ed1ff84b",
    }),
  ],
  // Add any additional configurations here
});
