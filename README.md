# Node Mongo Test Project

This is a simple Node.js and MongoDB-based RESTful web service for managing a list of people. The application allows users to view, add, update, and delete person records. It also includes a validation feature for phone numbers and allows gender selection via radio buttons.

## Features
- **View List of People**: Displays all people in a table format.
- **Add New Person**: Form to create a new person with validation for phone number (only 10 digits).
- **Edit Person**: Allows editing the details of an existing person.
- **Delete Person**: Option to delete a person.
- **Validation**: Validates the phone number field to ensure only 10 digits are entered.
- **Gender Selection**: Gender is selected via radio buttons (Male, Female, Prefer not to say).

## Tech Stack
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing person data.
- **EJS**: Templating engine for rendering views.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/node-mongo-test.git
   cd node-mongo-test
