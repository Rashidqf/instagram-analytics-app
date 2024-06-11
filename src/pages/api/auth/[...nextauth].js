// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "./../../../model/User";
// import dbConnect from "./../../../utils/dbconnect";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         await dbConnect();
//         console.log("Credentials:", credentials);

//         const user = await User.findOne({ email: credentials.email });
//         console.log("User:", user);

//         if (
//           !user ||
//           !(await bcrypt.compare(credentials.password, user.password))
//         ) {
//           throw new Error("Invalid email or password");
//         }

//         return { email: user.email, name: user.name, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// });


import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: "429198833321637",
      clientSecret: "c40e131797a9b23b8754fbb040760588",
    }),
  ],
  // Add any additional configurations here
});


