module.exports = class Forth {
	constructor() {
		this.dataStack = [];
		this.returnStack = [];
		this.dictionary = {};
	}

	push = (value) => {
		this.dataStack.push(value);
	};

	pop = () => {
		if (this.dataStack.length === 0) {
			throw new Error("Stack underflow");
		}
		return this.dataStack.pop();
	};

	defineWord = (name, func) => {
		this.dictionary[name] = func;
	};

	executeWord = (name) => {
		if (name in this.dictionary) {
			this.dictionary[name].call(this);
		} else {
			throw new Error(`Undefined word: ${name}`);
		}
	};

	initCoreWords = () => {
		this.defineWord('+', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a + b);
		});

		this.defineWord('-', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a - b);
		});

		this.defineWord('*', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a * b);
		});

		this.defineWord('/', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a / b);
		});

		this.defineWord('.', () => {
			// TODO: may need to change this for web interface
			console.log(this.pop());
		});

		this.defineWord('drop', () => {
			this.pop();
		});

		this.defineWord('dup', () => {
			const a = this.pop();
			this.push(a);
			this.push(a);
		});

		this.defineWord('swap', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(a);
		});

		this.defineWord('over', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(a);
			this.push(b);
		});

		this.defineWord('rot', () => {
			const c = this.pop();
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(c);
			this.push(a);
		});
	};

	evaluate = (input) => {
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
