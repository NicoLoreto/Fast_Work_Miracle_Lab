#### FastWork

##### FastWork es un sitio web que permite a trabajadores de mantenimiento, instalación y reparación (como plomeros, carpinteros o electricistas) ofrecer sus servicios en la web. A su vez, brinda la posibilidad a potenciales clientes de encontrar por categoría a profesionales en distintos oficios y contactarlos para adquirir sus servicios.

##### Actualmente está siendo desarrollado por el Team Gray de Miracle Lab.

---

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js 18.16.1](https://img.shields.io/badge/Node.js-18.16.1-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)

# FastWork

### Documentation:

1. [React](https://es.react.dev/)
2. [Node](https://nodejs.org/es)

### Dev:

#### Frontend:

1. Instalar node 18.16.1.
2. Instalar Git:  
   `sudo apt-get install -y git`
3. Clonar repositorio: `git clone https://github.com/labmiracle/team-gray.git`
4. Moverse a la carpeta src/website: `cd src/website`
5. Ejecutar el siguiente comando para instalar las dependencias:
   `npm install`
6. Ejecutar el siguiente comando para iniciar el servidor de desarrollo:
   `npm run dev`

#### Backend:

1. Instalar node 18.16.1.
2. Instalar Git:  
   `sudo apt-get install -y git`
3. Clonar repositorio: `git clone https://github.com/labmiracle/team-gray.git`
   
4. Moverse a la carpeta src/api: `cd src/api`

5. Ejecutar el siguiente comando para instalar las dependencias:
   `npm install`

6. Crear un archivo `.env` en src/api con la siguiente configuración:
	``` plaintext
   fastwork_api__mysql__host = <database_host>
   fastwork_api__mysql__user = <database_user>
   fastwork_api__mysql__password = <database_password>
   fastwork_api__mysql__database = <database_name>
   fastwork_api__mysql__port = <database_port>
   fastwork_api__jwt__secret = <jwt_secret>
	```

7. Ejecutar las sentencias de los archivos .sql dentro de la carpeta src/api/database: "creation-script.sql" para crear la base de datos y las tablas, "db_table_inserts.sql" para insertar datos de prueba.

8. Iniciar el servidor: `npm run dev`

9.  Para acceder a la documentación de Swagger ingresar en `http://localhost:5000/docs`


### Team:

- Aron Diaz
- Diego Jesús Hamui
- Hernán Gobulin
- Nicolás Loreto

#### Link a Trello [![Trello](https://img.shields.io/badge/Trello-%231E88E5.svg?&style=flat-square&logo=trello&logoColor=white)](https://trello.com/b/wlIF4QIH/fastwork)


