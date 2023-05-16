# NestJS Modern Sales API

This is the backend API for the Modern Sales project, built with NestJS.

```
lead developer: Cal Day Ham [https://caldayham.com]
company: Modern Sales XYZ LLC
```

## Technologies

- Node.js
- NestJS
- AWS SDK (DynamoDB, S3, SES)
- SendGrid
- JSON Web Tokens (JWT)
- Passport.js

## Project Structure

The `src` folder has the following structure:

src/
│
├── modules/                # Group all your feature modules
│   ├── auth/
│   ├── courses/
│   ├── users/              # users double as newsletter subscribers with object attribute 'is_newsletter_subscriber: boolean' - only need an email to become a user
│   ├── orders/
│   ├── reviews/
│   ├── newsletters/
│   ├── videos/
│   └── blog_posts/
│
├── services/               # Group external integrations and services
│   ├── aws_dynamodb/
│   ├── aws_ses/
│   └── stripe/
│
├── config/                 # Keep the configuration folder as it is
│
└── shared/                 # Add a shared folder for common utilities, middleware, pipes, etc.
    ├── middleware/
    ├── pipes/
    ├── utilities/
    └── decorators/

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- NPM (v7.x or later)
- Nest CLI (v9.x or later)

### Installation

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Copy the `.env.example` file to a new file called `.env` and fill in the necessary environment variables

### Development

1. To run the application in development mode, use the command `npm run dev`
2. The API should now be running at `http://localhost:3000`

### Building and Running in Production

1. Build the application using `npm run build`
2. Start the application in production mode using `npm run prod`
3. The API should now be running at `http://localhost:3000`

### Testing

1. Run unit tests with `npm run test`
2. Run end-to-end tests with `npm run test:e2e`
3. Run tests with coverage using `npm run test:cov`

## Documentation

Visit `/api` to see the Swagger API documentation for available endpoints.
