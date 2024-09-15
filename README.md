# Log Parser Application

This is a simple log parser application written in TypeScript. It reads a log file containing webpage URLs and IP addresses and processes the data to display:

- Pages sorted by total visits
- Pages sorted by unique visitors

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rohandogra25/logParser.git
   cd log-parser
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To run the log parser on a sample log file (`web.log`), follow these steps:

1. Ensure the log file (`web.log`) is placed in the root directory of the project. Each line in the log file should follow this format:

Example:
/home 123.45.67.89
/contact 111.22.33.44
/about 98.76.54.32

2. Run the application:

```bash
npm start
```

The application will read the log file, process the entries, and display the following output:

- Pages by total visits
- Pages by unique visitors

## Running Tests

This project includes unit tests for the log parser functionality using [Jest](https://jestjs.io/). To run the tests:

1. Run the following command:

```bash
npm test
```

2. Jest will execute the test cases and display the results.

## Directory Structure

├── index.ts # Main application logic
├── logParser.test.ts # Unit tests for the log parser
├── web.log # Example log file
├── package.json # Project configuration and dependencies
├── README.md # Instructions for running the project
└── tsconfig.json # TypeScript configuration
└── jest.config.js # Jest configuration

## Example Output

After running the application, you will see an output like this:

Pages by total visits:
/home 3 visits
/about 2 visits
/contact 1 visit

Pages by unique visitors:
/home 2 unique views
/about 2 unique views
/contact 1 unique view
