module.exports = {
    "# row": "世界列数",
    "row": 10,
    "# column": "世界行数",
    "column": 10,
    "# canCount": "罐的数量",
    "canCount": 50,
    "# startStrategyNum": "第0代的策略数，也就是有多少个体",
    "startStrategyNum": 200,
    "# conditionNum": "情形数量",
    "conditionNum": 5 * 5 * 5 * 5 * 5,
    "# actions": "可采取的行为有哪些 0=向北移动，1=向南移动，2=向东移动，3=向西移动，4=不动，5=捡罐子，6=随机移动",
    "actions": [0, 1, 2, 3, 4, 5, 6],
    "# taskNum": "每个策略执行的任务数",
    "taskNum": 100,
    "# stepNum": "策略每个任务所执行的行动数",
    "stepNum": 200,
    "# genNum": "一共进化多少代",
    "genNum": 3000,
    "# geneMutationNum": "基因突变数量",
    "geneMutationNum": 3,
    "# topN": "从得分最高的topN的策略进行组合下一代",
    "topN": 8
};