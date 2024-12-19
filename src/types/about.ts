interface Testimony {
  avatar: string
  title: string
  description: string
  gallery: {
    beforeleft: string[]
    right: string[]
  }
}

const farmerTestimony: Testimony[] = [
  {
    avatar: 'chemin/vers/avatar1.jpg',
    title: 'Titre du témoignage 1',
    description: 'Description du témoignage 1',
    gallery: {
      beforeleft: ['image1.jpg', 'image2.jpg'],
      right: ['image3.jpg', 'image4.jpg']
    }
  }
]