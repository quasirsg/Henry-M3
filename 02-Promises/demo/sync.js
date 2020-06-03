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


p1.then(funcion(valordep1) {
  return p2; // si p2  es una promesa;
}).then(function(valordeP2) {
  return p3; // si p3 es otra promesa;
}).then(function(valordeP3){
  
});