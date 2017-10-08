exports.config = {

  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts: {
  defaultTimeoutInterval: 180000,
  },
  specs: ['searchFunctionality/*.js'],
  params: {
    URL: 'https://www.ratemyagent.com.au/'
  }

};
