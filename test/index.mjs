import forEach from 'array.prototype.foreach';
import * as Module from 'array.prototype.foreach';
import test from 'tape';
import runTests from './tests.js';

test('as a function', (t) => {
	t.test('bad array/this value', (st) => {
		st.throws(() => forEach(undefined), TypeError, 'undefined is not an object');
		st.throws(() => forEach(null), TypeError, 'null is not an object');
		st.end();
	});

	runTests(forEach, t);

	t.end();
});

test('named exports', async (t) => {
	t.deepEqual(
		Object.keys(Module).sort(),
		['default', 'shim', 'getPolyfill', 'implementation'].sort(),
		'has expected named exports',
	);

	const { shim, getPolyfill, implementation } = Module;
	t.equal(await import('array.prototype.foreach/shim'), shim, 'shim named export matches deep export');
	t.equal(await import('array.prototype.foreach/implementation'), implementation, 'implementation named export matches deep export');
	t.equal(await import('array.prototype.foreach/polyfill'), getPolyfill, 'getPolyfill named export matches deep export');

	t.end();
});
