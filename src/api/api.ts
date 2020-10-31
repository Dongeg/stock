import {request, STOCK_TYPE} from '../assets/js/utils'
export async function getStockList (data:Array<string>) {
    const params = data.join(',')
    const resp = await request({
        url: '/stockMsg/list=' + params,
    })
    const splitData = resp.data.split(';\n');
    return splitData
}




export async function getStockSuggestList(searchText = '', type = '2'){
    if (!searchText) {
        alert('请输入关键词查询，如：0000001 或 上证指数')
    }
    const url = `/stockList/suggest/type=${type}&key=${encodeURIComponent(searchText)}`;
    try {
        const response = await request({url:url});
        const text = response.slice(18, -1);
        const tempArr = text.split(';');
        let result:any =  [];
        tempArr.forEach((item: string) => {
            const arr = item.split(',');
            let code = arr[0];
            if (code.substr(0, 2) === 'of') {
                // 修改lof以及etf的前缀，防止被过滤
                // http://www.csisc.cn/zbscbzw/cpbmjj/201212/f3263ab61f7c4dba8461ebbd9d0c6755.shtml
                // 在上海证券交易所挂牌的证券投资基金使用50～59开头6位数字编码，在深圳证券交易所挂牌的证券投资基金使用15～19开头6位数字编码。
                code = code.replace(/^(of)(5[0-9])/g, 'sh$2').replace(/^(of)(1[5-9])/g, 'sz$2');
            }
            if (code === 'hkhsi' || code === 'hkhscei') {
                code = code.toUpperCase().replace('HK', 'hk');
            }
            // 过滤多余的 us. 开头的股干扰
            if (STOCK_TYPE.includes(code.substr(0, 2)) && !code.startsWith('us.')) {
                result.push({
                    label: `${code} | ${arr[4]}`,
                    description: arr[7] && arr[7].replace(/"/g, ''),
                });
            }
        });
        return result;
    } catch (err) {
        alert('查询失败，请重试')
    }
}
