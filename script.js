class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] >= this.heap[parentIndex]) break;

      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];

      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (currentIndex === smallestIndex) break;

      [this.heap[currentIndex], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[currentIndex],
      ];

      currentIndex = smallestIndex;
    }
  }
}
// Utility function to check if a variable is iterable
function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === 'function';
}

// Example usage:
const inputArray = [1, 2, 3, 4]; // Replace with your input data

if (isIterable(inputArray)) {
  const result = calculateMinCost(inputArray);
  console.log("Result:", result);
} else {
  console.error("Input is not iterable. Please provide a valid iterable.");
}

function calculateMinCost(arr) {
  if (!arr) return 0; // Handle the case when arr is falsy (e.g., undefined or null)
  
  // Convert non-iterable inputs to an array (assuming it's a single value)
  if (!Array.isArray(arr)) {
    arr = [arr];
  }

  // Create a priority queue (min-heap) to store rope lengths
  const minHeap = new MinHeap();

  // Insert all rope lengths into the min-heap
  for (const rope of arr) {
    minHeap.insert(rope);
  }

  let totalCost = 0;

  // Connect ropes until there's only one rope left in the heap
  while (minHeap.heap.length > 1) {
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    const combinedCost = rope1 + rope2;
    totalCost += combinedCost;

    // Insert the combined rope back into the min-heap
    minHeap.insert(combinedCost);
  }

  return totalCost;
}