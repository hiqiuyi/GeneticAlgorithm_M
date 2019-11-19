const logger = require('./common/logger');
const math = require('./common/math');
const config = require('./config');
const _ = require('lodash');

const startStrategyNum = config.startStrategyNum;
const geneMutationNum = config.geneMutationNum;
const topN = config.topN;


// 0=向北移动，1=向南移动，2=向东移动，3=向西移动，4=不动，5=捡罐子，6=随机移动
const actions = config.actions;

/**
 * 生成情形数组，共3*3*3*3*3中情形。因为机器人的东西南北中给有5中情况（墙、空且走过、空且未走过、罐且走过、罐且未走过）。
 */
function genCondition() {
    // 0=墙，1=空且走过，2=空且未走过 3=罐且走过 4=罐且未走过
    let conditionArr = new Array(5 * 5 * 5 * 5 * 5);

    let n = 0;
    // i=北，j=南，k=东，l=西，m=中
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                for (let l = 0; l < 5; l++) {
                    for (let m = 0; m < 5; m++) {
                        conditionArr[n] = ''+i+j+k+l+m;
                        n++;
                    }
                }
            }
        }
    }

    return conditionArr;
}

/**
 * 随机生成一种策略
 * @param num 表示情形数量
 */
function genRandomArr(num) {
    let randomArr = new Array(num);
    for(let i=0; i<num; i++){
        randomArr[i] = math.randomSelect(actions)
    }

    return randomArr;
}

/**
 * 随机生成n种策略
 * @param n 表示n种策略
 * @param num 表示情形数量
 */
function genStrategy(n, num) {
    let strategyArr = new Array(n);
    for (let i = 0; i < n; i++) {
        strategyArr[i] = genRandomArr(num);
    }

    return strategyArr;
}

/**
 * 获取前n个得分高的策略
 * @param scoreMap
 * @param n
 */
function getTopNStrategy(scoreMap, n) {
    let topN = new Array(n);
    let scoreMapCopy = _.cloneDeep(scoreMap);

    for(let i=0; i<n; i++){
        let key = math.getKeyOfMaxValue(scoreMapCopy);
        topN[i] = key;
        delete scoreMapCopy[key]
    }

    return topN;
}

/**
 * 基因突变
 * @param strategy
 * @param n 突变的基因数
 */
function geneMutation(strategy, n) {
    for(let i=0; i<n; i++){
        let index = _.random(0, strategy.length - 1);
        strategy[index] = math.randomSelect(actions)
    }
}



/**
 * 产生下一代
 * @param strategyArrAll 上一代的策略
 * @param scoreMap 上一代每种策略的平均得分
 */
function genNextGeneration(strategyArrAll, scoreMap){
    let nextGenStrategyArr = new Array(startStrategyNum);
    const topNArr = getTopNStrategy(scoreMap, topN);
    for(let i=0; i<startStrategyNum/2; i++){
        let dadAndMomIndex = math.randomSelectTwo(topNArr);
        let dad = strategyArrAll[dadAndMomIndex[0]];
        let mom = strategyArrAll[dadAndMomIndex[1]];

        const splitIndex = _.random(0, dad.length - 1);

        let newStrategy1 = dad.slice(0, splitIndex).concat(mom.slice(splitIndex));
        geneMutation(newStrategy1, geneMutationNum);
        nextGenStrategyArr[2 * i] = newStrategy1;

        let newStrategy2 = mom.slice(0, splitIndex).concat(dad.slice(splitIndex));
        geneMutation(newStrategy2, geneMutationNum);
        nextGenStrategyArr[2 * i + 1] = newStrategy2;
    }

    return nextGenStrategyArr;
}


module.exports = {
    'genRandomArr': genRandomArr,
    'genCondition': genCondition,
    'genStrategy': genStrategy,
    'geneMutation': geneMutation,
    'genNextGeneration': genNextGeneration
};



