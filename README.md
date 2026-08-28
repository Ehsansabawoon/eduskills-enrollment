# EduSkills Student Enrollment Exercise

This project is a small full-stack application built for the EduSkills Software Development Intern take-home exercise.

The application uses a Node.js and Express backend to read student enrollment data from a local JSON file, normalize legacy-formatted data, and support filtering by school district. The frontend is built with React and displays the enrollment records in a table with district filtering, loading states, and error handling.

## Technologies Used

- Node.js
- Express
- React
- Vite
- JavaScript
- JSON

## Approach

Before writing any code, I first read through the exercise requirements and identified the main pieces I needed to complete: reading the enrollment data, normalizing the legacy date format, filtering by district, handling messy or missing values, and displaying the results in React.

I started with the backend because I wanted to make sure the API worked correctly before connecting the frontend. I created a small JSON dataset with a few intentional edge cases, such as a missing EL level, inconsistent district formatting, extra spaces, and an invalid date. I then tested each backend requirement one at a time before moving on to the React component.

## AI Tools

## AI Tools

I used ChatGPT as a coding support tool during this exercise. I used it to help review and draft portions of the implementation, work through edge cases, and confirm that my approach matched the requirements.

I tested each part of the project as I built it, made adjustments when needed, and made sure I understood how the backend, filtering, data handling, and React frontend worked before moving forward.

## Trade-off / Assumption

One assumption I made was that the district filter should be flexible enough to handle inconsistent capitalization and extra spaces in the legacy data. Because of that, I normalized the district values during comparison instead of requiring an exact match.

I also chose to keep the project simple and use a local JSON file instead of adding a database or extra libraries, since the exercise focuses more on data handling and application flow. With more time, I would add automated tests for the API and possibly make the district options come dynamically from the dataset instead of listing them manually in the frontend.



## How to Run the Project

Backend

1. Open a terminal and navigate to the backend folder:

cd backend

2. Install the backend dependencies:

npm install

3. Start the Express server:

node server.js

The backend will run at:

http://localhost:3000


Frontend

1. Open a second terminal and navigate to the frontend folder:

cd frontend

2. Install the frontend dependencies:

npm install

3. Start the React development server:

npm run dev

The frontend will run at:

http://localhost:5173

Keep both the backend and frontend terminals running at the same time while using the application.