import fs from 'fs';

const updateReportProperties = (report) => {
  return {
    numFailedTestSuites: report.testResults.filter((suite) => suite.numFailingTests > 0).length,
    numFailedTests: report.testResults.reduce((total, item) => total + item.numFailingTests, 0),
    numPassedTestSuites: report.testResults.filter((suite) => suite.numPassingTests > 0).length,
    numPassedTests: report.testResults.reduce((total, item) => total + item.numPassingTests, 0),
    numPendingTestSuites: report.testResults.filter((suite) => suite.numPendingTests > 0).length,
    numPendingTests: report.testResults.reduce((total, item) => total + item.numPendingTests, 0),
    numTotalTestSuites: report.testResults.filter((suite) => suite.numTodoTests > 0).length,
    numTodoTests: report.testResults.reduce((total, item) => total + item.numTodoTests, 0),
    numTotalTests: report.testResults.reduce(
      (total, item) => total + item.numFailingTests + item.numPassingTests,
      0
    ),
  };
};

const updateReportResults = (report = {}, cur = {}) => {
  const uniqueSuites = [
    ...new Set([
      ...report.testResults.map(
        (i) => i.testFilePath.split('/')[i.testFilePath.split('/').length - 1]
      ),
      ...cur.testResults.map(
        (i) => i.testFilePath.split('/')[i.testFilePath.split('/').length - 1]
      ),
    ]),
  ];

  return {
    startTime: report.startTime || cur.startTime,
    updated: Math.round(new Date().getTime()),
    testResults: uniqueSuites.map((suite) => {
      // Updated test
      if (
        cur.testResults.find((rs) => rs.testFilePath.endsWith(suite)) &&
        report.testResults.find((rs) => rs.testFilePath.endsWith(suite))
      ) {
        return {
          ...report.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
          ...cur.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
          updated: Math.round(new Date().getTime()),
        };
      }

      // Existing test
      if (
        !cur.testResults.find((rs) => rs.testFilePath.endsWith(suite)) &&
        report.testResults.find((rs) => rs.testFilePath.endsWith(suite))
      ) {
        return report.testResults.find((rs) => rs.testFilePath.endsWith(suite));
      }

      // New test
      return {
        ...cur.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
        created: Math.round(new Date().getTime()),
      };
    }),
  };
};

class JestJsonCumulativeReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
    this.report = fs.existsSync(options.filename)
      ? JSON.parse(fs.readFileSync(options.filename, 'utf8'))
      : { testResults: [] };
  }

  onRunComplete(test, results) {
    this.report = { ...this.report, ...updateReportResults(this.report, results) };
    this.report = { ...this.report, ...updateReportProperties(this.report) };
    fs.writeFileSync(this.options.filename, JSON.stringify(this.report));
  }
}

export default JestJsonCumulativeReporter;
