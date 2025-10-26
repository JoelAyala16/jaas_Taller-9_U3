Proyecto Combinado

- ApiProductosSpring/: Backend REST en Spring Boot (productos.zip original)
    - Controladores:
        - ProductoControlador.java
        - CategoriaControlador.java
    - Entidades:
        - Producto.java
        - Categoria.java
    - Rutas expuestas típicamente en /productos y /categorias
    - pom.xml, mvnw para ejecutar con Maven

- PizzeriaAdmin/: Frontend administrativo ASP.NET Core MVC
    - CRUD Categorías y Productos con AJAX
    - Servicios CategoriaApiService y ProductoApiService apuntan a la API REST.
    - Ajustar las URLs _baseUrl en esos servicios para que apunten al host/puerto de ApiProductosSpring

Cómo levantar:
1. Levantar ApiProductosSpring (Spring Boot, puerto 8080 por defecto)
   mvnw spring-boot:run
   La API debería quedar sirviendo /api/... según la config real.
   Ajustar CORS si es necesario.

2. Ajustar en PizzeriaAdmin/Services/*.cs las URLs _baseUrl = "http://localhost:8080/..." para que coincidan con las rutas del backend.

3. Ejecutar PizzeriaAdmin:
   dotnet restore
   dotnet run
   Ir a /Categorias y /Productos para probar el panel administrativo.
