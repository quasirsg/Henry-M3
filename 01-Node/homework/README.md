# Henry

## Node Js Homework

## Filosofía UNIX

La 'filosofía Unix' fue originada con las reflexiones de Ken Thompson sobre cómo diseñar un sistema operativo pequeño, capaz y con una interfaz de servicio limpia.

Doug McIlroy, el inventor de los Unix pipes y uno de los fundadores de la tradición Unix, decía:

    Lográ que cada programa haga una cosa bien. Para hacer un nuevo trabajo, creá un nuevo programa antes que complicar uno viejo agregando nuevas funciones.
    Esperá que el output de cada programa se convierta en el input de otro todavía desconocido. No llenes el output de información extraña. Evitá los formatos de entrada en columnas o binarios. No insistas con inputs interactivos.
    Diseñá y creá software, incluso sistemas operativos, que sean probados tempranamente (idealmente dentro de semanas). No dudes en descartar las partes torpes y reconstruirlas.
    Usá herramientas para aligerar la tarea de programar, incluso si tenés que desviarte para construirlas. Descartá algunas de ellas después de haberlas usado.

[Acá](https://www.youtube.com/watch?v=tc4ROCJYbm0) hay un video de los 70's para profundizar más en la filosofía Unix.

## Archivos

Tenes creados dos archivos `bash.js` y `commands/index.js`. En estos dos archivos vas a escribir todo el código para realizar el homework.

## Objetivo del homework

En este homework vas a tener que implementar comandos bash (a.k.a terminal) comunes usando Node.js. 

Básicamente, cuando ejecutemos `node bash.js` vamos a obtener un `prompt` parecido al de la terminal de linux o git, en donde vamos a poder escribir una serie finita de comandos.

También, en el proceso de escribir tu propia shell, vas a descubrir tres cosas:

    Que tu terminal Bash es un entorno de programación y está impulsado por la Filosofía Unix. Deberás crear pequeños programas que pueden inter-operar entre ellos.
    Aprenderás los beneficios y las contras de una plataforma asincrónica.
    Descubrirás cómo componer y manejar operaciones paralelas que pueden completarse en cualquier momento.

## Variable `process`

Para realizar este homework, vamos a trabajar directament tomando `inputs` desde el teclado (como la terminal), y escribiendo el resultado de un comando en la pantalla `ouput`.

Para hacer esto, vamos a usar los métodos dentro del objeto `process`. El objeto process es un objeto global y puede ser accedido desde cualquier parte. Es una instancia de `EventEmitter`. Contiene diversos métodos, eventos y propiedades que nos sirven no solo para obtener datos del proceso actual, sino también para controlarlo.

Instrucciones para saber qué es la variable process:

    En tu bash.js, hacé un console.log de la variable process. Al ser global está disponible en cualquier lugar de nuestro programa de Node y no necesita ser creada.
    Logueá Object.keys(process) para ver una lista de todas las propiedades.

#### STDIN y STDOUT

Los métodos `stdin` y `stdout` viene de standard input y standard output. Estos métodos *conectan* el mundo exterior con el interior del programa de Node. Es decir, que podemos meter datos y sacar datos usandólos.

>De hecho, el console.log de Node es un pequeño wrapper alrededor de stdout.

Veamos el siguente ejemplo:

```js
    // Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      var cmd = data.toString().trim(); // remueve la nueva línea
      process.stdout.write('You typed: ' + cmd);
      process.stdout.write('\nprompt > ');
    });
```

Copia ese código en `bash.js` y ejecutalo con `node bash.js`.

Cómo ven, lo primero que sale es `prompt >`, esto es porque stdout escribió eso en la consola.
`stdin` es un poco más complejo, porque vos no sabés cuando alguien va a escribir algo. Como sabemos, estos métodos son instancias de `EventEmitter`, por lo que se comportan como los eventos que vimos en el browser. Lo que ocurre es que estamos poniendo un `Event Listener` en el stdin, y cada vez que llegan datos (este es el evento), se ejecuta la función que pasamos como callback.

Nuestro proceso, esta vez, no termina inmediatamente. Eso es porque hemos registrado un listener a stdin, entonces Node asume que querés seguir esperando por otro input por parte del usuario. Si querés salir de tu proceso de Node, usá CTRL+C que es la forma normal de interrumpir cualquier proceso.

## Creando Comandos

### `pwd` y `date`

Vamos a crear nuestros primeros comando en nuestra pequeña terminal. `pwd` imprime el directorio donde estás *parado*. Y `date` imprime la fecha actual.

>Podes probar esos comando en tu consola (los originales). Depende del sistema operativo podrías no tenerlos, pero no te preocupes, no cambia nada.

Ahora, vamos a escribir código para poder implementar esos comandos en `bash.js`. Recordemos que el funcionamiento de una terminal es así:

    - Muestra el `prompt`
    - se queda esperando que ingreses un comando.
    - ejecuta el comando e imprimi el resultado.
    - vuelve al punto 1.

Por lo tanto, vamos a recibir el comando en `data`, cuando se dispare el evento de que se escribió algo (cuando el usuario escriba algo y presione enter). Luego, vamos a tomar ese dato, y vamos a ver que escribió, y según el comando tipeado, vamos a mostrar algo.

Abajo te muestro cómo quedaría y qué mostramos con el comando `date`.

```js

const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  if(cmd === 'date') {
    process.stdout.write(Date());  
  }
  if(cmd === 'pwd') {
    ...
  }
  process.stdout.write('\nprompt > ');
});
```
Ahora te toca implementar cómo mostrar el `pwd` (print working directory). Tip: buscá dentro dell objeto `process`.

## Mejorando el Workflow

Ahora que vamos a empezar a probar varias cosas, vamos a sentir que cerrar y ejecutar nuestro programa cada vez que hagamos un cambio es un trabajo insoportable.

Por suerte, esto ya le pasó a otros, y crearon una solución. Se llama `nodemon`. Básicamente es un paquete de `npm` que podemos instalar con `npm install --save nodemon`. Y lo que hace es `watchear` por cambios en el código y reiniciar el programa cuando haya cambios.

Para que funcione debemos agregar el siguiente script al `package.json` (para inicializar el `package.json` podes usar `npm init`):

```
    // package.json
    ...
    "scripts": {
        "start": "nodemon bash.js",
    ...
```

Para ejecutar el `bash.js` podes escribir el comando:

```bash
npm start
```

## Separando en módulos

De ver el código que tenemos en `bash.js` nos damos cuenta que si tuvieramos muchos comando sería muy díficil de gestionar, de hecho para agregar comandos ya estamos repitiendo código, y es algo que no deberíamos hacer. (Recuerden el código DRY - DO NOT REPEAT YOURSELF).

Por lo tanto, vamos a crear un módulo en `commands/index.js` donde vamos a tener todos los comandos, y vamos a exportarlos.

En nuestro `bash.js` vamos a importar estos comandos.

Veamos que si exportamos cada comando con su nombre como propiedad de un objeto, luego podremos buscarlo muy fácilmente desde el `bash.js`.

```js
// commands/index.js

module.exports = {
    pwd: fn() {},
    date: fn() {}
}
```

```js
// bash.js
const commands = require('./commands/index.js');

const cmd = 'pwd';

commands[cmd]() // la función dentro de la propiedad pwd

```

## Agregando Comandos

Ahora vas a agregar código para que tu `bash` pueda ejecutar los siguientes comandos:

### ls (list)

Cada lenguaje de programación tiene una librería standard de módulos que hará tu trabajo mucho más fácil.

Uno de los más poderosos es el modulo `fs`. Éste permite acceder al sistema de archivos de la máquina de distintas formas.

Usá el modulo fs para implementar el siguiente comando ls:

    Creá una nueva función llamada ls en commands.js.
    Cuando el usuario tipee ls, ejecutá la función ls.

No te olvides: fs no es global (como process) pero es un módulo. Esto significa que vas a necesitar requerirlo:

`var fs = require('fs');`

Usá `fs.readdir` para obtener los archivos en el directorio:

```js
// commands/index.js
...
fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt > ");
});
...
```

### echo

El comando `echo` básicamente manda los argumento al `stdout`.
Si ejecutaras `echo hola`, va a salir un `hola` en la terminal. Podríamos decir que es el `console.log` de la terminal!

```js
/// si ejecutas el comando echo deberias ver lo siguiente:
    prompt > echo hello world
    hello world
```

Para este comando, vas a tener que modificar la forma en que parsear el input (`data`) dentro de la `función process.stdin.on('data', function (data) { ...`

> Intenta hacer que `echo` también imprima variables del sistema

###  cat, head, y tail

Estos tres comandos sirven para leer archivos y mostrarlos por el `stdout`.

* cat: muestra todo el contenido de un archivo, ej: `cat bash.js`.
* head: muestra las primeras lineas de un archivo, no todo el archivo. ej: `head bash.js`
* tail: muestra las últimas líneas de un archivo. ej: `tail bash.js`

Refactoreá todas tus funciones existentes para tomar un parámetro explícito, aunque no lo usen.

¿Para qué? Estructurá a todos tus comandos de la misma manera (orden y tipo de parámetros). Así podés ejecutar a todos de la misma manera, sin saber a cuál estás llamando. Para la mayoría de las próximas funciones, nombrá ese parámetro file o filename.

### Otros comandos útiles

Probá implementar alguno de estos comandos.

- `sort filename.txt`: Devuelve el archivo ordenado lexicográficamente por línea.
- `wc filename.txt`: El wc de Unix imprime el conteo de líneas, palabras y caracteres de un archivo. El tuyo puede simplemente devolver el número de líneas.
- `uniq filename.txt`: Si una línea en un archivo es la misma que la línea de arriba, la saca del resultado. Un archivo que esta ordenado( sort) y después filtrado por únicos ( uniq) te garantiza que no tendrá ni una sola línea duplicada.

### Implementando curl

`curl` es un comando útil para descargar páginas web. En vez de ejecutarse con el nombre de un archivo, se hace con una URL.

Deberás implementar curl usando el módulo `request` (vas a tener que instalarlo):

También lo podés hacer por el módulo nativo http, pero es menos amigable.

Ahora que tenés `request` disponible para requerir, implementá el comando `curl`. `curl` hará un pedido GET de HTTP a un URL dado, e imprimirá el body del response del HTTP.

ej: `curl http:www.google.com`

## Refactoreando

Bien, si llegaste hasta acá te habrás dado cuenta que hay muchas partes del código donde repetimos cosas. Ahora vamos a tomar el tiempo para refactorearlas.

Notarás estos patrones repetidos:

    - Ejecutar el trabajo del comando.
    - Mostrar el resultado del comando.
    - Mostrar el prompt y esperar al próximo comando.

Lo único que es propio de nuestra función es el paso 1. Los otros se repiten para cada comando.

Usá una función callback para remover los pasos 2 y 3. Creá una función `done` en bash.js que tome un argumento output.

const done = function(output) {
  // muestra el output
  // muestra el prompt
}

Ahora pasá `done` a cada una de las funciones de los comandos y reescribí los comandos para que creen el output pero que no lo impriman (no uses process.stdout). Luego de que se hayan completado, llamá a `done`.

Acá hay un ejemplo con ls:

```js
const commands = {
  ls: function(file, done) {
    var output = "";
    fs.readdir('.', function(err, files) {
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done(output);
    });
  }
}
```


#### Materiales recomendados

[Video: Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be&t=676)