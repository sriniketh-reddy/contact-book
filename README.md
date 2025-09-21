# Setup
- Backend setup `cd backend && npm install` 
- Frontend setup `cd ../frontend && npm install` 
# Run App in Local Machine
- Backend `cd ../backend && node index.js` or `cd ../backend && npx nodemon index.js` 
- Frontend `cd ../frontend && npm start`
# Deployment
- Backend can be deployed on websites like (vercel, render, railway, heroku) by selecting the root folder as **/backend** and run command will be `node index.js` 
- Frontend can be deployed on wibsites like (vercel, render, netlify) by selecting the root folder as **/frontend** and build command will be `npm install && npm run build` then add static directory path as **/frontend/build** also add backend path to environmental variables named as *REACT_APP_API_URL*
 
