# RoadRace
A cycle competition app.
This app is only a hobby project to learn Node.js, with express.js, gulp and angular2.
I'll use npm fo fetching backend/server frameworks
I will us Bower from fetching frontend frameworks like Twitter-Bootstrap.
The backend will serve a REST api, that the frontend (Angular2) will use.

## How to start and use MongoDB
1) To execute MongoDB you can use the next command from the terminal: With this method a new terminal needs to be started in order to use the terminal or log into mongodb
$ mongod --config /usr/local/etc/mongod.conf

Launch MongoDB in background followed by the command –fork. Then it's possible to use the same terminal.
$ mongod --config /usr/local/etc/mongod.conf --fork

However, if you want to keep MongoDB running at any time,  even when you reboot the system, you should use the following commands:
//Start mongod main process on session start:
$ ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents

//Start MongoDB now, in background, and keep it running
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

Start using MongoDB
From now, MongoDB is available in your system and you can start MongoDB Shell from anywhere. You just have to open a terminal and use the mongo command to start:
mongo

Fill the database with testdata
To import Book data into your mongoDB database. Make sure MongoDB is running then run 'mongo raceAPI < path/to/file/racesJson.js' from the command line.