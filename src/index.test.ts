import test from './test';
import debounce from './index';

test('debounce', it => {

});

const myFunction = (x: number, y: number) => x + y;
const myDebouncedFunction = debounce(myFunction);

myDebouncedFunction(1, 2).then(console.log);  // console.log(7)
myDebouncedFunction(3, 4).then(console.log);  // console.log(7)
myDebouncedFunction.flush(); // => 7

myDebouncedFunction(5, 6).then(console.log);  // console.log(15)
myDebouncedFunction(7, 8).then(console.log);  // console.log(15)