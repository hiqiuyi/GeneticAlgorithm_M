const condition = require("../condition");
const logger = require("../common/logger");
const config = require("../config");

let conditionArr =  condition.genCondition();
logger.info(conditionArr);

let strategyArr = condition.genStrategy(config.startStrategyNum, config.conditionNum);
logger.info(strategyArr);