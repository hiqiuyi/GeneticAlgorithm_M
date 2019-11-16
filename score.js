const config = require('./config');
const math = require('./common/math');
const logger = require('./common/logger');

const row = config.row;
const column = config.column;
const startStrategyNum = config.startStrategyNum;
const conditionNum = config.conditionNum;
const actions = config.actions;
const taskNum = config.taskNum;
const stepNum = config.stepNum;

// 当前位置
let curPosition = [0, 0];
// 当前得分
let curScore = 0;

/**
 * 向北移动
 * @param worldArr
 */
function moveToNorth(worldArr) {
    if(curPosition[1] - 1 < 0){
        curScore -= 5;
    }else{
        curPosition[1] -= 1;
    }
}

/**
 * 向南移动
 * @param worldArr
 */
function moveToSouth(worldArr) {
    if(curPosition[1] + 1 > row - 1){
        curScore -= 5;
    }else{
        curPosition[1] += 1;
    }
}

/**
 * 向东移动
 * @param worldArr
 */
function moveToEast(worldArr) {
    if(curPosition[0] + 1 > column - 1){
        curScore -= 5;
    }else{
        curPosition[0] += 1;
    }
}

/**
 * 向西移动
 * @param worldArr
 */
function moveToWest(worldArr) {
    if(curPosition[0] - 1 < 0){
        curScore -= 5;
    }else{
        curPosition[0] -= 1;
    }
}

/**
 * 捡罐子
 * @param worldArr
 */
function pickCan(worldArr) {
    let x = curPosition[0];
    let y = curPosition[1];

    if(worldArr[x][y] === 1){
        curScore += 10;
        worldArr[x][y] = 0;
    }else{
        curScore -= 1;
    }
}

/**
 *
 * @param worldArr 世界
 * @param actNum  0=向北移动，1=向南移动，2=向东移动，3=向西移动，4=不动，5=捡罐子，6=随机移动
 */
function doAction(worldArr, actNum) {
    switch (actNum) {
        case 0:
            moveToNorth(worldArr);
            break;
        case 1:
            moveToSouth(worldArr);
            break;
        case 2:
            moveToEast(worldArr);
            break;
        case 3:
            moveToWest(worldArr);
            break;
        case 4:
            break;
        case 5:
            pickCan(worldArr);
            break;
        case 6:
            doAction(worldArr, math.randomSelect([0, 1, 2, 3]));
            break;
        default:
            break;
    }

}

/**
 * 获取行动值
 * @param worldArr 世界数据
 * @param conditionArr 情形数组
 * @param strategyArr 策略
 * @returns {*}
 */
function getActionValue(worldArr, conditionArr, strategyArr) {
    // 0=墙，1=空，2=灌
    const x = curPosition[0];
    const y = curPosition[1];
    let north;
    let south;
    let east;
    let west;
    let mid;

    if(y - 1 < 0){
        north = 0;
    }else{
        north = worldArr[x][y-1] + 1;
    }

    if(y + 1 > row - 1){
        south = 0;
    }else{
        south = worldArr[x][y+1] + 1;
    }

    if(x + 1 > column - 1){
        east = 0;
    }else{
        east = worldArr[x+1][y] + 1;
    }

    if(x - 1 < 0 ){
        west = 0
    }else{
        west = worldArr[x-1][y] + 1;
    }

    mid = worldArr[x][y] + 1;

    let conditionStr = ''+north+south+east+west+mid;
    let conditionIndex = conditionArr.indexOf(conditionStr);

    return strategyArr[conditionIndex];
}

/**
 * 获取最后得分
 * @param worldArr 世界数组
 * @param conditionArr 情形数组
 * @param strategyArr 策略数组
 * @returns {number}
 */
function getScore(worldArr, conditionArr, strategyArr){
    curPosition = [0, 0];
    curScore = 0;

    for(let i = 0; i< stepNum; i++){
        let actionValue = getActionValue(worldArr, conditionArr, strategyArr);
        doAction(worldArr, actionValue);
    }

    return curScore;
}

/**
 * 获取策略的所有行动
 * @param worldArr 世界数组
 * @param conditionArr 情形数组
 * @param strategyArr 策略数组
 * @returns {any[]}
 */
function getActions(worldArr, conditionArr, strategyArr){
    curPosition = [0, 0];
    curScore = 0;

    let actionArr = new Array(stepNum);
    for(let i = 0; i< stepNum; i++){
        let actionValue = getActionValue(worldArr, conditionArr, strategyArr);
        doAction(worldArr, actionValue);
        actionArr[i] = actionValue;

    }

    return actionArr;
}

module.exports = {
    'getScore': getScore,
    'getActions': getActions
};