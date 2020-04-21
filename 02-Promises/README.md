# Promises

Javascript es muy potente a la hora de trabajar con tareas asincrónicas, de hecho, ya venimos programando funciones y código que hacen uso de `callbacks` para ejecutar código en el futuro cercano, cuando un evento sucede o cuando se termina la ejecución de un proceso (escribir en la bd, o escribir en el disco, hacer un request http, etc...).
Esto es genial, pero a veces nos sucede que tenemos callbacks anidadas, es decir, que dentro de un callback tenemos otro callback y así sucesivamente ( inception de callbacks ), y tambien tenemos problemas donde tenemos que esperar que _dos o más_ eventos terminen para continuar la ejecución de nuestro código. Si bien podemos resolverlo sin problemas con callbacks, vamos a ver que nuestro código empieza a hacerce díficil de leer, muy díficil de controlar si hay errores (no sabemos qué función es la que realmente produjo el error ), y si tenemos que buscar un bug dentro del código nos daremos cuenta que, sin querer, hemos terminado dentro del :japanese_goblin: __Callback Hell__:

![callbackHell](./img/callback_hell.gif)

También conocido como __Pyramid of Doom__ :scream::

![PyramidOfDoom](./img/pyr-1.png)

Se pueden imaginar, por los nombres que eligieron para esto, que no es una situación deseada en nuestro código. También van a pensar, que es un mal necesario, ya que de esta forma puedo lograr que mi aplicación se comporte de acuerdo a los requerimientos asincrónicos que hay en el medio. 

## Promises al rescate

Cuando programamos en lenguajes que son bloqueantes, como `C++` o `python`, perdemos el poder del asincronismo, pero ganamos legibilidad, ya que una línea de código se ejecuta exactamente cuando termina al anterior (si la anterior tarda 3 horas, vamos a esperar a que termine), esto hace que el código sea fácil de leer ya que siguiendo la línea de ejecución vamos a ver que cosas suceden antes o después, esto mismo no lo podemos hacer con callbacks (o por lo menos sin entrar al _Callback hell_.):

![SyncVsAsync](./img/software-architecture-introduction-3.png)

¿No sería genial si pudieras escribir código como si fuera sincrónico, pero que la ejecución fuera asincrónica? Esta pregunta seguramente se hicieron los inventores de las __Promises__ de javascript!
Justamente las __Promises__ en Js intentan solucionar el problema del _callback hell_ y lograr que el código sea más legible, más fácil de debuggear y que tengamos mayor control sobre los errores. Veamos como funcionan las promises.

## ¿Qué es una Promesa?

Una _promesa_ representa el resultado eventual (en un futuro incierto) de una operación asincrónica, como por ejemplo: un registro de una db, una página que pedimos por http, un objeto JSON que es respuesta de un request a un API. Es decir, que representa un _placeholder_ (un lugar reservado) donde vamos a guardar la respuesta del método asincrónico ( o un posible error en caso que no sea existosa ).
Como nos podemos imaginar, una promesa puede ser exitosa o no, y una misma promesa no se puede ejecutar dos veces, una vez que termina se convierte en __inmutable__ (no puede cambiar). Además si a una promesa le agregamos un callback (le podemos agregar en cualquier momento), este será ejecutará cuando esta termine. Esto es genial, porque ya no nos interesa en qué momento se producen las cosas, si no en reaccionar al resultado de esas cosas.

### Terminología de promises:

Una promesa puede estar:

* _Pendiente_ (pending): El estado inicial de un promise.
* _Completada_ (fullfilled): Representa que se completó de manera exitosa.
* _Rechazada_ (rejected): La operación terminó, pero de manera fallida.
* _Terminada_ (settled): La operación terminó, de cualquiera de las dos maneras anteriores.

## Promises en JavaScript

Antes de __ES6__ (EcmaScript 6) javascript no soportaba nativamente las _Promises_, pero como el concepto ya estaba dando vuelta en la cabeza de algunos desarrolladores aparecieron varias librerías que lo implementaban, por ejemplo:

