import fs from 'fs';
import { updateReportResults, updateReportProperties } from './utils';

class JestJsonCumulativeReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = {
      filename: 'report.json',
      ignore: [],
      ...options,
    };
    this.report = fs.existsSync(options.filename)
      ? JSON.parse(fs.readFileSync(options.filename, 'utf8'))
      : { testResults: [] };
  }

  onRunComplete(test, results) {
    this.report = updateReportResults({
      options: this.options,
      report: this.report,
      results,
    });
    this.report = updateReportProperties({
      report: this.report,
    });
    fs.writeFileSync(this.options.filename, JSON.stringify(this.report));
  }
}

export default JestJsonCumulativeReporter;
