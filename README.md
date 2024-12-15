# Setting Up React with TypeScript and React Testing Library

Follow the steps below to set up your development environment for React with TypeScript and React Testing Library:

## Step 1: Create a React App with TypeScript

Run the following command to create a new React project using TypeScript:

```bash
npx create-react-app react-test --template typescript
```

## Step 2: Navigate to the Project Directory

Move into the newly created project directory:

```bash
cd react-test
```

## Step 3: Install React Testing Library Dependencies

Install the required dependencies for React Testing Library:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Step 4: Verify the Setup by Running Tests

Run the following command to execute the default test suite:

```bash
npm test
```

- If the test suite runs successfully and includes a passing test (e.g., "renders learn react link"), your setup is complete.
