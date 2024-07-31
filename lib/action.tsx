'use server'

import connectToDb from './connectToDb'

import { User, UserWithoutId, Article, Hostname } from './models'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import type { Article as ArticleType } from './models'
import { auth } from '@/app/api/auth/auth'

export const addUser = async (formData: UserWithoutId) => {
  const { username, email, password, img, isAdmin } = formData
  const hashedPassword = await bcrypt.hash(password, 5)
  try {
    connectToDb()
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
    })
    await newUser.save()
    console.log('saved' + newUser)
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (formData: FormData) => {
  const id = formData.get('_id')

  try {
    await connectToDb()
    await User.findOneAndDelete({ _id: id })
    revalidatePath('/dashboard')
    console.log({ message: `Deleted user ${id}` })
    return { message: `Deleted user ${id}` }
  } catch (err) {
    return { message: 'Failed to delete user' }
  }
}

export const updateUser = async (formData: FormData) => {
  const _id = formData.get('_id')
  const username = formData.get('username')
  const email = formData.get('email')
  const img = formData.get('img')
  const isAdmin = formData.get('isAdmin')

  try {
    await connectToDb()
    await User.findOneAndUpdate(
      { _id: _id },
      {
        username: username,
        email: email,
        img: img,
        isAdmin: isAdmin === 'true' ? Boolean(true) : Boolean(false),
      }
    )
    revalidatePath(`/dashboard`)

    return { message: `Updated user ${_id}` }
  } catch (err) {
    return { message: 'Failed to update to db' }
  } finally {
    redirect('/dashboard/')
  }
}

export const createArticle = async (formData: FormData) => {
  const session = await auth()
  const stringImage=formData?.get('image') as string
  const hostname=stringImage?.split('//')[1].split('/')[0] 
  const rawFormData = {
    userName: session?.user?.name || '',
    title: formData.get('title'),
    contents: formData.get('contents'),
    image: formData.get('image'),
    video: formData.get('video'),
  }
  const hostnameObj = {
    hostname:hostname
  }
  console.log(hostname)
  try {
    await connectToDb()
    const newArticle = new Article(rawFormData)
    await newArticle.save()
    const newHostname = new Hostname(hostnameObj)
    await newHostname.save()
    
    console.log('saved' + newArticle)
    console.log('saved' +newHostname)
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}

export const getArticles = async () => {
  try {
    await connectToDb()

    const allArticles = (await Article.find({}).sort({
      createdAt: -1,
    })) as ArticleType[]
    return allArticles
  } catch (err) {
    console.log(err)
  }
}
export const getArticle = async (id: string | number) => {
  try {
    await connectToDb()

    const ArticleId = (await Article.findById({ _id: id })) as ArticleType
    return ArticleId
  } catch (err) {
    console.log(err)
  }
}

export const addLike = async (formData: FormData) => {
  const session = await auth()
  const id = formData.get('id')
  const userId = session?.user?.id
  try {
    await connectToDb()
    const article = await Article.findById(id)
    if (!article) {
      return console.log('brak artykułów')
    }

    if (!article.likes.includes(userId)) {
      article.likes.push(userId)
    } else {
      return console.log('Użytkownik już polubił ten artykuł')
    }

    await article.save()
    console.log('zapisano' + userId)
    revalidatePath('/article')
  } catch (err) {
    console.log(err)
  }
}

export const addComment = async (formData: FormData) => {
  const session = await auth()
  const id = formData.get('id')
  const comment = formData.get('comment')
  const userName = session?.user?.name

  const commentObj = {
    userName: userName,
    description: comment,
  }
  try {
    await connectToDb()
    const article = await Article.findById(id)
    if (!article) {
      return console.log('brak artykułów')
    }

    if (!article.comments.includes(commentObj)) {
      article.comments.push(commentObj)
    } else {
      return console.log('Użytkownik już polubił ten artykuł')
    }

    await article.save()
    console.log('zapisano' + commentObj.userName)
    revalidatePath('/article')
  } catch (err) {
    console.log(err)
  }
}

export const deleteBtnArticle = async (formData: FormData) => {
  const id = formData.get('id')

  try {
    await connectToDb()
    await Article.findOneAndDelete({ _id: id })
    revalidatePath('/dashboard')
    console.log({ message: `Deleted user ${id}` })
    return { message: `Deleted user ${id}` }
  } catch (err) {
    return { message: 'Failed to delete user' }
  }
}

export const editArticle = async (formData: FormData) => {
  const id = formData.get('id')
  const title = formData.get('title')
  const contents = formData.get('contents')
  const image = formData.get('image')
  try {
    await connectToDb()
    await Article.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        contents: contents,
        image: image,
      }
    )
    revalidatePath(`/dashboard`)
  } catch (err) {
    return { message: 'Failed to update to db' }
  } finally {
    redirect('/dashboard/')
  }
}
