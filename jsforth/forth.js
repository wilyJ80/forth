module.exports = class Forth {
	constructor() {
		this.dataStack = [];
		this.returnStack = [];
		this.dictionary = {};
	}

	push = function(value) {
		this.dataStack.push(value);
	};

	pop = function() {
		if (this.dataStack.length === 0) {
			throw new Error("Stack underflow");
		}
		return this.dataStack.pop();
	};

	defineWord = function(name, func) {
		this.dictionary[name] = func;
	};

	executeWord = function(name) {
		if (name in this.dictionary) {
			this.dictionary[name].call(this);
		} else {
			throw new Error(`Undefined word: ${name}`);
		}
	};

	initCoreWords = function() {
		this.defineWord('+', function() {
			const b = this.pop();
			const a = this.pop();
			this.push(a + b);
		});

		this.defineWord('-', function() {
			const b = this.pop();
			const a = this.pop();
			this.push(a - b);
		});

		this.defineWord('*', function() {
			const b = this.pop();
			const a = this.pop();
			this.push(a * b);
		});

		this.defineWord('/', function() {
			const b = this.pop();
			const a = this.pop();
			this.push(a / b);
		});

		this.defineWord('.', function() {
			console.log(this.pop());
		});
	};

	evaluate = function(input) {
		const tokens = input.split(/\s+/).filter(token => token.length > 0);
		for (const token of tokens) {
			if (!isNaN(token)) {
				this.push(parseFloat(token));
			} else {
				this.executeWord(token);
			}
		}
	};
}

// const forth = new Forth();
// forth.initCoreWords();
//
// forth.evaluate('3 4 + .');
