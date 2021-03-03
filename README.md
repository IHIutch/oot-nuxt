# README

**1. Install Nuxt**

- `yarn create nuxt-app .`
- bootstrap vue
- axios
- eslint, prettier, lint staged files
- SSR vs SSG vs SPA
- installs project, dependencies, initializes a local repo
- run with `yarn dev`

**2. Directories**

- Assets
- Components
- Layouts
- Middleware
- Pages
  - https://nuxtjs.org/docs/2.x/concepts/views
- Plugins
- Static
- Store
- Nuxt Config
- Other files

**3. Add Home & Join pages**

- `yarn add sass sass-loader@10`
- compiles sass inside components- create/update pages

**4. Prepare the API**

- `yarn add express redirect-ssl`
- Add express to index
- Tell express that responses are JSON

**5. Add Sequelize and create models**

- `yarn add sequelize sequelize-cli pg pg-hstore`
- `cd api; npx sequelize-cli init`

```bash
npx sequelize-cli model:generate --name Mentor --attributes firstName:string,lastName:string,email:string,description:text,linkedinURL:string,bookingURL:string,categories:json,imageURL:string
```

**6. Update sequelize config, run migrations**

- ignore prod for now
- `npx sequelize-cli db:migrate`

**7. Create an API Route**

- Create routes folder, mentor.js, import into index
- Create baseURL global variable
- Add GET and POST routes
- Test routes
- Real routes

**8. Push to Heroku**

- Create/push to GitHub repo
- Connect repo to Heroku
- Add procfile and db config
- Run prod migrations

**9. Submit user to form**

**10. Add head meta**

**11. Analytics, Error Tracking**

- `yarn add @nuxtjs/google-analytics @nuxtjs/sentry`

**12. Upload files to s3**

- `yarn add aws-sdk`
- create global was variable
- enable, configure proxy
- create new api route
- get presigned url
- save url to DB
- add credentials to heroku
