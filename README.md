# angular-example
Yeoman generated angular fullstack variation with mocha, chai sinon and coverage.
As an example of an angular course.

# Installation
install git https://git-scm.com/downloads

## For Linux
Install nvm (Node Version Manager)
https://github.com/creationix/nvm

````
nvm install 0.12
````
then before running the app:
````
nvm use 0.12
````

## For Windows
You can use:
https://github.com/hakobera/nvmw
and then
````
nvm install 0.12
````
the before runn ing the app:
````
nvm use 0.12
````

or

install node 0.12 https://nodejs.org/download/release/v0.12.7/

I haven't tested with newer versions but it should work anyway.

## For both envs
````
npm install grunt-cli bower -g
git clone https://github.com/aotaduy/angular-course.git
npm install
bower install
npm run update-webdriver
````

# Run the app

The movie db example application uses the REST API at https://www.themoviedb.org/, to use this api you need an API Key from the site. You should create an account and ask for the key. They will send you it to you by email.

Before running ``grunt serve`` you should set the environment variable (this is a fake key you shuld add your own):
````
set MOVIEDB_API=72fa50138ba3dcfd588fd59a1375a810
````

## To run the app
````
grunt serve
````
point your browser to http://localhost:9000  if you have the APIKEY
or to  http://localhost:9000/demo/ to check available demo apps.

# Tests
### To run tests server and client
````
grunt test
````

### For E2e tests
````
grunt test:e2e
````

To load the server
````
grunt serve
````
