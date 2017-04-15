import test from 'ava';
import * as sinon from 'sinon';
import * as yaml from 'js-yaml';

import { MarkdownExtractor, IDependencies } from './MarkdownExtractor';

test.beforeEach((t) => {
  t.context.dependencies = {
    yaml,
  } as IDependencies;
});

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
  const dependencies = Object.assign(
    t.context.dependencies,
    { yaml },
  );
  const extractor = new MarkdownExtractor(dependencies, fakeFileContent);
  const headerData = extractor.extractHeader();

  t.true(yaml.safeLoad.calledWith(fakeYamlHeader));
});

test('should extract content without YAML header', (t) => {
  const yaml = {
    safeLoad: () => ({}),
  };
  const dependencies = Object.assign(
    t.context.dependencies,
    { yaml },
  );
  const extractor = new MarkdownExtractor(dependencies, fakeFileContent);
  const content = extractor.extractContent();

  t.is(content, fakeContent);
});

test('should extract YAML header data and content', (t) => {
  const yaml = {
    safeLoad: () => ({}),
  };
  const dependencies = Object.assign(
    t.context.dependencies,
    { yaml },
  );
  const extractor = new MarkdownExtractor(dependencies, fakeFileContent);
  extractor.extractHeader = () => ({ fakeHeader: `fakeHeader` });
  extractor.extractContent = () => `fakeContent`;

  t.deepEqual(extractor.extractData(), {
    fakeHeader: `fakeHeader`,
    content: `fakeContent`,
  });
});
