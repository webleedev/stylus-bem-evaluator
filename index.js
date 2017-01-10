const BEMEvaluator = require('./evaluator');

module.exports = function (ast, options) {
    if (this.options && this.options.Evaluator) {
        if (this.options && this.options.Evaluator) {
            Object.getOwnPropertyNames(BEMEvaluator.prototype).forEach(name => {
                if (name !== 'constructor') {
                    this.options.Evaluator.prototype[name] = BEMEvaluator.prototype[name];
                }
            });
        }
    }
    return new BEMEvaluator(ast, options);
};