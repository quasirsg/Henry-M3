# Mini Testing Workshop

Vamos a codear una mini app para hacer algo de testing.

Para testing vamos a usar `mocha`, `chai` y `supertest`.

`mocha` es el _test runner_, nos da las funciones para ordenar y ejecutar nuestros tests.
`chai` es una _assertion library_, tiene las funciones para hacer assertions, básicamente compara dos resultados: el _expected_ y el _actual_, si no coinciden entonces tira un error, que es capturado por `mocha`.
`supertest` nos va a servir para levantar nuestra app cada vez que se ejecutan los tests, de tal modo que los tests sean autocontenidos.

> [cheatsheet](https://github.com/Euricom/training-workshop-JS-VUE-2017Q1/blob/master/slides/unit-tests.md)

En el repo tenemos una mini app de express con una serie de endpoints simples. Todo esto está en el archivo `index.js`.
Los tests estan en la carpeta `/tests`. Para ejecutarlos hacer:

```bash
npm test
```

(no se olviden del `npm install`).

## Que hacemos?

### Pasar todos los tests

Primero vamos a hacer que los test que están pasen. Es decir que vamos a agregar, o modificar nuestra app hasta que pasen todos los tests.

### Agregar nuevos tests

El test de la ruta `sumArray` está incompleto. Falta testar por el caso que devuelva `false`. También falta testear que no sumen dos veces el mismo número para encontrar el resultado.

### Agregar nueva funcionalidad

Ahora vamos a agregar una nueva funcionalidad.

#### NumString

Vamos a crear un endpoint `/numString` que reciba un string y devuelva el número de caracteres que tiene ese string.
Primero vamos a escribir los tests, y luego codear para que pasen:
Nuestro nuevo endpoint deberia:

* Responder con status 200.
* Responder con 4 si enviamos 'hola'.
* Responder con un status 400 (bad request) si el string es un número.
* Responder con un status 400 (bad request) si el string esta vacio.

#### Pluck

Vamos a crear un endpoint `/pluck` que reciba un arreglo de objetos y un nombre de una propiedad y devuelva un arreglo sólo con los valores de esa propiedad.

Nuestro nuevo endpoint deberia:

* Responder con status 200.
* Responder con al funcionalidad del pluck.
* Responder con un status 400 (bad request) si array no es un arreglo.
* Responder con un status 400 (bad request) si el string propiedad está vacio.