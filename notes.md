step1
- lets get rid of express
- 




----------

- takes minutes to install
- mix casing (can cause problems on case insensitive filesystems)
- tonnes of errors and warnings (project last commit was days ago)
- random files are executable? (Layout, client, .babelrc, .eslintrc and webpack.config.js)
- backend is being transpiled (instead of a view function that accepts state and returns markup)

suggestions
- move all the config into a backup folder for a minute and comment out the dep tree only restoring to what we need
- move to lowcase dasherized filenames
- create a render function for the client and the server and only transpile those (keeping the rest of the backend in native javascript)
- chmod -x path/to/executable
- convert server.js into a lambda function that calls the transpiled render function

additional notes
- css was just copied so I'm just copying it you can get elaborate here but we reccomend something like tackyons or tailwind

totally removed:

    "babel-core": "^6.26.0",
    "babel-eslint": "^8.0.2",
    "babel-jest": "^21.2.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-css-modules-transform": "^1.6.2",
    "babel-plugin-dynamic-import-node": "^2.3.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.3.13",
    "babel-register": "^6.26.0",
    "bundlesize": "^0.16.0",
    "css-loader": "^3.0.0",
    "enzyme": "^3.2.0",
    "enzyme-adapter-react-16": "^1.1.0",
    "eslint": "^4.12.0",
    "eslint-config-fortech-react": "^1.0.2",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-jsx-a11y": "^6.0.2",
    "eslint-plugin-react": "^7.5.1",
    "express": "^4.16.3",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "husky": "^0.14.3",
    "jest": "^21.2.1",
    "mini-css-extract-plugin": "^0.7.0",
    "nodemon": "^1.17.2",
    "npm-run-all": "^4.1.3",
    "style-loader": "^0.23.1",
    "webpack": "^4.19.1",
    "webpack-bundle-analyzer": "^2.13.1",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.0.0"


    "build": "NODE_ENV=production webpack --progress",
    "dev": "npm-run-all --parallel server client",
    "server": "nodemon index.js",
    "client": "webpack --watch --progress",
    "linter": "eslint src",
    "bundlesize": "bundlesize",
    "precommit": "eslint src --quiet"
