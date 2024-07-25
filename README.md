# Project name

![Screenshot]()

## About

### Features

## What I learned

Some code that references UI components breaks the tests so I need to only run that code in the browser. Here is how I achieve this:

```js
try {
	process
	// Only runs in node
} catch {
	// Only runs in browser
}
```

This is possible since `process` is a global variable from the Node runtime, and is therefore only recognised by Node.

## Further development
