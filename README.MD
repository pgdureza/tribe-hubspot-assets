# About this project
This project is used to locally compile js and css assets then upload to a hubspot account through ftp.

### Setting up project
1. Download project
2. Install dependencies ` yarn install ` or  ` npm install `
3. open `ftp.json.sample` and replace values with hubspot credentials and save as `ftp.json`
4. Make sure to set the `ftp.json` ` enable ` as true

### Running Project
1. start gulp watcher
` yarn start ` or ` npm run start `
2. Make JS or CSS changes and it will automatically upload to your hubspot account

##  Generating Javascript Files
1. Javascript files found on the root folder `src/js/` will generate static js files under `_dist/js/` 
2. Any inner folder inside the root js folder will not generate a static javascript file
3. Folders inside inner folders should be treated as modules that can be included in main scripts on the root folder by using `//=require folder/file.js` or `//=include folder/file.js`. This will concatinate the entire contents of the required file inside the main file

##  Generating CSS Files
1. SCSS files found on the root folder `src/styles/` will generate static css files under `_dist/css/` 
2. Any inner folder inside the root js folder will not generate a static css file
3. use the standard scss `@import` to generate css files
