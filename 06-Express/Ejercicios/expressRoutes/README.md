# Usando express


1. Crea la ruta "/" que solo diga Hola

2. Ahora crea una ruta "/welcome" y este nos de un mensaje de bienvenida usando el nombre como un parametro, Ej. "Bienvenido Guille!" si la ruta era "/welcome/guille".

__Nota__: En la ruta guille esta en minuscula, pero el mensaje lo muestra en mayuscula

3. Crea la ruta "/hablar" y usando este arreglo:

```javascript
var animals={
  perro:"wuf",
  gato: "meow",
  vaca: "muuu"
}
```
 Usa un parametro en al ruta q determine el animal, se deberia mostrar un mensaje "El perro hizo wuf", para el caso "/hablar/perro"

 4. Si no pone un animal valido debería redirigir a "/error" con un mensaje que diga "Cannot Be Found!"

 5. Asegurate que cualquier dirección que no sea valida redirija a "/error"

 6. Crea una ruta "/repeat", que tome una palabra como primer parametro y un numero como segundo. Se deberia mostrar esa palabra en un <p> repetida la cantidad de veces especificada. Ej. Para la ruta "/repeat/hola/2" se deberia ver "<p>hola</p><p>hola</p>"

 7. Si no llega  poner un numero como segundo parametro envia un mensaje aclarando como debe escribir la ruta.
