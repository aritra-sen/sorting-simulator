const idsToAlgos = {
    'merge-sort' : mergeSort,
    'bubble-sort' : bubbleSort,
    'selection-sort' : selectionSort,
    'insertion-sort' : insertionSort,
    'heap-sort' : heapSort,
    'quick-sort' : quickSort
}

function onSortClicked() {
    for(const id in idsToAlgos) {
        if(document.getElementById(id).checked) {
            const sortButton = document.getElementById('sort');
            sortButton.disabled = true;
            idsToAlgos[id]();
            sortButton.disabled = false;
            return;
        }
    }
}

function bubbleSort(numbers) {
    return;
}

function insertionSort(numbers) {
    return;
}

function selectionSort(numbers) {
    return;
}

function mergeSort(numbers) {
    return;
}

function quickSort(numbers) {
    return;
}

function heapSort(numbers) {
    return;
}
