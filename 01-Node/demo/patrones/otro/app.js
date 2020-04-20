var saludo = require('./saludo1');
saludo();

var saludo2 = require('./saludo2').saludo;  // Ahora podemos especificar qué propiedad queremos del módulo
//var saludo2 = require('./saludo2'); Tambien podría haber importado todo el modulo
//saludo2.saludo() y despues explicitar que propiedad quiero ejecutar!
saludo2();


var saludo3 = require('./saludo3'); // Ahora saludo3 es el objeto Saludador que creamos
saludo3.saludar(); // para saludar invocamos el método adecuado

saludo3.saludo = 'Hola mundo cambiado!';

var saludo3b = require('./saludo3'); // Que pasa si pedimos el mismo de nuevo otra vez el módulo
// Vamos a tener el mismo objeto que antes? O un nuevo objeto?
// para probar esto, cambiemos la propiedad saludo a "Hola mundo cambiado" y llamemos de nuevo a la funcion
saludo3b.saludar();
// Como vemos, EL OBJETO ES EL MISMO!
// Esto se debe a que require cachea todos los módulo que exporta, y como es un objeto
// lo que está cacheado es una referencia al objeto creado en saludo3.js
// o sea que new saludador() se corrio una sola vez

var saludo4 = require('./saludo4'); //Importamos la habilidad para crear un nuevo objeto
var sld = new saludo4(); //Ahora creamos un nuevo objeto usando el constructor importado
sld.saludar();

var saludo5 = require('./saludo5').saludo;
saludo5();