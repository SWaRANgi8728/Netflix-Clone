# Netflix Clone 

## Project Overview

This project simulates a Netflix-like platform where users can browse movies and TV shows. The platform features a movie listing with categorized sections like **Movies** and **TV Shows**. Additionally, it allows users to search for specific movies and TV shows using a search functionality. The project also implements **user authentication** to ensure that only authenticated users can access certain features.

## Task Objectives

- **Movie Listings**: Display a list of movies and TV shows categorized into sections such as "Movies" and "TV Shows".
- **Search Functionality**: Allow users to search for specific movies and TV shows by title.
- **User Authentication**: Implement a login system for user authentication using a username and password.
- **Responsive Design**: Ensure the platform is fully responsive and works well on various devices.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - Fetch API (to interact with the OMDb API for movie/show data)
    
- **Backend**:
  - Node.js 
  - Express.js 
  - MongoDB 

## Features

1. **Movie Listings**:
   - Movies and TV shows are categorized and displayed on the main page.
   - Users can switch between viewing Movies or TV Shows by clicking on respective buttons.

2. **Search Functionality**:
   - A search input allows users to find specific movies or TV shows.
   - Results are displayed dynamically based on the user’s query.

3. **User Authentication**:
   - Users can sign up and log in to the platform.
   - MongoDB is used to store user credentials and ensure that only authenticated users can log in.
   - Users can log out and return to the login page.

## Steps to Run the Project

### Prerequisites

Before you run the project, make sure you have the following installed:

- **Node.js** 
- **MongoDB** 
- **Git** 

### 1. Clone the Repository
git clone https://github.com/SWaRANgi8728/Netflix-Clone.git

### 2. Install Dependencies
Navigate to directory:
cd Netflix Clone
npm install

### 3. Set Up MongoDB
In server.js file, you’ll find this part of the code:
mongoose.connect('mongodb://localhost:27017/userDB', { ... })

### 4. Start the Backend Server
node server.js

### 5. Open the Frontend in Your Browser
http://localhost:3000

### 6. Register and Login
**Register**:
If you're a new user, you can sign up by providing your email and password.
This will create an account in the system, and you will be able to log in.

**Login**:
After registering, you can log in with the credentials you created during the registration process.

**Browse Movies/TV Shows**:
Once logged in, you can browse movies and TV shows. The platform will allow you to search for movies or TV shows and switch between the "Movies" and "TV Shows" sections.




