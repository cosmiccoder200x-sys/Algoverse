export interface Algorithm {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'dynamic-programming';
  description: string;
  theory: string;
  steps: string[];
  complexities: {
    time: {
      best: string;
      average: string;
      worst: string;
    };
    space: string;
  };
  codeExamples: {
    python: string;
    cpp: string;
    java: string;
    javascript: string;
  };
  pseudocode: string;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
}

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    theory: 'Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name because smaller elements "bubble" to the top of the list.',
    steps: [
      'Start from the first element',
      'Compare adjacent elements',
      'Swap if they are in wrong order',
      'Repeat for all adjacent pairs',
      'Largest element bubbles to end',
      'Repeat until no swaps needed',
    ],
    complexities: {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
    },
    codeExamples: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
    },
    pseudocode: `BubbleSort(A):
  n = length(A)
  for i = 0 to n-1:
    swapped = false
    for j = 0 to n-i-2:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
        swapped = true
    if not swapped:
      break`,
    applications: [
      'Educational purposes',
      'Nearly sorted small datasets',
      'Real-time applications where simplicity matters',
    ],
    advantages: [
      'Simple to understand and implement',
      'Adaptive — efficient for nearly sorted data',
      'Stable sort',
      'In-place (O(1) space)',
    ],
    disadvantages: [
      'Very slow for large datasets',
      'O(n²) in average and worst case',
      'Many unnecessary comparisons',
      'Rarely used in practice',
    ],
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    description: 'Divides the array into halves, recursively sorts them, and merges the sorted halves.',
    theory: 'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts each half, and then merges the two sorted halves. It is a stable sort with guaranteed O(n log n) time complexity, making it suitable for large datasets.',
    steps: [
      'Divide array into two halves',
      'Recursively sort left half',
      'Recursively sort right half',
      'Merge two sorted halves',
      'Compare elements from both halves',
      'Place smaller element in result',
    ],
    complexities: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)',
    },
    codeExamples: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int[] L = new int[n1], R = new int[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`,
      javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i), right.slice(j));
}`,
    },
    pseudocode: `MergeSort(A, left, right):
  if left < right:
    mid = (left + right) / 2
    MergeSort(A, left, mid)
    MergeSort(A, mid + 1, right)
    Merge(A, left, mid, right)

Merge(A, left, mid, right):
  n1 = mid - left + 1
  n2 = right - mid
  L = A[left..mid]
  R = A[mid+1..right]
  i = j = 0, k = left
  while i < n1 and j < n2:
    if L[i] <= R[j]:
      A[k] = L[i]; i++
    else:
      A[k] = R[j]; j++
    k++
  copy remaining elements`,
    applications: [
      'Sorting linked lists',
      'Inversion counting',
      'External sorting for large datasets',
      'Stable sorting requirements',
    ],
    advantages: [
      'Guaranteed O(n log n) performance',
      'Stable sort',
      'Excellent for linked lists',
      'Parallelizable',
    ],
    disadvantages: [
      'Requires O(n) extra space',
      'Slower than quicksort for small arrays',
      'Not in-place',
      'Cache inefficient due to multiple arrays',
    ],
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    description: 'Picks a pivot element, partitions the array around it, and recursively sorts the partitions.',
    theory: 'Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a "pivot" element and partitioning the array into two sub-arrays: elements less than the pivot and elements greater than the pivot. The sub-arrays are then sorted recursively.',
    steps: [
      'Choose a pivot element',
      'Partition array around pivot',
      'Elements < pivot go to left',
      'Elements > pivot go to right',
      'Recursively sort left partition',
      'Recursively sort right partition',
    ],
    complexities: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)',
    },
    codeExamples: {
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    },
    pseudocode: `QuickSort(A, low, high):
  if low < high:
    pi = Partition(A, low, high)
    QuickSort(A, low, pi - 1)
    QuickSort(A, pi + 1, high)

Partition(A, low, high):
  pivot = A[high]
  i = low - 1
  for j = low to high - 1:
    if A[j] <= pivot:
      i++
      swap(A[i], A[j])
  swap(A[i + 1], A[high])
  return i + 1`,
    applications: [
      'General-purpose sorting',
      'Commercial computing systems',
      'In-place sorting with low memory',
      'Used in standard library implementations',
    ],
    advantages: [
      'Very fast on average',
      'In-place sorting (low memory)',
      'Cache-friendly',
      'Tail-recursive optimization possible',
    ],
    disadvantages: [
      'O(n²) worst-case performance',
      'Not stable',
      'Performance depends on pivot choice',
      'Can overflow stack with poor pivots',
    ],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    description: 'Efficiently finds an element in a sorted array by repeatedly dividing the search interval in half.',
    theory: 'Binary Search is an efficient algorithm for finding an element in a sorted array. It works by repeatedly dividing the search interval in half. At each step, the algorithm compares the target value to the middle element of the array and eliminates half of the remaining elements from consideration.',
    steps: [
      'Check if array is sorted',
      'Find the middle element',
      'Compare target with middle',
      'If equal, return index',
      'If target < middle, search left half',
      'If target > middle, search right half',
    ],
    complexities: {
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(1)',
    },
    codeExamples: {
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      cpp: `int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      javascript: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
    pseudocode: `BinarySearch(A, target):
  left = 0
  right = length(A) - 1
  while left <= right:
    mid = (left + right) / 2
    if A[mid] == target:
      return mid
    else if A[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
  return -1`,
    applications: [
      'Searching in sorted databases',
      'Finding square roots',
      'Optimization problems (binary search on answer)',
      'IP address lookup in routing tables',
    ],
    advantages: [
      'Extremely fast — O(log n)',
      'Simple to implement',
      'Works on any sorted data',
      'Constant space O(1)',
    ],
    disadvantages: [
      'Requires sorted input',
      'No benefit for unsorted data',
      'Requires random access',
      'Not suitable for linked lists',
    ],
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'graph',
    description: 'Explores a graph level by level, visiting all neighbors before moving to the next level.',
    theory: 'Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices in order of their distance from the source. It uses a queue to keep track of vertices to visit, ensuring that all vertices at distance k are visited before any vertex at distance k+1.',
    steps: [
      'Start from source vertex',
      'Mark source as visited',
      'Enqueue all unvisited neighbors',
      'Dequeue next vertex',
      'Visit and enqueue its neighbors',
      'Repeat until queue is empty',
    ],
    complexities: {
      time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      space: 'O(V)',
    },
    codeExamples: {
      python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result`,
      cpp: `vector<int> bfs(const unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    vector<int> result;
    q.push(start); visited.insert(start);
    while (!q.empty()) {
        int v = q.front(); q.pop();
        result.push_back(v);
        for (int n : graph.at(v))
            if (!visited.count(n)) {
                visited.insert(n); q.push(n);
            }
    }
    return result;
}`,
      java: `public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> q = new LinkedList<>();
    List<Integer> result = new ArrayList<>();
    q.add(start); visited.add(start);
    while (!q.isEmpty()) {
        int v = q.poll();
        result.add(v);
        for (int n : graph.getOrDefault(v, new ArrayList<>()))
            if (!visited.contains(n)) {
                visited.add(n); q.add(n);
            }
    }
    return result;
}`,
      javascript: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    const result = [];
    while (queue.length) {
        const v = queue.shift();
        result.push(v);
        for (const n of graph[v] || []) {
            if (!visited.has(n)) {
                visited.add(n);
                queue.push(n);
            }
        }
    }
    return result;
}`,
    },
    pseudocode: `BFS(graph, start):
  visited = Set()
  queue = [start]
  visited.add(start)
  while queue not empty:
    v = queue.dequeue()
    Visit(v)
    for neighbor in graph[v]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.enqueue(neighbor)`,
    applications: [
      'Shortest path in unweighted graphs',
      'Web crawling',
      'Social network friend suggestions',
      'GPS navigation (shortest route)',
      'Garbage collection in compilers',
    ],
    advantages: [
      'Finds shortest path in unweighted graphs',
      'Complete — finds solution if one exists',
      'Level-order traversal is intuitive',
      'Guaranteed to find nearest goal first',
    ],
    disadvantages: [
      'High memory usage (stores all frontier nodes)',
      'Can be slow for deep graphs',
      'Not suitable for weighted graphs',
      'May explore many unnecessary nodes',
    ],
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'graph',
    description: 'Explores a graph by going as deep as possible before backtracking.',
    theory: 'Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to keep track of vertices to visit. DFS is useful for topological sorting, detecting cycles, and exploring connected components.',
    steps: [
      'Start from source vertex',
      'Mark current as visited',
      'Recursively visit unvisited neighbors',
      'Backtrack when no unvisited neighbors',
      'Continue until all reachable visited',
    ],
    complexities: {
      time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      space: 'O(V)',
    },
    codeExamples: {
      python: `def dfs(graph, start):
    visited = set()
    result = []
    def dfs_helper(vertex):
        visited.add(vertex)
        result.append(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                dfs_helper(neighbor)
    dfs_helper(start)
    return result`,
      cpp: `vector<int> dfs(const unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    vector<int> result;
    function<void(int)> dfsHelper = [&](int v) {
        visited.insert(v);
        result.push_back(v);
        for (int n : graph.at(v))
            if (!visited.count(n)) dfsHelper(n);
    };
    dfsHelper(start);
    return result;
}`,
      java: `public static List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    List<Integer> result = new ArrayList<>();
    dfsHelper(graph, start, visited, result);
    return result;
}

static void dfsHelper(Map<Integer, List<Integer>> g, int v, Set<Integer> vis, List<Integer> res) {
    vis.add(v); res.add(v);
    for (int n : g.getOrDefault(v, new ArrayList<>()))
        if (!vis.contains(n)) dfsHelper(g, n, vis, res);
}`,
      javascript: `function dfs(graph, start) {
    const visited = new Set();
    const result = [];
    function dfsHelper(v) {
        visited.add(v);
        result.push(v);
        for (const n of graph[v] || []) {
            if (!visited.has(n)) dfsHelper(n);
        }
    }
    dfsHelper(start);
    return result;
}`,
    },
    pseudocode: `DFS(graph, start):
  visited = Set()
  DFS-Helper(start, visited)

DFS-Helper(v, visited):
  visited.add(v)
  Visit(v)
  for neighbor in graph[v]:
    if neighbor not in visited:
      DFS-Helper(neighbor, visited)`,
    applications: [
      'Topological sorting',
      'Cycle detection',
      'Maze solving',
      'Connected components',
      'Path finding in game trees',
    ],
    advantages: [
      'Lower memory usage than BFS',
      'Can find path with less memory',
      'Natural for recursive problems',
      'Useful for backtracking',
    ],
    disadvantages: [
      'May not find shortest path',
      'Can get stuck in deep paths',
      'Stack overflow risk in deep graphs',
      'Not guaranteed to find nearest solution',
    ],
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graph',
    description: 'Finds the shortest path from a source vertex to all other vertices in a weighted graph.',
    theory: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It uses a greedy approach, maintaining a set of visited vertices and always selecting the unvisited vertex with the smallest tentative distance.",
    steps: [
      'Initialize distances to infinity',
      'Set source distance to 0',
      'Select unvisited vertex with min distance',
      'Update distances to all neighbors',
      'Mark current vertex as visited',
      'Repeat until all vertices visited',
    ],
    complexities: {
      time: { best: 'O(V + E log V)', average: 'O(V + E log V)', worst: 'O(V + E log V)' },
      space: 'O(V)',
    },
    codeExamples: {
      python: `import heapq

def dijkstra(graph, start):
    dist = {v: float('inf') for v in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      cpp: `vector<int> dijkstra(const vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    dist[start] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `public static Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {
    Map<Integer, Integer> dist = new HashMap<>();
    for (int v : graph.keySet()) dist.put(v, Integer.MAX_VALUE);
    dist.put(start, 0);
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.offer(new int[]{0, start});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist.get(u)) continue;
        for (int[] e : graph.getOrDefault(u, new ArrayList<>())) {
            int v = e[0], w = e[1];
            if (dist.get(u) + w < dist.get(v)) {
                dist.put(v, dist.get(u) + w);
                pq.offer(new int[]{dist.get(v), v});
            }
        }
    }
    return dist;
}`,
      javascript: `function dijkstra(graph, start) {
    const dist = {};
    for (const v in graph) dist[v] = Infinity;
    dist[start] = 0;
    const pq = [[0, start]];
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();
        if (d > dist[u]) continue;
        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    return dist;
}`,
    },
    pseudocode: `Dijkstra(graph, start):
  dist[v] = infinity for all v
  dist[start] = 0
  priority queue pq = [(0, start)]
  while pq not empty:
    (d, u) = pq.extractMin()
    if d > dist[u]: continue
    for each (v, w) in graph[u]:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        pq.insert((dist[v], v))
  return dist`,
    applications: [
      'GPS navigation systems',
      'Network routing protocols (OSPF)',
      'Social network analysis',
      'Game pathfinding',
      'Telecommunication networks',
    ],
    advantages: [
      'Guarantees shortest path for non-negative weights',
      'Efficient with binary heap: O(E log V)',
      'Works on both directed and undirected graphs',
      'Well-understood and widely implemented',
    ],
    disadvantages: [
      'Does not work with negative edge weights',
      'Slower than BFS for unweighted graphs',
      'Can be slow on dense graphs',
      'Greedy approach may not suit all problems',
    ],
  },
  {
    id: 'knapsack',
    name: '0/1 Knapsack',
    category: 'dynamic-programming',
    description: 'Given weights and values of items, find the maximum value that can be put in a knapsack of given capacity.',
    theory: 'The 0/1 Knapsack problem is a classic dynamic programming problem. Given a set of items with weights and values, determine the maximum value that can be obtained by selecting items such that the total weight does not exceed a given capacity. Each item can either be taken once (1) or not at all (0).',
    steps: [
      'Create DP table of size (n+1) x (W+1)',
      'Initialize first row and column to 0',
      'For each item and capacity',
      'If item weight <= current capacity',
      'Take max of including or excluding item',
      'Return dp[n][W]',
    ],
    complexities: {
      time: { best: 'O(nW)', average: 'O(nW)', worst: 'O(nW)' },
      space: 'O(nW)',
    },
    codeExamples: {
      python: `def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`,
      cpp: `int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(dp[i - 1][w],
                    dp[i - 1][w - wt[i - 1]] + val[i - 1]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
      java: `public static int knapsack(int[] wt, int[] val, int W) {
    int n = wt.length;
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = Math.max(dp[i - 1][w],
                    dp[i - 1][w - wt[i - 1]] + val[i - 1]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
      javascript: `function knapsack(weights, values, W) {
    const n = weights.length;
    const dp = Array.from({length: n + 1}, () => Array(W + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = Math.max(dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
    },
    pseudocode: `Knapsack(weights, values, W):
  n = length(weights)
  dp[n+1][W+1] = {0}
  for i = 1 to n:
    for w = 0 to W:
      if weights[i-1] <= w:
        dp[i][w] = max(dp[i-1][w],
          dp[i-1][w-weights[i-1]] + values[i-1])
      else:
        dp[i][w] = dp[i-1][w]
  return dp[n][W]`,
    applications: [
      'Resource allocation problems',
      'Budget optimization',
      'Cargo loading',
      'Portfolio optimization',
      'Cutting stock problems',
    ],
    advantages: [
      'Guarantees optimal solution',
      'Well-understood DP pattern',
      'Can be space-optimized to O(W)',
      'Applicable to many real-world problems',
    ],
    disadvantages: [
      'Pseudo-polynomial time complexity',
      'Can be slow for large W',
      'O(nW) space (without optimization)',
      'Does not handle fractional items',
    ],
  },
];
