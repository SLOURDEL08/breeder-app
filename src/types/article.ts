interface NewsArticle {
  id: number
  title: string
  category: string
  article: string
  author?: string
  date: string
  link?: {
    text: string
    url: string
  }
  gallery?: string[] // Ajout du tableau d'images
}