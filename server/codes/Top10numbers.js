var arr = [20,12,11,14,16,17,11,44,100,50,6,234,51,55,75,643,21,67,9,99,1123,6,33];
var numbers = [];

let i = 0;
while(i < 10) {
    numbers.push(Math.max(...arr));
    let index = arr.indexOf(Math.max(...arr));
    arr.splice(index, 1);
    i++;
}

console.log(numbers)