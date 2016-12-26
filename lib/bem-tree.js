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
        if (nodeMeta.__type == 'Selector') {

          if (node.segments[0].val == '.') {
            // set new bem selector if available
            node.bem = node.segments;
          }

          node.segments.forEach((segment, index) => {

            if (segment.val == '/' && node.segments[index + 1] && /^(--?|__?)/.test(node.segments[index + 1])) {
              // handle special case
              const matchIndex = index;

              if (node.parent.bem) {

                // replace special case segment with bem segments
                node.segments = node.segments.reduce((collection, nodeSegment, segmentIndex) => {
                  if (matchIndex === segmentIndex) {
                    collection = collection.concat(node.parent.bem)
                  } else {
                    collection.push(nodeSegment)
                  }
                  return collection;
                }, []);
              }
            }
          })
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
