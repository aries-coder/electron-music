import { arRequest } from "@/service"

export const fetchSearchSongList = (searchValue: string) => {
  return arRequest.get({
    url: 'search',
    params: {
      keywords: searchValue
    }
  })
}

export const fetchSongDetailByIds = (ids: number | string) => {
  return arRequest.get({
    url: 'song/detail',
    params: {
      ids
    }
  })
}

export const verifySongIsUseByIdRequest = (id: number) => {
  return arRequest.get({
    url: 'check/music',
    params: {
      id
    }
  })
}