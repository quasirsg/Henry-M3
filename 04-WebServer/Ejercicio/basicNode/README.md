# Node Básico

## Node console

1. Entremos a la consola da node escribiendo en tu terminal node.
2. Haz un console.log("Hello World")
3. Haz 10+10
4. Calcula la cantidad de segundos en un siglo


## Ejecuta un Programa

1. Crea tu primer app.js y dile que escriba en la consola("Hello World")
2. Ejecuta tu app desde la terminal
3. Crea un programa, "daysTillChristmas.js", que devuelva en la consola un mensaje que diga cuantos dias faltan para navidad. El metodo new Date() puede serte util.
4. Asegurate que tu programa siga funcionando el año que viene.

## Crea un Servidor

1. Volvamos a app.js. Crea un servidor en el puerto 3000 que devuelva un string que diga "Hello World"
2. Ahora haz que devuelva lo mismo pero dentro de un h1._(Aún no queremos devolver htmls completos, sigue enviando solo strings)_
3. Ahora si el usuario entra a la ruta "/doge" devuelve la imagen de doge. (Si querés devolver otra imagen que no sea la de doge no hay problema! Solo toma tus cosas y retirate del curso...)
4. Tu root route aún deberia mostrar el Hello World
5. Crea una ruta mas que se llame "/about"  y haz que devuelve un string con un parrafo de "lorem ipsum".
6. Si no entra a ninguna de las rutas anteriores devuelve un h1 diciendo que hay un error 404 y un parrafo explicando que significa eso.

## File System

1. Crea un app, "filesys.js", que levante un servidor que liste todos los archivos que haya en una carpeta de tu filesystem.
2. Por cada archivo deberá haber un link para abrirlo.
3. Cuando clikeen el link, mostrá el contenido del archivo en el browser, y un botón para volver atrás.
4. Probá agregando archivos de prueba y leyendo su contenido para ver si funciona bien.

## Node es asincronico

Cuando fs lee un archivo este trabajo lleva un tiempo, fs.readFileSync() se ejecuta de forma sincrónica esto significa que hasta que no termine de leer nuestro archivo no continuará con el codigo, fs.readFile(), es asincronico. Para entender esto prueba este ejemplo:


```javascript
console.log("Antes")
console.log(fs.readFileSync(__dirname + "/text.txt", "utf8"))
console.log("Despues")
```
Eso tuvo sentido, todo siguio su orden porque fue sincronico, pero debajo tenemos algo distinto, dentro de readFile() hay una funcion, que es el callback, esto significa la función que se ejecutará una vez que se haya leido el archivo. Como Piensas que sera el output de este codigo:
```javascript
console.log("Antes")
fs.readFile(__dirname + "/text.txt", "utf8", function(err, data){
  console.log(data)
  })
console.log("Despues")
```

Como vimos, el codigo siguió corriendo y luego cuando la tarea finalizó ejecutó el callback.


## Agregando HTML

Volvamos a nuestro ejercicio del servidor. Devolver strings es bastante desprolijo.

1. Refactorea tu codigo para que devuelva un archivo html con el mismo contenido de forma sincrónica.
2. Refactorea para que devuelva el html de forma asincrónica.
