const condition = require('../condition');
const logger = require('../common/logger');

strategyArr = condition.genRandomArr(5*5*5*5*5);
logger.info(strategyArr.join(','));

condition.geneMutation(strategyArr, 100);
logger.info(strategyArr.join(','));