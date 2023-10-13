function calculateMinCost() {
  const ropeLengthsInput = document.getElementById('rope-lengths');
  const resultDiv = document.getElementById('result');
  const ropeLengths = ropeLengthsInput.value.split(',').map(Number);
   resultDiv.textContent = findMinCostRopes(ropeLengths);;
}

function findMinCostRopes(arr) {
    let minCost = 0;
    let minHeap = [];
    for (let i = 0; i < arr.length; i++) {
      minHeap.push(arr[i]);
      minHeap.sort((a, b) => a - b);
    }
    while (minHeap.length > 1) {
      const first = minHeap.shift();
      const second = minHeap.shift();
      const cost = first + second;
      minCost += cost;
      minHeap.push(cost);
      minHeap.sort((a, b) => a - b);
    }
   return minCost;
  }