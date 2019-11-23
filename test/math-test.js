const math = require("../common/math");
const logger = require("../common/logger");

let tmpArr = [1, 2, 3, 3, 4, 5, 4, 1, 1, 3, 1];
const n = math.getArrValueCount(tmpArr, 5);
logger.info(n);
