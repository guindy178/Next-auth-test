// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { emit } from "process";
const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
          try {
            const response = await axios.post('http://localhost:3000/api/auth', {
              token: [token.name, token.email]
            });
            const access_token = response.data.data
            return { ...token, access_token };
          } catch (error) {
            console.error('Error sending token:', error);
          }
        }
        return token;
      },
    },
})

export { handler as GET, handler as POST }