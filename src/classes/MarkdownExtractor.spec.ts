import test from 'ava';
import * as sinon from 'sinon';

import { MarkdownExtractor } from './MarkdownExtractor';

  const fakeYamlHeader =
`keyA: value a
keyB: value b`;
  const fakeContent =
`# Some
markdown content`;
  const fakeFileContent =
`---
${fakeYamlHeader}
---

${fakeContent}`;

test('should be a function', (t) => {
  t.is(typeof MarkdownExtractor, 'function');
});

test('should extract and parse YAML header data', (t) => {
  const yaml = {
    safeLoad: sinon.spy(),
  };
  const extractor = new MarkdownExtractor(yaml, fakeFileContent);
  const headerData = extractor.extractHeader();

  t.true(yaml.safeLoad.calledWith(fakeYamlHeader));
});

test('should extract content without YAML header', (t) => {
  const yaml = {
    safeLoad: () => ({}),
  };
  const extractor = new MarkdownExtractor(yaml, fakeFileContent);
  const content = extractor.extractContent();

  t.is(content, fakeContent);
});

test('should extract YAML header data and content', (t) => {
  const yaml = {
    safeLoad: () => ({}),
  };
  const extractor = new MarkdownExtractor(yaml, fakeFileContent);
  extractor.extractHeader = () => ({ fakeHeader: `fakeHeader` });
  extractor.extractContent = () => `fakeContent`;

  t.deepEqual(extractor.extractData(), {
    fakeHeader: `fakeHeader`,
    content: `fakeContent`,
  });
});
