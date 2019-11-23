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
const actionNameArr = config.actionNameArr;

// 当前位置
let curPosition = [0, 0];
// 当前得分
let curScore = 0;

// 记录那些地方已经走过
let worldArrMemory = new Array(row);

/**
 * 初始化记忆数组 0=未走过 1=走过
 */
function initWorldArrMemory() {
    for (let i = 0; i < row; i++) {
        worldArrMemory[i] = new Array(column).fill(0);
    }

    worldArrMemory[0][0] = 1
}


/**
 * 向北移动
 * @param worldArr
 */
function moveToNorth(worldArr) {
    if (curPosition[0] - 1 < 0) {
        curScore -= 5;
    } else {
        curPosition[0] -= 1;
    }
}

/**
 * 向南移动
 * @param worldArr
 */
function moveToSouth(worldArr) {
    if (curPosition[0] + 1 > row - 1) {
        curScore -= 5;
    } else {
        curPosition[0] += 1;
    }
}

/**
 * 向东移动
 * @param worldArr
 */
function moveToEast(worldArr) {
    if (curPosition[1] + 1 > column - 1) {
        curScore -= 5;
    } else {
        curPosition[1] += 1;
    }
}

/**
 * 向西移动
 * @param worldArr
 */
function moveToWest(worldArr) {
    if (curPosition[1] - 1 < 0) {
        curScore -= 5;
    } else {
        curPosition[1] -= 1;
    }
}

/**
 * 捡罐子
 * @param worldArr
 */
function pickCan(worldArr) {
    let x = curPosition[0];
    let y = curPosition[1];

    if (worldArr[x][y] === 1) {
        curScore += 10;
        worldArr[x][y] = 0;
    } else {
        curScore -= 1;
    }
}

/**
 *
 * @param worldArr 世界
 * @param actNum  0=向北移动，1=向南移动，2=向东移动，3=向西移动，4=捡罐子
 */
function doAction(worldArr, actNum) {
    // logger.info("============");
    // logger.info("worldArr_1:", worldArr);
    // logger.info(actionNameArr[actNum]);

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
            pickCan(worldArr);
            break;
        default:
            break;
    }

    let x = curPosition[0];
    let y = curPosition[1];
    worldArrMemory[x][y] = 1;

    // logger.info("worldArr_2:", worldArr);
    // logger.info("worldArrMemory=", worldArrMemory);

    // logger.info(curScore);
    // logger.info("=============");
}

/**
 * 获取行动值
 * @param worldArr 世界数据
 * @param conditionArr 情形数组
 * @param strategyArr 策略
 * @returns {*}
 */
function getActionValue(worldArr, conditionArr, strategyArr) {
    // 0=墙，1=空且走过，2=空且未走过 3=罐且走过 4=罐且未走过
    const x = curPosition[0];
    const y = curPosition[1];
    let north;
    let south;
    let east;
    let west;
    let mid;

    if (x - 1 < 0) {
        north = 0;
    } else {
        if (worldArr[x - 1][y] === 0) {
            north = worldArrMemory[x - 1][y] === 1 ? 1 : 2
        } else {
            north = worldArrMemory[x - 1][y] === 1 ? 3 : 4
        }
    }

    if (x + 1 > row - 1) {
        south = 0;
    } else {
        if (worldArr[x + 1][y] === 0) {
            south = worldArrMemory[x + 1][y] === 1 ? 1 : 2
        } else {
            south = worldArrMemory[x + 1][y] === 1 ? 3 : 4
        }
    }

    if (y + 1 > column - 1) {
        east = 0;
    } else {
        if (worldArr[x][y + 1] === 0) {
            east = worldArrMemory[x][y + 1] === 1 ? 1 : 2
        } else {
            east = worldArrMemory[x][y + 1] === 1 ? 3 : 4
        }
    }

    if (y - 1 < 0) {
        west = 0
    } else {
        if (worldArr[x][y - 1] === 0) {
            west = worldArrMemory[x][y - 1] === 1 ? 1 : 2
        } else {
            west = worldArrMemory[x][y - 1] === 1 ? 3 : 4
        }
    }

    if (worldArr[x][y] === 0) {
        mid = worldArrMemory[x][y] === 1 ? 1 : 2
    } else {
        mid = worldArrMemory[x][y] === 1 ? 3 : 4
    }

    let conditionStr = '' + north + south + east + west + mid;
    let conditionIndex = conditionArr.indexOf(conditionStr);

    // printCondition(conditionStr);
    return strategyArr[conditionIndex];
}

/**
 * 打印当前环境
 * @param conditionStr
 */
function printCondition(conditionStr) {
    // 0=墙，1=空且走过，2=空且未走过 3=罐且走过 4=罐且未走过
    logger.info(conditionStr);
    conditionStr = conditionStr.replace(/0/g, '墙,');
    conditionStr = conditionStr.replace(/1/g, '空且走过,');
    conditionStr = conditionStr.replace(/2/g, '空且未走过,');
    conditionStr = conditionStr.replace(/3/g, '罐且走过,');
    conditionStr = conditionStr.replace(/4/g, '罐且未走过,');

    logger.info(conditionStr);
}

/**
 * 获取最后得分
 * @param worldArr 世界数组
 * @param conditionArr 情形数组
 * @param strategyArr 策略数组
 * @returns {number}
 */
function getScore(worldArr, conditionArr, strategyArr) {
    curPosition = [0, 0];
    curScore = 0;
    initWorldArrMemory();

    for (let i = 0; i < stepNum; i++) {
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
function getActions(worldArr, conditionArr, strategyArr) {
    curPosition = [0, 0];
    curScore = 0;

    let actionArr = new Array(stepNum);
    for (let i = 0; i < stepNum; i++) {
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