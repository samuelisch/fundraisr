# Fundraisr

Fullstack Application built with the MongoDB/Mongoose, Express, ReactJS and NodeJs (MERN) stack.

## Access and deployment
This application is hosted on and accessible with [Heroku](https://fundraisr.herokuapp.com/)

### Motivation
This project is a mock-up of a fundraiser website, the main point of learning was to solidify concepts with the MERN stack, styling with TailwindCSS and DaisyUI templates, and up to user validation with JSON Web Token. Validation was also used for Protected Routes.

A [Figma mockup](https://www.figma.com/file/93ysGbF3CzWcxSQUfqo9H1/Project-3?node-id=0%3A1) was done prior to execution of the project, for increased efficiency.

### Features
The application makes use of a few technologies, along with create-react-app:
- React-Router
- JSON Web Token
- Multer and Cloudinary for Image Storage
- Axios instead of fetchApi for communication with the backend

useContext hook was used for global state of user variable.
There is a main navbar accessible throughout the entire application, before the different routes are defined.

Brief info on available endpoints, data schema and assets can be found documented [here](https://docs.google.com/spreadsheets/d/1LXs9GLtrfbVTpaDfY96GYKOjlXiRyP9oT2ZKWe5-vXM/edit?usp=sharing)

### Possible Further Features and complications
- Ability to edit campaign
- Logic for scenario when campaign ended
- Administrator login and view to edit all users/ campaign related data
- Integration with payment platform

### FormData and serving to the Backend
- The application is currently having some problems serving any uploaded images from the frontend to the backend after it has been deployed on Heroku.
