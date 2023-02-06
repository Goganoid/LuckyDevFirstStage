# RecipeWiki
## Data source
https://www.themealdb.com/
## Tech Stack
Backend:
- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- ASP.NET
- Entity framework
- Sqlite for development, SQL server for production
  
Frontend:
- TypeScript
- React
- Bootstrap

Production version is hosted on Azure.

Frontend: https://recipewikifront.azurewebsites.net/

Backend: https://recipewiki.azurewebsites.net/swagger

Please, note that Azure has to warm up the server on the first request so the response take 30-40 seconds. If you encounter any problems, DM me in Telegram [@yokano](https://t.me/yokano).
You can run the local development version using instructions inside the `LuckyDev` folder.

