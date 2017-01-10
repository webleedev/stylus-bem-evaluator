const BEMEvaluator = require('./evaluator');

module.exports = function (ast, options) {
    if (this.options && this.options.Evaluator) this.options.Evaluator = BEMEvaluator;
    return new BEMEvaluator(ast, options);
};