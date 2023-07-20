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

  getBackdropURL(path: string, size: string = "original"): string {
    return `${this.config.baseSecureURL}${size}${path}`
  }

  getLogoURL(path: string, size: string = "original"): string {
    return `${this.config.baseSecureURL}${size}${path}`
  }

  getPosterURL(path: string, size: string = "original"): string {
    return `${this.config.baseSecureURL}${size}${path}`
  }
}
