import generator from 'cucumber-html-reporter';
import open from 'open';

const options = {
  theme: 'bootstrap',
  jsonFile: `./tests/results/chrome.json`,
  output: `./tests/results/chrome.html`
};

generator.generate(options);
await open('./tests/results/chrome.html');