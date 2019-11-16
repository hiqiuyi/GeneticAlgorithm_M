const logger = require('../common/logger');
const _ = require('lodash');

/**
 * 数组随机选择一个数
 * @param arr
 * @returns {*}
 */
function randomSelect(arr) {
    let index = Math.floor((Math.random() * arr.length));
    return arr[index];
}

/**
 * 数组随机选择两个不相等的数
 * @param arr
 * @returns {[*, *]}
 */
function randomSelectTwo(arr) {
    let index1 = Math.floor((Math.random() * arr.length));
    let index2 = Math.floor((Math.random() * arr.length));

    while(index1 === index2){
        index1 = Math.floor((Math.random() * arr.length));
        index2 = Math.floor((Math.random() * arr.length));
    }

    return [arr[index1], arr[index2]];
}

/**
 * 数组随机选择N个不相等的数
 * @param arr
 * @param n
 * @returns {any[]|*}
 */
function randomSelectN(arr, n) {
    if(arr.length <= n){
        return arr;
    }

    let selectedArr = new Array(n);

    while(_.uniq(selectedArr).length < selectedArr.length){
        for(let i=0; i<n; i++){
            let index = Math.floor((Math.random() * arr.length));
            selectedArr[i] = arr[index];
        }
    }

    return selectedArr;
}

/**
 * 获取map最大value对应的key
 * @param obj
 * @returns {string}
 */
function getKeyOfMaxValue(obj) {
    return  Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

/**
 * 获取map最大value
 * @param obj
 * @returns {*}
 */
function getMaxValue(obj) {
    return  _.max(Object.values(obj))
}

/**
 * 获取map的value和
 * @param obj
 * @returns
 */
function getMapValueSum(obj){
    return  Object.values(obj).reduce((a, b) =>a+b);
}

module.exports = {
    'randomSelect': randomSelect,
    'getKeyOfMaxValue': getKeyOfMaxValue,
    'randomSelectTwo': randomSelectTwo,
    'randomSelectN': randomSelectN,
    'getMapValueSum': getMapValueSum,
    'getMaxValue': getMaxValue
};


