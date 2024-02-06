#### Playstation Automation Tests using Playwright and Typescript

**Setup**
run below in project folder
```
npm init playwright@latest

npm install

```

**Project Folders:**

tests are located Under 'tests' folder

Pages Objects are  Under 'tests/pages' folder

Env files under env folder - holds login secrets, env urls. 
update user details in env files as part of setup

To run the  tets run below commands in the terminal :

**Run the test**
```
Env=envToRun npx playwright test
or to run on Default env
npx playwright test

```
**Run the test in headed mode**
```
npx playwright test --headed
```
**Run the test in ui mode**
```
npx playwright test --ui
```