//flattening array
var arr = [[1,2],[12,3,4,[8, 5, 6, 6], 8]],
	arr2 = new Array();

function flat(arr) {

    for(var i = 0; i<arr.length; i++) {
      if(arr[i].length > 1) {
		flat(arr[i]);
      }
	  else {
		arr2.push(arr[i]);
		}
    }

}

//create deck
function createDeck() {
	var suits = ['H', 'D', 'S', 'C'],
		values = ['A','1','2','3','4','5','6','7','8','9','10','J','Q','K'],
		deck = new Array();

	for(var i=0; i<suits.length; i++){
		for(var j=0; j<values.length;j++) {
			deck.push([suits[i], values[j]]);
		}
	}
	console.log(deck); 

    function shuffledeck() {
        var shuffledeck = deck;
        var len = deck.length, i;

        while(len){
          i = Math.floor(Math.random() * len--);

          [shuffledeck[len], shuffledeck[i]] = [shuffledeck[i], shuffledeck[len]];
        }
    }
    return shuffledeck;
}
var d = createDeck();
d();

//find angle in clock
function calcAngle(h, m) 
{ 
    // validate the input 
    if (h <0 || m < 0 || h >12 || m > 60) 
        printf("Wrong input"); 
  
    if (h == 12) h = 0; 
    if (m == 60) m = 0; 
  
    // Calculate the angles moved by hour and minute hands 
    // with reference to 12:00 
    var hour_angle = 0.5 * (h*60 + m); 
    var minute_angle = 6*m; 
  
    // Find the difference between two angles 
    var angle = abs(hour_angle - minute_angle); 
  
    // Return the smaller angle of two possible angles 
    angle = min(360-angle, angle); 
  
    return angle; 
} 

// Returns floor of square root of x          
function floorSqrt(x)  
{     
    if (x == 0 || x == 1)  
    return x; 

    var start = 1, end = x, ans;    
    while (start <= end)  
    {         
        var mid = parseInt((start + end) / 2); 
  
        if (mid*mid == x) 
            return mid; 

        if (mid*mid < x)  
        { 
            start = mid + 1; 
            ans = mid; 
        }  
        else
            end = mid-1;         
    } 
    return ans; 
}
floorSqrt(16); //4
floorSqrt(26); //5

// linear sort
function linearsort() {
    var arr = [1,9,8,4,6]
    var i,j,t;
    for(i=0;i<arr.length-1;i++) {
    	for(j=i+1;j<arr.length;j++) {
    		if(arr[i]>arr[j]) {
    			t = arr[i];
    			arr[i] = arr[j];
    			arr[j] = t;
    		}
    	}
    }
}
// bubble sort
function bubblesort() {
    var arr = [1,9,8,4,6]
    var i,j,t;
    for(i=0;i<arr.length-1;i++) {
    	for(j=0;j<arr.length - i - 1;j++) {
    		if(arr[j]>arr[j+1]) {
    			t = arr[j];
    			arr[j] = arr[j+1];
    			arr[j+1] = t;
    		}
    	}
    }
}

//find unique
function firstNonRepeatedCharacter(string) {
    for (var i = 0; i < string.length; i++) {
        var c = string.charAt(i);
        if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
            return c;
        }
    }
    return null;
}
var someString = 'aabcbdacehhhd';
alert(firstNonRepeatedCharacter(someString));

//someString.filter((val, i) => (someString.indexOf(val,i+1) == -1))[0];

//find repeated chars

var str = "abc";
var uniq = {};

if(!str.length) {
    uniq = [];
}
else {
    
    for(let i=0; i<str.length; i++) {
        if(!uniq[str[i]] && str.indexOf(str[i], i+1) == -1) {
            uniq[str[i]] = str[i];
        } 
    }
}
console.log(Object.values(uniq));

//binary search
function binary(num) {
    var arr=[1,2,3,4,5,6,7,8,9],
        start = 0,
        end = arr.length -1,
        mid;

        while(start<=end) {
            mid = parseInt((start+end)/2);
            if(num == arr[mid]) {
                console.log(num,"--",arr[mid]);
                return false;
            }
            else if(num<arr[mid]) {
                end = mid-1;
            }
            else {
                start = mid+1;
            }

        }
        console.log("Not found");
}
binary(11); //Not found
binary(4); //found

//hoisting
var abc = function () {
    console.log("hi");
}
abc();
function abc (){
    console.log("hello");
}
abc();

//highlight subset of string and append to tag
function hightlight(subset) {
    str = "hi this is varun. My name is varun";
    var new_str = str.split(subset).join("\<b\>" + subset + "\<\/b\>");
    $(element).html(new_str);
}
hightlight("var");

//map function 
function map(arr, mapFunc) {
    const mapArr = []; // empty array
    
    // loop though array
    for(let i=0;i<arr.length;i++) {
        const result = mapFunc(arr[i], i, arr);
        mapArr.push(result);
    }
    return mapArr;
}
var sq = map([1,2,3,4,5], num => num*num);

// filter takes an array and function as argument
function filter(arr, filterFunc) {
    const filterArr = [];
    for(let i=0;i<arr.length;i++) {
        const result = filterFunc(arr[i], i, arr);
        if(result) 
            filterArr.push(arr[i]); 
    }
    return filterArr;
}
const oddArr2 = filter(arr, num => num % 2 === 0);

//prototype in js
function showDetails(fname, lname, age) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.printDetails = function () {
        console.log(fname,'=',lname,'=',age);
    }
}

var p1 = new showDetails("varun", "agarwal", "30"),
    p2 = new showDetails("sumit", "agarwal", 34);
    showDetails.prototype.message = "hello";

//function chaining

var a = {
    addClass: function () {
        $(this).addClass("xyz pqr"); return this;
    },
    removeClass: function () {
        $(this).removeClass("pqr"); return this;
    },
    removeAll: function () {
        $(this).removeAttr("class"); return this;
    }
}


function chaining(ele) {
    this.add = function () {
        ele.addClass("xyz abc");
        return this;
    }
    this.remove = function () {
        ele.removeClass("abc");
        return this;
    }
}

var obj = new chaining($(".pqr"));
obj.add();
obj.remove();







