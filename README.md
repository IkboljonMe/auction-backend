# Auction Server

This is the backend server for the auction project. It complements the front-end client, providing essential functionality for managing auctions, user authentication, and real-time communication. The server is built using Node.js, Express, and integrates with various libraries and services to deliver a seamless online auction experience.

**Frontend Client:** Check out the [Client Repository](https://github.com/IkboljonMe/auction-front).

| [Link](https://server-auction-hub.vercel.app) | ✅  |
| --------------------------------------------- | --- |
| Client                                        | ✅  |
| Server                                        | ❌  |

## Installation

Before getting started, ensure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone this repository to your local machine.
2. Navigate to the project directory:

```
cd auction-backend`
```

3.  Install the required dependencies:

```
npm install`
```

## Usage

To run the server locally, use the following command:

```
npm start
```

This will start the server, making it accessible for the client and handling API requests.

## Dependencies

Here are some of the key dependencies used in this project:

- [Express](https://expressjs.com/): A fast, unopinionated, and minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/): A NoSQL database used for storing auction data.
- [Socket.IO](https://socket.io/): A library for real-time, bidirectional communication between clients and the server.
- [Cloudinary](https://cloudinary.com/): A cloud-based service for managing and delivering images and media files.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library for hashing and verifying passwords.
- [jsonwebtoken](https://jwt.io/): A library for creating and verifying JSON Web Tokens for authentication.

You can find the complete list of dependencies in the `package.json` file.

## Scripts

- `npm start`: Starts the server using [nodemon](https://nodemon.io/) for automatic reloading during development.
- `npm test`: Run tests (customize tests as needed).
