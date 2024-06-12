import { Forth } from "./forth.js"

const forth = new Forth();
forth.initCoreWords();

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector('#terminal-form');
	const input = document.querySelector('#terminal-input');
	const output = document.querySelector('#output');

	form.addEventListener('submit', (ev) => {
		ev.preventDefault();
		const command = input.value.trim();
		if (command) {
			const result = forth.evaluate(input.value);
			input.value = "";
			const newLine = document.createElement('div');
			newLine.textContent = result;
			output.appendChild(newLine);
			output.scrollTop = output.scrollHeight;
		}
	});
});
