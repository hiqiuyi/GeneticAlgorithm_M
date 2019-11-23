const world = require("../world");
const logger = require("../common/logger");
const config = require("../config");
const row = config.row;
const column = config.row;

let worldArr = world.genEmptyArr(row, column);
world.initWorld(worldArr);
logger.info(worldArr);