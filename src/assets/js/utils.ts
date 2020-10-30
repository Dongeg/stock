import {customRef} from 'vue'
import axios from 'axios'
interface requestParams {
    url:string,
    method?:string,
    data?:object,
}

export function request(params:requestParams) {
    return new Promise ((resolve,reject)=>{
        // @ts-ignore
        axios({
            method: params.method ? params.method :'get',
            url: params.url,
            data: params.data
        }).then((res:object)=>{
            resolve(res)
        })
    })
}
