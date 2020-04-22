'use strict';
describe('Capítulo 3: Rejection Callback Attachment', function(){
/*=======================================================


                         .d8888b.
                        d88P  Y88b
                             .d88P
                            8888"
                             "Y8b.
                        888    888
                        Y88b  d88P
                         "Y8888P"


Capítulo 3: Completando los Handlers: Rejection & Catch
---------------------------------------------------------*/
// Con `.resolve` enviando y `.then` actuando en data, tenemos
// una mayor parte de las promeses funcionando. Rejection es similar;
// termina la agregación de callback de promesas en este capítulo.
/*========================================================*/

/* global $Promise */

function noop () {}

describe('Otra promise', function(){

  var promiseForThing, log;
  var logOops = jasmine.createSpy('logOops').and.callFake(function () {
    log.push({ code: 'oops' });
  });
  var logInput = jasmine.createSpy('logInput').and.callFake(function (input) {
    log.push(input);
  });
  beforeEach(function(){
    promiseForThing = new $Promise(noop);
    log = [];
    logOops.calls.reset();
    logInput.calls.reset();
  });

  describe('que todavía no es rechazada', function(){

    it('no llama a los errors handlers aún', function(){
      promiseForThing.then( null, logOops );
      expect( logOops ).not.toHaveBeenCalled();
    });

  });

  describe('que ya esta rechazada', function(){

    var theReason = { code: 'timed out' };
    beforeEach(function(){
      promiseForThing._internalReject( theReason );
    });

    // If you get "not a function" errors, think carefully about
    // what happens when you call `.then`. What is getting added
    // to the `handlerGroups`? What is your code trying to do with
    // those `handlerGroups`? There is going to have to be some
    // sort of "safety check" somewhere…

    it('no llama a ningún success handler', function(){
      promiseForThing.then( logOops );
      expect( logOops ).not.toHaveBeenCalled();
    });

    it('llama un error handler agregado por `.then`', function(){
      promiseForThing.then( null, logOops );
      expect( logOops ).toHaveBeenCalled();
    });

    it("llama un error handler pasando el valor de la promesa", function(){
      promiseForThing.then( null, logInput );
      expect( logInput ).toHaveBeenCalledWith( theReason );
    });

    it('llama una vez cada error handler adjuntado', function(){
      promiseForThing.then( null, logOops );
      promiseForThing.then( null, logInput );
      promiseForThing.then( null, logInput );
      expect( logOops.calls.count() ).toBe( 1 );
      expect( logInput.calls.count() ).toBe( 2 );
      expect( logInput ).toHaveBeenCalledWith( theReason );
    });

    it('llama cada error handler en el orden agregado', function(){
      promiseForThing.then( null, logOops );
      promiseForThing.then( null, logInput );
      expect( log ).toEqual( [{ code: 'oops'}, {code: 'timed out'}] );
    });

  });

  describe('que ya tiene un error handler', function(){

    var theReason = { code: 'unauthorized' };

    it('llama a ese handler cuando es rechazado', function(){
      promiseForThing.then( null, logInput );
      promiseForThing._internalReject( theReason );
      expect( logInput ).toHaveBeenCalledWith( theReason );
    });

    it('llama a todos sus errors handlers en orden una vez cuando es rechazado', function(){
      promiseForThing.then( null, logInput );
      promiseForThing.then( null, logOops );
      promiseForThing._internalReject( theReason );
      expect( log ).toEqual( [{code: 'unauthorized'}, {code: 'oops'}] );
    });

  });

  // Esta parte es una demostración; con resolution y rejection
  // funcionando, promeses pueden ser usadas como un reemplazo al callback

  describe('con ambos success y error handlers', function(){

    var ui;
    beforeEach(function(){
      ui = {
        animals: ['kitten', 'puppy'],
        warning: null
      };

      promiseForThing.then(
        function thingSuccess (thing) {
          ui.animals.push( thing.animal );
        },
        function thingError (reason) {
          ui.warning = reason.message;
        }
      );

    });

    it('puede hacer cosas con data completada', function(){
      promiseForThing._internalResolve({ animal: 'duckling' });
      expect( ui.animals[2] ).toBe( 'duckling' );
    });

    it('puede lidear con razones del reject', function(){
      promiseForThing._internalReject({ message: 'unauthorized' });
      expect( ui.warning ).toBe( 'unauthorized' );
    });

    // Opcional pero recomendable garbage collection

    it('descarta handlers que no son más necesarios', function(){
      promiseForThing._internalResolve({ animal: 'chipmunk' });
      expect( promiseForThing._handlerGroups ).toEqual( [] );
    });

  });

});

// Un rápido desvío mientras estamos terminando rejections: agregá
// un método `.catch` a tu promise prototype. Las internas de este
// metodo pueden ser codeadas en una corta linea

describe("Un metodo `.catch`", function(){

  var promise;
  beforeEach(function(){
     promise = new $Promise(noop);
     spyOn( promise, 'then' ).and.callThrough();
  });
  function myFunc (reason) { console.log(reason); }

  it('adjunta la función pasada como un error handler', function(){
    promise.catch( myFunc );
    expect( promise.then ).toHaveBeenCalledWith( null, myFunc );
  });

  // Este spec probablemente ya este pasando en este punto, porque
  // por defecto todas las funciones devuelven `undefined`. Sin embargo,
  // cuando empecemos Cap. 4, esto puede fallar. Si eso pasa, vas a tener
  // que retornar aquí y arreglar `.catch` - esta vez, tomando los specs
  // del Cap 4 en cuenta.

  it('devuelve lo mismo que .then devolvería', function(){
    var catchReturn = promise.catch( myFunc );
    var thenReturn = promise.then( null, myFunc );
    [catchReturn, thenReturn].forEach(sanitize);
    // debería ser visualmente identico (pero no son necesariamente ===):
    expect( catchReturn ).toEqual( thenReturn );
  });

  // La utilidad para simplificar el valor retornado. No siempre necesario, pero algunas soluciones validas no siempre funcionan con normal `toEqual`.

  function sanitize (val) {
    if (!val || typeof val !== 'object') return;

    Object.keys(val)
    .filter(key => typeof val[key] === 'function')
    .forEach(key => {
      val[key] = (val[key].name.trim() || 'anonymous') + ' function';
    });
  }

});

// Eso termina la adhesión y el disparador de nuestros handlers!
// En el siguiente capítulo, vamos a bucear en las profundidades
// de como `.then` chaining funciona realmente. Este comportamiento
// es lo que lleva a las promesas mas alla de ser solamente callbacks
// portables, los transforma en dinamicos, vesatiles poderosos, y
// manipulables máquinas.

});

// No te olvides de `git commit`!
