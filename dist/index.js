"use strict";var t,e=(t=require("fs"))&&"object"==typeof t&&"default"in t?t.default:t;module.exports=class{constructor(t,s){this.globalConfig=t,this.options={filename:"report.json",ignore:[],...s},this.report=e.existsSync(s.filename)?JSON.parse(e.readFileSync(s.filename,"utf8")):{testResults:[]}}onRunComplete(t,s){this.report=(({options:t,report:e,results:s})=>{const{ignore:i=[]}=t,n=t=>t.filter(t=>!i.find(e=>t.testFilePath.includes(e))).map(t=>t.testFilePath.split("/")[t.testFilePath.split("/").length-1]),l=[...new Set([...n(e.testResults),...n(s.testResults)])].map(t=>s.testResults.find(e=>e.testFilePath.endsWith(t))&&e.testResults.find(e=>e.testFilePath.endsWith(t))?{...e.testResults.find(e=>e.testFilePath.endsWith(t)),...s.testResults.find(e=>e.testFilePath.endsWith(t)),updated:Math.round((new Date).getTime())}:!s.testResults.find(e=>e.testFilePath.endsWith(t))&&e.testResults.find(e=>e.testFilePath.endsWith(t))?e.testResults.find(e=>e.testFilePath.endsWith(t)):{...s.testResults.find(e=>e.testFilePath.endsWith(t)),created:Math.round((new Date).getTime())});return{...e,startTime:e.startTime||s.startTime,testResults:l,updated:s.startTime}})({options:this.options,report:this.report,results:s}),this.report=(({report:t})=>({...t,numFailedTestSuites:t.testResults.filter(t=>t.numFailingTests>0).length,numFailedTests:t.testResults.reduce((t,e)=>t+e.numFailingTests,0),numPassedTestSuites:t.testResults.filter(t=>t.numPassingTests>0).length,numPassedTests:t.testResults.reduce((t,e)=>t+e.numPassingTests,0),numPendingTestSuites:t.testResults.filter(t=>t.numPendingTests>0).length,numPendingTests:t.testResults.reduce((t,e)=>t+e.numPendingTests,0),numTodoTests:t.testResults.reduce((t,e)=>t+e.numTodoTests,0),numTotalTestSuites:t.testResults.filter(t=>t.numTodoTests>0).length,numTotalTests:t.testResults.reduce((t,e)=>t+e.numFailingTests+e.numPassingTests,0)}))({report:this.report}),e.writeFileSync(this.options.filename,JSON.stringify(this.report))}};
