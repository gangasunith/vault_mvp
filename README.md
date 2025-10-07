Password Vault MVP (Node.js + EJS + MongoDB)

A simple password vault built with Node.js, Express, EJS, and MongoDB Atlas.
The app stores encrypted credentials; the server never sees plaintext passwords.

Features

User registration & login

Add, edit, and delete vault items

Vault items encrypted in browser using Web Crypto API (AES-GCM)

Simple, responsive UI

Run Locally

Clone the repository:

git clone <repo-url>
cd vault_mvp


Install dependencies:

npm install


Create a .env file with:

MONGODB_URI=<your_mongodb_connection_string>
SESSION_SECRET=<your_session_secret>


Start the server:

npm start


Open your browser at http://localhost:3000

Security Note

All vault items are encrypted client-side with AES-GCM.

Server stores only encrypted data, so plaintext credentials never leave your browser.