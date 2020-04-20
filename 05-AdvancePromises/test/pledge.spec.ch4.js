'use strict';
describe('Chapter 4: Promise Chaining y Transformación', function(){
/*=======================================================


                            d8888
                           d8P888
                          d8P 888
                         d8P  888
                        d88   888
                        8888888888
                              888
                              888


Capítulo 4: Las Promises pueden retornar valores y conectarse entre ellas
---------------------------------------------------------*/
// Un aspecto crucial de las promises es que `.then` siempre
// retorna una nueva promesa. Cuando los valores son retornados
// por el handler de promise A, son exportados y representados
// por la promesa B retornada. Esto lleva a un comportamiento
// remarcadamente versatil: Elegir cuando atrapar los errores,
// conectando promesas juntas, fácilmente pasar alrededor valores
// de las promesas y actuar sobre ellos cuando sea conveniente...
// incluso retornar nuevos valores.
// Este capitulo puede ser dificultoso.
/*========================================================*/

/* global $Promise customMatchers */
/* eslint no-throw-literal: 0 */

function noop () {}

describe('por una dada promiseA (pA)', function(){

  var promiseA, thisReturnsHi, thisThrowsShade;
  beforeEach(function(){
    promiseA = new $Promise(noop);
    thisReturnsHi = function () { return 'hi'; };
    thisThrowsShade = function () { throw 'shade'; };
  });

  // Nuestras promise padres deben mantener algún tipo de
  // referencia a la promesa de abajo (downstreamPromise)
  // en orden de controlar el chaining

  it('`.then` agregá una nueva promesa a su handlerGroups', function(){
    promiseA.then();
    var groups = promiseA._handlerGroups;
    expect( groups[0].downstreamPromise instanceof $Promise ).toBe( true );
    // cada handler group tiene su propio `downstreamPromise`
    promiseA.then();
    expect( groups[1].downstreamPromise instanceof $Promise ).toBe( true );
    expect( groups[1].downstreamPromise ).not.toBe( groups[0].downstreamPromise );
  });

  // Pasar esto puede romper tu `.catch` del capítulo 3. Si eso pasase,
  // vas a tener que ir para atras y arreglar `.catch`, tomando este
  // spec en cuenta.

  it('`.then` devuelve ese downstreamPromise', function(){
    var promiseB = promiseA.then();
    expect( promiseB ).toBe( promiseA._handlerGroups[0].downstreamPromise );
  });

  // Esta sección esta detallada en la Promises Flowchart. Referíte al PDF.

  describe('que devuelve promiseB (pB) via `.then`:', function(){

    var FAST_TIMEOUT = 10;

    /* (En `utils/custom.matchers.js`, nos permite testear tu promise limpiamente.) */
    beforeEach(function(){
      jasmine.addMatchers(customMatchers);
    });

    // Fulfillment baja al primer success handler disponible.

    it("si pA es completado pero no tiene un success handler, pb es completado con el valor de pA", function (done) {
      var promiseB = promiseA.then();
      promiseA._internalResolve( 9001 );
      // No setea un estado manualmente; un resolver debería ser llamado.
      expect( promiseB._state ).toBe( 'fulfilled' );
      expect( promiseB._value ).toBe( 9001 );
      // Lo de arriba es una pista; de ahora en adelante vamos a usar
      // este matcher personalizado.
      // Ignorá el `done`, necesario porque Jasmine no soporta async matchers.
      expect( promiseB ).toFulfillWith( 9001, done );
    }, FAST_TIMEOUT);

    // Rejection baja al primer error handler disponible.

    it("Si pA es rechazado pero no tiene un error handler, pB es rechazado con la razón de pA", function (done) {
      var promiseB = promiseA.then();
      promiseA._internalReject( 'darn' );
      // No setea el estado manualmente; un rejector debería ser llamado
      expect( promiseB._state ).toBe( 'rejected' );
      expect( promiseB._value ).toBe( 'darn' );
      // Lo de arriba es una pista; de ahora en adelante vamos a usar
      // este matcher personalizado.
      expect( promiseB ).toRejectWith( 'darn', done );
    }, FAST_TIMEOUT);

    // Esto es para valores normales (sincrónico / non-promise) retornados

    it("si el success handler de pA retorna un valor `x` pB es completado con `x`", function (done) {
      var promiseB = promiseA.then( thisReturnsHi );
      promiseA._internalResolve();
      expect( promiseB ).toFulfillWith( 'hi', done );
    }, FAST_TIMEOUT);

    // Esto es para valores normales (sincrónico / non-promise) retornados

    it("si el error handler de pA retorna un valor `x`, pB es completado con `x`", function (done) {
      // ¿Por qué completado? Esto es similar a `try`-`catch`. Si la
      // promiseA es rechazada (equivalente a un `try` fallido), pasamos
      // la razón al error handler de promiseA (equivalente a `catch`).
      // Ahora hemos manejado el error correctamente, entonces promiseB
      // debería representar el error handler retornando algo útil, no un
      // nuevo error. promiseB solo rechazaría si el error handler por si
      // mismo falla de alguna forma (el cual ya fue abordado en un test previo).

      var promiseB = promiseA.catch( thisReturnsHi );
      promiseA._internalReject();
      expect( promiseB ).toFulfillWith( 'hi', done );
    }, FAST_TIMEOUT);

    // Excepciones causan que la promesa retornado sea rechazada con un error
    // Pista: vas a necesitar usar `try` & `catch` para hacer que esto funcione

    it("si el success handler de pA arroja una razon `e`, pB es rechazada con `e`", function (done) {
      var promiseB = promiseA.then( thisThrowsShade );
      promiseA._internalResolve();
      expect( promiseB ).toRejectWith( 'shade', done );
    }, FAST_TIMEOUT);

    it("si el error handler de pA arroja una razon `e`, pB es rechazada con `e`", function (done) {
      var promiseB = promiseA.catch( thisThrowsShade );
      promiseA._internalReject();
      expect( promiseB ).toRejectWith( 'shade', done );
    }, FAST_TIMEOUT);

    // ¿Qué pasa si promiseA retorna una promesaZ? Podrías manejar pZ
    // como un valor normal, pero luego vas a tener que empezar escribiendo
    // `.then` dentro de `.then`. En cambio, queremos hacer promiseB ser pZ
    // copiando el comportamiento de pZ - a.k.a asimilación. EStos cuatro
    // tests pueden causar dolores de cabeza

    it("si el success handler de pA retorna pZ que se completa, pB imita a pZ", function (done) {
      var promiseZ = new $Promise(noop);
      var promiseB = promiseA.then(function(){
        return promiseZ;
      });
      promiseA._internalResolve();
      promiseZ._internalResolve( 'testing' );
      expect( promiseB ).toFulfillWith( 'testing', done );
    }, FAST_TIMEOUT);

    it("si el error handler de pA retorna pZ la cual se completa, pB imita a pZ", function (done) {
      var promiseZ = new $Promise(noop);
      var promiseB = promiseA.catch(function(){
        return promiseZ;
      });
      promiseA._internalReject();
      promiseZ._internalResolve( 'testing' );
      expect( promiseB ).toFulfillWith( 'testing', done );
    }, FAST_TIMEOUT);

    it("si el success handler de pA retorna pZ que se rechaza, pB imita a pZ", function (done) {
      var promiseZ = new $Promise(noop);
      var promiseB = promiseA.then(function(){
        return promiseZ;
      });
      promiseA._internalResolve();
      promiseZ._internalReject( 'testing' );
      expect( promiseB ).toRejectWith( 'testing', done );
    }, FAST_TIMEOUT);

    it("si el error handler de pA retorna pZ que se rechaza, pB imita a pZ", function (done) {
      var promiseZ = new $Promise(noop);
      var promiseB = promiseA.catch(function(){
        return promiseZ;
      });
      promiseA._internalReject();
      promiseZ._internalReject( 'testing' );
      expect( promiseB ).toRejectWith( 'testing', done );
    }, FAST_TIMEOUT);

    // Para realmente testear de forma apropiada asimilación
    // requeriría muchos mas specs. Pero no vamos a ser tan estrictos.

    // Todo los specs de arriba colocan su promesa LUEGO de retornar
    // la nueva promesa. Pero por supuesto podés conectar en promesas
    // ya colocadas! Tu solución puede ya estar pasando esto.
    // Pero quizás no...
    it('igual conecta correctamente si la promesa ya esta colocada', function (done) {
      // utility / helper functions
      var count = 0, shouldFulfill, shouldReject;
      function countPassed () { if (++count === 10) done(); }
      Object.assign(countPassed, done);
      function thisReturnsFulfilledPromise () {
        return new $Promise(resolve => resolve('yea'));
      }
      function thisReturnsRejectedPromise () {
        return new $Promise((resolve, reject) => reject('nay'));
      }
      // promiseA start points
      var fulfilledPromise = thisReturnsFulfilledPromise();
      var rejectedPromise = thisReturnsRejectedPromise();
      // bubbling works
      shouldFulfill = fulfilledPromise.then();
      expect( shouldFulfill ).toFulfillWith( 'yea', countPassed );
      shouldReject = rejectedPromise.then();
      expect( shouldReject ).toRejectWith( 'nay', countPassed );
      // returning values works
      shouldFulfill = fulfilledPromise.then( thisReturnsHi );
      expect( shouldFulfill ).toFulfillWith( 'hi', countPassed );
      shouldFulfill = rejectedPromise.catch( thisReturnsHi );
      expect( shouldFulfill ).toFulfillWith( 'hi', countPassed );
      // throwing values works
      shouldReject = fulfilledPromise.then( thisThrowsShade );
      expect( shouldReject ).toRejectWith( 'shade', countPassed );
      shouldReject = rejectedPromise.catch( thisThrowsShade );
      expect( shouldReject ).toRejectWith( 'shade', countPassed );
      // returning promises works
      shouldFulfill = fulfilledPromise.then( thisReturnsFulfilledPromise );
      expect( shouldFulfill ).toFulfillWith( 'yea', countPassed );
      shouldReject = fulfilledPromise.then( thisReturnsRejectedPromise );
      expect( shouldReject ).toRejectWith( 'nay', countPassed );
      shouldFulfill = rejectedPromise.catch( thisReturnsFulfilledPromise );
      expect( shouldFulfill ).toFulfillWith( 'yea', countPassed );
      shouldReject = rejectedPromise.catch( thisReturnsRejectedPromise );
      expect( shouldReject ).toRejectWith( 'nay', countPassed );
    });

  });

  // Otra demostración. Esto debería funcionar si los previos specs pasaron.

  it('`.then` puede ser encadenado muchas veces', function(){
    var add1 = function (num) { return ++num; };
    var test = 0;
    promiseA
    .then(add1)
    .then(add1)
    .then()
    .then(function (data) {
      test = data;
    });
    promiseA._internalResolve( 0 );
    expect( test ).toBe( 2 );
  });
});


// Wow! Si llegaste tan lejos, felicitaciones. Hemos omitido ciertos
// detalles (por ejemplo: los handlers debén siempre ser llamados en
// un verdadero async wrapper), pero haz construido una libreria de
// promesas con la mayoría del comportamiento standard. En el siguiente
// capítulo (opcional, pero recomendado), va a añadir algunos métodos
// comunes de la libreria que hacen trabajar con promesas más fácil
// y prolijo.

});

// No te olvides de `git commit`!
