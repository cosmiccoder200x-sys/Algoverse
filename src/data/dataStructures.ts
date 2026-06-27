export interface DataStructure {
  id: string;
  name: string;
  category: 'linear' | 'tree' | 'graph' | 'advanced';
  description: string;
  icon: string;
  theory: string;
  operations: Operation[];
  complexities: Complexities;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  commonMistakes: string[];
  interviewQuestions: string[];
  pseudocode: string;
  codeExamples: CodeExamples;
}

export interface Operation {
  name: string;
  description: string;
  timeComplexity: string;
}

export interface Complexities {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface CodeExamples {
  python: string;
  cpp: string;
  java: string;
  javascript: string;
}

export const dataStructures: DataStructure[] = [
  {
    id: 'array',
    name: 'Array',
    category: 'linear',
    description: 'A collection of elements stored at contiguous memory locations, accessible by index.',
    icon: 'Blocks',
    theory: 'An array is a linear data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index, making random access O(1). Arrays form the foundation of many other data structures and are essential for implementing matrices, lookup tables, and buffers.',
    operations: [
      { name: 'Access', description: 'Retrieve element at given index', timeComplexity: 'O(1)' },
      { name: 'Search', description: 'Find element by value', timeComplexity: 'O(n)' },
      { name: 'Insert', description: 'Add element at position', timeComplexity: 'O(n)' },
      { name: 'Delete', description: 'Remove element at position', timeComplexity: 'O(n)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)',
    },
    advantages: [
      'Constant-time random access by index',
      'Cache-friendly contiguous memory layout',
      'Simple implementation with minimal overhead',
      'Efficient for fixed-size collections',
    ],
    disadvantages: [
      'Fixed size in static arrays',
      'Expensive insertion/deletion in middle',
      'Memory waste if allocated larger than needed',
      'Contiguous memory requirement',
    ],
    applications: [
      'Implementing matrices and lookup tables',
      'Image processing and pixel buffers',
      'CPU scheduling (round-robin)',
      'Database record storage',
    ],
    commonMistakes: [
      'Off-by-one errors in indexing',
      'Forgetting to check bounds',
      'Not handling empty arrays',
      'Confusing array length with last index',
    ],
    interviewQuestions: [
      'Find the maximum subarray sum (Kadane\'s algorithm)',
      'Merge two sorted arrays',
      'Find the missing number in a sequence',
      'Rotate an array by k positions',
    ],
    pseudocode: `Array:
  Data: collection of elements
  
  Access(i):
    return data[i]
  
  Search(value):
    for i = 0 to size-1:
      if data[i] == value:
        return i
    return -1
  
  Insert(index, value):
    for i = size-1 down to index:
      data[i+1] = data[i]
    data[index] = value
    size++
  
  Delete(index):
    for i = index to size-2:
      data[i] = data[i+1]
    size--`,
    codeExamples: {
      python: `class Array:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.size = 0
        self.capacity = capacity
    
    def get(self, index):
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of bounds")
    
    def insert(self, index, value):
        if self.size >= self.capacity:
            raise OverflowError("Array is full")
        for i in range(self.size, index, -1):
            self.data[i] = self.data[i-1]
        self.data[index] = value
        self.size += 1
    
    def delete(self, index):
        if not 0 <= index < self.size:
            raise IndexError("Index out of bounds")
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i+1]
        self.size -= 1
    
    def search(self, value):
        for i in range(self.size):
            if self.data[i] == value:
                return i
        return -1`,
      cpp: `template<typename T>
class Array {
    T* data;
    int size;
    int capacity;
public:
    Array(int cap) : size(0), capacity(cap) {
        data = new T[capacity];
    }
    
    T get(int index) {
        if (index < 0 || index >= size)
            throw out_of_range("Index out of bounds");
        return data[index];
    }
    
    void insert(int index, T value) {
        if (size >= capacity) throw overflow_error("Full");
        for (int i = size; i > index; i--)
            data[i] = data[i-1];
        data[index] = value;
        size++;
    }
    
    void deleteAt(int index) {
        if (index < 0 || index >= size)
            throw out_of_range("Index out of bounds");
        for (int i = index; i < size - 1; i++)
            data[i] = data[i+1];
        size--;
    }
    
    int search(T value) {
        for (int i = 0; i < size; i++)
            if (data[i] == value) return i;
        return -1;
    }
};`,
      java: `public class Array<T> {
    private Object[] data;
    private int size;
    private int capacity;
    
    public Array(int capacity) {
        this.capacity = capacity;
        this.data = new Object[capacity];
        this.size = 0;
    }
    
    @SuppressWarnings("unchecked")
    public T get(int index) {
        if (index < 0 || index >= size)
            throw new IndexOutOfBoundsException();
        return (T) data[index];
    }
    
    public void insert(int index, T value) {
        if (size >= capacity) throw new IllegalStateException("Full");
        for (int i = size; i > index; i--)
            data[i] = data[i-1];
        data[index] = value;
        size++;
    }
    
    public void delete(int index) {
        if (index < 0 || index >= size)
            throw new IndexOutOfBoundsException();
        for (int i = index; i < size - 1; i++)
            data[i] = data[i+1];
        size--;
    }
    
    public int search(T value) {
        for (int i = 0; i < size; i++)
            if (data[i].equals(value)) return i;
        return -1;
    }
}`,
      javascript: `class Array {
    constructor(capacity) {
        this.data = new Array(capacity).fill(null);
        this.size = 0;
        this.capacity = capacity;
    }
    
    get(index) {
        if (index < 0 || index >= this.size)
            throw new Error("Index out of bounds");
        return this.data[index];
    }
    
    insert(index, value) {
        if (this.size >= this.capacity)
            throw new Error("Array is full");
        for (let i = this.size; i > index; i--)
            this.data[i] = this.data[i-1];
        this.data[index] = value;
        this.size++;
    }
    
    delete(index) {
        if (index < 0 || index >= this.size)
            throw new Error("Index out of bounds");
        for (let i = index; i < this.size - 1; i++)
            this.data[i] = this.data[i+1];
        this.size--;
    }
    
    search(value) {
        for (let i = 0; i < this.size; i++)
            if (this.data[i] === value) return i;
        return -1;
    }
}`,
    },
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'linear',
    description: 'A linear collection of nodes where each node contains data and a reference to the next node.',
    icon: 'Link',
    theory: 'A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (link) to the next node. Unlike arrays, linked lists do not require contiguous memory allocation, making insertion and deletion efficient at any position.',
    operations: [
      { name: 'Insert at Head', description: 'Add element at beginning', timeComplexity: 'O(1)' },
      { name: 'Insert at Tail', description: 'Add element at end', timeComplexity: 'O(n)' },
      { name: 'Delete', description: 'Remove element by value', timeComplexity: 'O(n)' },
      { name: 'Search', description: 'Find element', timeComplexity: 'O(n)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)',
    },
    advantages: [
      'Dynamic size — grows and shrinks as needed',
      'Efficient insertion and deletion at any position',
      'No memory pre-allocation required',
      'Easy implementation of stacks and queues',
    ],
    disadvantages: [
      'No random access — must traverse from head',
      'Extra memory for pointer storage',
      'Cache-unfriendly (non-contiguous memory)',
      'Reverse traversal requires doubly-linked list',
    ],
    applications: [
      'Implementing stacks, queues, and deques',
      'Dynamic memory allocation',
      'Polynomial representation and arithmetic',
      'Undo functionality in applications',
    ],
    commonMistakes: [
      'Forgetting to update head/tail pointers',
      'Creating cycles accidentally',
      'Not handling empty list edge cases',
      'Accessing null pointer (dereferencing)',
    ],
    interviewQuestions: [
      'Detect a cycle in a linked list (Floyd\'s)',
      'Find the middle element in one pass',
      'Reverse a linked list iteratively',
      'Merge two sorted linked lists',
    ],
    pseudocode: `Node:
  data
  next

LinkedList:
  head
  
  InsertHead(value):
    newNode = Node(value)
    newNode.next = head
    head = newNode
  
  InsertTail(value):
    newNode = Node(value)
    if head == null:
      head = newNode
      return
    current = head
    while current.next != null:
      current = current.next
    current.next = newNode
  
  Delete(value):
    if head.data == value:
      head = head.next
      return
    current = head
    while current.next != null:
      if current.next.data == value:
        current.next = current.next.next
        return
      current = current.next
  
  Search(value):
    current = head
    while current != null:
      if current.data == value:
        return true
      current = current.next
    return false`,
    codeExamples: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def insert_tail(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def delete(self, key):
        if self.head and self.head.data == key:
            self.head = self.head.next
            return
        current = self.head
        while current and current.next:
            if current.next.data == key:
                current.next = current.next.next
                return
            current = current.next
    
    def search(self, key):
        current = self.head
        while current:
            if current.data == key:
                return True
            current = current.next
        return False`,
      cpp: `struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    
    void insertHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    void insertTail(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* cur = head;
        while (cur->next) cur = cur->next;
        cur->next = newNode;
    }
    
    void deleteNode(int key) {
        if (!head) return;
        if (head->data == key) {
            Node* temp = head;
            head = head->next;
            delete temp; return;
        }
        Node* cur = head;
        while (cur->next && cur->next->data != key)
            cur = cur->next;
        if (cur->next) {
            Node* temp = cur->next;
            cur->next = cur->next->next;
            delete temp;
        }
    }
    
    bool search(int key) {
        Node* cur = head;
        while (cur) {
            if (cur->data == key) return true;
            cur = cur->next;
        }
        return false;
    }
};`,
      java: `class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; this.next = null; }
}

public class LinkedList {
    Node head;
    
    public void insertHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    public void insertTail(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node current = head;
        while (current.next != null)
            current = current.next;
        current.next = newNode;
    }
    
    public void delete(int key) {
        if (head == null) return;
        if (head.data == key) { head = head.next; return; }
        Node current = head;
        while (current.next != null && current.next.data != key)
            current = current.next;
        if (current.next != null)
            current.next = current.next.next;
    }
    
    public boolean search(int key) {
        Node current = head;
        while (current != null) {
            if (current.data == key) return true;
            current = current.next;
        }
        return false;
    }
}`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    insertHead(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    insertTail(data) {
        const newNode = new Node(data);
        if (!this.head) { this.head = newNode; return; }
        let current = this.head;
        while (current.next) current = current.next;
        current.next = newNode;
    }
    
    delete(key) {
        if (!this.head) return;
        if (this.head.data === key) { this.head = this.head.next; return; }
        let current = this.head;
        while (current.next && current.next.data !== key)
            current = current.next;
        if (current.next) current.next = current.next.next;
    }
    
    search(key) {
        let current = this.head;
        while (current) {
            if (current.data === key) return true;
            current = current.next;
        }
        return false;
    }
}`,
    },
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'linear',
    description: 'A LIFO (Last In First Out) data structure where elements are added and removed from the same end.',
    icon: 'Layers',
    theory: 'A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The last element added is the first one to be removed. Stacks support two primary operations: push (add to top) and pop (remove from top). They are fundamental for function call management, expression evaluation, and backtracking algorithms.',
    operations: [
      { name: 'Push', description: 'Add element to top', timeComplexity: 'O(1)' },
      { name: 'Pop', description: 'Remove element from top', timeComplexity: 'O(1)' },
      { name: 'Peek/Top', description: 'View top element', timeComplexity: 'O(1)' },
      { name: 'isEmpty', description: 'Check if stack is empty', timeComplexity: 'O(1)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)',
    },
    advantages: [
      'All operations are O(1)',
      'Simple and easy to implement',
      'Automatic memory management for recursive calls',
      'Ideal for undo mechanisms and backtracking',
    ],
    disadvantages: [
      'Limited access — only top element accessible',
      'Fixed size in array implementation',
      'No random access capability',
      'Stack overflow risk in recursive implementations',
    ],
    applications: [
      'Function call stack in programming languages',
      'Expression evaluation and conversion',
      'Undo/Redo operations in editors',
      'Browser history navigation',
      'Backtracking algorithms (DFS, maze solving)',
    ],
    commonMistakes: [
      'Not checking for stack underflow before pop',
      'Stack overflow in deep recursion',
      'Confusing push and pop order',
      'Not handling empty stack in peek operation',
    ],
    interviewQuestions: [
      'Implement a stack using two queues',
      'Design a stack that supports getMin() in O(1)',
      'Evaluate a postfix expression',
      'Check balanced parentheses in an expression',
    ],
    pseudocode: `Stack:
  data[]
  top = -1
  capacity
  
  Push(value):
    if top >= capacity - 1:
      error "Stack Overflow"
    top++
    data[top] = value
  
  Pop():
    if top < 0:
      error "Stack Underflow"
    value = data[top]
    top--
    return value
  
  Peek():
    if top < 0:
      error "Stack is empty"
    return data[top]
  
  isEmpty():
    return top < 0`,
    codeExamples: {
      python: `class Stack:
    def __init__(self, capacity=100):
        self.data = []
        self.capacity = capacity
    
    def push(self, value):
        if len(self.data) >= self.capacity:
            raise OverflowError("Stack overflow")
        self.data.append(value)
    
    def pop(self):
        if not self.data:
            raise IndexError("Stack underflow")
        return self.data.pop()
    
    def peek(self):
        if not self.data:
            raise IndexError("Stack is empty")
        return self.data[-1]
    
    def is_empty(self):
        return len(self.data) == 0
    
    def size(self):
        return len(self.data)`,
      cpp: `template<typename T>
class Stack {
    vector<T> data;
    int capacity;
public:
    Stack(int cap = 100) : capacity(cap) {}
    
    void push(T value) {
        if ((int)data.size() >= capacity)
            throw overflow_error("Stack overflow");
        data.push_back(value);
    }
    
    T pop() {
        if (data.empty())
            throw underflow_error("Stack underflow");
        T val = data.back();
        data.pop_back();
        return val;
    }
    
    T peek() {
        if (data.empty())
            throw underflow_error("Stack is empty");
        return data.back();
    }
    
    bool isEmpty() { return data.empty(); }
};`,
      java: `public class Stack<T> {
    private ArrayList<T> data;
    private int capacity;
    
    public Stack(int capacity) {
        this.capacity = capacity;
        this.data = new ArrayList<>();
    }
    
    public void push(T value) {
        if (data.size() >= capacity)
            throw new IllegalStateException("Stack overflow");
        data.add(value);
    }
    
    public T pop() {
        if (data.isEmpty())
            throw new EmptyStackException();
        return data.remove(data.size() - 1);
    }
    
    public T peek() {
        if (data.isEmpty())
            throw new EmptyStackException();
        return data.get(data.size() - 1);
    }
    
    public boolean isEmpty() { return data.isEmpty(); }
}`,
      javascript: `class Stack {
    constructor(capacity = 100) {
        this.data = [];
        this.capacity = capacity;
    }
    
    push(value) {
        if (this.data.length >= this.capacity)
            throw new Error("Stack overflow");
        this.data.push(value);
    }
    
    pop() {
        if (this.data.length === 0)
            throw new Error("Stack underflow");
        return this.data.pop();
    }
    
    peek() {
        if (this.data.length === 0)
            throw new Error("Stack is empty");
        return this.data[this.data.length - 1];
    }
    
    isEmpty() {
        return this.data.length === 0;
    }
}`,
    },
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'linear',
    description: 'A FIFO (First In First Out) data structure where elements are added at rear and removed from front.',
    icon: 'ArrowRightLeft',
    theory: 'A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are inserted at the rear (enqueue) and removed from the front (dequeue). Queues are essential for breadth-first search, task scheduling, and buffering data streams.',
    operations: [
      { name: 'Enqueue', description: 'Add element to rear', timeComplexity: 'O(1)' },
      { name: 'Dequeue', description: 'Remove element from front', timeComplexity: 'O(1)' },
      { name: 'Front/Peek', description: 'View front element', timeComplexity: 'O(1)' },
      { name: 'isEmpty', description: 'Check if queue is empty', timeComplexity: 'O(1)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)',
    },
    advantages: [
      'All operations are O(1) with linked list',
      'Maintains order of arrival',
      'Natural fit for sequential processing',
      'Efficient for producer-consumer patterns',
    ],
    disadvantages: [
      'No random access',
      'Array implementation can waste space',
      'Requires front and rear pointers',
      'Not suitable for priority-based processing',
    ],
    applications: [
      'CPU and disk scheduling',
      'Print spooling',
      'Breadth-First Search (BFS)',
      'Message queues and buffering',
      'Handling requests on a server',
    ],
    commonMistakes: [
      'Not handling queue underflow',
      'Confusing front and rear pointers',
      'Not wrapping around in circular queue',
      'Forgetting to update size counter',
    ],
    interviewQuestions: [
      'Implement a queue using two stacks',
      'Generate first n numbers with given digits',
      'Reverse first k elements of a queue',
      'Design a circular tour that visits all petrol pumps',
    ],
    pseudocode: `Queue:
  data[]
  front = 0
  rear = -1
  capacity
  size = 0
  
  Enqueue(value):
    if size >= capacity:
      error "Queue is full"
    rear = (rear + 1) % capacity
    data[rear] = value
    size++
  
  Dequeue():
    if size == 0:
      error "Queue is empty"
    value = data[front]
    front = (front + 1) % capacity
    size--
    return value
  
  Front():
    if size == 0:
      error "Queue is empty"
    return data[front]
  
  isEmpty():
    return size == 0`,
    codeExamples: {
      python: `class Queue:
    def __init__(self, capacity=100):
        self.data = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0
        self.capacity = capacity
    
    def enqueue(self, value):
        if self.size >= self.capacity:
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.data[self.rear] = value
        self.size += 1
    
    def dequeue(self):
        if self.size == 0:
            raise IndexError("Queue is empty")
        value = self.data[self.front]
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return value
    
    def front(self):
        if self.size == 0:
            raise IndexError("Queue is empty")
        return self.data[self.front]
    
    def is_empty(self):
        return self.size == 0`,
      cpp: `template<typename T>
class Queue {
    vector<T> data;
    int front, rear, size, capacity;
public:
    Queue(int cap = 100) : front(0), rear(-1), size(0), capacity(cap) {
        data.resize(capacity);
    }
    
    void enqueue(T value) {
        if (size >= capacity) throw overflow_error("Full");
        rear = (rear + 1) % capacity;
        data[rear] = value;
        size++;
    }
    
    T dequeue() {
        if (size == 0) throw underflow_error("Empty");
        T val = data[front];
        front = (front + 1) % capacity;
        size--;
        return val;
    }
    
    T getFront() {
        if (size == 0) throw underflow_error("Empty");
        return data[front];
    }
    
    bool isEmpty() { return size == 0; }
};`,
      java: `public class Queue<T> {
    private Object[] data;
    private int front, rear, size, capacity;
    
    public Queue(int capacity) {
        this.capacity = capacity;
        this.data = new Object[capacity];
        this.front = 0; this.rear = -1; this.size = 0;
    }
    
    public void enqueue(T value) {
        if (size >= capacity) throw new IllegalStateException("Full");
        rear = (rear + 1) % capacity;
        data[rear] = value;
        size++;
    }
    
    @SuppressWarnings("unchecked")
    public T dequeue() {
        if (size == 0) throw new NoSuchElementException();
        T val = (T) data[front];
        front = (front + 1) % capacity;
        size--;
        return val;
    }
    
    public boolean isEmpty() { return size == 0; }
}`,
      javascript: `class Queue {
    constructor(capacity = 100) {
        this.data = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
        this.capacity = capacity;
    }
    
    enqueue(value) {
        if (this.size >= this.capacity) throw new Error("Full");
        this.rear = (this.rear + 1) % this.capacity;
        this.data[this.rear] = value;
        this.size++;
    }
    
    dequeue() {
        if (this.size === 0) throw new Error("Empty");
        const val = this.data[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return val;
    }
    
    getFront() {
        if (this.size === 0) throw new Error("Empty");
        return this.data[this.front];
    }
    
    isEmpty() { return this.size === 0; }
}`,
    },
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    category: 'tree',
    description: 'A hierarchical data structure where each node has at most two children (left and right).',
    icon: 'GitFork',
    theory: 'A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child. Binary trees are used for efficient searching, sorting, and representing hierarchical data. Common types include full binary trees, complete binary trees, and perfect binary trees.',
    operations: [
      { name: 'Insert', description: 'Add node to tree', timeComplexity: 'O(n)' },
      { name: 'Delete', description: 'Remove node from tree', timeComplexity: 'O(n)' },
      { name: 'Search', description: 'Find node by value', timeComplexity: 'O(n)' },
      { name: 'Traverse', description: 'Visit all nodes', timeComplexity: 'O(n)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)',
    },
    advantages: [
      'Hierarchical data representation',
      'Efficient searching in balanced trees',
      'Natural implementation of divide-and-conquer',
      'Supports multiple traversal strategies',
    ],
    disadvantages: [
      'Degenerates to linked list if unbalanced',
      'No O(1) access to arbitrary nodes',
      'Complex balancing algorithms required',
      'Extra space for child pointers',
    ],
    applications: [
      'File system hierarchies',
      'Expression parsing and evaluation',
      'Huffman coding for compression',
      'Game move decision trees',
    ],
    commonMistakes: [
      'Not handling empty tree cases',
      'Forgetting to update parent pointers',
      'Incorrect traversal order',
      'Not balancing the tree when needed',
    ],
    interviewQuestions: [
      'Find the height of a binary tree',
      'Check if two trees are identical',
      'Find the lowest common ancestor',
      'Serialize and deserialize a binary tree',
    ],
    pseudocode: `TreeNode:
  data
  left
  right

BinaryTree:
  root
  
  Insert(value):
    if root == null:
      root = TreeNode(value)
    else:
      InsertNode(root, value)
  
  InsertNode(node, value):
    if value < node.data:
      if node.left == null:
        node.left = TreeNode(value)
      else:
        InsertNode(node.left, value)
    else:
      if node.right == null:
        node.right = TreeNode(value)
      else:
        InsertNode(node.right, value)
  
  Inorder(node):
    if node != null:
      Inorder(node.left)
      Visit(node)
      Inorder(node.right)
  
  Search(node, value):
    if node == null or node.data == value:
      return node
    if value < node.data:
      return Search(node.left, value)
    return Search(node.right, value)`,
    codeExamples: {
      python: `class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if not self.root:
            self.root = TreeNode(data)
        else:
            self._insert(self.root, data)
    
    def _insert(self, node, data):
        if data < node.data:
            if not node.left:
                node.left = TreeNode(data)
            else:
                self._insert(node.left, data)
        else:
            if not node.right:
                node.right = TreeNode(data)
            else:
                self._insert(node.right, data)
    
    def inorder(self, node=None):
        if node is None:
            node = self.root
        result = []
        if node:
            result.extend(self.inorder(node.left))
            result.append(node.data)
            result.extend(self.inorder(node.right))
        return result
    
    def search(self, data):
        return self._search(self.root, data)
    
    def _search(self, node, data):
        if not node or node.data == data:
            return node
        if data < node.data:
            return self._search(node.left, data)
        return self._search(node.right, data)`,
      cpp: `struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BinaryTree {
    TreeNode* root;
public:
    BinaryTree() : root(nullptr) {}
    
    void insert(int val) {
        root = insertNode(root, val);
    }
    
    TreeNode* insertNode(TreeNode* node, int val) {
        if (!node) return new TreeNode(val);
        if (val < node->data)
            node->left = insertNode(node->left, val);
        else
            node->right = insertNode(node->right, val);
        return node;
    }
    
    void inorder(TreeNode* node, vector<int>& result) {
        if (!node) return;
        inorder(node->left, result);
        result.push_back(node->data);
        inorder(node->right, result);
    }
    
    TreeNode* search(TreeNode* node, int val) {
        if (!node || node->data == val) return node;
        if (val < node->data) return search(node->left, val);
        return search(node->right, val);
    }
};`,
      java: `class TreeNode {
    int data;
    TreeNode left, right;
    TreeNode(int data) { this.data = data; left = right = null; }
}

public class BinaryTree {
    TreeNode root;
    
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private TreeNode insertRec(TreeNode root, int data) {
        if (root == null) return new TreeNode(data);
        if (data < root.data)
            root.left = insertRec(root.left, data);
        else
            root.right = insertRec(root.right, data);
        return root;
    }
    
    public void inorder(TreeNode root, List<Integer> result) {
        if (root != null) {
            inorder(root.left, result);
            result.add(root.data);
            inorder(root.right, result);
        }
    }
    
    public TreeNode search(TreeNode root, int key) {
        if (root == null || root.data == key) return root;
        if (key < root.data) return search(root.left, key);
        return search(root.right, key);
    }
}`,
      javascript: `class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    insert(data) {
        this.root = this._insert(this.root, data);
    }
    
    _insert(node, data) {
        if (!node) return new TreeNode(data);
        if (data < node.data)
            node.left = this._insert(node.left, data);
        else
            node.right = this._insert(node.right, data);
        return node;
    }
    
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.data);
            this.inorder(node.right, result);
        }
        return result;
    }
    
    search(node = this.root, data) {
        if (!node || node.data === data) return node;
        if (data < node.data) return this.search(node.left, data);
        return this.search(node.right, data);
    }
}`,
    },
  },
  {
    id: 'bst',
    name: 'Binary Search Tree',
    category: 'tree',
    description: 'A binary tree where left subtree has smaller values and right subtree has larger values.',
    icon: 'GitBranch',
    theory: 'A Binary Search Tree (BST) is a binary tree where for each node, all values in the left subtree are smaller, and all values in the right subtree are larger. This ordering property enables efficient search, insertion, and deletion with O(log n) average time complexity.',
    operations: [
      { name: 'Insert', description: 'Add node maintaining BST property', timeComplexity: 'O(log n)' },
      { name: 'Delete', description: 'Remove node and rebalance', timeComplexity: 'O(log n)' },
      { name: 'Search', description: 'Find value using BST property', timeComplexity: 'O(log n)' },
      { name: 'Find Min/Max', description: 'Find smallest/largest value', timeComplexity: 'O(log n)' },
    ],
    complexities: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      space: 'O(n)',
    },
    advantages: [
      'Efficient O(log n) search on average',
      'Ordered data structure',
      'Simple implementation',
      'Supports range queries',
    ],
    disadvantages: [
      'Degenerates to O(n) if unbalanced',
      'No guaranteed O(log n) performance',
      'Complex deletion with two children',
      'Requires comparisons for ordering',
    ],
    applications: [
      'Database indexing',
      'Auto-complete features',
      'Memory management systems',
      'Implementing sets and maps',
    ],
    commonMistakes: [
      'Not handling duplicate values consistently',
      'Incorrect deletion with two children',
      'Assuming tree is balanced',
      'Not updating references after deletion',
    ],
    interviewQuestions: [
      'Validate if a tree is a BST',
      'Find the kth smallest element',
      'Convert BST to sorted doubly linked list',
      'Find inorder predecessor and successor',
    ],
    pseudocode: `BSTNode:
  data, left, right

BST:
  root
  
  Insert(value):
    root = InsertRec(root, value)
  
  InsertRec(node, value):
    if node == null: return BSTNode(value)
    if value < node.data:
      node.left = InsertRec(node.left, value)
    else if value > node.data:
      node.right = InsertRec(node.right, value)
    return node
  
  Delete(value):
    root = DeleteRec(root, value)
  
  DeleteRec(node, value):
    if node == null: return null
    if value < node.data: node.left = DeleteRec(node.left, value)
    else if value > node.data: node.right = DeleteRec(node.right, value)
    else:
      if node.left == null: return node.right
      if node.right == null: return node.left
      node.data = FindMin(node.right)
      node.right = DeleteRec(node.right, node.data)
    return node
  
  FindMin(node):
    while node.left != null: node = node.left
    return node.data`,
    codeExamples: {
      python: `class BSTNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        self.root = self._insert(self.root, data)
    
    def _insert(self, node, data):
        if not node:
            return BSTNode(data)
        if data < node.data:
            node.left = self._insert(node.left, data)
        elif data > node.data:
            node.right = self._insert(node.right, data)
        return node
    
    def delete(self, data):
        self.root = self._delete(self.root, data)
    
    def _delete(self, node, data):
        if not node:
            return None
        if data < node.data:
            node.left = self._delete(node.left, data)
        elif data > node.data:
            node.right = self._delete(node.right, data)
        else:
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            min_val = self._find_min(node.right)
            node.data = min_val
            node.right = self._delete(node.right, min_val)
        return node
    
    def _find_min(self, node):
        while node.left:
            node = node.left
        return node.data
    
    def search(self, data):
        return self._search(self.root, data)
    
    def _search(self, node, data):
        if not node or node.data == data:
            return node
        if data < node.data:
            return self._search(node.left, data)
        return self._search(node.right, data)`,
      cpp: `struct BSTNode {
    int data; BSTNode *left, *right;
    BSTNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BST {
    BSTNode* root;
public:
    BST() : root(nullptr) {}
    
    void insert(int val) { root = insertRec(root, val); }
    
    BSTNode* insertRec(BSTNode* node, int val) {
        if (!node) return new BSTNode(val);
        if (val < node->data) node->left = insertRec(node->left, val);
        else if (val > node->data) node->right = insertRec(node->right, val);
        return node;
    }
    
    void deleteNode(int val) { root = deleteRec(root, val); }
    
    BSTNode* deleteRec(BSTNode* node, int val) {
        if (!node) return nullptr;
        if (val < node->data) node->left = deleteRec(node->left, val);
        else if (val > node->data) node->right = deleteRec(node->right, val);
        else {
            if (!node->left) { BSTNode* temp = node->right; delete node; return temp; }
            if (!node->right) { BSTNode* temp = node->left; delete node; return temp; }
            node->data = findMin(node->right);
            node->right = deleteRec(node->right, node->data);
        }
        return node;
    }
    
    int findMin(BSTNode* node) {
        while (node->left) node = node->left;
        return node->data;
    }
    
    BSTNode* search(BSTNode* node, int val) {
        if (!node || node->data == val) return node;
        if (val < node->data) return search(node->left, val);
        return search(node->right, val);
    }
};`,
      java: `class BST {
    class Node {
        int data; Node left, right;
        Node(int d) { data = d; left = right = null; }
    }
    Node root;
    
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node root, int data) {
        if (root == null) return new Node(data);
        if (data < root.data) root.left = insertRec(root.left, data);
        else if (data > root.data) root.right = insertRec(root.right, data);
        return root;
    }
    
    public void delete(int data) {
        root = deleteRec(root, data);
    }
    
    private Node deleteRec(Node root, int data) {
        if (root == null) return null;
        if (data < root.data) root.left = deleteRec(root.left, data);
        else if (data > root.data) root.right = deleteRec(root.right, data);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            root.data = minValue(root.right);
            root.right = deleteRec(root.right, root.data);
        }
        return root;
    }
    
    private int minValue(Node root) {
        int min = root.data;
        while (root.left != null) {
            min = root.left.data; root = root.left;
        }
        return min;
    }
    
    public Node search(Node root, int key) {
        if (root == null || root.data == key) return root;
        if (key < root.data) return search(root.left, key);
        return search(root.right, key);
    }
}`,
      javascript: `class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    insert(data) {
        this.root = this._insert(this.root, data);
    }
    
    _insert(node, data) {
        if (!node) return new BSTNode(data);
        if (data < node.data) node.left = this._insert(node.left, data);
        else if (data > node.data) node.right = this._insert(node.right, data);
        return node;
    }
    
    delete(data) {
        this.root = this._delete(this.root, data);
    }
    
    _delete(node, data) {
        if (!node) return null;
        if (data < node.data) node.left = this._delete(node.left, data);
        else if (data > node.data) node.right = this._delete(node.right, data);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            let min = node.right;
            while (min.left) min = min.left;
            node.data = min.data;
            node.right = this._delete(node.right, min.data);
        }
        return node;
    }
    
    search(node = this.root, data) {
        if (!node || node.data === data) return node;
        if (data < node.data) return this.search(node.left, data);
        return this.search(node.right, data);
    }
}`,
    },
  },
  {
    id: 'heap',
    name: 'Heap',
    category: 'tree',
    description: 'A complete binary tree where each node satisfies the heap property (min-heap or max-heap).',
    icon: 'ArrowUpDown',
    theory: 'A heap is a specialized tree-based data structure that satisfies the heap property. In a max-heap, for any node, the value is greater than or equal to its children. In a min-heap, the value is less than or equal to its children. Heaps are commonly used to implement priority queues and heap sort.',
    operations: [
      { name: 'Insert', description: 'Add element and heapify up', timeComplexity: 'O(log n)' },
      { name: 'Extract Max/Min', description: 'Remove root and heapify down', timeComplexity: 'O(log n)' },
      { name: 'Peek', description: 'View root element', timeComplexity: 'O(1)' },
      { name: 'Heapify', description: 'Convert array to heap', timeComplexity: 'O(n)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(n)',
    },
    advantages: [
      'Efficient priority queue implementation',
      'Guaranteed O(log n) insert and extract',
      'In-place heap sort possible',
      'Fast access to min/max element',
    ],
    disadvantages: [
      'Not a sorted structure',
      'No efficient search operation',
      'Deletion of arbitrary element is O(n)',
      'Not stable',
    ],
    applications: [
      'Priority queues and scheduling',
      'Dijkstra\'s and A* algorithms',
      'Median finding in streaming data',
      'Heap sort algorithm',
      'Order statistics',
    ],
    commonMistakes: [
      'Confusing min-heap and max-heap property',
      'Incorrect parent/child index calculation',
      'Not heapifying after extract',
      'Forgetting that heap is not fully sorted',
    ],
    interviewQuestions: [
      'Find the k largest elements in an array',
      'Merge k sorted arrays',
      'Implement a median finder',
      'Sort a nearly sorted array (k-sorted)',
    ],
    pseudocode: `MaxHeap:
  data[]
  size
  
  Parent(i): return (i - 1) / 2
  Left(i): return 2 * i + 1
  Right(i): return 2 * i + 2
  
  Insert(value):
    data[size] = value
    size++
    HeapifyUp(size - 1)
  
  HeapifyUp(i):
    while i > 0 and data[Parent(i)] < data[i]:
      Swap(data[i], data[Parent(i)])
      i = Parent(i)
  
  ExtractMax():
    if size == 0: error "Empty"
    max = data[0]
    data[0] = data[size - 1]
    size--
    HeapifyDown(0)
    return max
  
  HeapifyDown(i):
    largest = i
    left = Left(i)
    right = Right(i)
    if left < size and data[left] > data[largest]:
      largest = left
    if right < size and data[right] > data[largest]:
      largest = right
    if largest != i:
      Swap(data[i], data[largest])
      HeapifyDown(largest)`,
    codeExamples: {
      python: `class MaxHeap:
    def __init__(self):
        self.data = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left(self, i):
        return 2 * i + 1
    
    def right(self, i):
        return 2 * i + 2
    
    def insert(self, value):
        self.data.append(value)
        self._heapify_up(len(self.data) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.data[self.parent(i)] < self.data[i]:
            self.data[i], self.data[self.parent(i)] = \
                self.data[self.parent(i)], self.data[i]
            i = self.parent(i)
    
    def extract_max(self):
        if not self.data:
            raise IndexError("Heap is empty")
        max_val = self.data[0]
        self.data[0] = self.data[-1]
        self.data.pop()
        self._heapify_down(0)
        return max_val
    
    def _heapify_down(self, i):
        largest = i
        left = self.left(i)
        right = self.right(i)
        if left < len(self.data) and self.data[left] > self.data[largest]:
            largest = left
        if right < len(self.data) and self.data[right] > self.data[largest]:
            largest = right
        if largest != i:
            self.data[i], self.data[largest] = self.data[largest], self.data[i]
            self._heapify_down(largest)
    
    def peek(self):
        return self.data[0] if self.data else None`,
      cpp: `class MaxHeap {
    vector<int> data;
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
public:
    void insert(int val) {
        data.push_back(val);
        heapifyUp(data.size() - 1);
    }
    
    void heapifyUp(int i) {
        while (i > 0 && data[parent(i)] < data[i]) {
            swap(data[i], data[parent(i)]);
            i = parent(i);
        }
    }
    
    int extractMax() {
        if (data.empty()) throw underflow_error("Empty");
        int maxVal = data[0];
        data[0] = data.back();
        data.pop_back();
        heapifyDown(0);
        return maxVal;
    }
    
    void heapifyDown(int i) {
        int largest = i;
        int l = left(i), r = right(i);
        if (l < (int)data.size() && data[l] > data[largest]) largest = l;
        if (r < (int)data.size() && data[r] > data[largest]) largest = r;
        if (largest != i) {
            swap(data[i], data[largest]);
            heapifyDown(largest);
        }
    }
    
    int peek() { return data.empty() ? -1 : data[0]; }
};`,
      java: `public class MaxHeap {
    private ArrayList<Integer> data = new ArrayList<>();
    
    private int parent(int i) { return (i - 1) / 2; }
    private int left(int i) { return 2 * i + 1; }
    private int right(int i) { return 2 * i + 2; }
    
    public void insert(int val) {
        data.add(val);
        heapifyUp(data.size() - 1);
    }
    
    private void heapifyUp(int i) {
        while (i > 0 && data.get(parent(i)) < data.get(i)) {
            Collections.swap(data, i, parent(i));
            i = parent(i);
        }
    }
    
    public int extractMax() {
        if (data.isEmpty()) throw new NoSuchElementException();
        int max = data.get(0);
        data.set(0, data.get(data.size() - 1));
        data.remove(data.size() - 1);
        heapifyDown(0);
        return max;
    }
    
    private void heapifyDown(int i) {
        int largest = i;
        int l = left(i), r = right(i);
        if (l < data.size() && data.get(l) > data.get(largest)) largest = l;
        if (r < data.size() && data.get(r) > data.get(largest)) largest = r;
        if (largest != i) {
            Collections.swap(data, i, largest);
            heapifyDown(largest);
        }
    }
    
    public int peek() { return data.isEmpty() ? -1 : data.get(0); }
}`,
      javascript: `class MaxHeap {
    constructor() {
        this.data = [];
    }
    
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    
    insert(val) {
        this.data.push(val);
        this.heapifyUp(this.data.length - 1);
    }
    
    heapifyUp(i) {
        while (i > 0 && this.data[this.parent(i)] < this.data[i]) {
            [this.data[i], this.data[this.parent(i)]] = 
            [this.data[this.parent(i)], this.data[i]];
            i = this.parent(i);
        }
    }
    
    extractMax() {
        if (this.data.length === 0) throw new Error("Empty");
        const max = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.pop();
        this.heapifyDown(0);
        return max;
    }
    
    heapifyDown(i) {
        let largest = i;
        const l = this.left(i), r = this.right(i);
        if (l < this.data.length && this.data[l] > this.data[largest]) largest = l;
        if (r < this.data.length && this.data[r] > this.data[largest]) largest = r;
        if (largest !== i) {
            [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
            this.heapifyDown(largest);
        }
    }
    
    peek() { return this.data.length ? this.data[0] : null; }
}`,
    },
  },
  {
    id: 'graph',
    name: 'Graph',
    category: 'graph',
    description: 'A collection of vertices connected by edges, used to model pairwise relationships.',
    icon: 'Network',
    theory: 'A graph is a non-linear data structure consisting of vertices (nodes) and edges that connect pairs of vertices. Graphs can be directed or undirected, weighted or unweighted. They are fundamental for modeling networks, social connections, maps, and dependency relationships.',
    operations: [
      { name: 'Add Vertex', description: 'Add a new vertex', timeComplexity: 'O(1)' },
      { name: 'Add Edge', description: 'Connect two vertices', timeComplexity: 'O(1)' },
      { name: 'Remove Vertex', description: 'Delete a vertex and its edges', timeComplexity: 'O(V + E)' },
      { name: 'BFS/DFS', description: 'Traverse the graph', timeComplexity: 'O(V + E)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(V + E)', worst: 'O(V + E)' },
      space: 'O(V + E)',
    },
    advantages: [
      'Models complex relationships naturally',
      'Flexible — no fixed structure',
      'Powerful traversal algorithms available',
      'Can represent any network topology',
    ],
    disadvantages: [
      'Can be memory-intensive',
      'Many algorithms have high complexity',
      'No natural ordering of vertices',
      'Traversal can be tricky to implement correctly',
    ],
    applications: [
      'Social networks and recommendation systems',
      'GPS and navigation systems',
      'Network routing protocols',
      'Dependency resolution (package managers)',
      'Web page ranking (PageRank)',
    ],
    commonMistakes: [
      'Not marking visited nodes causing infinite loops',
      'Confusing directed vs undirected edges',
      'Not handling disconnected components',
      'Using wrong traversal for the problem',
    ],
    interviewQuestions: [
      'Detect a cycle in a directed graph',
      'Find shortest path between two nodes',
      'Topological sort of a DAG',
      'Find connected components',
    ],
    pseudocode: `Graph:
  adjacencyList: Map<Vertex, List<Vertex>>
  
  AddVertex(v):
    if v not in adjacencyList:
      adjacencyList[v] = []
  
  AddEdge(u, v):
    adjacencyList[u].add(v)
    adjacencyList[v].add(u)  // undirected
  
  BFS(start):
    visited = Set()
    queue = [start]
    visited.add(start)
    while queue not empty:
      v = queue.dequeue()
      Visit(v)
      for neighbor in adjacencyList[v]:
        if neighbor not in visited:
          visited.add(neighbor)
          queue.enqueue(neighbor)
  
  DFS(v, visited):
    visited.add(v)
    Visit(v)
    for neighbor in adjacencyList[v]:
      if neighbor not in visited:
        DFS(neighbor, visited)`,
    codeExamples: {
      python: `class Graph:
    def __init__(self):
        self.adj = {}
    
    def add_vertex(self, v):
        if v not in self.adj:
            self.adj[v] = []
    
    def add_edge(self, u, v):
        self.add_vertex(u)
        self.add_vertex(v)
        self.adj[u].append(v)
        self.adj[v].append(u)
    
    def bfs(self, start):
        visited = set()
        queue = [start]
        visited.add(start)
        result = []
        while queue:
            v = queue.pop(0)
            result.append(v)
            for neighbor in self.adj.get(v, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result
    
    def dfs(self, start):
        visited = set()
        result = []
        self._dfs_helper(start, visited, result)
        return result
    
    def _dfs_helper(self, v, visited, result):
        visited.add(v)
        result.append(v)
        for neighbor in self.adj.get(v, []):
            if neighbor not in visited:
                self._dfs_helper(neighbor, visited, result)`,
      cpp: `class Graph {
    unordered_map<int, vector<int>> adj;
public:
    void addVertex(int v) {
        if (adj.find(v) == adj.end()) adj[v] = {};
    }
    
    void addEdge(int u, int v) {
        addVertex(u); addVertex(v);
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    vector<int> bfs(int start) {
        unordered_set<int> visited;
        queue<int> q;
        vector<int> result;
        q.push(start); visited.insert(start);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            result.push_back(v);
            for (int n : adj[v])
                if (!visited.count(n)) {
                    visited.insert(n); q.push(n);
                }
        }
        return result;
    }
    
    vector<int> dfs(int start) {
        unordered_set<int> visited;
        vector<int> result;
        dfsHelper(start, visited, result);
        return result;
    }
    
    void dfsHelper(int v, unordered_set<int>& vis, vector<int>& res) {
        vis.insert(v); res.push_back(v);
        for (int n : adj[v])
            if (!vis.count(n)) dfsHelper(n, vis, res);
    }
};`,
      java: `public class Graph {
    private Map<Integer, List<Integer>> adj = new HashMap<>();
    
    public void addVertex(int v) {
        adj.putIfAbsent(v, new ArrayList<>());
    }
    
    public void addEdge(int u, int v) {
        addVertex(u); addVertex(v);
        adj.get(u).add(v);
        adj.get(v).add(u);
    }
    
    public List<Integer> bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        q.add(start); visited.add(start);
        while (!q.isEmpty()) {
            int v = q.poll();
            result.add(v);
            for (int n : adj.getOrDefault(v, new ArrayList<>()))
                if (!visited.contains(n)) {
                    visited.add(n); q.add(n);
                }
        }
        return result;
    }
    
    public List<Integer> dfs(int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        dfsHelper(start, visited, result);
        return result;
    }
    
    private void dfsHelper(int v, Set<Integer> vis, List<Integer> res) {
        vis.add(v); res.add(v);
        for (int n : adj.getOrDefault(v, new ArrayList<>()))
            if (!vis.contains(n)) dfsHelper(n, vis, res);
    }
}`,
      javascript: `class Graph {
    constructor() {
        this.adj = new Map();
    }
    
    addVertex(v) {
        if (!this.adj.has(v)) this.adj.set(v, []);
    }
    
    addEdge(u, v) {
        this.addVertex(u); this.addVertex(v);
        this.adj.get(u).push(v);
        this.adj.get(v).push(u);
    }
    
    bfs(start) {
        const visited = new Set();
        const queue = [start];
        visited.add(start);
        const result = [];
        while (queue.length) {
            const v = queue.shift();
            result.push(v);
            for (const n of this.adj.get(v) || []) {
                if (!visited.has(n)) {
                    visited.add(n);
                    queue.push(n);
                }
            }
        }
        return result;
    }
    
    dfs(start) {
        const visited = new Set();
        const result = [];
        this._dfsHelper(start, visited, result);
        return result;
    }
    
    _dfsHelper(v, visited, result) {
        visited.add(v);
        result.push(v);
        for (const n of this.adj.get(v) || []) {
            if (!visited.has(n)) this._dfsHelper(n, visited, result);
        }
    }
}`,
    },
  },
  {
    id: 'hash-table',
    name: 'Hash Table',
    category: 'advanced',
    description: 'A data structure that maps keys to values using a hash function for fast lookups.',
    icon: 'Hash',
    theory: 'A hash table (or hash map) is a data structure that implements an associative array, mapping keys to values using a hash function. The hash function computes an index into an array of buckets where the value can be found. With a good hash function, average-case time complexity for insert, delete, and search is O(1).',
    operations: [
      { name: 'Insert', description: 'Add key-value pair', timeComplexity: 'O(1)' },
      { name: 'Delete', description: 'Remove key-value pair', timeComplexity: 'O(1)' },
      { name: 'Search', description: 'Find value by key', timeComplexity: 'O(1)' },
      { name: 'Resize', description: 'Grow table when load factor exceeds threshold', timeComplexity: 'O(n)' },
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
      space: 'O(n)',
    },
    advantages: [
      'Average O(1) for all operations',
      'Flexible key types (with good hash function)',
      'Efficient for counting and frequency problems',
      'Foundation for sets and maps',
    ],
    disadvantages: [
      'Worst case O(n) with poor hash function',
      'No ordering of elements',
      'Collision handling overhead',
      'Memory overhead for empty buckets',
    ],
    applications: [
      'Database indexing',
      'Caching and memoization',
      'Symbol tables in compilers',
      'Password verification (with salting)',
      'Counting frequencies',
    ],
    commonMistakes: [
      'Poor hash function causing many collisions',
      'Not handling collisions properly',
      'Forgetting to resize when load factor is high',
      'Using mutable objects as keys',
    ],
    interviewQuestions: [
      'Design a hash map from scratch',
      'Find the first non-repeating character',
      'Group anagrams together',
      'Implement LRU cache',
    ],
    pseudocode: `HashTable:
  buckets[]
  capacity
  size
  
  Hash(key):
    return key.hashCode() % capacity
  
  Insert(key, value):
    index = Hash(key)
    for entry in buckets[index]:
      if entry.key == key:
        entry.value = value
        return
    buckets[index].add(Entry(key, value))
    size++
    if size / capacity > 0.75:
      Resize()
  
  Search(key):
    index = Hash(key)
    for entry in buckets[index]:
      if entry.key == key:
        return entry.value
    return null
  
  Delete(key):
    index = Hash(key)
    buckets[index].remove(key)
    size--`,
    codeExamples: {
      python: `class HashTable:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [[] for _ in range(capacity)]
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def insert(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.size += 1
        if self.size / self.capacity > 0.75:
            self._resize()
    
    def search(self, key):
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.size -= 1
                return True
        return False
    
    def _resize(self):
        old_buckets = self.buckets
        self.capacity *= 2
        self.size = 0
        self.buckets = [[] for _ in range(self.capacity)]
        for bucket in old_buckets:
            for k, v in bucket:
                self.insert(k, v)`,
      cpp: `template<typename K, typename V>
class HashTable {
    vector<list<pair<K, V>>> buckets;
    int capacity, size;
    int hash(K key) { return std::hash<K>{}(key) % capacity; }
public:
    HashTable(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity);
    }
    
    void insert(K key, V value) {
        int idx = hash(key);
        for (auto& p : buckets[idx])
            if (p.first == key) { p.second = value; return; }
        buckets[idx].push_back({key, value});
        if (++size > capacity * 0.75) resize();
    }
    
    V* search(K key) {
        int idx = hash(key);
        for (auto& p : buckets[idx])
            if (p.first == key) return &p.second;
        return nullptr;
    }
    
    void remove(K key) {
        int idx = hash(key);
        buckets[idx].remove_if([&](auto& p) { return p.first == key; });
    }
    
    void resize() {
        auto old = buckets;
        capacity *= 2; size = 0;
        buckets.clear(); buckets.resize(capacity);
        for (auto& b : old)
            for (auto& p : b) insert(p.first, p.second);
    }
};`,
      java: `public class HashTable<K, V> {
    private List<Entry<K, V>>[] buckets;
    private int capacity = 16;
    private int size;
    
    static class Entry<K, V> {
        K key; V value;
        Entry(K k, V v) { key = k; value = v; }
    }
    
    @SuppressWarnings("unchecked")
    public HashTable() {
        buckets = new List[capacity];
        for (int i = 0; i < capacity; i++) buckets[i] = new LinkedList<>();
    }
    
    private int hash(K key) { return Math.abs(key.hashCode() % capacity); }
    
    public void put(K key, V value) {
        int idx = hash(key);
        for (Entry<K, V> e : buckets[idx])
            if (e.key.equals(key)) { e.value = value; return; }
        buckets[idx].add(new Entry<>(key, value));
        if (++size > capacity * 0.75) resize();
    }
    
    public V get(K key) {
        int idx = hash(key);
        for (Entry<K, V> e : buckets[idx])
            if (e.key.equals(key)) return e.value;
        return null;
    }
    
    public void remove(K key) {
        int idx = hash(key);
        buckets[idx].removeIf(e -> e.key.equals(key));
    }
    
    private void resize() {
        List<Entry<K, V>>[] old = buckets;
        capacity *= 2; size = 0;
        buckets = new List[capacity];
        for (int i = 0; i < capacity; i++) buckets[i] = new LinkedList<>();
        for (List<Entry<K, V>> b : old)
            for (Entry<K, V> e : b) put(e.key, e.value);
    }
}`,
      javascript: `class HashTable {
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.size = 0;
        this.buckets = Array.from({length: capacity}, () => []);
    }
    
    _hash(key) {
        let h = 0;
        const s = String(key);
        for (let i = 0; i < s.length; i++)
            h = ((h << 5) - h) + s.charCodeAt(i);
        return Math.abs(h) % this.capacity;
    }
    
    insert(key, value) {
        const idx = this._hash(key);
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++)
            if (bucket[i][0] === key) { bucket[i][1] = value; return; }
        bucket.push([key, value]);
        if (++this.size > this.capacity * 0.75) this._resize();
    }
    
    search(key) {
        const idx = this._hash(key);
        for (const [k, v] of this.buckets[idx])
            if (k === key) return v;
        return undefined;
    }
    
    delete(key) {
        const idx = this._hash(key);
        const bucket = this.buckets[idx];
        const i = bucket.findIndex(([k]) => k === key);
        if (i !== -1) { bucket.splice(i, 1); this.size--; }
    }
    
    _resize() {
        const old = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = Array.from({length: this.capacity}, () => []);
        for (const b of old)
            for (const [k, v] of b) this.insert(k, v);
    }
}`,
    },
  },
];
