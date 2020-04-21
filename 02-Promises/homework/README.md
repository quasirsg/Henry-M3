# Henry

## Introducción

### Setup

Vas a examinar un poco de código asincrónico usando vanilla callbacks, e intentando escribir código que haga acciones idénticas usando promises.

**Por favor lee estas notas antes de empezar:**


- Porque el código asincrónico es no-determinístico (i.e. los resultados no pueden ser determinados antes de tiempo), asegurate de testear el output de tus soluciones corriéndolos múltiples veces, para ver las posibilidades.
- Adicionalmente, asegurate de comentar las soluciones que implementan vanilla callbacks antes de testear tus versiones *promisificadas*; de otra manera, las soluciones con callback pasaran los tests por vos!
- Y por último, tomate tu tiempo de leer las primeras lineas de ambos ejercicios; en particular, toma nota de `promisifiedReadFile` como también las funciones `blue` y `magenta`. Vas a querer usar la primera función en tus soluciones, pero mirá si también puedes incorporar las otras dos.


## Ejercicios

### Single Promises & Promise Chains

Para los primeros ejercicios, vas a empezar una Promise y encadenar de ella con `.then`. El patrón basico se ve algo así:

```js
asyncFunctionThatReturnsPromise().then(function successHandler1 (result) {
  // Usa el valor adentro del callback
  console.log('async1 is done!', result);
  return asyncFunctionThatReturnsPromise(); // wow, devolviendo algo asincrónico
}).then(function successHandler2 (result2) {
  // usa el siguiente valor
  console.log('async2 is done!', result2);
});
```

Notá un punto muy importante: llamar a `.then` siempre devuelve una nueva promesa a la cual podes llamar a `.then` otra vez (y otra vez).

También, si devuelves un valor o una promesa por un valor de un success handler, la siguiente parte de la cadena recibe ese valor. De esta manera, podes evitar el "callback hell".

---

Una parte crucial de la asincronicidad es recordar manejar los errores. En el estilo de node, *"error first"*, eras recordado manejar los errores en cada paso: 

```js
asyncFunction(function callback1 (err, result) {
  if (err) console.error('ERR!', err);
  console.log(result);
  asyncFunction(function callback2 (err, result) {
    if (err) console.error('ERR2!', err);
    console.log(result2);
  });
})
```

Con Promises, podemos manejar errores en cada paso si queremos (pasando un segundo "error handler" function al `.then`), pero podemos también simplemente manejar TODOS los errores de una cadena usando `.catch` al final:


```js
asyncFunctionThatReturnsPromise().then(function successHandler1 (result) {
  console.log(result);
  return asyncFunctionThatReturnsPromise(); // wow, devolviendo algo asincrónico
}).then(function successHandler2 (result2) {
  console.log('async2 is done!', result2);
}).catch(function errorHandler (err) {
  console.error('ERR', err); // maneja cualquier error de toda la cadena de arriba.
});
```


### Combinado Promises & Promise Chains

En el siguiente ejercicio de este workshop, vas a tener que combinar múltiples promesas independientes / Promise chains. Como mínimo, los docs de [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) en promesas deberían darte una idea de como proceder; no necesitas ningún otro metodo(s) ademas de los que las promises tienen de forma nativa para resolver este problema.


+++Combinando promises
Fijate en `.all`
+++

Sin embargo, la librería de Promise de Bluebird que estamos usando también tiene bastantes funciones mas copadas para investigar si estas interesado. Algunas de ellas pueden resultar en código mas elegante si lo podes usar correctamente. 

+++Combinando promises (Edición Picante)
Además de `.all`, mira `.join`, `.spread`, `.each`, `.map`, y `.reduce`. Algunos o varios de estos métodos pueden ser usados de distintas formas para llegar a resultados idénticos.
+++
