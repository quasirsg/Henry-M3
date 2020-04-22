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

### Agregar nueva funcionalidad

Ahora vamos a agregar una nueva funcionalidad. Vamos a crear un endpoint que reciba un string y devuelva el número de caracteres que tiene ese string.
Primero vamos a escribir los tests, y luego codear para que pasen:
Nuestro nuevo endpoint deberia:

* Responder con status 200.
* Responder con 4 si enviamos 'hola'.
* Responder con un status 400 (bad request) si el string es un número.
* Responder con un status 400 (bad request) si el string esta vacio.

##### Modelo Product

Crea los tests y luego el modelo para el siguiente modelo de `Product`

* Tiene que tener un `name` obligatoriamente
* El `name` tiene que ser un string
* El nombre tiene que ser minimo 6 maximo 15 caracteres.
* Tiene que tener un `price` obligatorio que sea tipo integer.
* Tiene que tener una `description` de tipo text.
* Tiene que ser un numero positivo
* Tiene que tener un Instance method `toCurrency` que tome un tipo de cambio y devulva el precio convertido: eg. `toCurrency(18)` devuelve el precio en dolares.
* Tiene que tener un hook `beforeCreate` que se fije si el producto no tiene una description, la setie a noDescription
* Tiene que tener un getter `trimDescription` que devuelva una description que se asegure que corte la description si se excede de los 20 chars. Si la corta tiene que terminar con un `...`, sino debería mostrar el description original.
* Tiene que tener un class Method `findPricesGreaterThan` que devuelva una promesa de un arreglo de productos con precios mayores que el arguemnto pasado a la función: eg. `findPricesGreaterThan(10).then(prods => {})` prods sería un arreglo de productos con precios mayores a 10.
* Tiene un setter method `setPrice` que tome un precio y lo setie como el nuevo precio.
