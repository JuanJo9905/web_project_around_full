# web_project_around_full

## Contexto

Las redes sociales actuales pueden resultar abrumadoras para usuarios que solo desean compartir imágenes de manera simple y directa. Existe una necesidad de plataformas más minimalistas que se enfoquen específicamente en la compartición de imágenes con funcionalidades de comunidad básicas como votación y gestión de perfiles.


### Herramientas

**Frontend:**

- **React**: Componentes reutilizables y gestión de estados
- **CSS**: Estilos responsivos
- **JavaScript**: Lógica del cliente y manipulación del DOM

**Backend:**
- **Node.js**: Servidor y lógica de negocio
- **Express.js**: Framework para API RESTful
- **MongoDB**: Base de datos NoSQL para almacenamiento
- **API REST**: Comunicación entre frontend y backend

**Datos:**
- **JSON**: Formato de intercambio de datos
- **JWT**: Tokens para autenticación segura

## Análisis de la información

Cada imagen se manipulaba como un objeto JSON dentro de la página y contenia campos importantes como nombre, autor o el contador de likes que incrementaba o disminuia dependiendo de la interacción de otros usuarios

**Esquema de Cartas:**
```json
{
  "name": "String",
  "link": "String",
  "owner": "mongoose.Schema.Types.ObjectId",
  "likes": "mongoose.Schema.Types.ObjectId",
  "createdAt": "Date"
}
```

**Esquema de Usuario:**
```json
{
  "name": "String",
  "about": "String",
  "avatar": "String",
  "email": "String",
  "password": "String"
}
```

### Habilidades técnicas

**Desarrollo:**
- Implementación de modelos para la manipulación de información
- Uso de Hooks y estados en React
- Arquitecturas Front-end y Back-end independientes

**Gestión de Archivos:**
- Implementación de subida segura de imágenes
- Validación de tipos de archivo y tamaños
- Almacenamiento eficiente y recuperación rápida

**Autenticación y Seguridad:**
- Sistema de login seguro con hash de contraseñas
- Protección contra ataques CSRF y XSS
- Validación de tokens JWT en cada petición


## Conclusiones

### Reflexión Personal

Este proyecto me permitió experimentar el desarrollo full-stack completo, desde la conceptualización hasta la implementación. Aprendí que el desarrollo web moderno requiere un equilibrio entre funcionalidad, seguridad, performance y experiencia de usuario. La implementación de un CRUD completo con autenticación me dio confianza en mis habilidades para crear aplicaciones de nivel profesional.
