 const trav = (currNode) => {
      if (currNode === null) {
        return;
      }
      const temp = currNode.lNode;
      currNode.lNode = currNode.rNode;
      currNode.rNode = temp;
      trav(currNode.lNode);
      trav(currNode.rNode);
    };
    trav(root);
    return root;