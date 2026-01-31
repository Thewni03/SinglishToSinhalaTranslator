# SinglishToSinhalaTranslator

This repository contains automated end-to-end tests written using **Playwright** to test the *Singlish to Sinhala translation* functionality available on **[https://www.swifttranslator.com/](https://www.swifttranslator.com/)**.

The project includes **positive, negative test cases** to validate that the application works correctly and handles invalid inputs.

-------------------------------


* **Testing Framework =** Playwright
* **Language =** TypeScript
* **Test Type =** End-to-End UI Automation
* **Target Application =** SwiftTranslator (Singlish → Sinhala)

Step 1 - (check whether the following are installed on your machine)

* **Node.js** (v16 or later recommended) 
* **npm** (comes with Node.js)
* **Git**

(Check versions using)

```bash
node -v
npm -v
git --version
```

Step 2- Install Dependencies ( Install all required dependencies using npm)

```bash
npm install
```
Step 3 - Install Playwright Browsers (Before running the tests for the first time, install Playwright browsers)

```bash
npx playwright install
```
Step 4 - Run the Tests (To execute all Playwright tests)

```bash
npx playwright test
```

Step 5 - View HTML Test Report (After running tests, generate and view the Playwright HTML report)

```bash
npx playwright show-report
```

## This will open the report in your default browser.

---------

## Test Coverage

The test suite includes:

* **Positive Test Cases** – Valid Singlish inputs
* **Negative Test Cases** – Empty, invalid, and unexpected inputs

These tests ensure the correctness, robustness, and stability of the translation feature.


**Thewni Mahathanthri**

* Tests are written for academic and demonstration purposes.

--------
## How to Clone the Project
 Step 1- 

```bash
git clone https://github.com/Thewni03/SinglishToSinhalaTranslator.git
```
Step 2-

Navigate into the project directory:

```bash
cd SinglishToSinhalaTranslator
```
