export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image_url: string
  created_at: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  email: string
  name?: string
}