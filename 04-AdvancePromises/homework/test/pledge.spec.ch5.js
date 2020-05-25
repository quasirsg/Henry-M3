'use strict';
describe('Capítulo 5: Métodos estáticos `.resolve` y `.all`', function(){
/*=======================================================


                        888888888
                        888
                        888
                        8888888b.
                             "Y88b
                               888
                        Y88b  d88P
                         "Y8888P


Capítulo 5: Credito Extra: Métodos estáticos `.resolve` y `.all`
---------------------------------------------------------*/
// Promises por si mismo tiene muchas ventajas sobre callbacks,
// principalmente cuando se trata con *composibilidad* - combinando
// y orquestrando múltiples resultados asincrónicos. Habiendo dicho
// eso, prácticamente cada libreria de promesas provee un par de
// helper functions para hacer la composición de promesas aún más
// fácil. En este capítulo vas a implementar dos de los mas cruciales
// metodos estáticos, tan utiles que son partes del ES6 spec para
// promesas (EcmaScript sigue, pero también va mas alla de, P/A+).

// NOTA ESPECIAL: La mejores soluciones para este capítulo NO LLAMAN
// `_internalResolve` `_internalReject` directamente. En cambio, pueden
// resolverse enteramente usando las partes públicas de tu libreria $Promise.
// Recuerda: la función executor da acceso público al resolver / rejector.
/*========================================================*/

/* global $Promise customMatchers */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 250;

function noop () {}

// `$Promise.resolve` no es exactamente la misma cosa como un resolver,
// al menos no en Pledge (depende de tu implementación de la libreria
// de promises).

describe('El método estático `$Promise.resolve`', function(){

  xit('es una función, y no una que ya hemos escrito', function(){
    expect( typeof $Promise.resolve ).toBe( 'function' );
    var promise = new $Promise(noop);
    expect( $Promise.resolve ).not.toBe( promise._internalResolve );
  });

  xit('toma un <valor plano A> y devuelve una <promesa para A>', function(){
    [42, 'hi', {}, undefined, /cool/, false].forEach(value => {
      var promise = $Promise.resolve(value);
      expect( promise instanceof $Promise ).toBe( true );
      // No setea el estado y valor manualmente; llama un resolver.
      expect( promise._state ).toBe( 'fulfilled' );
      expect( promise._value ).toBe( value );
    });
  });

  // Esto sería mas complejo con "then"s, pero vamos a ignorar eso.

  xit('toma una <promesa para A> y devuelve la misma <promesa para A>', function(){
    var firstPromise = new $Promise(noop);
    var secondPromise = $Promise.resolve(firstPromise);
    expect( secondPromise ).toBe( firstPromise );
  });

  // Como puedes ver, `$Promise.resolve` "normaliza" valores que puede
  // o puede que no sean promesas. Los valores se convierten en promesas
  // y las promesas se mantienen como promesas. ¿No estas seguro que algo
  // es una promesa? Usa `$Promise.resolve`.

  // Este spec debería ya funcionar si lo de arriba funciona.
  // Lee a través de las assertions y tratá de entender que demuestran.

  xit('demuestra porque "resolved" y "fulfilled" no son sinónimos', function(){
    var rejectedPromise = new $Promise(function (resolve, reject) {
      reject();
    });
    // Y ahora la revelación:
    var result = $Promise.resolve(rejectedPromise); // RESOLVIENDO...
    expect( result._state ).toBe( 'rejected' ); // ...pero RECHAZADA!
    // Hemos "resuelto" pero igual terminado con una promesa rechazada.
    // Asi que "resolve" realmente significa *intento* de completarla(fulfill).
    // Eso funciona con valores normales, o promesas que ya estan completadas.
    // Sin embargo, no podemos mentir y aclamar que una promesa ya rechazada
    // es ahora mágicamente completada, sin haber manejado la razón de rechazo.
  });

});

// `Promise.all` es uno de los métodos más útiles en cualquier async
// toolkit. El método `then` nos dió encadenamiento serial; `all` nos
// da espera paralela.

describe('El método estático `$Promise.all`', function(){

  var SMALL_DELAY = 10;
  var MAX_DELAY = 100;

  var values;
  beforeEach(function(){
    values = [42, 'hi', false, {}, undefined, [] ];
    jasmine.addMatchers(customMatchers);
  });

  xit('es una función', function(){
    expect( typeof $Promise.all ).toBe( 'function' );
  });

  // El `Promise.all` de ES6 acepta cualquier
  // [iterable](https://mzl.la/1SopN1G), pero esto va mas alla del
  // scope de Pledge. Nuestro `.all` solo necesita soportar arreglos.

  xit('toma un solo argumento de un arreglo', function(){
    // Pasando un arreglo dentro de `$Promise.all` causa ningún error.
    function callingAllWithArrays () {
      $Promise.all([]);
      $Promise.all(values);
    }
    expect( callingAllWithArrays ).not.toThrow();
    // Pasar un no-arreglo a `$Promise.all` arroja un `TypeError`.
    const nonArrayValues = [42, 'hi', false, {}, undefined, /wow/];
    nonArrayValues.forEach(value => {
      function callingAllWithValue () { return $Promise.all(value); }
      expect( callingAllWithValue ).toThrowError( TypeError );
    });
  });

  // No parece tán dificil al principio.

  xit('convierte un <arreglo de valores> a una <promesa para un arreglo de valores>', function (done) {
    var promise = $Promise.all(values);
    expect( promise instanceof $Promise ).toBe(true);
    // La promesa debería completarse con los valores
    expect( promise ).toFulfillWith( values, done );
  });

  // Uh oh, se va volviendo un poco más difícil
  xit('convierte un <arreglo de promesas> en una <promesa para un arreglo de valores>', function (done) {
    var promises = values.map(value => $Promise.resolve(value));
    var promise = $Promise.all(promises);
    // La promesa debería completarse con valores (no promesas por valores).
    expect( promise ).toFulfillWith( values, done );
  });

  // Sin atajos; cada elemento individual puede ser un valor o una promesa por un valor.

  xit('convierte un <arreglo de valores y promesas> a una <promesa para un arreglo de valores>', function (done) {
    var valuesAndPromises = values.map(value => {
      return Math.random() < 0.5 ? value : $Promise.resolve(value);
    });
    var promise = $Promise.all(valuesAndPromises);
    // la promesa debería completarse con valores (no una mezcla de promesas y valores).
    expect( promise ).toFulfillWith( values, done );
  });

  // Ayuda: da una promesa por un valor, resuelve luego de un set de random delays.

  function slowPromise (value, delay) {
    return new $Promise(function (resolve) {
      setTimeout(
        () => resolve(value),
        delay || (Math.random() * MAX_DELAY)
      );
    });
  }

  // Oops! No estabas chequeando sincrónicamente `._value`, no? Eso no
  // va a funcionar si una promesa sigue pendiente. ¿Recuerdas cómo
  //acceder al eventual valor de la promesa? Vas a necesitar alterar
  // o aumentar tu enfoque aquí.

  xit('convierte un <arreglo de promesas async> en una <promesa para un arreglo de valores>', function (done) {
    var promises = values.map((value, i) => {
      return slowPromise(value, SMALL_DELAY * (i + 1));
    });
    var promise = $Promise.all(promises);
    // la promesa debería completarse con valores…
    // …una vez que esos valores existen
    expect( promise ).toFulfillWith( values, done );
  });

  // No pushees valores simplemente en orden que van terminando.
  // De alguna manera tenés que mantener rastro de que valores
  // van donde en el arreglo final

  xit('convierte un <arreglo de promesas async> (completandose en orden random) en una <promesa para un arreglo de valores> (ordenadas por el index del arreglo original)', function (done) {
    var promises = values.map(slowPromise); // delays random
    var promise = $Promise.all(promises);
    // la promesa debería completarse con valores, y en el
    // orden correcto también!
    expect( promise ).toFulfillWith( values, done );
  });

  // Tan cerca ahora! ¿Qué pasa si una de las promesas falla?

  xit('rechaza con <razon E> cuando uno de las promesas ingresadas rechaza con <razon E>', function (done) {
    // la promesa que rechaza luego de un random delay
    var promiseThatRejects = new $Promise(noop);
    var doomsday = Math.random * MAX_DELAY;
    setTimeout(() => promiseThatRejects._internalReject('any Black Mirror episode'), doomsday);
    // un par de promesas que se van a completar en orden random
    var promises = values.map(slowPromise);
    // mandamos nuestra promesa condenada en algún lugar
    var randomIndex = Math.floor(Math.random() * promises.length);
    promises.splice(randomIndex, 0, promiseThatRejects);
    // espera por todo con $Promise.all
    var promise = $Promise.all(promises);
    // la promesa debería ser rechazada
    expect( promise ).toRejectWith( 'any Black Mirror episode', done );
  });

  // This probably already passes, but let's be sure. We're strict that way.

  xit('no es afectado por rechazos adicionales', function (done) {
    // las promesas que rechaza luego de un random delay
    var doomed = new $Promise(noop);
    var reallyDoomed = new $Promise(noop);
    var doomsday = Math.random * MAX_DELAY;
    var postApocalypse = doomsday + SMALL_DELAY;
    setTimeout(() => doomed._internalReject('I am the first rejection'), doomsday);
    setTimeout(() => reallyDoomed._internalReject('I am too late, ignore me'), postApocalypse);
    // un par de promesas que se completan en orden random
    var promises = values.map(slowPromise);
    // mandamos nuestras promesas condenadas en algún lugar
    var randomIndex1 = Math.floor(Math.random() * promises.length);
    var randomIndex2 = Math.floor(Math.random() * promises.length);
    promises.splice(randomIndex1, 0, doomed);
    promises.splice(randomIndex2, 0, reallyDoomed);
    // espera por todo con $Promise.all
    var promise = $Promise.all(promises);
    // la promesa debería ser rechazada con la primera razón.
    expect( promise ).toRejectWith( 'I am the first rejection', done );
  });

  // Vamos! Como podemos ver, `Promise.all` hace bastante por nosotros.
  // Basicamente, podemos dar `.all` un arreglo conteniendo cualquier
  // mezcla de valores y promesas con tiempos aleatorios. En retorno,
  // `.all` nos da una promesa para todos los valores eventuales,
  // manteniendo el orden original del arreglo incluso si la promesa se
  // completa en cualquier orden. Y si cualquiera de las promesas ingresadas
  // falla, la promesa que retorna falla inmediatamente con la misma razón
  // de rechazo.
});

});

// No te olvides de `git commit`!
