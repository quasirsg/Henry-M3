'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
// function $Promise(executor) {
//   if(typeof executor != 'function') throw new TypeError('executor should be a function');
//   this._state = 'pending';
//   this._handlerGroups = [];
//   executor((value) => {
//     this._internalResolve(value);
//   }, (reason) =>{
//     this._internalReject(reason);
//   });
// }

// $Promise.prototype._callHandlers = function _callHandlers() {
//   while(this._handlerGroups.length) {
//     var handler = this._handlerGroups.shift();
//     if (this._state == 'fulfilled') {
//       if(!handler.successCb) {
//         handler.downstreamPromise._internalResolve(this._value);
//       } else {
//         try {
//           var result = handler.successCb(this._value);
//           if (result instanceof $Promise) {
//             result.then((val) => {
//               handler.downstreamPromise._internalResolve(val);
//             },(err) => {
//               handler.downstreamPromise._internalReject(err);
//             });
//           } else {
//             handler.downstreamPromise._internalResolve(result);
//           }
//         } catch (e) {
//           handler.downstreamPromise._internalReject(e);
//         }
//       }
//     }
//     if (this._state == 'rejected') {
//       if(!handler.errorCb) {
//         handler.downstreamPromise._internalReject(this._value);
//       } else {
//         try {
//           var result = handler.errorCb(this._value);
//           if (result instanceof $Promise) {
//             result.then((val) => {
//               handler.downstreamPromise._internalResolve(val);
//             },(err) => {
//               handler.downstreamPromise._internalReject(err);
//             });
//           } else {
//             handler.downstreamPromise._internalResolve(result);
//           }
//         } catch (e) {
//           handler.downstreamPromise._internalReject(e);
//         }
//       }
//     }
//   }
// };

// $Promise.prototype.then = function then(successCb, errorCb) {
//   successCb = typeof successCb != 'function' ? false : successCb;
//   errorCb = typeof errorCb != 'function' ? false : errorCb;
//   var downstreamPromise = new $Promise(() => {});
//   this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
//   if(this._state != 'pending') this._callHandlers();
//   return downstreamPromise;
// };

// $Promise.prototype._internalResolve = function _internalResolve(value) {
//   if(this._state == 'pending') {
//     this._state = 'fulfilled';
//     this._value = value;
//     this._callHandlers();
//   }
// };

// $Promise.prototype._internalReject = function _internalReject(reason) {
//   if(this._state != 'pending') return;
//   this._state = 'rejected';
//   this._value = reason;
//   this._callHandlers();
// };

// $Promise.prototype.catch = function catchx(errorCb) {
//   return this.then(null, errorCb);
// };

// $Promise.resolve = function resolve(value) {
//   if( value instanceof $Promise) return value;
//   return new $Promise((resolve) => resolve(value));
// };

// $Promise.all = function all(array) {
//   if (!Array.isArray(array)) throw new TypeError('error');
//   var result = [];
//   var n = array.length;
//   return new $Promise((resolve, reject) => {
//     array.forEach((promise, index) => {
//       promise = $Promise.resolve(promise);
//       promise.then((val) => {
//         result[index] = val;
//         n--;
//         if(n === 0) resolve(result); 
//       }).catch(reject);
//     })
//   });
// };



function $Promise (executor) {
  if(typeof executor !== 'function') throw new TypeError('executor must be a function');
  this._state = 'pending';
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this) ,this._internalReject.bind(this));
};

$Promise.prototype._internalResolve = function _internalResolve(data){
  if (this._state != 'pending') return;
  this._state = 'fulfilled';
  this._value = data;
  this._callHandlers();
};

$Promise.prototype._internalReject = function _internalReject(reason){
  if(this._state != 'pending') return;
  this._state = 'rejected';
  this._value = reason;
  this._callHandlers();
}
$Promise.prototype.then = function then(successCb, errorCb) {
  if (typeof successCb != 'function') successCb = false;
  if (typeof errorCb != 'function') errorCb = false;
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({ successCb, errorCb, downstreamPromise});
  this._callHandlers();
  return downstreamPromise;
}

