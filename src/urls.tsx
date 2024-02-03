import { API_KEY } from "./constants/constants"
import { baseUrl } from "./constants/constants"

export const originals = `${baseUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`
export const actions = `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`