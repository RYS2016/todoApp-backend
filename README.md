# TodoApp-Backend

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Setup environment variables:
    - Create a `.env` file based on `.env.example` if provided.
    - Set `DATABASE_URL` to your MySQL database connection string.

3. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

4. Start the server:
    ```bash
    npm run dev
    ```
## Notes
    This backend is built using Node.js, Express, Prisma, and MySQL.
    Ensure that the MySQL database is running and accessible.
    The backend runs at `http://localhost:3001`.
