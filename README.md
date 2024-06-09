## All the APIs mentioned in the 'Coding Task' have been implemented here. The details are:

- For the Authentication Part: Register and Login functionalities are provided, after logging in you would be given with a ```token```, which you would need to place in the header of Postman for requesting any request since no request is accessbile in the public domain, it would be written like:
    - ```Authorization: Bearer <TOKEN>```
    - The data for the login POST request would be json object consisting of ```phone``` and ```password```.
    - The data for registration POST request would be ```name, phone, password and an email id[OPTIONAL]```.

- For the contacts APIs:[Token would be placed in the header for this request as well.]
   - For adding contacts, call ```POST with /api/contacts``` for ```addContact with name and phone```.
   - For getting all the contacts with current logged in user, call ```GET request  to /api/contacts``` endpoint.
   - For marking a contact as SPAM for a particular ID, call ```POST with /api/contacts/:contactId/spam``` for marking that contact as spam.
   - For marking multiple phone numbers as SPAM[whether saved or not], call ```POST with json data as an array of phoneNumbers, with /contacts/spam```, it would mark them as spam and also save with default user name.

- For search APIs: [Token would be placed in the header for this request as well.]
  - For searching by name, as mentioned by first starting and then if present in between too, call to ```GET to /api/search/name```
  - For searching by Phone number, as mentioned in the Task, call to ```GET to /api/search/phone```.
  - For getting down to retrieving name only if the person is a registered user and the user who is searching is in the person’s contact list, call to ```GET to /api/email/phone```.

## Wtith this all the APIs are built and tested along with random data generation for 50 cases in the populateData.ts file.

### Steps to run
 - Run ```npm install```
 - First generate data: run ```npx ts-node src/utils/populateData.ts``` to generate sample Data.
 - ```npm build run```
 - Then ```npm start```
 - Test with Postman for all the APIs.
