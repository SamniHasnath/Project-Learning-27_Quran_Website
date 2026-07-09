# Dockerizing Quran Website Project

We will containerize the frontend, backend, and MySQL database of your project using Docker and Docker Compose. This allows anyone to run your application with a single command without manually installing Node.js, MySQL, or dependencies on their machine.

## Proposed Changes

We will create new configuration files to setup Docker containers for our components:
- **MySQL Database**: Uses the official `mysql:8.0` image.
- **Node.js Backend**: Express server containerized using Node 20.
- **React Frontend**: Vite dev server containerized using Node 20.

All services will be configured to start up together using Docker Compose.

---

### Database Configuration

We will configure the MySQL database using the official MySQL image.
We don't need a custom Dockerfile for the database. Instead, we can mount our schema file `init_db.sql` directly to `/docker-entrypoint-initdb.d/` in the MySQL container. The MySQL container automatically executes any `.sql` files in that folder during its initial startup.

---

### Backend Component

We will create a `Dockerfile` inside the `backend` folder.

#### [NEW] [Dockerfile](file:///c:/Users/ABC/Desktop/Quran/backend/Dockerfile)

We will create a multi-stage or standard Dockerfile to run the Express backend.

```dockerfile
# Use Node.js LTS image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package configuration
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
```

#### [NEW] [.dockerignore](file:///c:/Users/ABC/Desktop/Quran/backend/.dockerignore)

We must ignore `node_modules` and local environment files to keep the Docker image small and secure.

```
node_modules
npm-debug.log
.env
```

---

### Frontend Component

We will create a `Dockerfile` inside the `frontend` folder to run the Vite dev server.

#### [NEW] [Dockerfile](file:///c:/Users/ABC/Desktop/Quran/frontend/Dockerfile)

```dockerfile
# Use Node.js LTS image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package configuration
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite dev server and bind to 0.0.0.0 to allow external access
CMD ["npm", "run", "dev", "--", "--host"]
```

#### [NEW] [.dockerignore](file:///c:/Users/ABC/Desktop/Quran/frontend/.dockerignore)

```
node_modules
dist
.env
```

---

### Orchestration (Docker Compose)

We will create a `docker-compose.yml` file in the root of the project to orchestrate all three containers: `db`, `backend`, and `frontend`.

#### [NEW] [docker-compose.yml](file:///c:/Users/ABC/Desktop/Quran/docker-compose.yml)

```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: quran-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: samhas341@
      MYSQL_DATABASE: quran_db
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql
      # Mount sql script to auto-initialize db on first run
      - ./backend/init_db.sql:/docker-entrypoint-initdb.d/init_db.sql

  backend:
    build: ./backend
    container_name: quran-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=samhas341@
      - DB_NAME=quran_db
      - JWT_SECRET=super_secret_quran_key_change_me_in_production
    depends_on:
      - db

  frontend:
    build: ./frontend
    container_name: quran-frontend
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  db-data:
```

## Verification Plan

### Manual Verification
1. Ensure Docker Desktop is installed and running on your system.
2. Build and run the containers using the command:
   ```powershell
   docker compose up --build
   ```
3. Test if the frontend runs at `http://localhost:5173`.
4. Test if the backend is reachable at `http://localhost:5000/api/test`.
5. Test if the database is running and connected successfully by calling `http://localhost:5000/api/db-status`.
