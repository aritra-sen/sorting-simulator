const idsToAlgos = {
    'merge-sort' : mergeSort,
    'bubble-sort' : bubbleSort,
    'selection-sort' : selectionSort,
    'insertion-sort' : insertionSort,
    'heap-sort' : heapSort,
    'quick-sort' : quickSort
}

const capacity = 1000;

let _numbers = [];

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
    _numbers = [];
    for(let i = 1; i <= capacity; i++) {
        _numbers.push(i);
    }
    // A shortcut way to randomize a list of _numbers
    _numbers.sort(() => Math.random() - 0.5);
    draw();
}

function draw() {
    const area = document.getElementById('histogram-area');
    const newArea = document.createElement('div');
    newArea.classList.add('flex');
    newArea.classList.add('flex-row');
    newArea.classList.add('size-full');
    newArea.classList.add('justify-center');
    newArea.classList.add('items-end');
    newArea.id = 'histogram-area';
    for(const num of _numbers) {
        const el = document.createElement('div');
        el.classList.add('bg-slate-500');
        el.classList.add('basis-full');
        const height = (num*100.0)/capacity;
        const heightClass = 'h-[' + height.toString() +'%]';
        el.classList.add(heightClass);
        newArea.appendChild(el); 
    }
    area.replaceWith(newArea);
}


function bubbleSort() {
    console.log('bubble sort');
    const len = capacity;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            if(_numbers[j] > _numbers[j+1]) {
                swap(j, j+1);
            }
        }
    }
    draw();
}

function insertionSort() {
    console.log('insertion sort');
    const len = capacity;
    for(let i = 1; i < len; i++) {
        for(let j = i; j >0; j--) {
            if(_numbers[j] < _numbers[j-1]) {
                swap(j-1, j);
                continue;
            }
            break;
        }
    }
    draw();

}

function selectionSort() {
    console.log('selection sort');
    const len = capacity;
    for(let i = 0; i < len; i++) {
        let midx = i;
        for(let j = i+1; j < len; j++) {
            if(_numbers[j] < _numbers[midx]) {
                midx = j;
            }
        }
        swap(i, midx);
    }
    draw();
}

function swap(pos1, pos2) {
    const temp = _numbers[pos1];
    _numbers[pos1] = _numbers[pos2];
    _numbers[pos2] = temp;
}

function mergeSort() {
    console.log('merge sort');
    mergeSortImpl(0, Math.floor(capacity - 1));
    draw();
}

function mergeSortImpl(s, e) {
    if(s == e) {
        return;
    }
    const mid = Math.floor((s+e)/2);
    mergeSortImpl(s, mid);
    mergeSortImpl(mid+1, e);
    let sidx = s, eidx = mid + 1;
    const sorted = [];
    while(sidx <= mid && eidx <= e) {
        if(_numbers[sidx] < _numbers[eidx]) {
            sorted.push(_numbers[sidx++]);
        } else {
            sorted.push(_numbers[eidx++]);
        }
    }
    while(sidx <= mid) {
        sorted.push(_numbers[sidx++]);
    }
    while(eidx <= e) {
        sorted.push(_numbers[eidx++]);
    }
    for(const num of sorted) {
        _numbers[s++] = num;
    }
}

function quickSort() {
    console.log('quick sort');
    quickSortImpl(0, capacity - 1);
    draw();
}

function quickSortImpl(s, e) {}

function heapSort() {
    console.log('heap sort');
    heapSortImpl(0, capacity - 1);
    draw();
}

function heapSortImpl(s, e) {}
