
<p align="center">
    <img title="eBuzz" height="100" src="https://i.ibb.co/8dthJqh/Screenshot-2023-10-16-at-11-07-35-PM.png" width="50%"/>
</p>
## Introduction

eBuzz is a dedicated social media platform designed exclusively for `ESUT`. eBuzz aims to provide students, faculty, school management, and staff with a unified virtual space to share ideas, broadcast information or news, collaborate on projects, and participate in academic discussions. Key features of eBuzz will include personalized profiles, academic group creation, event planning, real-time posting, and multimedia sharing. Additionally, an intelligent recommendation system will be integrated to suggest relevant academic content and foster serendipitous connections between members. Security and privacy will be prioritized, ensuring compliance with data protection regulations and safeguarding of users’ personal information.

## Project Features

- [x] Users can signup and login to their accounts.
- [x] Users can access all causes as well as create a new cause, edit their created cause and also delete what they've created.
- [x] A user cannot delete posts and comments made by another user.
- [x] A user cannot effect a cause without logging in first.
- [x] Unique Avatars were used as default profile images.

```json
{
    "message": "User fetched successfully",
    "user": {
        "_id": "652c022f44e2a22923c39c14",
        "imgTag": "<img src=\"https://api.dicebear.com/5.x/miniavs/svg?seed=primekings-nr4lu-kc-gm4cj-gmail-nr4lu-com&size=200&radius=50\" alt=\"primekings.kc@gmail.com's avatar\">",
        "username": "primekings",
        "email": "primekings.kc@gmail.com",
        "password": "$2b$10$YfSZshP35yD3CHepOoImmOq957jzpCmxarcGH42c6PoHVVlASIvFO",
        "emailVerified": false,
        "deleted": false,
        "events": [],
        "followers": [],
        "following": [],
        "communities": [],
        "createdAt": "2023-10-15T15:15:59.128Z",
        "updatedAt": "2023-10-15T15:15:59.128Z",
        "__v": 0
    }
}
```

### Links

- [API Documentation](https://documenter.getpostman.com/view/14719733/2s9YR83Ccx)

- [Live Link](https://ebuzz.onrender.com/api/v1)

### Installation Guide

- Clone this repository `https://github.com/esutBuzz/ebuzz-backend`

- The `develop` branch is the most stable branch at any given time, ensure you're working from it.

- Run`npm install` to install all dependencies

- Create an .env file in your project root folder and add your variables.

### Usage

> Run `npm start` to start the application.

> Connect to the API using Postman on port `5000`.

### Tech Stack Used

- NodeJS (LTS version)
- ExpressJS
- JavaScript
- MongoDB Database
- Mongoose ODM (Object Data Mapper)
- Dotenv
- Bcrypt
- EJS
- Multer
- Nodemailer
- Cookie-parser
- Connect-mongodb-session
- Jsonwebtoken
- Body-parser
- Nodemon

## App Architecture and Folder Structure

A clean architecture was implemented during the process of building this app.

### Folder Structure

```
├── .vscode
│   └── settings.json
├── controllers
│   ├── comment.controller.js
│   ├── comment.controller.js
│   ├── event.controller.js
│   ├── feed.controller.js
│   ├── follower.controller.js
│   ├── forgotPassword.controller.js
│   ├── likes.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── middlewares
│   ├── check-auth.js
│   ├── uploadMiddleware.js
│   └── validateUser.js
├── models
│   ├── comment.model.js
│   ├── community.model.js
│   ├── event.model.js
│   ├── feed.model.js
│   ├── follower.model.js
│   ├── post.model.js
│   └── user.model.js
├── routes
│   ├── auth.route.js
│   ├── comment.route.js
│   ├── community.route.js
│   ├── event.route.js
│   ├── feed.route.js
│   ├── follow.route.js
│   ├── forgotPassword.route.js
│   ├── likes.route.js
│   ├── post.route.js
│   ├── server.route.js
│   └── user.route.js
├── utils
│   ├── avatar.js
│   ├── emailPage.html
│   ├── greeting.js
│   ├── imgTag.js
│   ├── sendmail.js
│   └── validate.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```


### Avatar API

Dicebear API was used for the generation of avatars.

<div style="display: flex;">
    <div style="flex: 50%;">
        <img src="https://api.dicebear.com/5.x/avataaars/svg?seed=king-g5xm5-gmail-z3orx-com&size=200&radius=50" alt="Avatar 1">
    </div>
    <div style="flex: 50%;">
        <img src="https://api.dicebear.com/5.x/avataaars/svg?seed=galactic-zodiac-end8o-gmail-t6xjt-com&size=200&radius=50" alt="Avatar 2">
    </div>
</div>


### Author

[Kingsley CJ](https://github.com/kingsleycj)
