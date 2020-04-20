var saludo = 'Hola mundo 5!!!!';

function saludar() {
	console.log(saludo);
}

module.exports = {
	saludo: saludar
}

// En este ultimo patrón
// La diferencia es qué solo estamos exponiendo la funcion
// y no la variable saludo, o sea que no vamos a poder acceder a ella.
// todo lo demas esta oculto
// Este es conocido como:
// Reaviling modulo pattern:
// Basicamente solo exportamos las propiedades y metodos que necesitamos
// via el objeto exportado