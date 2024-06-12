const Forth = require('./forth.js');
const forth = new Forth();
forth.initCoreWords();

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const prompt = () => {
	rl.question(forth.dataStack + ' ok> ', (answer) => {
		try {
			forth.evaluate(answer);
		} catch (error) {
			console.error(error.message);
		}
		prompt();
	})
}

prompt();
