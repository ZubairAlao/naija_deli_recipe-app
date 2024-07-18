import NextAuth, { Profile as DefaultProfile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/lib/models/users";
import { connectToDB } from "@/utils/database";

interface SessionUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

declare module "next-auth" {
    interface Session {
        user?: SessionUser;
    }
}

interface GoogleProfile extends DefaultProfile {
    picture?: string;
}

const NextAuthHandler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            httpOptions: {
                timeout: 10000 // Timeout in milliseconds (10 seconds)
            }
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (!session.user || !session.user.email) {
                return session;
            }

            const sessionUser = await User.findOne({
                email: session.user.email,
            });

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }

            return session;
        },
        async signIn({ profile }) {
            const googleProfile = profile as GoogleProfile;
            if (!googleProfile) {
                return false;
            }

            try {
                await connectToDB();

                const userExist = await User.findOne({
                    email: googleProfile.email,
                });

                if (!userExist) {
                    await User.create({
                        email: googleProfile.email,
                        username: googleProfile.name?.replace(/\s+/g, "").toLowerCase(),
                        image: googleProfile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { NextAuthHandler as GET, NextAuthHandler as POST };
