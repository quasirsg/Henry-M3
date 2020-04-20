# Beatles Page

## Requisitos Básicos

1. Con node crea un index en "/" donde le demos la bienvendia

2. Utiliza este arreglo con los integrantes de los Beatles:

```javascript
var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"http://beatlephotoblog.com/photos/2013/05/132.jpg32.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
```

3. Crea la ruta "/api" que muestre el arreglo completo

4. Ahora en la ruta "/api/John%20Lennon" deberiamos ver solo el objeto de John

5. Haz lo mismo con los otros beatles. Podemos hacer esto sin repetirnos en una misma ruta?

6. Si el usuario no entra un Beatle valido tiene que darle un error diciendo que la página no se encontro

6. Ahora crea un nuevo template en el cual ingresaremos un profile page de cada beatle, el titulo de la pagina y un h1 tiene que decir el nombre, un parrafo con la fecha de nacimiento y una imagen con la profilePic

7. Crea una ruta en la cual si ponemos el nombre del Beatle nos muestre su profil page ej. "/Paul%20McCartney".  NO PISES TU RUTA DE API NI DE ERROR

## Advanced Mode

1. En tu index pongamos un form el cual podamos buscar un beatle, dale al input un _name_ y recuerda poner un button, como es el request en el url?

2. Crea una nueva ruta basado en esto para q el usuario pueda buscar un beatle y que carge su profile page

3. Terminaste? Fijate tu código esta muy desordenado? Te repetiste? Intenta refactorear tu codigo para que quede ordenado, intenta poner las tareas en funciones


## Ultimate Mode

1. Descarga las imagenes en una carpeta y cargarlas desde tu servidor
