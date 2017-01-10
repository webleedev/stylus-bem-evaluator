const fs = require('fs'),
    path = require('path'),
    assert = require('assert'),

    stylus = require('stylus'),

    stylusSrcPath = path.join(__dirname, 'data/main.styl'),
    stylusSrc = fs.readFileSync(stylusSrcPath, 'utf8');

describe("RequireCSSEvaluator", function(){
    const bemEvaluatorPlugin = require('../');
    it("has no bearing unless used", function(done){
        stylus(stylusSrc)
            .set('filename', stylusSrcPath)
            .render(function(err, str){
                if (err) throw err;
                assert.equal(/\.block__child/.test(str), false, "child selector should not have been interpolated");
                done();
            })
    });

    it("imports interpolates css files using require", function(done){
        stylus(stylusSrc)
            .set('filename', stylusSrcPath)
            .use(bemEvaluatorPlugin)
            .render(function(err, str){
                if (err) throw err;
                assert.equal(/\.block__child/.test(str), true, "child selector should have been extended");
                done();
            })
    })
});

describe("BEM Evaluator", function(){
    it
});