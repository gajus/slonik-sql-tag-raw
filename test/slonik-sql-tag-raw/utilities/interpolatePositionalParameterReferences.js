// @flow

import test from 'ava';
import {
  sql,
} from 'slonik';
import {
  interpolatePositionalParameterReferences,
} from '../../../src/utilities';

test('creates a plain sql token', (t) => {
  const sqlFragment = interpolatePositionalParameterReferences('foo', []);

  t.assert(sqlFragment.sql === 'foo');
  t.deepEqual(sqlFragment.values, []);
});

test('creates a tuple with a single positional parameter', (t) => {
  const sqlFragment = interpolatePositionalParameterReferences('($1)', [
    'foo',
  ]);

  t.assert(sqlFragment.sql === '($1)');
  t.deepEqual(sqlFragment.values, ['foo']);
});

test('interpolates SQL token', (t) => {
  const sqlFragment = interpolatePositionalParameterReferences('$1', [
    sql`to_timestamp(${'foo'})`,
  ]);

  t.assert(sqlFragment.sql === 'to_timestamp($1)');
  t.deepEqual(sqlFragment.values, ['foo']);
});

test('throws an erorr if the greatest parameter position is greater than the number of parameter values', (t) => {
  t.throws(() => {
    interpolatePositionalParameterReferences('($1, $2)', [
      'foo',
    ]);
  }, 'The greatest parameter position is greater than the number of parameter values.');
});

test('throws an erorr if least parameter is greater than 1', (t) => {
  t.throws(() => {
    interpolatePositionalParameterReferences('($2)', [
      'foo',
      'bar',
    ]);
  }, 'Parameter position must start at 1.');
});
