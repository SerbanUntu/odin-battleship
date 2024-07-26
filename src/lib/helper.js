export function runInBrowser(cb) {
	try {
		process
	} catch {
		cb()
	}
}

export function runInNode(cb) {
	try {
		process
		cb()
	} catch {}
}

export function textToKebabCase(text) {
	const words = text.split(' ')
	const newWords = []
	words.forEach(word => {
		newWords.push(word.toLowerCase())
	})
	return newWords.join('-')
}
