let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let height = 4;
let speedFactor = 1000;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () { // số lượng thanh 
  numOfBars = slider.value; 
  maxRange = slider.value; 
  bars_container.innerHTML = ""; 
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);//
});

speed.addEventListener("change", (e) => { // thay đổi tốc độ tiến trình
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () { // thay đổi kiểu thuật toán 
  algotouse = select_algo.value;
});

function randomNum(min, max) {// dãy số ngẫu nhiên
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {  // hàm tạo dãy số ngẫu nhiên 
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) { // hàm tạo thanh
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div"); // khai báo biến tạo phần tử
    bar.classList.add("bar");
    bar.style.height = array[i] * height + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () { // nhấp chuột để sắp xếp phần tử ngẫu nhiên
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) { //hàm delay
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function swap(items, leftIndex, rightIndex, bars) { // hàm trao đổi giữa các phần tử animation 
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * height + "px";
  bars[leftIndex].style.backgroundColor = "green";
  bars[rightIndex].style.height = items[rightIndex] * height + "px";
  bars[rightIndex].style.backgroundColor = "blue";
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor(Math.random() * (right - left + 1) + left);
  var pivot = items[pivotIndex]; //phần tử giữa 
  bars[pivotIndex].style.backgroundColor = "red";

 
  (i = left), //con trỏ trái 
    (j = right); //con trỏ phải
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); // tráo đổi phần tử  với nhau
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); 
    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}

async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  await mergeSort(left);
  await mergeSort(right);
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    bars[k].style.height = arr[k] * height + "px";
    bars[k].style.backgroundColor = "lightgreen";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * height + "px";
      console.log(arr[k] * height);
      bars[k + arr.length].style.backgroundColor = "yellow";
    }
    await sleep(speedFactor);
    k++;
  }
  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * height + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }
  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * height + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return arr;
}

sort_btn.addEventListener("click", function () {
    switch (algotouse) {
      case "merge":
          mergeSort(unsorted_array);
        break;
      case "quick":
        console.log(unsorted_array.length);
        quickSort(unsorted_array, 0, unsorted_array.length - 1);
        break;
      default:
        mergeSort(unsorted_array);
        break;
    }
});