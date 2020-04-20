'use strict';
describe('Capítulo 2: Fulfillment Callback Attachment', function(){
/*======================================================


                         .d8888b.
                        d88P  Y88b
                               888
                             .d88P
                         .od888P"
                        d88P"
                        888"
                        888888888


Capítulo 2: Adjuntando y llamando Promise Event Handlers
--------------------------------------------------------*/
// Estamos comenzando a ver como una promesa puede ser manipulada
// a través  del executor. ¿Pero qué hace realmente una promesa?
// Al completar este capitulo, vas a aprender los fundamentos de
// como las promesas actuan con información eventual
/*========================================================*/

/* global $Promise */

function noop () {}

// `then` es el core del comportamiento de las promesas. De hecho,
// el P/A+ spec que foma los fundamentos del spec de ES6 solo cubre
// este método. La función `then` es usada para registrar *handlers*
// si y cuando la promesa se completa o rechaza.
describe("El método .then de una promesa", function(){

  var promise, s1, e1, s2, e2;
  beforeEach(function(){
    promise = new $Promise(noop);
    s1 = function (/* data */)   { /* use data */ };
    e1 = function (/* reason */) { /* handle reason */ };
    s2 = function (/* data */)   { /* use data */ };
    e2 = function (/* reason */) { /* handle reason */ };
  });

  it('agrega grupos de handlers (funciones callbacks) a la promesa', function(){
    promise.then( s1, e1 );
    expect( promise._handlerGroups[0].successCb ).toBe( s1 );
    expect( promise._handlerGroups[0].errorCb   ).toBe( e1 );
  });

  // Esto es llamar `then` en la misma promesa multiples veces,
  // el cual no es lo mismo que "chaining". Vamos a ver promise
  // chaining en el Cap. 4.

  it('puede ser llamado multiples veces para añadir mas handlers', function(){
    promise.then( s1, e1 );
    expect( promise._handlerGroups[0].successCb ).toBe( s1 );
    expect( promise._handlerGroups[0].errorCb   ).toBe( e1 );
    promise.then( s2, e2 );
    expect( promise._handlerGroups[1].successCb ).toBe( s2 );
    expect( promise._handlerGroups[1].errorCb   ).toBe( e2 );
  });

  it('agrega un valor falso en lugar de callbacks que no son funciones en el success o error', function(){
    promise.then( 'a string', {} );
    expect( promise._handlerGroups[0].successCb ).toBeFalsy();
    expect( promise._handlerGroups[0].errorCb   ).toBeFalsy();
  });

});

// Ahora viene una de las partes mágicas de las promesas, la
// forma en que pueden disparar handlers para ambos, cuando se
// colocan y cuando ya han sido colocados.

describe('Una promise', function(){

  var promiseForNum, foo;
  var setFoo10 = jasmine.createSpy('setFoo10').and.callFake(function () {
    foo = 10;
  });
  var addToFoo = jasmine.createSpy('addToFoo').and.callFake(function (num) {
    foo += num;
  });
  beforeEach(function(){
    promiseForNum = new $Promise(noop);
    foo = 0;
    setFoo10.calls.reset();
    addToFoo.calls.reset();
  });

  describe('que no se ha completado todavía', function(){

    it('no llama ningún success handler aún', function(){
      promiseForNum.then( setFoo10 );
      expect( setFoo10 ).not.toHaveBeenCalled();
    });

  });

  describe('que ya esta completada', function(){

    beforeEach(function(){
      promiseForNum._internalResolve( 25 );
    });

    // Recomendado: agergá un método `._callHandlers` al prototipo de tu promesa

    it('llama al success handles agregado por `.then`', function(){
      promiseForNum.then( setFoo10 );
      expect( setFoo10 ).toHaveBeenCalled();
    });

    it("llama un success handler pasando el valor de la promesa", function(){
      promiseForNum.then( addToFoo );
      expect( addToFoo ).toHaveBeenCalledWith( 25 );
    });

    it('llama a cada success handler, una vez por cada adhesión', function(){
      promiseForNum.then( setFoo10 );
      promiseForNum.then( addToFoo );
      promiseForNum.then( addToFoo );
      expect( setFoo10.calls.count() ).toBe( 1 );
      expect( addToFoo.calls.count() ).toBe( 2 );
      expect( addToFoo ).toHaveBeenCalledWith( 25 );
    });

    it('llama cada success handler cuando es añadido', function(){
      promiseForNum.then( setFoo10 );
      expect( foo ).toBe( 10 );
      promiseForNum.then( addToFoo );
      expect( foo ).toBe( 35 );
    });

  });

  // Entonces podemos correr callbacks si ya tenemos el valor.
  // ¿Pero qué pasa si el evento ocurre en orden opuesto?

  describe('que ya tiene un success handler', function(){

    it('llama ese handler cuando es completado', function(){
      promiseForNum.then( setFoo10 );
      promiseForNum._internalResolve();
      expect( setFoo10 ).toHaveBeenCalled();
    });

    it('llama todos los success handlers en orden una vez cuando son completados', function(){
      promiseForNum.then( setFoo10 );
      promiseForNum.then( addToFoo );
      promiseForNum._internalResolve( 25 );
      expect( foo ).toBe( 35 );
    });

  });

});


// Hemos hecho algo elegante. El `.then` de la promesa puede adjuntar
// comportamiento antes y después de que la promesa este completada,
// y sabemos que las acciones van a correr cuando puedan. El método
// `.then` puede también ser llamado multiples veces, así podes adjuntar
// callbacks para correr en diferentes pares del código, y van a poder
// correr una vez la promesa se complete.

});

// ¡No te olvides de `git commit`!
