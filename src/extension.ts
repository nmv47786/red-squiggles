// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "red-squiggles" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('red-squiggles.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code from Red Squiggles!');
	});


	let alerting = vscode.commands.registerCommand('red-squiggles.alerting', () => {
		vscode.window.showInformationMessage('Choose an option', 'A', 'B', 'C')
		.then(selection => {
			if (selection === 'A'){
				for (let i = 0; i < 10; i ++) {
					setTimeout(() => {
						vscode.window.showErrorMessage(`ALERT ${i + 1}: You picked A`);
					}, i * 500);
				}
			} else if (selection === 'B') {
				vscode.window.showInputBox({ prompt: 'I am EV1L, Who are you' })
				.then(output => {
					if (output) {
						vscode.window.showWarningMessage(`Hello ${output}`);
					}
				});
			} else {
				vscode.window.showInformationMessage('fine...');
			}
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(alerting);
}

// This method is called when your extension is deactivated
export function deactivate() {}
