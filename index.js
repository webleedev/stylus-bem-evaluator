const Evaluator = require('stylus/lib/visitor/evaluator'),

    BEMTree = require('./lib/bem-tree');

class BEMEvaluator extends Evaluator {

    evaluate() {
        // pass on imports and all that other stuff to default evaluate function
        let ast = Evaluator.prototype.evaluate.call(this);

        // replace bem references
        const astBEM = new BEMTree(ast);

        // update ast
        this.root = astBEM.toAST();
        return this.visit(this.root);
    }
}

module.exports = function (ast, options) {
    if (this.options && this.options.Evaluator) this.options.Evaluator = BEMEvaluator;
    return new BEMEvaluator(ast, options);
};