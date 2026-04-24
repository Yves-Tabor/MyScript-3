






// In this kata, you will create a simple, immutable, singly-linked list.
// Most list implementations use mutable nodes. Mutability brings with it a whole host of problems (especially in threaded environments, 
// but even just with state saved and shared in multiple places). When you shift to immutable nodes, 
// you gain a new ability to reason about things. If you have a list, it will never contain different things than it does at the moment.
// However, when dealing with immutable nodes, one has to take special steps to try to maintain efficiency. 
// For example, to add a node to the beginning of a list, you don't want to have to duplicate the whole list. 
//   You want to be able to share as many nodes of the list as possible between the original list and the newly generated list (while still being a singly-linked list).
// There are two classes involved here: EmptyList and ListNode. Each of these should support the following operations: 
// toString(), isEmpty(), length(), push(), remove(), and append(). If isEmpty() returns false, then the following two methods should also be supported: head() and tail().

// const list0 = new EmptyList();        // => "()"
// const list1 = list0.push(3);          // => "(3)"
// const list2 = list1.push(2);          // => "(2 3)"
// const list3 = list2.push(1);          // => "(1 2 3)"
// const list13 = list1.append(list3);   // => "(3 1 2 3)"

// list13.head()    // => 3
// list13.tail()    // => list3

// list1 instanceof ListNode
// list1.tail() instanceof EmptyList

interface List<T> {
  toString(): string;
  isEmpty(): boolean;
  length(): number;
  push(x: T): List<T>;
  remove(x: T): List<T>;
  append(list: List<T>): List<T>;
}

class EmptyList<T> implements List<T> {
  toString(): string {
    return "()";
  }

  isEmpty(): boolean {
    return true;
  }

  length(): number {
    return 0;
  }

  push(x: T): List<T> {
    return new ListNode(x, this);
  }

  remove(_: T): List<T> {
    return this;
  }

  append(list: List<T>): List<T> {
    return list;
  }
}

class ListNode<T> implements List<T> {
  constructor(
    public value: T,
    public next: List<T>
  ) {}

  toString(): string {
    return `(${this._toString().trim()})`;
  }

  private _toString(): string {
    if (this.next.isEmpty()) {
      return `${this.value}`;
    }
    return `${this.value} ${(this.next as ListNode<T>)._toString()}`;
  }

  isEmpty(): boolean {
    return false;
  }

  length(): number {
    return 1 + this.next.length();
  }

  head(): T {
    return this.value;
  }

  tail(): List<T> {
    return this.next;
  }

  push(x: T): List<T> {
    return new ListNode(x, this);
  }

  remove(x: T): List<T> {
    if (this.value === x) {
      return this.next.remove(x);
    }

    const newNext = this.next.remove(x);

    if (newNext === this.next) {
      return this;
    }

    return new ListNode(this.value, newNext);
  }

  append(list: List<T>): List<T> {
    return new ListNode(this.value, this.next.append(list));
  }
}
