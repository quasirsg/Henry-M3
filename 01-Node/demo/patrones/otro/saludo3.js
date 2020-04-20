function saludador() {
	this.saludo = 'Hola Mundo 3';
	this.saludar = function() {
		console.log(this.saludo);
	}
}

module.exports = new saludador();

// En este patron, vamos a crear un objeto saludador, y vamos a reemplazar module.export
// por este objeto usando un constructor.