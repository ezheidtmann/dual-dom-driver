import test from 'node:test';
import assert from 'node:assert/strict';
import { stripHot } from '../lib/url.js';

test('removes the hot param while preserving the path', () => {
  assert.equal(
    stripHot('https://ridewithgps.com/routes/123?hot=abc123'),
    'https://ridewithgps.com/routes/123'
  );
});

test('preserves other query params and drops only hot', () => {
  assert.equal(
    stripHot('https://ridewithgps.com/search?q=loop&hot=abc&page=2'),
    'https://ridewithgps.com/search?q=loop&page=2'
  );
});

test('preserves the hash fragment', () => {
  assert.equal(
    stripHot('https://ridewithgps.com/routes/1?hot=x#section'),
    'https://ridewithgps.com/routes/1#section'
  );
});

test('leaves a URL without a hot param unchanged (modulo normalization)', () => {
  assert.equal(
    stripHot('https://ridewithgps.com/routes/1?q=loop'),
    'https://ridewithgps.com/routes/1?q=loop'
  );
});

test('handles a bare origin', () => {
  assert.equal(stripHot('https://ridewithgps.com/'), 'https://ridewithgps.com/');
});

test('returns malformed input unchanged instead of throwing', () => {
  assert.equal(stripHot('not a url'), 'not a url');
  assert.equal(stripHot(''), '');
});

test('strips hot regardless of its position among multiple params', () => {
  assert.equal(
    stripHot('https://huh.ridewithgps.com/a?hot=v1&x=1&y=2'),
    'https://huh.ridewithgps.com/a?x=1&y=2'
  );
});

test('strips an empty-valued hot param', () => {
  assert.equal(
    stripHot('https://ridewithgps.com/p?hot=&keep=1'),
    'https://ridewithgps.com/p?keep=1'
  );
});
