# 🚀 Technical task 

This project provides a RESTful API for managing products with categories. It allows users to perform CRUD operations on products and categories, associating products with their respective categories.

## Installation

If Node.js is not already installed on your system, you can download and install it from the [official website](https://nodejs.org/).

To run this application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/robsahakyan/test_task_api

2. Navigate to the project directory:

    cd test_task_api

3. Install dependencies. Use --force due to deprecated module reasons:

    npm install --force

### 📋 Usage

1. After installing the dependencies, you can start the application using the following command:

    npm run start

This will start the application and begin monitoring the websites specified in the config.json file.

### ⚙️ Configuration

1. Look at the test.env file for environment configurations.

2. Create a .env file in the root directory and configure your environment variables based on the settings provided in test.env.

    cp test.env .env

Edit .env file to match your local configuration.

### 📄 Swagger Documentation

After starting the application, you can explore the API documentation using Swagger UI:

    {serverhost}:{port}/documentation

For example, if running locally:

    http://localhost:3000/documentation

Swagger UI provides a user-friendly interface to interact with and test the API endpoints.
