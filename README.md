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

# Resolving Common TypeScript and Web-Vitals Issues in React Projects

## Why Do These Errors Occur?

The errors occur due to configuration mismatches or missing dependencies in a TypeScript and React project. Here’s a brief explanation of the main issues:

1. **Missing Jest and React Types:**
   Testing utilities like Jest and React require type definitions for TypeScript to understand testing-specific functions and JSX elements.

2. **Cannot Use JSX Without '--jsx' or 'import' statement:**
   TypeScript requires `tsconfig.json` to handle JSX syntax. Without it, the compiler cannot process files with JSX code.

3. **Missing or Incorrect `web-vitals` API Usage:**
   The `web-vitals` library has been updated, and its API has changed.

4. **Cannot Find Module './logo.svg':**
   TypeScript does not recognize non-code assets like `.svg` files without additional type declarations. This is why it cannot resolve the `logo.svg` import.

By addressing these configuration issues, your project will compile and run without errors.

# How to resolve the issues

## 1. Install Necessary Dependencies

Run the following commands:

```bash
npm install web-vitals --save
npm install --save-dev @types/jest @types/react @types/react-dom
```

## 2. Add a `tsconfig.json` File

Add the following configuration to the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "strict": true,
    "target": "ES6",
    "module": "ESNext"
  }
}
```

## Explanation:

- jsx: react-jsx: Supports JSX syntax for React 17+.
- esModuleInterop: true: Ensures compatibility with CommonJS and ES modules.
- moduleResolution: node: Configures module resolution for npm packages.
- strict: true: Enables strict type-checking.
- target and module: Set ECMAScript versions to target modern JavaScript.

## 3. Fix `reportWebVitals.ts`

Replace its content with:

```typescript
import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

type MetricHandler = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: MetricHandler) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
```

## 4. Add a Declaration for SVG Files

1. **Create a File**  
   Create a file named `declaration.d.ts` (or `custom.d.ts`) in the `src` folder with the following content:

   ```typescript
   declare module "*.svg" {
     const content: string;
     export default content;
   }
   ```

2. **Verify the SVG File**
   Ensure that logo.svg exists in the src folder.
