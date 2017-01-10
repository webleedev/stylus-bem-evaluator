class BEMTree {
    constructor(ast) {
        this.ast = ast;
        this.read(this.ast);
    }

    read(currentNode) {
        let nodes = this.getChildren(currentNode);
        if (nodes) {
            nodes.forEach((node) => {
                const nodeMeta = node.toJSON();

                node.parent = currentNode;
                // use parent bem selector
                node.bem = node.parent.bem;
                switch (nodeMeta.__type) {

                    case 'Selector':
                        if (node.segments[0].val == '.') {
                            // set new bem selector if available
                            node.bem = node.segments.slice(0, 2);
                        }

                        if (node.bem) {

                            // replace special case segment with bem segments
                            node.segments = node.segments.reduce((collection, segment, index) => {
                                if (collection[collection.length - 1] && collection[collection.length - 1].val == '/' && /^(--?|__?)/.test(segment.val)) {
                                    collection.pop(); // remove previous '/' char
                                    collection = collection.concat(node.bem)
                                }
                                collection.push(segment);
                                return collection;
                            }, []);
                        }
                        break;
                    default:
                        break;
                }

                this.read(node);
            });
        }
    }

    getChildren(node) {
        if (node.nodes instanceof Array) {
            return node.nodes;
        } else if (node instanceof Array) {
            return node
        } else if (node.block && node.block.nodes instanceof Array) {
            return node.block.nodes;
        } else {
            return null;
        }
    }

    toAST() {
        return this.ast;
    }
}
module.exports = BEMTree;
