interface User {
  uuid: string;
  name: string;
  bibliography: string;
  email: string;
  pseudonym: string;
  code_color: string;
  photo: string;
  role: string;
  country: string;
  status: string;
  sanction_date: Date;
  selected?: boolean
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

interface Category {
  id: number,
  uuid: string
  name?: string
  image?: string
  description?: string
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