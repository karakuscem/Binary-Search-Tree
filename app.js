const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightLeaf !== null) {
      prettyPrint(node.rightLeaf, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftLeaf !== null) {
      prettyPrint(node.leftLeaf, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.leftLeaf = null;
        this.rightLeaf = null;
    }
}

class Tree {
    constructor(array) {
      this.array = [...removeAndSort(array)];
      this.root = this.buildTree(this.array, 0, this.array.length - 1);
      prettyPrint(this.root)
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let root = new Node(array[mid]);

        root.leftLeaf = this.buildTree(array, start, mid -1);
        root.rightLeaf = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, root = this.root) {
        if (root == null) {
            return (root = new Node(value));
        }

        if (root.data < value) {
            root.rightLeaf = this.insert(value, root.rightLeaf);
        } else {
            root.leftLeaf = this.insert(value, root.leftLeaf);
        }

        return root;
    }
}

function removeAndSort(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    return sorted;
}

let balanced = new Tree([1, 5, 3, 2, 6, 6, 10, 12, 15]);

