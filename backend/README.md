## Setup and Installation

### Step 1: Build the Docker Containers

Build the Docker containers using Docker Compose. This will create and start your PostgreSQL, pgAdmin, backend, and frontend containers:

```bash
docker-compose up --build
```

This will start all the services as described in the `docker-compose.yml` file, including:

- **PostgreSQL** container for the database.
- **pgAdmin** container for database management.
- **Backend** container for the API.
- **Frontend** container for the client-side application.

Docker Compose will automatically download the necessary images (if not already present), build the backend and frontend images, and set up the required containers.

### Step 2: Apply Database Migrations (Prisma)

Prisma provides an easy way to manage database migrations. You can run the migrations to create or update your database schema.

#### Option 1: Run Migrations Inside Docker

To run the Prisma migrations inside the Docker container, use the following command:

```bash
docker-compose exec backend npx prisma migrate deploy
```

This will apply the migrations and ensure that your database schema is up-to-date.

#### Option 2: Run Migrations Locally

You can also run migrations locally using Prisma CLI. First, ensure that your `.env` file is correctly configured with the database credentials.

Run the following commands to create and apply migrations:

```bash
# Create migration file
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy
```

This will generate and apply Prisma migrations based on your schema.

### Step 3: Generate Prisma Client

After applying the migrations, you need to generate the Prisma Client, which is used to interact with the database.

```bash
npx prisma generate
```

### Step 4: Run the Backend

Once the migrations are applied and the Prisma Client is generated, you can run the backend application. Inside the `backend` Docker container, you can use the following command to start the server:

```bash
docker-compose exec backend npm run dev
```

This will start the backend server, and you can access the API at `http://localhost:5000`.

Alternatively, you can run the backend server locally by using:

```bash
npm run dev
```

### Step 5: Access pgAdmin

To manage the database through pgAdmin, visit `http://localhost:8080` in your browser. The login credentials are:

- **Email**: `admin@example.com`
- **Password**: `admin`

Once logged in, connect to your PostgreSQL container with the following details:

- **Host**: `postgres` (the name of the PostgreSQL service from `docker-compose.yml`)
- **Port**: `5432`
- **Username**: `mubashir05`
- **Password**: `123456`
- **Database**: `connect`


## Useful Commands

### Docker Commands

- **Start Services**: `docker-compose up` (Without `--build` if services are already built)
- **Rebuild Services**: `docker-compose up --build`
- **Stop Services**: `docker-compose down`
- **Logs**: `docker-compose logs`
- **View Docker Container Logs**: `docker logs <container-name>`

### Prisma Commands

- **Generate Prisma Client**: `npx prisma generate`
- **Run Migrations**: `npx prisma migrate deploy`
- **Create Migration**: `npx prisma migrate dev --name <migration-name>`
- **Reset the Database**: `npx prisma migrate reset`
- **View the Database Schema**: `npx prisma studio`

## Troubleshooting

1. **pgAdmin Login Issue**: Ensure that you’re using the correct default credentials: `admin@example.com` / `admin`. If issues persist, clear your browser cache or use an incognito window.

2. **Migrations Not Applied**: If migrations are not applying correctly, ensure the Prisma schema is correctly defined and re-run the migration commands.

3. **Database Connection Error**: Make sure that the PostgreSQL container is running and check for network issues in Docker.

---
