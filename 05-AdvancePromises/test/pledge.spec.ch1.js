'use strict';

// Promises Workshop: Construye una implementación de un Constructor

// Vamos a construir una libreria de promesas similar a ES6, llamada
// pledge.js. Nuestras promesas van a llamarse "$Promise" para evitar disparar
// código existente del browser. Para concentrarte en los conceptos, pledge.js
// va usar muchas variables públicas y no ser obediente al standard.

// Para ejecutar los spec, corre `npm test` en este directorio. Cuando pases un
// test, cambia el siguiente test pendiente a activo. Este spec es iterativo y
// opinionado; haz los tests en orden.



describe('Capitulo 1: Estructura y Estado', function(){
/*======================================================


                           d888
                          d8888
                            888
                            888
                            888
                            888
                            888
                          8888888


Chapter 1: Estructura básica y Cambios de Estado
--------------------------------------------------------*/
// Comencemos con una parte esencial y empecemos a
// definir como se construye la promesa, el argumento `executor`,
// y resolution / rejection.
/*========================================================*/

/* global $Promise */

// Incluso antes  de las ES6 `class`, devs normalmente llamaban ciertas
// funciones como "clases". A pesar que JS no es un lenguaje basado en clases,
// todavía tendemos hablar en terminos de constructores e instancias

describe('La clase `$Promise`', function(){

  it('es una función', function(){
    expect( typeof $Promise ).toBe( 'function' );
  });

  // El único argumento de un contructor de una promesa es una función llamada
  // el "executor". Vamos a volver a esta función mas adelante.

  it('puede ser llamado con una argumento de función (el "executor"), devolviendo una nueva instancia de promesa', function(){
    var executor = function () {};
    var promise = new $Promise(executor);
    expect( promise instanceof $Promise ).toBe( true );
  });

  // El chequeo de tipo imita el rigor de promesas reales de ES6

  it('arroja un error descriptivo si es llamado sin función como argumento', function(){
    var nonFunctions = [null, 'bonjour', undefined, 452, {}, false];
    nonFunctions.forEach(function (nonFunction) {
      expect(callingNewPromiseWith(nonFunction)).toThrowError(
        TypeError,
        /executor.+function/i // cualquier mensaje de error conteniendo "executor y luego "function"
      );
    });
    function callingNewPromiseWith (argument) {
      return function mightThrowError () {
        var promise = new $Promise(argument); // eslint-disable-line no-unused-vars
      };
    }
  });

});

describe('Una instancia de promesa', function() {

  var promise;
  beforeEach(function(){
    var executor = function () {};
    promise = new $Promise(executor);
  });

  // Las promesas internamente tienen un estado (cambiando informacion), que a
  // su vez afecta como se comporta. Promises son como una maquina de estado.


  // JavaScript carece algunos controles de privacidad comparado a otros
  // lenguajes. Una convención común es usar un esquema de nombres para
  // marcar un método como "privado". Comenzando métodos con un `._underscore`
  // es una señal de esto.

  it('comienza con un estado interno "pending"', function(){
    expect( promise._state ).toBe( 'pending' );
  });

  // Nota - las promesas no estan supuestas a tener un método resolver
  // y rejector público. Sin embargo, esconder estas implementaciones puede
  // ser complicado.

  it('tiene un método de instancia `._internalResolve` ', function () {
    expect( typeof promise._internalResolve ).toBe( 'function' );
  });

  it('tiene un métido de instancia `._internalReject`', function () {
    expect( typeof promise._internalReject ).toBe( 'function' );
    expect( promise._internalReject ).not.toBe( promise._internalResolve );
  });

  // Tenemos una base configurada, ahora trabajemos en el comportamiento

  describe('resolviendo ', function(){

    it('cambia el estado de la promesa a "fulfilled"', function(){

      // ¿Por qué no "resolved"? Esto va a ser visto en detalle en el Ch. 5,
      // pero por ahora sabe que la terminología de P/A+ estricto dibuja una
      // distinción entre "resolution" y "fullfillment". Normalmente una
      // promesa "resolved" esta también "fulfilled", pero en un caso
      // particular, una promesa "resolved" es realmente "rejectes". No
      // tenes que saber por qué aún.

      promise._internalResolve();
      expect( promise._state ).toBe( 'fulfilled' );
    });

    it('puede enviar data a la promesa para almacenamiento', function(){
      var someData = { name: 'Harry Potter' };
      promise._internalResolve( someData );
      expect( promise._value ).toBe( someData );
    });

    // Pista: usa el estado pending.

    it('no afecta una promesa ya completada', function(){
      var data1 = { name: 'Harry Potter' };
      var data2 = { name: 'Gandalf' };
      promise._internalResolve( data1 );
      promise._internalResolve( data2 );
      expect( promise._value ).toBe( data1 );
    });

    it('funciona hasta con valores falsos', function(){
      var data1; // undefined; podría funcionar también con null, 0, false, etc.
      var data2 = 'oops!';
      promise._internalResolve( data1 );
      promise._internalResolve( data2 );
      expect( promise._value ).toBe( data1 );
    });
  });

  describe('rechazando ', function(){

    // Rejection y fulfillment son virtualmente idénticas. esto no deberia
    // requerir mucho mas código

    it('cambia el estado de la promesa a "rejected"', function(){
      promise._internalReject();
      expect( promise._state ).toBe( 'rejected' );
    });

    it('puede enviar una razón a la promesa para almacenamiento', function(){
      var myReason = { error: 'bad request' };
      promise._internalReject( myReason );
      expect( promise._value ).toBe( myReason );
    });

    it('no afecta un promesa ya rechazada', function(){
      var reason1 = { error: 'bad request' };
      var reason2 = { error: 'timed out' };
      promise._internalReject( reason1 );
      promise._internalReject( reason2 );
      expect( promise._value ).toBe( reason1 );
    });

    it('funciona hasta con valores falsos', function(){
      var reason1;
      var reason2 = 'oops!';
      promise._internalReject( reason1 );
      promise._internalReject( reason2 );
      expect( promise._value ).toBe( reason1 );
    });

  });

  describe('una promesa colocada nunca cambia el estado', function(){

    // Si usaste el estado pending para los specs "no afecta un promesa ya
    // completada /rechazada", estos dos specs deberían ya estar pasando.

    it('`reject` no sobreescribe fullfilled', function(){
      promise._internalResolve( 'Dumbledore' );
      promise._internalReject( 404 );
      expect( promise._state ).toBe( 'fulfilled' );
      expect( promise._value ).toBe( 'Dumbledore' );
    });

    it('`resolve` no sobreescribe rejected', function(){
      promise._internalReject( 404 );
      promise._internalResolve( 'Dumbledore' );
      expect( promise._state ).toBe( 'rejected' );
      expect( promise._value ).toBe( 404 );
    });

  });

});

// El constructor Promise toma un argumento (de hecho, ES6 Promise *tienen*
// que recibir este argumento, o arrojar un error): una función "executor".
// El executro va a ser llamado con dos argumentos: un "resolver
// y un "rejector"

// El executor es una forma para el creador de una nueva promesa de controlar
// el destino de esa promesa. Recuerda, `._internalResolve` es como nosotros
// estamos implementando nuestras promesas, pero los usuarios normalmente no
// pretendemos que tengan acceso a eso directmente. Esto es principalmente
// para prevenir abuso: promises son pretendidas para representar el
// resultado de una acción asincrónica, pero si *cualquiera* puede llamar
// `.internalResolve`, no podemos confiar más que la promesa se coloca por
// el async original. Dado que el executor solo corre cuando la promesa es
// construida, el acceso al resolver y rejector es naturalmente limitado,
// haciendo la promesa más confiable.

describe('La función executor', function(){

  var executor;
  beforeEach(function(){
    executor = jasmine.createSpy();
  });

  it('es llamada cuando hacemos una nueva $Promise', function(){
    expect( executor ).not.toHaveBeenCalled();
    var promise = new $Promise(executor); // eslint-disable-line no-unused-vars
    expect( executor ).toHaveBeenCalled();
  });

  it('es llamado con dos funciones distintas (funception!), resolve y reject', function(){
    var promise = new $Promise(executor); // eslint-disable-line no-unused-vars
    var argsPassedIntoExecutor = executor.calls.argsFor(0);

    expect(argsPassedIntoExecutor.length).toBe(2);
    var resolve = argsPassedIntoExecutor[0];
    var reject = argsPassedIntoExecutor[1];

    expect( typeof resolve ).toBe( 'function' );
    expect( typeof reject ).toBe( 'function' );
    expect( resolve ).not.toBe( reject );
  });

  describe('argumento resolve', function(){

    // Para este punto puedes intentar una aproximación, solo para ser bloqueado
    // por errores como "cannot read X of undefined". Piensa cuidadosamente;
    // puedes tener un problema con el *contexto* (el keyword `this`)
    it('resuelve la promesa', function(){
      var promise = new $Promise(function (resolve) {
        resolve('WinGARdium leviOHsa.');
      });
      expect( promise._state ).toBe( 'fulfilled' );
      expect( promise._value ).toBe( 'WinGARdium leviOHsa.' );
    });

    // No hagas trampa! La función resolver y rejector provistar al executor
    // deberian ser (o llamar) a los metodos resolve y reject internos. Después
    // de todo, trabajaste muy duro para asegurarte `._internalResolve` y
    // `._internalReject` funcionan apropiadamente.

    it('es indistinguible en comportamiento a `._internalResolve`', function () {
      var resolver;
      var promise = new $Promise(function (resolve) {
        resolve('Use the promise machinery, Luke.');
        resolver = resolve;
      });
      // Podemos estropear el estado?
      resolver('No, Luke. I am your resolver.');
      promise._internalReject("No, that's impossible!");
      promise._internalResolve('Search your feelings, Luke.');
      // No, `resolve` es o usa `._internalResolve`.
      expect( promise._state ).toBe( 'fulfilled' );
      expect( promise._value ).toBe( 'Use the promise machinery, Luke.' );
    });

  });

  describe('argumento reject', function () {

    // De nuevo, la resolución y el rechazo son basicamente lo mismo.

    it('rechaza la promesa', function(){
      var promise = new $Promise(function (resolve, reject) {
        reject('Stupefy!');
      });
      expect( promise._state ).toBe( 'rejected' );
      expect( promise._value ).toBe( 'Stupefy!' );
    });

    it('es indistinguible en comportamiento a `._internalReject`', function () {
      var rejector;
      var promise = new $Promise(function (resolve, reject) {
        reject('You must unlearn what you have learned.');
        rejector = reject;
      });
      // Podemos estropear el estado?
      rejector('No! Try not. Do. Or do not. There is no try.');
      promise._internalReject("I don't believe it!");
      promise._internalResolve('That is why you fail.');
      // No, `reject` es o usa `._internalReject`.
      expect( promise._state ).toBe( 'rejected' );
      expect( promise._value ).toBe( 'You must unlearn what you have learned.' );
    });

  });

  // Esta parte debería pasar si hiciste lo de arriba correctamente.
  // Seguí la lógica:

  it('por lo tanto permite al *creator* de una nueva promesa controlar su destino, incluso asincrónicamente!', function (done) {

    var promise3 = new $Promise(function (resolve) {
      setTimeout(function runsInTheFuture () {
        resolve('Wow, the future is so cool.');
      }, 50);
    });

    expect( promise3._state ).toBe( 'pending' );
    expect( promise3._value ).toBe( undefined );

    setTimeout(function runsInTheFarFuture () {
      expect( promise3._state ).toBe( 'fulfilled' );
      expect( promise3._value ).toBe( 'Wow, the future is so cool.' );
      done();
    }, 100);
  });

});

// A este punto tenemos unos hechos básicos establecidos. Una promesa empieza
// con un estado *pending* y ningun valor. En un punto, la promesa puede estar
// *fulfilled* con data, o *rejected* con una razón. Una vez *colocada* (
// fulfilled o rejected), una promesa esta trabada en ese estado y no puede ser
// cambiada.
});

// No te olvides de `git commit`!
