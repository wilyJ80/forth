export class Forth {
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
			return this.dictionary[name].call(this);
		} else {
			throw new Error(`Undefined word: ${name}`);
		}
	};

	initCoreWords = () => {
		this.defineWord('+', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a + b);
			return this.dataStack;
		});

		this.defineWord('-', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a - b);
			return this.dataStack;
		});

		this.defineWord('*', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a * b);
			return this.dataStack;
		});

		this.defineWord('/', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(a / b);
			return this.dataStack;
		});

		this.defineWord('.', () => {
			// TODO: may need to change this for web interface
			const top = this.pop();
			return top;
		});

		this.defineWord('drop', () => {
			this.pop();
			return this.dataStack;
		});

		this.defineWord('dup', () => {
			const a = this.pop();
			this.push(a);
			this.push(a);
			return this.dataStack;
		});

		this.defineWord('swap', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(a);
			return this.dataStack;
		});

		this.defineWord('over', () => {
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(a);
			this.push(b);
			return this.dataStack;
		});

		this.defineWord('rot', () => {
			const c = this.pop();
			const b = this.pop();
			const a = this.pop();
			this.push(b);
			this.push(c);
			this.push(a);
			return this.dataStack;
		});

		this.defineWord('words', () => {
			// TODO: may need to change this for web interface
			return Object.keys(this.dictionary);
		});

		this.defineWord('.S', () => {
			return this.dataStack;
		})
	};

	evaluate = (input) => {
		const tokens = input.split(/\s+/).filter(token => token.length > 0);
		let result = [];
		for (const token of tokens) {
			if (!isNaN(token)) {
				this.push(parseFloat(token));
			} else {
				result.push(this.executeWord(token));
			}
		}
		if (result.length > 0) {
			return result;
		} else {
			return this.dataStack;
		}
	};
}
