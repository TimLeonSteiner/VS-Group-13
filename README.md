For Lab 02, our team implemented a simple Express application and containerized it with Docker and NGINX. Here is what we did step by step:

1. Created the Express App
   - Initialized a new Node.js project and installed Express.  
   - Wrote `index.js` defining two routes:  
     - `GET /hello` responds with “Hello IMIs!”  
     - `GET /` responds with a welcome message and a link to `/hello`.  
   - Verified locally with `node index.js` on port 3001.

2. Dockerized the Application
   - Added a `Dockerfile` that:  
     1. Uses the official `node:current` base image.  
     2. Copies `package.json` and runs `npm ci` to install dependencies.  
     3. Copies the application source.  
     4. Exposes port 3001 and sets `CMD ["npm","start"]`.  
   - Built the Docker image with  
     ```bash
     docker build -t wt1-express:latest .
     ```  
   - Run and tested the container on `localhost:3001`.

3. Added NGINX Reverse Proxy via Docker Compose
   - Created `docker-compose.yml` defining two services:  
     - application**: builds the Express image, maps port 3001, and mounts the source for live reload.  
     - reverse_proxy: uses `nginx:alpine`, listens on host port 80, and proxies `/` and `/hello` to the application.  
   - Wrote an NGINX config template (`nginx/templates/default.conf.template`) that:  
     - Serves static files at `/doc` from `public_html/`.  
     - Proxies all other requests to `http://application:3001`.

4. Served Static HTML 
   - Created a `public_html/` directory containing `index.html` (a simple docs page).  
   - Verified that browsing to `http://localhost/doc` serves this static content.

5. Testing and Cleanup 
   - Brought up the full stack with  
     ```bash
     docker compose up -d
     ```  
   - Confirmed in the browser:  
     - `http://localhost/` → Express root page via NGINX  
     - `http://localhost/hello` → “Hello IMIs!”  
     - `http://localhost/doc` → static HTML  
   - Stopped and removed containers with `docker compose down`.

6. Repository Preparation 
   - Added a `.gitignore` to exclude `node_modules/` and logs.  
   - Committed all source, Docker, and configuration files to GitHub.  
   - Tagged the final state as `LAB_02` for easy checkout by the instructor.

