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
export const calcFixedPirceNumber = (
    open: string,
    yestclose: string,
    price: string,
    high: string,
    low: string
): number => {
    let reg = /0+$/g;
    open = open.replace(reg, '');
    yestclose = yestclose.replace(reg, '');
    price = price.replace(reg, '');
    high = high.replace(reg, '');
    low = low.replace(reg, '');
    let o = open.indexOf('.') === -1 ? 0 : open.length - open.indexOf('.') - 1;
    let yc = yestclose.indexOf('.') === -1 ? 0 : yestclose.length - yestclose.indexOf('.') - 1;
    let p = price.indexOf('.') === -1 ? 0 : price.length - price.indexOf('.') - 1;
    let h = high.indexOf('.') === -1 ? 0 : high.length - high.indexOf('.') - 1;
    let l = low.indexOf('.') === -1 ? 0 : low.length - low.indexOf('.') - 1;
    let max = Math.max(o, yc, p, h, l);
    if (max > 3) {
        max = 2; // 接口返回的指数数值的小数位为4，但习惯两位小数
    }
    return max;
};
export const formatNumber = (val: number = 0, fixed: number = 2, format = true): string => {
    const num = +val;
    if (format) {
        if (num > 1000 * 10000) {
            return (num / (10000 * 10000)).toFixed(fixed) + '亿';
        } else if (num > 1000) {
            return (num / 10000).toFixed(fixed) + '万';
        }
    }
    return `${num.toFixed(fixed)}`;
};