// $Promise.prototype.then = function then(successCb, errorCb) {
//   if(typeof successCb != 'function') successCb = false;
//   if(typeof errorCb != 'function') errorCb = false;
//   const downstreamPromise = new $Promise(() => {});
//   this._handlerGroups.push({successCb, errorCb, downstreamPromise});
//   this._callHandlers()
//   return downstreamPromise;
// }

$Promise.prototype.catch = function catchx(errorCb) {
  return this.then(null, errorCb);
}

$Promise.prototype._callHandlers = function _callHandlers() {
  if (this._state == 'pending') return;
  while (this._handlerGroups.length) {
    const handler = this._handlerGroups.shift();
    const downstreamPromise = handler.downstreamPromise;
    if (this._state == 'fulfilled') {
      if (!handler.successCb ) return downstreamPromise._internalResolve(this._value);
      try {
        const result = handler.successCb(this._value);
        if (result instanceof $Promise) {
          return result.then(downstreamPromise._internalResolve.bind(downstreamPromise), downstreamPromise._internalReject.bind(downstreamPromise));
        }
        downstreamPromise._internalResolve(result);
      } catch (e) {
        downstreamPromise._internalReject(e);  
      }
    }
    if (this._state == 'rejected') {
      if (!handler.errorCb) return downstreamPromise._internalReject(this._value);
      try {
        const result = handler.errorCb(this._value);
        if (result instanceof $Promise) {
          return result.then((value) => {
            downstreamPromise._internalResolve(value);
          }, (error) => {
            downstreamPromise._internalReject(error);
          });
        }
        downstreamPromise._internalResolve(result);
      } catch (e) {
        downstreamPromise._internalReject(e);
      }
    };
  }
}

// $Promise.prototype._callHandlers = function _callHandlers() {
//   if(this._state == 'pending') return;
//   while(this._handlerGroups.length) {
//     const handler = this._handlerGroups.shift();
//     const downstream = handler.downstreamPromise;
//     if(this._state == 'fulfilled') {
//       if(!handler.successCb) return downstream._internalResolve(this._value);
//       try {
//         const result = handler.successCb(this._value);
//         if(result instanceof $Promise) {
//           result.then(downstream._internalResolve.bind(downstream), downstream._internalReject.bind(downstream));
//         } else {
//           downstream._internalResolve(result);
//         }
//       } catch(e) {
//         downstream._internalReject(e);
//       }
//     }
//     if(this._state == 'rejected') {
//       if(!handler.errorCb) return downstream._internalReject(this._value);
//       try {
//         const result = handler.errorCb(this._value);
//         if(result instanceof $Promise) {
//           return result.then(downstream._internalResolve.bind(downstream), downstream._internalReject.bind(downstream));
//         }
//         downstream._internalResolve(result);
//       } catch(e) {
//         downstream._internalReject(e);
//       }
//     };
//   }
// }


$Promise.resolve = function resolve(value) {
  if (value instanceof $Promise) {
    return value; 
  }
  return new $Promise(function (resolve) {
    resolve(value); 
  });
};

$Promise.all = function all(array) {
  if (!Array.isArray(array)) {
    throw TypeError('debe recibir un arreglo'); 
  }
  const values  = [];
  let n = array.length;
  return new $Promise(function(resolve, reject) {
    array.forEach((p, index) => {
        p = $Promise.resolve(p);
        p.then(function(value) {
          n -= 1;
          values[index] = value;
          if(n == 0) return resolve(values);
        }).catch(e => reject(e))
      
    });
    if(n == 0) return resolve(values);
  });
};


