## A web-app for uploading code snippets and searching them.
#### Since this app doesn't use databases, it's not really suitable for any other than personal hosting. And because of that, consider this depo abandoned - I'll be making a real fullstack version in another depo.
####

## Usage

### Server
><code>cd server</code><br>
<code>npm install</code><br>
<code>node index.js</code><br>

### Client
><code>cd client</code><br>
<code>npm install</code><br>
<code>npm start</code><br>

### In case of yarn or npm install errors, just run <code>--force</code> many libraries used haven't been updated to include React 18 or newer.

## How everything works

### Server
>File fetching
>- Reads files on load from folder, places them in an array
>- Reads a description.json file containing all file descriptions and titles, places in an array
>- Matches descriptions/titles based on filename and sends to client
>- Files + descriptions are fetched intervally every minute

>File posting
>- Get request contains file, description and title
>- Check for already existing files and refuse post if true
>- Save posted file, add description/title to .json file

### Client
>Data fetching
>- GET request on load using fetch, place in an array
>- Make a copy of said array for searching, minimizing GET requests
>- Pass data using props from child <-> parent

![kuva](https://user-images.githubusercontent.com/66220187/170560380-a411e202-482a-414e-a9b3-ae781751f8eb.png)
