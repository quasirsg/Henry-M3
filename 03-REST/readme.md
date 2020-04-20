# RESTful API

## API (Aplication Programming Interface)

Una API es a un software o aplicación lo que una interfaz gráfica es al manejo de una computadora, es decir, una API nos facilita la comunicación con el software. Lo hace __abstrayendo__ la implementación subyacente y mostrando solamente las acciones que son útiles para el desarrollador. De esta forma, al reducir el nivel de complejidad aparente de un software, bajan la carga de _entendimiento_ que tienen que tener los desarrolladores antes de utilizar ciertas tecnologías.

Ahora están de moda las API webs, pero existen de todo tipo y en casi todos los tipos de software:

### En Librerías y Frameworks

Cada vez que usemos una librería o un framework y vamos a su documentación es muy probable que nos encontremos un link a su API (si la librería o framework está bien documentado). En ella vamos a encontrar la descripción, la forma de usar y el comportamiento esperado de las tareas que realiza esa librería. 
Según el tipo de lenguaje que usemos, la documentación de las API puede variar, por ejemplo: para lenguajes de scripting como `Lua` las api pueden consistir en describir funciones y rutinas con fines específicos, pero en lenguajes orientas a objetos como `java`, la api puede describir una serie de _clases_ y sus respectivos _métodos_.

### Sistemas Operativos

Un API tambien puede especificar la interfaz entre una aplicación y el sistema operativo. De hecho, puede servir para mantener compatibilidad hacia atrás, ya que podemos espcificar distintas versiónes del API y mantener varias implementaciones. Por ejemplo, Microsoft Windows mantiene API de compatibilidad para ejecutar programas viejos sobre los nuevos sistemas operativos Windows, le llaman _Modo de Compatibilidad_.

### Apis Remotas

Una API remota les permite a los desarrolladores manipular recursos remotos a traves de un _protocolo_ (no necesariamente HTTP). Por ejemplo, existen API que nos dejan hacer queries a distintos tipos de bases de datos que en general se encuentran en hosts remotos.

### Web APIS

Cuando la usamos en la web, van a estar montadas sobre el protocolo `http`, por lo tanto podríamos decir que una API web es un set de tipos de mensajes HTTPs posibles, junto con la descripción el formato de la eventual respuesta de esos mensajes ( en general la respuesta es en JSON o XML ). Históricamente el término Web api es similar a _web services_. La forma de implementar y de usar estos web services fue cambiando de paradigma, actualmente se usa el diseño tipo REST, y en general en una web se consumen más de un API y se combinan sus resultados en una sóla página. 

#### Endpoints

Un endpoint en un web api especifica donde están los recursos que pueden ser accedidos desde afuera de la API. Por ejemplo: `https://api.clarifai.com/v1/tag/` especifica un endpoint de la API de `Clarifai`.

> Noten que esta API tiene la versión, por lo tanto ofrece compatibilidad hacia atrás.

## REST

Rest es una estilo arquitectura o forma de diseñar el backend de una aplicación que viva en internet. REST viene de "REpresentational State Transfer" y está basado fuertemente en cómo trabaja HTTP, que es el protocolo que usamos comunmente en la web. 

Como sabemos, HTTP es un protocolo basado en el modelo cliente servidor, quienes intercambian mensajes basados en ciertas acciones. Por ejemplo, un mensaje HTTP tipo GET realizado a la URL `http://example.com/`.

está basado en recursos y no en acciones.

Vamos a ver

# Concepto


# Características

## Cliente - Servidor

La arquitectura REST utiliza los conceptos del modelo cliente servidor en el sentido de separar las inquietudes de la interfaz de usuario con las inquietudes del manejo y guardado de datos. Esto ayuda a que cada componente pueda evolucionar de manera separada, acomodanse a como cambian hoy en día las interfaces en internet.

## Stateless

La comunicación entre el cliente y el servidor se logra sin que el servidor tenga guardado ningún contexto del cliente entre requests. Cada request del cliente contiene toda la información necesaria para que el servidor pueda contestar correctamente al request. 

## Cacheable

En esta arquitectura, cada recurso tiene que estar marcado como cacheable o no. En el primer caso para ayudar al servidor a realizar menos trabajo y aumentar la performance y en el segundo para que no lleguen al cliente recursos con datos inapropiados. 

## Sistema de capas

Un cliente no debería ser capaz de distinguir si se está conectado directamente con le servidor, o está pasando por un intermediario antes de llegar a él. Estos servidores intermediarios pueden ayudar a aumentar la performance implementando servicios de load-balancing, shared caches, etc...

## Interface Uniforme

El diseño de una interfaz uniforme es fundamental para la arquitectura, hacerlo bien simplifica mucho la arquitectura y la hace modular, logrando asi que pueda evolucionar o escalar para parte por separado. Las características que deben tener las interfaces uniformes son:

* __Identificación de recursos__: Cada recurso tiene que ser identificado en el request, por ejemplo a través de un _URI_. El recurse per se también está separado de su representación, la que es enviada al cliente; esta puede ser, por ejemplo, el mismo recurso representado en: JSON, XML, HTML, etc...
* __Manipulación de recursos a través de representaciones__: Cuando un cliente tiene la _representación_ de un recursos, deberá tener la suficiente información para _modificar_ o _eliminar_ ese __recurso__.
* __Mensajes descriptivos__: Cada mensaje deberá contener suficiente información para describir cómo procesar el mensaje. En una API web, esto se traduce a mapear rutas con los verbos _HTTP_.
* __Hypermedia as the engine of application state(HATEOAS_)__: Un cliente REST debería ser capaz de _navegar_ y _descubrir_ todas las acciones posibles de hacer a un recurso luego de interactuar con él. Es similar a cuando entramos a una web desde una _URL_ y la web misma nos provee los _links_ para que sigamos navegando. En la arquitectura REST debería ocurrir lo mismo, cada respuesta debería contener _links_  o información a las siguientes acciones que se pueden tomar.

## Otras Arquitecturas

REST no es la única forma de diseñar tu API, existen otras. Cada una será mejor o peor según el problema a resolver y un poco por el gusto del programador. Veamos algunas que están pisando fuerte pero todavía no son las más usadas:

* __[JSON API](http://jsonapi.org/)__: Es una especificación, al igual que REST. Está pensada para minimizar el número de requests y la cantidad de datos que se transmiten por la red. 
* __[GraphQL](http://graphql.org/)__: Es en realidad una librería que ofrece un nuevo __lenguaje__ para hacer consultas a nuestra API. Cambia un poco el concepto de endpoints, y los embebe en esta nueva forma de hacer queries. Todavía es nuevo, pero está tomando tracción rápidamente.