# infinitescroll

> A class that appends the data when end checker is visible

[![NPM](https://img.shields.io/npm/v/@ansrlm/infinitescroll.svg)](https://www.npmjs.com/package/@ansrlm/infinitescroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @ansrlm/infinitescroll
```

## Usage

```ts
const infiniteScroll = new InfiniteScroll({
	scrollContainer: document.querySelector('.scroll'),
	listContainer: document.querySelector('.list'),
	endChecker: {
		container: document,
		targetClass: 'loading_bar',
	},
	fetchData,
	callbackFetchData,
	options: { type: 'append', expandSize: 15 },
});

infiniteScroll.mount();
```

## Demo

[Here](ansrlm.github.io/infinitescroll) is the demo of infinitescroll

```html
<a href="ansrlm.github.io/infinitescroll" />
```

## Upcoming

Soon be added failback function on infinitescroll v1.1.0

Then infinitescroll will support react framework

## Dependency

The module infinitescroll needs the following libraries.

[@egjs/visible](https://www.npmjs.com/package/@egjs/visible) : 2.2.0+

## License

MIT © [ansrlm](https://github.com/ansrlm)

---
