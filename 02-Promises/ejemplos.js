
var Promise = require('bluebird');

var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve('a'); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};


var segundoMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve('segundo');
      }, 2000);
   });
   return promise;
};

var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         // console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('tercero');
      }, 3000);
   });
   return promise;
};

// primerMetodo()
//    .then(segundoMetodo)
//    .then(tercerMetodo)
//    .then(function(datos){
//         console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
//    }).catch(function(err){
//       console.log('error '+ err);
//    });
// console.log('asas')
let p1 = primerMetodo();
var p2 = segundoMetodo();
var p3 = tercerMetodo();
var p = Promise.all([p1, p2, p3])
    .then(function(resultado){
        console.log(resultado); //un arreglo con los valores pasamos a resolve en cada metodo
    }).catch( function(err){
        console.warn(err); //mostramos el error por consola. Veremos que es el que falló primero, o sea el del primer metodo
    });



setInterval (function () {
   console.log(PromiseInspection(p))
      }, 500);