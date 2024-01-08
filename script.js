function findMinimumCost() {
    let input = document.getElementById('rope-lengths').value; // Get the input value
    let ropes = input.split(',').map(Number); // Split the input string into an array of integers
    
    // Function to find minimum cost of connecting ropes
    function minimumCostRopes(ropes) {
        if (ropes.length === 0) return 0;

        // Use a priority queue (min heap) to efficiently find minimums
        let minHeap = new MinHeap(ropes);

        let totalCost = 0;

        // Keep merging ropes until only one rope is left in the heap
        while (minHeap.size() > 1) {
            let firstMin = minHeap.extractMin();
            let secondMin = minHeap.extractMin();

            let currentCost = firstMin + secondMin;
            totalCost += currentCost;

            minHeap.insert(currentCost); // Insert the merged rope length
        }

        return totalCost;
    }

    // MinHeap implementation
    class MinHeap {
        constructor(arr = []) {
            this.heap = arr;
            this.buildHeap();
        }

        buildHeap() {
            for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
                this.heapifyDown(i);
            }
        }

        heapifyDown(index) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }

            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this.heapifyDown(smallest);
            }
        }

        extractMin() {
            if (this.heap.length === 0) return null;

            const min = this.heap[0];
            const last = this.heap.pop();

            if (this.heap.length > 0) {
                this.heap[0] = last;
                this.heapifyDown(0);
            }

            return min;
        }

        insert(value) {
            this.heap.push(value);
            let index = this.heap.length - 1;

            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2);
                if (this.heap[parentIndex] > this.heap[index]) {
                    [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                    index = parentIndex;
                } else {
                    break;
                }
            }
        }

        size() {
            return this.heap.length;
        }
    }

    // Calculate minimum cost
    let minimumCost = minimumCostRopes(ropes);

    // Display the result
    document.getElementById('result').innerText = minimumCost;
}
