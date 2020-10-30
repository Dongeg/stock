import { request } from '../assets/js/utils'
export const getStockList = (data:Array<string>) => {
    const params = data.join(',')
    return request({
        url: '/api/list=' + params,
    })
}
