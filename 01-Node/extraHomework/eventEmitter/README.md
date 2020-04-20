# Introducción a Nodejs

## Event Emitter

Tenemos que contruir nuestro propio __Event Emitter__.
Básicamente tiene que tener dos funcionalidades:

- Agregar Events Listeners: Creamos una función `on(evento, callback)` que reciba un evento y un callback que se dispará cuando suceda el evento.
- Emitir eventos: Creamos una función `emit(evento)` que recibe un evento, y lo que hace es ejecutar todas los callbacks de los listeners que estaban _escuchando_ por ese evento. Es decir que esta función avisa que ocurrió el evento!

#### Modo copado
- Controlar que el callback de `on()` sea una función.
- Agregar la funcionalidad de poder eliminar un event listener: `eliminar( evento, callback)`(Agrega que .on() devuelva el callback para guardarlo y usarlo para borrarlo)
- Agregar la funcionalidad de poder eliminar TODOS los events listeners de un evento: `eliminarTodos(evento)`

 ¿Qué pasa si hay errores? Agregar controles de erroes.

#### Modo Mega Copado

- Agregar funcionalidad para que `emit()` además pueda pasar parámetros al callback del listener.
- Modifiquemos el código para que `on()` sólo pueda recibir un set prearmado de eventos, y si no existe que nos avise con un error.

