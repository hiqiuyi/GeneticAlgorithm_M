const logger = require('./common/logger');
const world = require('./world');
const condition = require('./condition');
const config = require('./config');
const score = require('./score');
const math = require('./common/math');

const row = config.row;
const column = config.column;
const startStrategyNum = config.startStrategyNum;
const conditionNum = config.conditionNum;
const taskNum = config.taskNum;
const genNum = config.genNum;
const conditionArr = condition.genCondition();

function printGAInfo() {
    logger.info('世界行数=', row);
    logger.info('世界列数=', column);
    logger.info('开始策略数（一开始进化的人数）=', startStrategyNum);
    logger.info('情形数=', conditionNum);
    logger.info('每个策略执行的任务数=', taskNum);
}

/**
 * 新建世界，运行策略，获得分数
 * @param strategyArr
 * @returns {number}
 */
function run(strategyArr) {
    let worldArr = world.genEmptyArr(row, column);
    world.initWorld(worldArr);
    return score.getScore(worldArr, conditionArr, strategyArr);
}

/**
 * 每种策略执行taskNum次，求策略的平均得分
 */
function start(strategyArrAll) {
    let scoreMap = {};
    for (let i = 0; i < strategyArrAll.length; i++) {
        let allScore = 0;
        for (let j = 0; j < taskNum; j++) {
            allScore += run(strategyArrAll[i]);
        }

        // logger.info('i=', i, 'perScore=', allScore / taskNum;);
        scoreMap[i] = allScore / taskNum;
    }

    return scoreMap;
}

/**
 * 主程序
 */
function main() {
    logger.info('开始第0代');
    let strategyArrAll = condition.genStrategy(startStrategyNum, conditionNum);
    let scoreMap = start(strategyArrAll);
    logger.info('perScore=', math.getMapValueSum(scoreMap) / startStrategyNum);
    logger.info('maxScore=', math.getMaxValue(scoreMap));
    logger.info('nextGenStrategyArr=', strategyArrAll[math.getKeyOfMaxValue(scoreMap)].join(','));
    logger.info('完成第0代');

    for (let i = 1; i <= genNum; i++) {
        logger.info('开始第' + i + '代');
        let nextGenStrategyArr = condition.genNextGeneration(strategyArrAll, scoreMap);
        strategyArrAll = nextGenStrategyArr;
        scoreMap = start(nextGenStrategyArr);
        logger.info('perScore=', math.getMapValueSum(scoreMap) / startStrategyNum);
        logger.info('maxScore=', math.getMaxValue(scoreMap));
        logger.info('nextGenStrategyArr=', nextGenStrategyArr[math.getKeyOfMaxValue(scoreMap)].join(','));
        logger.info('完成第' + i + '代');
    }
    printGAInfo();
}

module.exports = {
    'main': main,
    'run': run
};

