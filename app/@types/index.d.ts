interface User {
  uuid: string;
  name: string;
  bibliography: string;
  email: string;
  pseudonym: string;
  code_color: string;
  photo: string;
  role: string;
  id_country: number;
  country: string;
  status: string;
  sanction_date: Date;
  selected?: boolean
  preferences?: Category[]
}

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

interface Country {
  id: number
  uuid: string
  name?: string
  flag?: string
  code?: string
  language?: string
  status?: string
  deadline?: Date
}

interface Category {
  id: number
  uuid: string
  name?: string
  image?: string
  description?: string
  status?: string
  deadline?: Date
}

interface RoleDto {
  name?: string
  description?: string
}

interface Role {
  id: number
  uuid: string
  name?: string
  description?: string
  status?: string
  deadline?: Date
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
  name: string
  country: number
  pseudonym: string
  password: string
  email: string
  bibliography?: string
  role: number
}

interface PersonalData {
  name: string
  country: number
  pseudonym: string
  email: string
  bibliography?: string
  categories?: number[]
}

interface LoginData {
  password: string
  pseudonym: string
}

interface CountryDto {
  name: string;
  code: string;
  prefix: string;
  prefix: string;
  language: string;
}

interface CountryUpdateDto extends CountryDto {
  uuid?: string;
}

interface Country {
  id: number;
  uuid: string;
  name: string;
  code: string;
  prefix: string;
  prefix: string;
  language: string;
  created_at: Date;
  updated_at: Date;
  city?: City;
  selected?: boolean;
}