# ang-counter
Full Stack Angular Project

## Building

Use Docker Desktop to build the project, run the following command from the root directory:

```docker
docker-compose up --build
```

This will start the server and the front-end in development mode with hot-reloading.

## Client

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Server

The Express server listens at `http://localhost:3200/`. Server changes require the image to be rebuilt.

