const idsToAlgos = {
    'merge-sort' : mergeSort,
    'bubble-sort' : bubbleSort,
    'selection-sort' : selectionSort,
    'insertion-sort' : insertionSort,
    'heap-sort' : heapSort,
    'quick-sort' : quickSort
}

const capacity = 100;

let _numbers = [];

let _isSorted = false;

const NumState = Object.freeze({
    DEFAULT: 0,
    CURRENT: 1,
    SORTED: 2,
    NEXT: 3,
});

window.onload = () => {
    onResetClicked();
};

function onSortClicked() {
    if(this._isSorted) {
        return;
    }
    for(const id in idsToAlgos) {
        if(document.getElementById(id).checked) {
            sorter(id);
            return;
        }
    }
}

function onResetClicked() {
    _numbers = [];
    _isSorted = false;
    for(let i = 1; i <= capacity; i++) {
        _numbers.push({number: i, state: NumState.DEFAULT });
    }
    // A shortcut way to randomize a list of _numbers
    _numbers.sort(() => Math.random() - 0.5);
    draw();
}

const sorter = async (id) => {
    const sortButton = document.getElementById('sort');
    const resetButton = document.getElementById('reset');
    sortButton.disabled = true;
    resetButton.disabled = true;
    await idsToAlgos[id]();
    _isSorted = true;
    sortButton.disabled = false;
    resetButton.disabled = false;
};

function draw() {
    const area = document.getElementById('histogram-area');
    const newArea = document.createElement('div');
    newArea.classList.add('flex');
    newArea.classList.add('flex-row');
    newArea.classList.add('size-full');
    newArea.classList.add('justify-center');
    newArea.classList.add('items-end');
    newArea.id = 'histogram-area';
    for(const item of _numbers) {
        const el = document.createElement('div');
        el.classList.add('basis-full');
        if(item.state == NumState.SORTED) {
            el.classList.add('bg-green-700');
        } else if(item.state == NumState.CURRENT) {
            el.classList.add('bg-red-800');
        } else if(item.state == NumState.NEXT) {
            el.classList.add('bg-blue-800');
        } else {
            el.classList.add('bg-slate-500');
        }
        const height = (item.number *100.0)/capacity;
        const heightClass = 'h-[' + height.toString() +'%]';
        el.classList.add(heightClass);
        newArea.appendChild(el); 
    }
    area.replaceWith(newArea);
}


async function bubbleSort() {
    const len = capacity;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            _numbers[j].state = NumState.CURRENT;
            _numbers[j+1].state = NumState.NEXT;
            if(_numbers[j].number > _numbers[j+1].number) {
                draw();
                await sleep(1);
                swap(j, j+1);
            }
            _numbers[j].state = NumState.DEFAULT;
            _numbers[j+1].state = NumState.DEFAULT;
        }
        _numbers[len - 1 - i].state = NumState.SORTED;
        // Use this when you want faster visuals. When using this comment out
        // the draw() during the swap.
        // draw();
        // await sleep(1);
}
    draw();
    await sleep(1);
}

async function insertionSort() {
    const len = capacity;
    for(let i = 1; i < len; i++) {
        _numbers[i-1].state = NumState.SORTED;
        for(let j = i; j > 0; j--) {
            // drawing here makes it slower but visuals are more accurate.
            await sleep(1);
            draw();
            _numbers[j].state = NumState.CURRENT;
            if(_numbers[j].number < _numbers[j-1].number) {
                _numbers[j-1].state = NumState.CURRENT;
                _numbers[j].state = NumState.SORTED;
                swap(j-1, j);
                continue;
            }
            _numbers[j].state = NumState.SORTED;
            break;
        }
        _numbers[0].state = NumState.SORTED;
        // Use this when you want faster visuals. When using this comment out
        // the draw() during the swap.
        // draw();
        // await sleep(1);
    }
    await sleep(1);
    draw();
}

async function selectionSort() {
    const len = capacity;
    for(let i = 0; i < len; i++) {
        let midx = i;
        _numbers[i].state = NumState.CURRENT;
        for(let j = i+1; j < len; j++) {
            // Drawing every step of selection makes it slower.
            _numbers[j].state = NumState.NEXT;
            draw();
            await sleep(1);
            if(_numbers[j].number < _numbers[midx].number) {
                midx = j;
            }
            _numbers[j].state = NumState.DEFAULT;
        }
        _numbers[i].state = NumState.SORTED;
        swap(i, midx);
        // Use this when you want faster visuals. When using this comment out
        // the draw() during the swap.
        // draw();
        // await sleep(1);
    }
}

function swap(pos1, pos2) {
    const temp = _numbers[pos1].number;
    _numbers[pos1].number = _numbers[pos2].number;
    _numbers[pos2].number = temp;
}

async function mergeSort() {
    await mergeSortImpl(0, Math.floor(capacity - 1));
    for(const item of _numbers) {
        item.state = NumState.SORTED;
    }
    draw();
    await sleep(1);
}

async function mergeSortImpl(s, e) {
    if(s == e) {
        await sleep(1);
        draw();
        return;
    }
    const mid = Math.floor((s+e)/2);
    await mergeSortImpl(s, mid);
    await mergeSortImpl(mid+1, e);
    let sidx = s, eidx = mid + 1;
    const sorted = [];
    while(sidx <= mid && eidx <= e) {
        if(_numbers[sidx].number < _numbers[eidx].number) {
            sorted.push(_numbers[sidx++].number);
        } else {
            sorted.push(_numbers[eidx++].number);
        }
    }
    while(sidx <= mid) {
        sorted.push(_numbers[sidx++].number);
    }
    while(eidx <= e) {
        sorted.push(_numbers[eidx++].number);
    }
    for(const num of sorted) {
        if(s > 0) {
            _numbers[s-1].state = NumState.DEFAULT;
        }
        _numbers[s].state = NumState.CURRENT;
        _numbers[s++].number = num;

        await sleep(1);
        draw();
    }
}

async function quickSort() {
    console.log('quick sort');
    await quickSortImpl(0, capacity - 1);
    draw();
}

async function quickSortImpl(s, e) {}

async function heapSort() {
    console.log('heap sort');
    await heapSortImpl(0, capacity - 1);
    draw();
}

async function heapSortImpl(s, e) {}

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time))
