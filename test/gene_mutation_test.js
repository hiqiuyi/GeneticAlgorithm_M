const condition = require('../condition');
const logger = require('../common/logger');

strategyArr = condition.genRandomArr(243);
logger.info(strategyArr.join(','));

condition.geneMutation(strategyArr, 10);
logger.info(strategyArr.join(','));