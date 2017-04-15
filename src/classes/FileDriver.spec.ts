// TODO: Refactor to promises.
import test from 'ava';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as sinon from 'sinon';

import { FileDriver, IDependencies } from './FileDriver';

test.beforeEach((t) => {
  t.context.dependencies = {
    fs,
    glob,
    path,
  } as IDependencies;
});

test('should be a function', (t) => {
  t.is(typeof FileDriver, 'function');
});

test('should load files from the file system and extract data', (t) => {
  const files = [
    `file/a.md`,
    `file/b.md`,
  ];
  const fs = {
    readFileSync: sinon.stub().returns(`fake-content`),
  };
  const glob = {
    sync: sinon.stub().returns(files),
  };
  const dependencies = Object.assign(
    t.context.dependencies,
    { fs, glob },
  );
  const extractData = sinon.spy();
  const extractor = sinon.stub().returns({ extractData });
  const driver = new FileDriver(dependencies, extractor, `/some/cwd`);

  driver.getAll(`some-table`);

  t.true(glob.sync.calledOnce);

  t.true(fs.readFileSync.calledTwice);
  t.true(fs.readFileSync.calledWith(`file/a.md`));
  t.true(fs.readFileSync.calledWith(`file/b.md`));

  t.true(extractor.calledTwice);
  t.true(extractor.calledWith(`fake-content`));

  t.true(extractData.calledTwice);
});

test('should load file from the file system and extract data', (t) => {
  const fs = {
    readFileSync: sinon.stub().returns(`fake-content`),
  };
  const glob = { sync: () => ([]) };
  const extractData = sinon.spy();
  const extractor = sinon.stub().returns({ extractData });
  const cwd = `/some/cwd`;
  const table = `some-table`;
  const id = `some-id.json`;
  const dependencies = Object.assign(
    t.context.dependencies,
    { fs, glob },
  );
  const driver = new FileDriver(dependencies, extractor, cwd);

  driver.getById(id, table);

  t.true(fs.readFileSync.calledWith(`${cwd}/resources/${table}/${id}`));
  t.true(extractor.calledWith(`fake-content`));
});
