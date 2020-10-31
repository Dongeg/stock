import axios from 'axios'
export const STOCK_TYPE = ['sh', 'sz', 'hk', 'gb', 'us'];
const stockMsg_url = 'https://hq.sinajs.cn'
const stockList_url = 'http://suggest3.sinajs.cn'

interface requestParams {
    url:string,
    method?:string,
    data?:object,
}
export async function request(params:requestParams) {
    let url = params.url
    if(process.env.NODE_ENV === 'production'){
        if(url.indexOf('stockMsg')){
            url = stockMsg_url + url
        }
        if(url.indexOf('stockList')){
            url = stockList_url + url
        }
    }
    // @ts-ignore
    let result = await axios({
        method: params.method ? params.method : 'get',
        url: url,
        data: params.data
    }).then((res)=>{
        return res.data
    });
    return result
}

export function getLocalStorage(key:string) {
    let result = localStorage.getItem(key)
    try {
        if(result){
            result = JSON.parse(result)
        }
    }finally {

    }
    return result
}
export function setLocalStorage(key:string,value:any) {
    let _value = value
    if(_value && typeof _value === 'object'){
        _value = JSON.stringify(_value)
    }
    localStorage.setItem(key,_value)
}
