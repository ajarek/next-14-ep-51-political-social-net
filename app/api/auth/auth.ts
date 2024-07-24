import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/lib/models'
import connectToDb from '@/lib/connectToDb'
import bcrypt from 'bcryptjs'

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    error: '/register',
  },
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#0E78F9', // Hex color code
    logo: '/images/debata.png', // Absolute URL to image
    buttonText: '#ffffff', // Hex color code
  },

  providers: [
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        username: { type: 'text', required: true },
        password: { type: 'password', required: true },
      },
      async authorize(credentials: any) {
        await connectToDb()
        try {
          const user = await User.findOne({ username: credentials.username })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user
            }
          }
        } catch (err: any) {
          throw new Error(err)
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.username,
          admin: user.isAdmin,
          image: user.img,
        }
      }
      return token
    },
    async session({ session, token, user }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          admin: token.admin,
          image: token.image,
        },
      }
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}`
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
})