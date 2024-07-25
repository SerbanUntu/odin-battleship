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
