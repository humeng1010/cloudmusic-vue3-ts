import req from './req'

export const getSearchDefault = () => req.get("/search/default")

export const getSearchSuggest = (keyword: string) => req.get(`/search/suggest?keywords=${keyword}&type=mobile`)

/**
 * 
 * @param type 资源类型,对应以下类型,默认为 0 即 PC. 1:android 2:iphone 3:ipad
 * @returns 
 */
export const getBanner = (type: number = 0) => req.get(`/banner?type=${type}`)