* [Q](https://github.com/kriskowal/q)
* [When](https://github.com/cujojs/when)
* [WinJS](http://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSPV.js](https://github.com/tildeio/rsvp.js)
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html)

Si bien el concepto es el mismo, y de hecho se creó un standart para las promises: el [Promises/A+](https://github.com/promises-aplus/promises-spec), no todas las implementaciones son iguales ni respetan el standart. Ustedes se preguntarán porque no usamos directamente las promises que definieron los científicos de EcmaScript, pero resulta que hay un _serio_ debate online por las perfomances de las mismas en términos de tiempo y memoria, la gente de Bluebird hizo algunos [benchmarks](https://github.com/petkaantonov/bluebird/tree/master/benchmark), y si los examinamos vemos que las promesas _nativas_ de __ES6__ están todavía muy abajo en la lista. Esto es debido a la implementación de cada librería sobre las promesas, y por lo visto la implementación nativa no es tan buena todavía. Así que por ahora todavía nos conviene usar alguna librería externa, como por ejemplo _Bluebird_ que veremos más abajo.

> El autor de _Bluebird_ explica un poco porqué tanta diferencia de perfomance en este [link](http://programmers.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird).

### Creando una promesa

Una _Promise_ es una clase en JavaScript, así que para instanciar una nueva vamos a el keyword `new`. Una _Promise_ recibe un sólo argumento: una función con dos parámetros: `reject` y `resolve`. Dentro de esta función vamos a hacer lo que necesitemos y, si todo salió bien, llamamos `resolve` y si no, (algo salió mal), llamamos `reject`.

```javascript
var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.

  if (/* Todo funcionó como esperabamos*/) {
    resolve("Jooya!");
  }
  else {
    reject(Error("Algo se rompió"));
  }
});
```

> En el método `reject` podemos pasar cualquier cosa, pero se recomienda devolver un objeto de tipo `Error` ya que estos tienen el `stack trace` y es más fácil de debugear.

### Haciendo algo cuando una promesa se _'cumple'_

En el statement anterior hemos _definido_ una promesa y la hemos guardado en la variable `promise`. Ahora, para usar esa promesa, debemos de alguna forma poder decirle qué hacer cuando se resuelva o se rechaze la promesa. Para eso vamos a usar el método `then`:

```javascript
promise.then(function(data) {
    // Ejecuto código sabiendo que todo salió bien
    // Siguiendo el ejemplo de arriba, data tendría adentro el string: 'Jooya!'
  }, function(error) {
    // La promesa fue rechazada, aca ejecutamos código para ese caso
    // Siguiendo el ejemplo de arriba, error tendría adentro el string: 'Algo se rompió'
  });
```
La función `then` de las _promises_ recibe dos argumentos, un callback de `sucess` y un callback de `failure`, que van a ser llamadas según si el promise terminó en un `resolve` o un `reject` respectivamente. Los parámetros que le llegan a esta funcion (en el ejemplo `data` y `error`) son los mismos parámetros con los que llamamos a las funciones `resolve` y `reject`.
Podemos escribir los mismo que arriba, pero en vez de pasar dos callbacks a `then`, vamos a usar otro método similar llamado `catch`. Básicamente, al separarlos de este modo, con el `then` vamos a llamar un callback cuando el Promise termina en éxito, y con `catch` vamos a llamar un callback cuando termina en error:

```javascript
promise.then(function(data) {
  // Ejecuto código sabiendo que todo salió bien
  // Siguiendo el ejemplo de arriba, data tendría adentro el string: 'Jooya!'
}).catch(function(error) {
  // La promesa fue rechazada, aca ejecutamos código para ese caso
  // Siguiendo el ejemplo de arriba, error tendría adentro el string: 'Algo se rompió'
});
```
> Este último pedazo de código con `then-catch` es equivalente (hace lo mismo) que el anterior donde `then` recibe dos callbacks. Es simplemente una forma más simple de escribir código.

### Encadenando Promesas

Algo muy potente de las _Promises_ es que vamos a poder encadenarlas (_chaining_), ya que podemos hacer que un _Promise_ __retorne__ otro _Promise_, y de esa forma ir encadenando métodos. Por ejemplo:

```javascript
var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};
 
 
var segundoMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});
      }, 2000);
   });
   return promise;
};
 
var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('hola');
      }, 3000);
   });
   return promise;
};
 
primerMetodo()
   .then(segundoMetodo)
   .then(tercerMetodo)
   .then(function(datos){
   		console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
   });
```

En el ejemplo hemos creado tres métodos donde simulamos algo asincrónico, o sea que no sabemos cuando se va a terminar de ejecutar y como vemos, todos crean una _Promise_ nueva dentro de ellos y la __retornan__. Para llamarlos, invocamos al primer métodos y le decimos con `then` que si termina éxitosamente ejecute la función `segundoMetodo`, esta también devuelve una _Promise_, por lo tanto también podemos llamar a `then` sobre ella, con esto invocamos tercerMetodo (que tambien retorna una _Promise_) y a este última le pasamos una función anónima pidiendo que imprima por consola los _datos_ que recibió como argumento en `resolve`. Si lo ejecutan en su browser verán cómo es el flujo de datos y en qué orden se imprimen los `console.log`s.

> Intenten hacer el mismo ejemplo, pero sin usar Promises. Haciendólo van a notar la diferencia y vean cuan inentendible puede ser el  :japanese_goblin: _Callback Hell_ 

### Esperando que varias Promesas se cumplan para hacer algo

A veces no sólo necesitamos esperar por un evento para hacer algo, si no que queremos que varios eventos hayan sucedido para actuar. Por ejemplo, quiero guardar un arreglo de `alumnos` en una base de datos, y cuando estén todos correctamente guardados mostrar la respuesta al usuario. Para eso, la `API` de _Promises_ no da el método `all`, el cual toma un arreglo de _Promises_ y crea un _Promise_ que se completa cuando todas las _Promises_ que les pasamos estén completas. Al devolver una _Promise_ vamos a poder invocar el método `then` sobre ella, y en el callback que les pasemos vamos a recibir como argumento un arreglo de los resultados de las _Promises_ que les pasamos, en el mismo orden que se las pasamos:

```javascript
Promise.all(arregloDePromesas).then(function(arregloDeResultados) {
  //...
});
```

Vamos a usar el ejemplo anterior, pero ahora queremos que los métodos se ejecuten sólo cuando se completaron los tres, para eso vamos a tener que cambiar cada método para que no utilize ningún dato del método anterior (ahora estamos llamando los tres al mismo tiempo) y la última parte y reemplazarla por `all`, en el callback de esta vamos a hacer un `console.log` del arreglo que nos devolvió:

```javascript
var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};
 
 
var segundoMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({texto:' segundo metodo'});
      }, 1000);
   });
   return promise;
};
 
var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         resolve({hola:1});
      }, 3000);
   });
   return promise;
};

Promise.all([primerMetodo(), segundoMetodo(), tercerMetodo()])
	.then(function(resultado){
		console.log(resultado); //un arreglo con los valores pasamos a resolve en cada metodo
	});
```

Genial, como vemos las promesas se completaron según cuanto tardaba cada una, en el ejemplo pusimos a propósito que el segundo método tarde menos que los demás. Lo importante a notar es que en el arreglo que recibimos al final los resultados vienen ordenados __en el mismo orden en el que pasamos las _promises_ a `all` y _no_ en el orden en que se resuelven__.

Seguramente se preguntarán qué pasa cuando una _Promise_ es rechazada ( o sea que su ejecución termina en un `reject`). `Promise.all` fue diseñada con un comportamiento llamado [_fail-fast_](https://en.wikipedia.org/wiki/Fail-fast), esto quiere decir que ni bien existe un reject, `all` ya lo reporta y devuelve el error. Es decir que el método `catch` va a seguir cómo antes, recibiendo sólo un párametro (el error), y este corresponderá a la _Promise_ que falló primero.

Modifiquemos el código para que el método del medio termine en error. Vamos a rechazar dos promesas, una que termine primero y otra al final, vamos a ver que siempre se mostrará el error de la que __falla primero__:

```javascript
var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         reject('Esto es una prueba controlada');
      }, 2000); // 
   });
   return promise;
};
 
var segundoMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({texto:' segundo metodo'});
      }, 1000);
   });
   return promise;
};
 
var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         reject('Tercer método falla');
      }, 3000);
   });
   return promise;
};

Promise.all([primerMetodo(), segundoMetodo(), tercerMetodo()])
	.then(function(resultado){
		console.log(resultado); //un arreglo con los valores pasamos a resolve en cada metodo
	})
	.catch( function(err){
		console.warn(err); //mostramos el error por consola. Veremos que es el que falló primero, o sea el del primer metodo
	});
```

> Noten que la Promise retorna y ejecuta el `catch` inclusive antes que termine el tercer método, esto se debe a que el primer método falla antes que se ejecute el tercero.

## BlueBird

BlueBird es una librería enfocada en _Promises_, esta cumple con el standart de [Promises/A+](https://github.com/promises-aplus/promises-spec). Como dijimos antes, esta librería es más performante que las _Promises_ nativas de __EC6__ y sus diseñadores se aprovecharon de ello ya que las dos librerías son perfectamente intercambiables, es decir, que la sintaxis de _Promises_ en nativo es idéntica a la de _Bluebird_ (excepto en un [estos](http://bluebirdjs.com/docs/coming-from-other-libraries.html#coming-from-native-promises) casos puntuales). Por lo tanto, para usarla vamos primero a instalarla: `npm install bluebird` y luego, vamos a reemplazar el objeto `Promise` que contiene la clase de las _Promises_ con el módulo de _Bluebird_:

```javascript
var Promise = require("bluebird");
```

Listo! ahora podemos usar las Promesas de Bluebierd mejorando la performance de nuestra aplicación!

> :pineapple: Para ver todo lo que se puede hacer con _Promises_ podemos ir a leer la [documentación](http://bluebirdjs.com/docs/api-reference.html) de Bluebird.
