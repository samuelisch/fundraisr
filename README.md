# Fundraisr

Fullstack Application built with the MongoDB/Mongoose, Express, ReactJS and NodeJs (MERN) stack.

## Access and deployment
This application is hosted on and accessible with [Heroku](https://fundraisr.herokuapp.com/)

### Motivation
This project is a mock-up of a fundraiser website, the main point of learning was to solidify concepts with the MERN stack, styling with TailwindCSS and DaisyUI templates, and up to user validation with JSON Web Token. Validation was also used for Protected Routes.

A Figma mockup was done prior to execution of the project, for increased efficiency.

### Features
The application makes use of a few technologies, along with create-react-app:
- React-Router
- JSON Web Token
- Multer and Cloudinary for Image Storage
- Axios instead of fetchApi for communication with the backend

useContext hook was used for global state of user variable.
There is a main navbar accessible throughout the entire application, before the different routes are defined.

### Further Features and complications

### FormData and serving to the Backend
- The application is currently having some problems serving any uploaded images from the frontend to the backend after it has been deployed on Heroku.
