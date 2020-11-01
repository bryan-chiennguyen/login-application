# Login Application

## Code Structure:
### src:
Contains code for the front-end of the application

index.js: The main file to run the front-end.
App.js: Contains the main functionalities of the front-end, including the form to fill out country code, phone number, and the access code received via phone number. 
App.css: The stylesheet for App.js.

### login-application-back:
Contains code for the back-end of the application

server.js: The main file to run the back-end.
app.js: Create an Express backend and call validate.
routes/validate.js: Calls methods CreateNewAccessCode, which will generate a random 6-digit access code and ValidateAccessCode, which will check whether the access code entered is correct and set the access code to empty string once validation is complete.
methods/validating.js: Contains code for methods CreateNewAccessCode and ValidateAccessCode.

