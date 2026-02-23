interface Author {
  url: string
  id: number
  name: string
  image: string
  country: string
  bibliography?: string
  chapterCount?: number | string
  viewCount?: number | string
  storyCount?: number | string
  isNew?: boolean
}

interface Category {
  url: string
  id: number
  title: string
  image: string
  description?: string
  isNew?: boolean
}

interface Book {
  url: string
  id: number
  title: string
  author: string
  image: string
  rating: number
  category?: string
  state?: string
  rank?: string
  isNew?: boolean
}

interface Chapter {
  id: number
  number: string
  title: string
  publishedAt: string
}

interface RegisterData {
  full_name: string
  country: number
  pseudonym: string
  password: string
  email: string
  bibliography?: string
  categories?: number[]
  role: number
}

interface LoginData {
  password: string
  pseudonym: string
}
