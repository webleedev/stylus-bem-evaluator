const Evaluator = require('stylus/lib/visitor/evaluator'),
  BEMTree = require('./lib/bem-tree');

class BEMEvaluator extends Evaluator {
  constructor(ast, options) {
    super(...arguments);
    this.__super = Evaluator.prototype;
  }

  evaluate() {
    // pass on imports and all that other stuff to default evaluate function
    let ast = this.__super.evaluate.call(this);

    // replace bem references
    const astBEM = new BEMTree(ast);
    this.root = astBEM.toAST();

    // update and return ast
    return this.__super.evaluate.call(this);
  }
}

module.exports = function (ast, options) {

  return new BEMEvaluator(ast, options);
};