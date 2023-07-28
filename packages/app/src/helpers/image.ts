const baseUrl = import.meta.env.VITE_API_URL

export const getImagePath = (type: string, path: string, size = "original") => {
  return `${baseUrl}images/${type}/${size}/${path}`
}

export const getBackdropPath = (path: string, size = "original") => {
  return getImagePath("backdrop", path, size)
}

export const getPosterPath = (path: string, size = "original") => {
  return getImagePath("poster", path, size)
}
