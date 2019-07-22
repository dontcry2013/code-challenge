function LinkedList() {
  function Node(element) {
    this.element = element;
    this.next = null;
  }
  let head = null;
  let length = 0;
  this.append = function (element) {
    if (!head) {
      head = new Node(element);
    } else {
      let cur = head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = new Node(element);
    }
    length += 1;
    return length;
  };
  this.toString = function () {
    const arr = [];
    let cur = head;
    while (cur) {
      arr.push(cur.element);
      cur = cur.next;
    }
    return arr.join(',');
  };
  this.getLength = function () {
    return length;
  };
  this.find = function (item) {
    let cur = head;
    while (cur && cur.element !== item) {
      cur = cur.next;
    }
    return cur;
  };
  this.findPrev = function (item) {
    let cur = head;
    if (cur && cur.element === item) {
      return null;
    }
    while (cur && cur.next && cur.next.element !== item) {
      if (!cur.next.next) {
        return null;
      }
      cur = cur.next;
    }
    return cur;
  };
  this.insert = function (item, element) {
    const newNode = new Node(element);
    const node = this.find(item);
    if (!node) {
      return false;
    }
    newNode.next = node.next;
    node.next = newNode;
    length += 1;
    return true;
  };
  this.insertAt = function (position, element) {
    if (position > -1 && position <= length) {
      const node = new Node(element);
      let current = head;
      let index = 0;
      let previous;
      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        while (index < position) {
          index += 1;
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      length += 1;
      return true;
    }
    return false;
  };
  this.remove = function (item) {
    const prevNode = this.findPrev(item);
    const currNode = this.find(item);
    if (prevNode && prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
      currNode.next = null;
      length -= 1;
      return item;
    }
    if (!prevNode && currNode) {
      head = currNode.next;
      length -= 1;
      return item;
    }
    return null;
  };
  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head;
      let index = 0;
      let previous;
      if (position === 0) {
        head = current.next;
      } else {
        while (index < position) {
          index += 1;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length -= 1;
      return current.element;
    }
    return null;
  };
}
module.exports = LinkedList;
