import { ImageConfiguration } from "@realmdb/schemas"

export interface TmdbImageConfig {
  baseURL: string
  baseSecureURL: string
  backdropSizes: string[]
  logoSizes: string[]
  posterSizes: string[]
  profileSizes: string[]
  stillSizes: string[]
}

export class TmdbImagesService {
  private readonly config: TmdbImageConfig

  constructor(config: ImageConfiguration) {
    this.config = {
      baseURL: config.base_url,
      baseSecureURL: config.secure_base_url,
      backdropSizes: config.backdrop_sizes,
      logoSizes: config.logo_sizes,
      posterSizes: config.poster_sizes,
      profileSizes: config.profile_sizes,
      stillSizes: config.still_sizes,
    }
  }

  getImageUrl(type: string, size: string, name: string): string {
    switch (type) {
      case "backdrop":
        return this.getBackdropUrl(name, size)
      case "logo":
        return this.getLogoUrl(name, size)
      case "poster":
        return this.getPosterUrl(name, size)
      default:
        throw new Error(`Invalid image type: ${type}`)
    }
  }

  getBackdropUrl(path: string, size: string = "original"): string {
    if (!this.config.backdropSizes.includes(size)) {
      throw new Error(`Invalid backdrop size: ${size}`)
    }

    return `${this.config.baseSecureURL}${size}/${path}`
  }

  getLogoUrl(path: string, size: string = "original"): string {
    if (!this.config.logoSizes.includes(size)) {
      throw new Error(`Invalid logo size: ${size}`)
    }
    return `${this.config.baseSecureURL}${size}/${path}`
  }

  getPosterUrl(path: string, size: string = "original"): string {
    if (!this.config.posterSizes.includes(size)) {
      throw new Error(`Invalid poster size: ${size}`)
    }
    return `${this.config.baseSecureURL}${size}/${path}`
  }
}
