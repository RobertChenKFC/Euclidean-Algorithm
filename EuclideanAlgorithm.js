let inputBox1, inputBox2;
let errorDiv;
let resultDiv;
const NULL = -1;

function calc() {
	try {
		let x = parseInt(inputBox1.value());
		let y = parseInt(inputBox2.value());
		if(x < 0 || y < 0) throw "Negative values are not allowed";
		if(!x || !y) return;

		let arr = [];
		function GCD(a, b, lvl) {
			const q = floor(a / b);
			const r = a % b;
			const i = (lvl % 2 === 0) ? lvl : lvl - 1;

			if(arr[i] === undefined) arr[i] = new Array(4).fill(NULL);
			if(arr[i + 1] === undefined) arr[i + 1] = new Array(4).fill(NULL);
			if(arr[i + 2] === undefined) arr[i + 2] = new Array(4).fill(NULL);
			
			// left
			if(lvl % 2 === 0) {
				arr[i][0] = q;

				arr[i + 1][1] = a - r;
				arr[i + 2][1] = r;
			} 
			// right
			else {
				arr[i][3] = q;
				arr[i + 1][2] = a - r;
				
				arr[i + 2][2] = r;
			}

			if(r === 0) return b;
			return GCD(b, r, lvl + 1);
		}	
		const gcd = GCD(max(x, y), min(x, y), 0);
		const lcm = x * y / gcd;
		arr[0][1] = max(x, y);
		arr[0][2] = min(x, y);

		let l = "\\left. \\begin{array}{c|cc|c}";
		for(let i = 0; i < arr.length; i++) {
			if(i !== 0 && i % 2 === 0) l += "\\hline";
			for(let j = 0; j < 4; j++) {
				if(j !== 0) l += "&";
				if(arr[i][j] !== NULL) l += arr[i][j].toString();
			}
			l += "\\\\";
		}

		console.log(gcd, lcm);
		l += "\\end{array}\\right. \\\\ " + 
			"(" + x.toString() + ", " + y.toString() + ")=" + gcd.toString() + " \\\\ " +
			"[" + x.toString() + ", " + y.toString() + "]=" + lcm.toString();

		MathJax.Hub.queue.Push(["Text", resultDiv, l]);

		errorDiv.html("Nothing");
	}
	catch(e) {
		errorDiv.html(e);
	}
}


function setup() {
	inputBox1 = select("#input1");
	inputBox2 = select("#input2");
	errorDiv = select("#error");
	resultDiv = select("#result");
	
	MathJax.Hub.queue.Push(() => {
		resultDiv = MathJax.Hub.getAllJax("result")[0];
	});
	
	inputBox1.input(calc);
	inputBox2.input(calc);
}

