<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# CodeQuest API

1. Clonar proyecto
2. `pnpm install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno

- Crear app en discord developer (https://discord.com/developers/applications)
- Obtener Client ID y Client Secret
- Agregar a la aplicación de discord la url de redirección, la que se encuentra en el fichero .env.template DISCORD_REDIRECT_URL

5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar: `pnpm start:dev`

7. Ejecutar SEED

```
http://localhost:3000/api/seed
```
