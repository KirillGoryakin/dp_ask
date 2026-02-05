# ASK

System of automated test generation.

# Deployment

## Packages

Make sure your server has installed `nodejs`, `npm`, `yarn` and any process manager, e.g. `pm2`.

Commands below are applicable for servers with support of `apt`:
```bash
sudo apt install nodejs
sudo apt install npm
npm install yarn -g
npm install pm2 -g
```

## Upload

Now upload the project to the server, using any convenient method, like `git` or via FPT connection.

After uploading the project, dive into the `client` directory and install packages:
```bash
cd ./dp_ask/client
yarn
```

Create a `.env.local` file and fill values of these variables:
```
NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Launch

Make sure you are inside of `dp_ask/client` directory.

Make a build:
```bash
yarn build
```

Start the process using a process manager:
```bash
pm2 start yarn --  start
```

Now the project is available via port `3000`.

Use `pm2 status` command for checking process status and `pm2 stop yarn` command to stop the process.

## Update Delivery

Upload updated project files to the server and dive into the `dp_ask/client` directory.

Stop current process:
```bash
pm2 stop yarn
```

Make a new build:
```bash
yarn build
```

Relaunch the process:
```bash
pm2 start yarn --  start
```
