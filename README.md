# jest-json-cumulative-reporter 

A [Jest](https://github.com/facebook/jest) test results processor for generating a cumulative report in JSON format. The reporter will update existing suite reports, and create new suite reports.

## Installation

```shell
$ npm install --save-dev jest-json-cumulative-reporter
```

## Usage

Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):

```JSON
"reporters": ["default", "jest-json-cumulative-reporter"],
```

As you run Jest from within the terminal, a file called _report.json_ will be created within your root folder containing information about your tests.

## Configuration

Please note that all configuration properties are optional. They can be used with the following syntax:

```JSON
"reporters": [
	"default",
	["jest-json-cumulative-reporter", {
    "filename": "report.json",
    "ignore": ["sandbox.spec.js", "/ignoredTests"]
	}]
]
```

| Property                        | Type      | Description                                                                                                                                                                                                      | Default                 |
| ------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `filename`                      | `STRING`  | Name of the file generated by the report.                                                                                                                                                                        | `report.json`           |
| `ignore`                        | `ARRAY`   | A list of filenames or paths to ignore.                                                                                                                                                                          | `[]`                    |

_Tests coming soon._
