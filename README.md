# Teams Clone

Hosted Website [Teams Clone](https://teams-clone-engage-sam.herokuapp.com)<br/>
https://teams-clone-engage-sam.herokuapp.com/

## About Project

The application Teams Clone is a MERN Stack website which uses React JS in front-end and Node JS in back-end.<br/>

The User must first create an account in the website.
After successfull login the user has 3 options in the home page namely,

- _Instant Meeting_ <br/>
- _Join Meeting_ <br/>
- _Create Team_ <br/>

## Instant Meeting

When a user selects on instant meeting ,the user is redirected to the video call room screen where he can copy the **meeting link** and share with other user to join the meeting.<br/>

The users in the meeting can **chat while the video call** is happing in parallel by selecting on chat button. If again the same meeting link is used for next video call, the **chat of previous meeting is reterived**. The user can **turn the video and audio on/off** during the call.
<br/>

In the Video call more than **100+ users** can join the room.

## Join Meeting

If the host of the video call sends the meeting code to the user, he/she can join the video call room and have same features of instant meeting.

## Create Team

The user can create team by selecting this option and becomes admin of the team. The admin can **add other users** to the team. In the team, the users can **chat and also join the team video call** by selecting the video call button in the team.<br/>
In the video call of team the recent chat of team is retrived and users can chat parallel to the video call and this chat can reffered again in the team.

This feature is inspired from actual Team application.

The application uses

[JWT Token](https://jwt.io/), [MongoDB](https://www.mongodb.com/cloud/atlas) in server side for authentication.

[Bycrypt.js](https://www.npmjs.com/package/bcrypt) to hash password before saving in database.

[Twilio API](https://www.twilio.com) for Video Calling Room feature.

[Firebase](https://firebase.google.com) for real time data base for Chat feature.

## Getting Started

Create .env file and create an account in twilio for the below details [Twilio](https://www.twilio.com) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

```javascript
TWILIO_ACCOUNT_SID=
TWILIO_API_KEY=
TWILIO_API_SECRET=

ATLAS_URI =

```

Change Directory into the Server and Client Folder and run _npm install_ to install all the npm dependencies

```bash

npm install
cd client && npm install

```

## Server Terminal

In the server terminal run _npm run start_ to start the server on PORT 3001

```bash

npm run start

```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Client Terminal

In the client terminal run _npm run build_ to build the project and compile into the _.next_ folder. Then run _npm run start_ to start the production mode server on PORT 3000

```bash

npm run start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