// function $Promise(executor) {
//   if(typeof executor !== 'function')  throw new TypeError('executor must be a function');
//   this._state = 'pending';
//   this._handlerGroups = [];
//   this._callHandlers = function() {
//     if(this._state == 'fulfilled') {
//       while(this._handlerGroups.length) {
//         const handler = this._handlerGroups.shift();
//         // Si la Promise no tiene succesHandler, su downStream Promise es completada con su valor.
//         if(!handler.successCb) return handler.downstreamPromise._internalResolve(this._value);
//         try{
//           const result = handler.successCb(this._value);
//           if(result instanceof $Promise) {
//             // la promesa que retorna tiene que imitar al downstream promise
//             return result.then(
//                 handler.downstreamPromise._internalResolve.bind(handler.downstreamPromise),
//                 handler.downstreamPromise._internalReject.bind(handler.downstreamPromise)
//                 );
//             // cuando la promesa resuelva o sea rechazada, el downstream va a resolver o ser rechazada al mismo valor.
//             };
//           // Si el successHanlder de la Promise retorna un valor, su downStream resuelve a ese valor
//           if( result ) return handler.downstreamPromise._internalResolve(result);
//         } catch(e) {
//           // Si falla con razon e, el downstream falla con el mismo valor
//           handler.downstreamPromise._internalReject(e);
//         }
//       };
//     }
//     if(this._state == 'rejected') {
//       while(this._handlerGroups.length) {
//         const handler = this._handlerGroups.shift();
//         // Si la Promise es rechazada y no tiene errorHandler, su downstream es rechazada con su valor.
//         if(!handler.errorCb) return handler.downstreamPromise._internalReject(this._value);
//         try {
//           const result = handler.errorCb(this._value);
//           if(result instanceof $Promise) {
//             // la promesa que retorna tiene que imitar al downstream promise
//             return result.then(
//                 handler.downstreamPromise._internalResolve.bind(handler.downstreamPromise),
//                 handler.downstreamPromise._internalReject.bind(handler.downstreamPromise)
//                 );
//           // cuando la promesa resuelva o sea rechazada, el downstream va a resolver o ser rechazada al mismo valor.
//           };
//           // Si el successHanlder de la Promise retorna un valor, su downStream resuelve a ese valor
//           // Si el successHanlder de la Promise retorna un valor, su downStream resuelve a ese valor
//           if( result ) handler.downstreamPromise._internalResolve(result);
//         } catch(e) {
//           // Si falla con razon e, el downstream falla con el mismo valor
//           handler.downstreamPromise._internalReject(e);
//         }
        
//       };
//     }
//   }
//   this._internalResolve = function(data) {
//     if(this._state != 'pending') return;
//     this._state = 'fulfilled';
//     this._value = data;
//     this._callHandlers();
//   };
//   this._internalReject = function(reason) {
//     if(this._state != 'pending') return;
//     this._state = 'rejected';
//     this._value = reason;
//     this._callHandlers();
//   };
//   this.then = function then(fnSucess, fnFailure) {
//     if(typeof fnSucess != 'function') fnSucess = false;
//     if(typeof fnFailure != 'function') fnFailure = false;
//     const downstreamPromise = new $Promise(()=>{});
//     this._handlerGroups.push({successCb: fnSucess, errorCb: fnFailure, downstreamPromise});
//     this._callHandlers();
//     return downstreamPromise;
//   }
//   this.catch = fnFailure => this.then(null, fnFailure);
//   executor(this._internalResolve.bind(this), this._internalReject.bind(this));
// };

// $Promise.resolve = function resolve(value) {
//   if (value instanceof $Promise) {
//     return value; 
//   }
//   return new $Promise(function (resolve) {
//     resolve(value); 
//   });
// };

// $Promise.all = function all(array) {
//   if (!Array.isArray(array)) {
//     throw TypeError('debe recibir un arreglo'); 
//   }
//   const values  = [];
//   let n = array.length;
//   // return new $Promise(function(resolve) {
//   //   resolve(values);
//   // });
//   return new $Promise(function(resolve, reject) {
//     array.forEach((p, index) => {
//       if(p instanceof $Promise) {
//         if(p._state === 'fulfilled') {
//           n -= 1;
//           return values[index] = p._value
//         };
//         p.then(function(value) {
//           n -= 1;
//           values[index] = value;
//           if(n == 0) return resolve(values);
//         }).catch(e => reject(e))
//       } else {
//         n -= 1;
//         values[index] = p;
//       }
//     });
//     if(n == 0) return resolve(values);
//   });
// };


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
