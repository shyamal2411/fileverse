# Fileverse

## Overview

Fileverse is a web application that allows users to upload, retrieve, and share files securely. Built with React for the frontend and Node.js with Express for the backend, this application leverages AWS services for file storage and notifications.

## Features

- User authentication (signup and login)
- File upload and retrieval
- Secure file sharing via generated links
- Notifications via email using AWS SNS
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, TypeORM, MySQL/SQLite
- **Database**: MySQL/SQLite
- **Cloud Services**: AWS S3 for file storage, AWS SNS for notifications
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL or SQLite
- AWS account for S3 and SNS services

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<yourusername>/fileverse.git
   cd fileverse
   ```

2. **Install frontend dependencies:**

   Navigate to the `frontend` directory and install the dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**

   Navigate to the `backend` directory and install the dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following variables:

   ```plaintext
   DB_PATH=path_to_your_database_file
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_SESSION_TOKEN=your_aws_session_token
   SNS_TOPIC_ARN=your_sns_topic_arn
   CLOUDFRONT_URL=your_cloudfront_url
   PORT=5500
   ```

   For the frontend, create a `.env` file in the `frontend` directory:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5500/api
   ```

### Running the Application

1. **Start the backend server:**

   Navigate to the `backend` directory and run:

   ```bash
   npm start
   ```

   For development mode with auto-reload, use:

   ```bash
   npm run start:dev
   ```

2. **Start the frontend application:**

   Navigate to the `frontend` directory and run:

   ```bash
   npm start
   ```

   Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Signup**: Create a new account by providing your name, email, and password.
- **Login**: Use your credentials to log in.
- **File Upload**: Upload files using the upload interface.
- **File List**: View and share links to your uploaded files.

## Testing

To run tests for the frontend, navigate to the `frontend` directory and run:
```bash
npm test
```


For backend testing, you can implement your tests using Jest or any other testing framework of your choice.

## Deployment

For deployment, you can use services like AWS Elastic Beanstalk for the backend and Vercel or Netlify for the frontend. Ensure to configure your environment variables in the respective platforms.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) for integrating AWS services.
- [Express](https://expressjs.com/) for the backend framework.
