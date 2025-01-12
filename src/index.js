const idsToAlgos = {
    'merge-sort' : mergeSort,
    'bubble-sort' : bubbleSort,
    'selection-sort' : selectionSort,
    'insertion-sort' : insertionSort,
    'heap-sort' : heapSort,
    'quick-sort' : quickSort
}

window.onload = () => {
    onResetClicked();
};

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

function onResetClicked() {
    const numbers = [];
    for(let i = 1; i <= 1000; i++) {
        numbers.push(i);
    }
    // A shortcut way to randomize a list of numbers
    numbers.sort(() => Math.random() - 0.5);
    draw(numbers);
}

function draw(numbers) {
    const area = document.getElementById('histogram-area');
    const newArea = document.createElement('div');
    newArea.classList.add('flex');
    newArea.classList.add('flex-row');
    newArea.classList.add('size-full');
    newArea.classList.add('justify-center');
    newArea.classList.add('items-end');
    newArea.id = 'histogram-area';
    for(const num of numbers) {
        const el = document.createElement('div');
        el.classList.add('bg-slate-500');
        el.classList.add('basis-[0.1%]');
        const heightClass = 'h-[' + Math.trunc((num/10.0)*10)/10.0+'%]';
        el.classList.add(heightClass);
        newArea.appendChild(el); 
    }
    area.replaceWith(newArea);
}


function bubbleSort(numbers) {
    console.log('bubble sort');
    return;
}

function insertionSort(numbers) {
    console.log('insertion sort');
    return;
}

function selectionSort(numbers) {
    console.log('selection sort');
    return;
}

function mergeSort(numbers) {
    console.log('merge sort');
    return;
}

function quickSort(numbers) {
    console.log('quick sort');
    return;
}

function heapSort(numbers) {
    console.log('heap sort');
    return;
}
