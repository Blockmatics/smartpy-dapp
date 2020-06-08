## Quick start

```bash
# clone the repo
git clone https://github.com/Blockmatics/smartpy-dapp.git

# change directory
cd smartpy-dapp

# install the repo with npm
npm install

# start the server
npm start

```
in your browser go to [http://localhost:4200](http://localhost:4200) 

### Prerequisites
What you need to run this app:
* Angular version 8.2.14
* Angular CLI version 8.3.19
* Typescript version 3.5.3
* Node.js version 12.13.0 LTS (Long Term Support)
* npm (node package manager) version 6.12.0

## Getting Started
 npm commands execute the scripts part of `package.json`. like on `npm start` the angular-cli execute `ng serve --host 0.0.0.0 --port 4200` and similarly for `npm run build` or `npm build` it execute `ng build`

Important `npm test`, `npm start`,`npm build`, `npm restart`, and `npm stop` are all aliases for `npm run xxx` so no need to confuse.

### Development
* `npm run start`
* in your browser [http://localhost:4200](http://localhost:4200) 
* It run on specified port, default is 4200. if you make any changes to your app, the changes are captured and reflected instantaneously on the UI. 

### Production 
* `npm run build`
* It will generate default `dist/` directory output and build artifacts, it can be deployed to your server like `apache2` or `nginx` etc.

### Author
* Blockmatics
* Authors: Sohan Yadav & Solomon Lederer
* Email: asksol@blockmatics.io


### ng serve vs ng build
The `ng build` command is intentionally for building the apps and deploying the build artifacts.

The `ng serve` command is intentionally for fast, local and iterative developments and also for builds, watches and serves the application from a local CLI development server.

Also, if you running the angular app using `ng serve` and if you make any changes to your app, the changes are captured and reflected instantaneously on the UI. This avoids starting and stopping the server again and again.

Both commands `ng build` and `ng serve` will clear the output folder before they build the project.

The main difference is – The `ng build` command writes generated build artifacts to the output folder and the `ng serve` command does not. By default, the output folder is - `dist/`.

Also the `ng serve` builds artifacts from memory instead for a faster development experience.
The `ng build` command generates output files just once and does not serve them.

The `ng build --watch` command will regenerate output files when source files change. This --watch flag is useful if you're building during development and are automatically re-deploying changes to another server.