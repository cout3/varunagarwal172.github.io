function floor(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.floor(value * inv) / inv;
}
function ceil(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.ceil(value * inv) / inv;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
// restrict alphanumeric characters in input	
function alphanumeric(e) {
    var evt = e || window.event;
    var k = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || k == 9  || (k >= 48 && k <= 57) || k == 46);
}
// restrict alphabets characters in input	
function alphanumeric(e) {
    var evt = e || window.event;
    var k = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || k == 9 || k == 46);
}
//regular expression
alphabets: /^[a-zA-Z]/i,
alpha numeric:/^[a-zA-Z0-9]+$/
email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
mobile: /^(\+91-|\+91|0)?(7|8|9)\d{9}/,//mobile : /^[0-9]{10}$/,
pin: /^[1-9][0-9]{5}$/,
textarea: '',
pan: /(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/,
tan: /(^([a-zA-Z]{4})([0-9]{5})([a-zA-Z]{1})$)/,
nonempty: /([^\s])/,
service tax:/(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{3})([0-9]{3})$)/,
company reg. no.:/(^([a-zA-Z]{1})([0-9]{5})([a-zA-Z]{2})([0-9]{4})([a-zA-Z]{3})([0-9]{6})$)/

//only number
specialKeys.push(8); //Backspace
specialKeys.push(118); // paste
var num=$("input[data-number = 'number']");
$(num).bind("keypress", function (e) {
	var keyCode = e.which ? e.which : e.keyCode
	var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
	return ret;
});	


//browser definition check
	// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
