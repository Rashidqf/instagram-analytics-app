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
      clientSecret:
        "EAAJt6zscz2gBOZClRCZADPwKCaZC60iigferUhBOhhe4abLSZCD9IscAz3b8iutcVfsqdG682RczhA8EZBukB58ISEkZBwdGstwd1siklFqvCzKuvZCalMZAZC9ByFokrXTQ3kaAn6iN7PvCg2qrPE4OfyhltQVlTSXkZAEleCF1QmRaaZCuN4ZBHvOPAHiZC15IenBeEZAosDUl14TydFkzQqh5bcZBzwAQrINAP5KKD17V3dyXMfshKZBJjTqZCOUMZD",
    }),
  ],
  // Add any additional configurations here
});


