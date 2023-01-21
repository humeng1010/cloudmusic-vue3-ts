import req from './req'

/**
 * 获取默认搜索
 * @returns 
 */
export const getSearchDefault = () => req.get("/search/default")

/**
 * 获取搜索建议
 * @param keyword 搜索关键字
 * @returns 
 */
export const getSearchSuggest = (keyword: string) => req.get(`/search/suggest?keywords=${keyword}&type=mobile`)

/**
 * 
 * @param type 资源类型,对应以下类型,默认为 0 即 PC. 1:android 2:iphone 3:ipad
 * @returns 
 */
export const getBanner = (type: number = 0) => req.get(`/banner?type=${type}`)

/**
 * 获取首页推荐nav
 * @returns 
 */
export const getDragonBall = () => req.get('/homepage/dragon/ball')

/**
 * 发送验证码
 * @param phone 手机号
 * @returns 
 */
export const captcha_sent = (phone: string) => req.get(`/captcha/sent`, { params: { phone } })

/**
 * 验证验证码
 * @param phone 手机号
 * @param captcha 验证码
 * @returns 
 */
export const captcha_verify = (phone: string, captcha: string) => req({ url: "/captcha/verify", params: { phone, captcha } })

/**
 * 调用此接口,可获取登录状态
 * @returns 
 */
export const getLoginStatus = () => req.get('/login/status')

/**
 * 登录后调用此接口 ,可获取用户账号信息
 * @returns 
 */
export const getUserAccountInfo = () => req.get('/user/account')

/**
 * 退出当前账号
 * @returns 
 */
export const logout = () => req.get('/logout')

/**
 * 获取私人fm 需要登陆
 * @returns 
 */
export const get_personal_fm = () => req.get("/personal_fm")