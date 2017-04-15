import test from 'ava';
import * as sinon from 'sinon';

import { Database } from './Database';

import { IContent } from '../interfaces/IContent';

test('should be a function', (t) => {
  t.is(typeof Database, 'function');
});

test('should call the drivers getAll method', (t) => {
  const MockDriver = {
    getAll: sinon.spy(),
    getById: () => ({} as IContent),
  };
  const db = new Database(MockDriver);
  db.getAll(`some-table`);

  t.true(MockDriver.getAll.called);
});

test('should call the drivers getById method', (t) => {
  const MockDriver = {
    getAll: () => [],
    getById: sinon.spy(),
  };
  const db = new Database(MockDriver);
  db.getById(`some-id`, `some-table`);

  t.true(MockDriver.getById.called);
});
