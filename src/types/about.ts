interface Testimony {
  avatar: string
  title: string
  description: string
  gallery: {
    beforeleft: string[]
    right: string[]
  }
}

const farmerTestimony: Testimony[]