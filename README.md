# DeallTest Service

**Project Structure**

**src/**: Main source directory for the TypeScript code.

**src/app.ts**: Entry point of the application, setting up Express and middleware.

**src/routes/**: Contains all route definitions to direct the API endpoint.

**src/controllers/**: Contains controllers responsible for handling requests and responses.

**src/controllers/executor**: Contains logic to handle your exeuctor.

**src/database/Connection.ts**: Make a connect to sequelize.

**src/database/models/**: Defines Sequelize models that map to the database tables.

**src/database/seeders/**: Contain a function that will automatically populate data.

**src/database/services/**: Contains the business logic.

**src/enums/**: Store enums for static data as a guide.

**src/helpers/**: Contains function for additional logic.

**src/middlewares/**: Contains process in between hitting APIs.

**global.d.ts**: Type definitions and custom types.

**Key Files**
tsconfig.json: TypeScript configuration file specifying compiler options.
.env: Environment variables file, kept outside the src directory for security.
dist/: Output directory for compiled JavaScript code after TypeScript is built.

**Prerequisites**
Node.js: Install Node.js version 16 or higher.  
PostgreSQL: Ensure PostgreSQL is installed and running on your system.

*Installation*

**Clone the repository:**
```
git clone <repository-url>
cd dealltest
```
Set up a .env file with the following variables:

```
JWT_SECRET_KEY=
DATABASE_NAME=
USER_NAME=
PASSWORD=
HOST=
DB_PORT=
```
**Install dependencies:**
```
npm install
```
**Set up the database:**

**Create the necessary database and tables:
**## Create files and foldersYou only need to make a database and add the information to your .env, table and seeders will automatically run when you run the service.
```
npm run dev
```
This will watch for changes in the src directory and automatically restart the server when changes are detected using nodemon.

Production Mode

Build the TypeScript code:
```
npm run build
```
Start the compiled JavaScript code:
```
npm run start

npm run prod
```

License
This project is licensed under the ISC License.

This README provides a structured overview, setup steps, and instructions for both development and production environments. Let me know if there are additional details you'd like to include!
