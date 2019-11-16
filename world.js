const _ = require('lodash');
const logger = require('./common/logger');
const config = require('./config');

const canCount = config.canCount;

/**
 * 随机排序函数
 * @param a
 * @param b
 * @returns {number}
 */
function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
}

/**
 * 生产空的二维数组
 * @param row
 * @param col
 * @returns {any[]}
 */
function genEmptyArr(row, col) {
    let rowArr = new Array(row);
    for (let i = 0; i < col; i++) {
        rowArr[i] = new Array(col);
    }

    return rowArr;
}

/**
 * 初始化世界，0=没有罐头，1=罐
 * @param arr
 */
function initWorld(arr) {
    let row = arr.length;
    let col = arr[0].length;

    let randomArr = new Array(row * col).fill(0);
    for (let i = 0; i < canCount; i++) {
        randomArr[i] = 1;
    }

    randomArr.sort(randomSort);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            arr[i][j] = randomArr[i * col + j]
        }
    }
}

module.exports = {
    'genEmptyArr': genEmptyArr,
    'initWorld': initWorld,
};