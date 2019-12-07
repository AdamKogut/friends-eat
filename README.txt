This is Adam Kogut and Riley Mintch's CGT141 project
It is a react app with an express app server and a firebase database
It also utilizes redux
The server routes are held in the following location
/routes/
Because it is a react app there are very little plain html pages and instead there are jsx pages
The client pages are at the following locations
/client/src/index.js
/client/src/App.js
/client/src/Components/
I use reactstrap which is the react version of bootstrap so I used the reactstrap layout instead of the css 
tables
It is a little harder to see what the content pages are so here are what I belive they are
Home, Group Page, My Group, Account Preferences, Calendar Page, Create Group Modal, and the feedback modal

Because of reactstrap, my css from .css files were being overwritten so I instead used the style attribute on
jsx items, I then moved all the styling into their own files that match up with the jsx file. It uses the same
css attributes but it is just in a different format, all the dashes are taken out of the attribute names and they
are in the format of lower camel case. The css files can be found at the following location:
/client/src/Components/CSS/
That being said there is a CalendarStyle.css file because a classname was required for the react-calendar
component

The original index.html file for the client is at 
/client/public/index.html
but to run the app locally you need to have a terminal with npm installed and in / you run "npm i", and in 
/client/ you run "npm i", then you run "npm run-script dev"

PGBuildApp-debug.3797028.1.apk is the android app built from phonegap build from the build folder
PGBuildApp.Windows10_0.0.1.3797028.1 is the windows app built from phonegap build from the build folder

Webpage can be found at bottomsup.me