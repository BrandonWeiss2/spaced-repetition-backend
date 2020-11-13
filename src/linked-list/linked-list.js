class _Node {
  constructor(value, next) {
      this.value = value;
      this.next = next;
  }
}

class LinkedList {
  constructor() {
      this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
        this.insertFirst(item);
    }
    else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
    }
  }
  insertAt(item, location, length) {
    if (location >= length-1) {
      let tempNode = this.head;
      while (tempNode.next !== null) {
          tempNode = tempNode.next;
      }
      item.next = null
      tempNode.value.next = item.id
      tempNode.next = new _Node(item, null);
      this.remove(this.head.value)
      return [item, tempNode.value]
    }
    else {
      let count = 0
      let tempNode = this.head;
      while (count !== location) {
          tempNode = tempNode.next;
          count++
      }
      item.next = tempNode.value.next
      tempNode.value.next = item.id
      tempNode.next = new _Node(item, tempNode.next);
      this.remove(this.head.value)
      return [item, tempNode.value]
    }
  }  
  length() {
    let count = 0
    let tempNode = this.head;
    while (tempNode.next !== null) {
        tempNode = tempNode.next;
        count++
    }
    count++
    return count
  }
  find(id) { 
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
        return null;
    }
    // Check for the word id
    while (currNode.value.id !== id) {
        /* Return null if it's the end of the list 
           and the item is not on the list */
        if (currNode.next === null) {
            return null;
        }
        else {
            // Otherwise, keep looking 
            currNode = currNode.next;
        }
    }
    // Found it
    return currNode;
  }
  remove(item){ 
    // If the list is empty
    if (!this.head) {
        return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
        this.head = this.head.next;
        return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
        // Save the previous node 
        previousNode = currNode;
        currNode = currNode.next;
    }
    if (currNode === null) {
        console.log('Item not found');
        return;
    }
    previousNode.next = currNode.next;
  }
}

module.exports = LinkedList