function saludador() {
	this.saludo = 'Hola mundo 4!!!';
	this.saludar = function() {
		console.log(this.saludo);
	}
}

module.exports = saludador;


// Que pasa si no quisiera el comportamiento del patron 3.
// Digamos que quiero tener muchos objetos de la misma clase.
// Lo que haremos es copiar el código del patron 3, pero al exportar
// pasamos solo el constructor de la clase
// y en app.js vamos a usarlo para construir un nuevo objeto