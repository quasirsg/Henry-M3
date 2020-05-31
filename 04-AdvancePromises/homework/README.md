# Henry

## Introducción

### Contexto y Objetivos

_Una promesa representa el eventual resultado de una operación asincrónica._ - [Promises/A+](https://promisesaplus.com/) 

El punto de las promesas es darnos devuelta composición funcional y _error bubbling_ en el mundo asincrónico. - [Domenic Denicola](https://blog.domenic.me/youre-missing-the-point-of-promises/)


Las promesas de JavaScript son herramientas versatelis para manejar resultados asincrónicos. Son portables y pueden adjuntar funciones a un valor eventual, en multiples lugares. Comparado al callejón sin salida del standard de async callbacks, nos restauran un control flow mas normal - dejandonos conectar resultados secuenciales, retornar nuevos valores, y atrapar errores donde sea mas conveniente. 

Una forma de entender una cosa es contruirla vos mismo. En este workshop nosotros construiremos una libreria de un constructor de promesas similar al [ECMAScript `Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), la cual llamaremos `pledge.js`


### Estado del Arte

#### Bluebird y Promises/A+

Siguiendo multiples propuestas del [standard de promesas de CommonJs](http://wiki.commonjs.org/wiki/Promises), un standard destacado, [Promises/A+](https://www.promisejs.org/) ha ganado sobre el resto para convertirse en el standard de facto, siendo la base hasta el oficial [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Varios browsers los han implementado nativamente (incluyendo el engine de V8 que da poder a Chrome y Node), y [Bluebird](https://github.com/petkaantonov/bluebird) es también usada como una librería poderosa y de alto rendimiento.

> **ADVERTENCIA**: ¡Cuidado usuarios de código legacy de JQuery! Mientras que JQuery 2 tiene una version de promesas a través de `$.Deferred`, esa implementación difiere de standards actuales y es considereda defectuosa. Mirá [Kris Kowal's guide](https://github.com/kriskowal/q/wiki/Coming-from-jQuery). Sin embargo, usuarios de JQuery moderno alegrense! JQuery 3 ahora tiene unas promesas que obedecen P/A+ incluida. 

## Instrucciones 

### Setup

Este workshop esta basado en un test spec de [Jasmine 2](https://jasmine.github.io/2.5/introduction) (separado en capítulos temáticos). Nuestras promesas van a ser llamadas `$Promise` para evitar disparar código del browser. Para concentrarse en conceptros, `pledge.js` va a usar variables publicas y no va hacer obediente al standard.

##### Ambiente

Vas a necesitar Node.js y su package manager npm instalado. Asumiendo que eso es verdad, podes instalar las dependencias del repo con:

```sh
$ npm install # va a abrir la documentación también
```


### Workshop

Para ejecutrar los specs, simplemente ingresa en la terminal el comando:

```sh
$ npm test
```

y abrí el link mostrado en tu terminal. Vas a ver todos los tests como _"pending"_. Comenzá escribiendo tu propio código en el archivo `pledge.js`. Cuando pasas un test, cambia el siguiente test pendiente de `xit` a `it` y guardalo.

Este spec es iterativo y opinionado; deberías hacer los test en orden. Comenzá con `pledge.spec.ch1.js`, y cuando lo completes segui al Capitulo 2 (y asi...). No remuevas capitulos viejos de tu test output - los tests son acumulativos, entonces si fallás en notar un test que se rompe a tiempo podés meterte en un problema muy grande.   

##### Recursos incluidos

Este repo no contiene solo los test spec. Notá que el `Promises Flowchart.pdf` esta también incluido para tu referencia. Lo más probable es que lo necesites repasar durante el capítulo 4 del spec; no aplica a los capitulos 1-3.


### Extra Credit

El capítulo 5 del spec es una sección opcional en dos importantes métodos de la librería, `Promse.resolve` (no es lo mismo que la función `resolver`) y `Promise.all`. Este capítulo es recomendad si tenés tiempo, pero consideralo credito extra. 
