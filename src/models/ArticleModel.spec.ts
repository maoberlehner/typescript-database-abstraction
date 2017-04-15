import test from 'ava';
import * as sinon from 'sinon';

import { ArticleModel } from './ArticleModel';

test('should be a function', (t) => {
  t.is(typeof ArticleModel, 'function');
});

test('should call the databases getAll method', (t) => {
  const MockDatabase = {
    getAll: sinon.spy(),
    getById: () => ({}),
  };
  const db = new ArticleModel(MockDatabase);
  db.getAll();

  t.true(MockDatabase.getAll.called);
});

test('should call the drivers getById method', (t) => {
  const MockDatabase = {
    getAll: () => [],
    getById: sinon.spy(),
  };
  const db = new ArticleModel(MockDatabase);
  db.getById(`some-id`);

  t.true(MockDatabase.getById.called);
});
