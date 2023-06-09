import NextAuth from "next-auth/next";
import GitHub from 'next-auth/providers/github'
export default NextAuth({
    providers: [
            GitHub({
                clientId:process.env.GITHUB_ID,
                clientSecret:process.env.GITHUB_SECRET
        })
    ]
})