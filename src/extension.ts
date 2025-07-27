import * as vscode from 'vscode';

let lastAlertedWords = new Set<string>();


export function activate(context: vscode.ExtensionContext) {

	const diagnosticCollection = vscode.languages.createDiagnosticCollection('squiggles');

	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
	}

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			updateDiagnostics(e.document, diagnosticCollection);
		}),
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				updateDiagnostics(editor.document, diagnosticCollection);
			}
		}), diagnosticCollection
	);
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
	const diagnostics: vscode.Diagnostic[] = [];
	const currentAlertedWords = new Set<string>();

	for (let i = 0; i < document.lineCount; i++) {
		const line = document.lineAt(i);
		const words = line.text.match(/\S+/g);
		if (!words) continue;

		let startIndex = 0;
		for (const word of words) {
			const start = line.text.indexOf(word, startIndex);
			if (start === -1) continue;

			const range = new vscode.Range(i, start, i, start + word.length);
			const diagnostic = new vscode.Diagnostic(
				range,
				`Error with ${word}`,
				vscode.DiagnosticSeverity.Error
			);
			diagnostics.push(diagnostic);


			if (!lastAlertedWords.has(word)) {
				setTimeout(() => {
					vscode.window.showErrorMessage(`Error: "${word}"`);
				}, 0);
			}

			currentAlertedWords.add(word);
			startIndex = start + word.length;
		}
	}

	lastAlertedWords = currentAlertedWords;

	collection.set(document.uri, diagnostics);
}


export function deactivate() {}
