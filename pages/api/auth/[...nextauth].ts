import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { NextApiRequest } from "next";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "matchOn-credential",
      name: "matchOn-credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        const email = credentials.email;
        const password = credentials.password;
        if (email === "test@test.com" && password === "test") {
          console.log("crede", credentials);
          return credentials;
        }
        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  secret: process.env.SECRET,
  // 추가
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, user, token }) {
      return session;
    },
  },
});

//참고 블로그 https://birdmee.tistory.com/33
//도움 https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696

// import axios from "axios";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// async function refreshAccessToken(tokenObject) {
//   try {
//     // Get a new set of tokens with a refreshToken
//     const tokenResponse = await axios.post(YOUR_API_URL + "auth/refreshToken", {
//       token: tokenObject.refreshToken,
//     });

//     return {
//       ...tokenObject,
//       accessToken: tokenResponse.data.accessToken,
//       accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
//       refreshToken: tokenResponse.data.refreshToken,
//     };
//   } catch (error) {
//     return {
//       ...tokenObject,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }
// const YOUR_API_URL = "http";
// const providers = [
//   CredentialsProvider({
//     name: "Credentials",
//     id: "MatchOn-Credentials",
//     credentials: {
//       email: { label: "Email", type: "email", placeholder: "test@test.com" },
//       password: { label: "Password", type: "password" },
//     },
//     authorize: async (credentials) => {
//       try {
//         // Authenticate user with credentials
//         const user = await axios.post(YOUR_API_URL + "auth/login", {
//           password: credentials.password,
//           email: credentials.email,
//         });

//         if (user.data.accessToken) {
//           return user.data;
//         }
//         return null;
//       } catch (e) {
//         throw new Error(e);
//       }
//     },
//   }),
// ];

// const callbacks = {
//   jwt: async ({ token, user }) => {
//     if (user) {
//       // This will only be executed at login. Each next invocation will skip this part.
//       token.accessToken = user.data.accessToken;
//       token.accessTokenExpiry = user.data.accessTokenExpiry;
//       token.refreshToken = user.data.refreshToken;
//     }

//     // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
//     const shouldRefreshTime = Math.round(token.accessTokenExpiry - 60 * 60 * 1000 - Date.now());

//     // If the token is still valid, just return it.
//     if (shouldRefreshTime > 0) {
//       return Promise.resolve(token);
//     }

//     // If the call arrives after 23 hours have passed, we allow to refresh the token.
//     token = refreshAccessToken(token);
//     return Promise.resolve(token);
//   },
//   session: async ({ session, token }) => {
//     // Here we pass accessToken to the client to be used in authentication with your API
//     session.accessToken = token.accessToken;
//     session.accessTokenExpiry = token.accessTokenExpiry;
//     session.error = token.error;

//     return Promise.resolve(session);
//   },
// };

// export const options = {
//   providers,
//   callbacks,
//   pages: { signIn: "/login" },
//   secret: "your_secret",
// };

// const Auth = (req, res) => NextAuth(req, res, options);
// export default Auth;
