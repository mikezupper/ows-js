# Observables with Streams

A library for observables built with streams. This library is inspired by [ReactiveX’s operators](http://reactivex.io/documentation/operators.html) and implements a subset of them using streams.

```
npm install --save ows-js
```

The goal of this library is to implement observables making as much use of the platform as possible and being highly tree-shakeable.

## Example

```html
<!DOCTYPE html>

<button id="dec">-</button>

<span id="counter">0</span>

<button id="inc">+</button>

<script type="module">
    import * as ows from "https://cdn.jsdelivr.net/npm/ows-js/dist/ows.js";

  ows.merge(
    ows.fromEvent(
      document.querySelector("#dec")
      "click"
    ).pipeThrough(ows.map(() => -1)),
    ows.fromEvent(
      document.querySelector("#inc")
      "click"
    ).pipeThrough(ows.map(() => 1))
  )
    .pipeThrough(
      ows.scan((v0, v1) => v0 + v1, 0)
    )
    .pipeTo(
      ows.subscribe(
        v => document.querySelector("#counter").textContent = v
      )
    );
</script>
```

## Documentation

## Caveats

While most browsers have [partial support of streams](https://caniuse.com/#feat=streams) in stable, this library makes heavy use of TransformStreams.

---

License Apache 2.0
