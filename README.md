# infinitescroll

>

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
		container: document.querySelector('.wrap'),
		targetClass: 'loading_bar',
	},
	fetchData,
	callbackFetchData,
	options: { type: 'append', expandSize: 15 },
});

infiniteScroll.mount();
```

## Demo

```html
<a href="ansrlm.github.io/infinitescroll" />
```

## License

MIT © [ansrlm](https://github.com/ansrlm)

---