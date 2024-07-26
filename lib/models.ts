import mongoose from 'mongoose'

export type User = {
  _id: string
  username: string
  email: string
  password: string
  img: string
  isAdmin: boolean
} 
export type Article = {
  [x: string]: any
  _id: string
  userName: string
  title: string
  contents: string
  image: string
  video: string
  likes: string[]
  comments: string[]
}

export type UserWithoutId = Omit<User, '_id'>

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, min: 3, max: 50 },
    password: { type: String, required: true, min: 6, max: 50 },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)
const articleSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, min: 3, max: 20 },
    title: { type: String, required: true, unique: true, min: 3,  },
    contents: { type: String, required: true, min: 6, },
    image: { type: String },
    video: { type: String },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
)



export const User = mongoose.models?.User || mongoose.model('User', userSchema)
export const Article = mongoose.models?.Article || mongoose.model('Article', articleSchema)
