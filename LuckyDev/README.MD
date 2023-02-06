## Where is the client?
Open ClientApp folder and follow instruction inside it.

## Starting the server

First, install dependencies
#### `dotnet restore`

Then start the server
#### `dotnet run --launch-profile App`

It will be launched on https://localhost:5001. To see API and documentation open https://localhost:5001/swagger.

## Project structure
 - Controllers/ — API endpoints
 - Data/ — Code-first database configuration
 - Entities/ — Database entities and DTOs
 - Extensions/ — helper functions for startup configuration
 - Helpers/ — Misc functions
 - Migrations/ — database migrations
 - Pages/ — default error page
