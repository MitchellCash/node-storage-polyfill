import test from 'ava';
// eslint-disable-next-line import/no-unassigned-import
import '../src/index';

const STORAGE_TYPES = [localStorage, sessionStorage];

STORAGE_TYPES.forEach((storageType) => {
  const testName = storageType === localStorage ? 'localStorage' : 'sessionStorage';

  test(`${testName} is globally defined in the Node environment`, (t) => {
    t.true(storageType instanceof Object);
  });

  test(`${testName} methods work`, (t) => {
    storageType.setItem('KEY_1', 'VALUE_1');
    t.is(storageType.key(0), 'KEY_1');

    storageType.setItem('KEY_2', 'VALUE_2');
    t.is(storageType.getItem('KEY_1'), 'VALUE_1');
    t.is(storageType.getItem('KEY_2'), 'VALUE_2');
    t.is(storageType.length, 2);

    t.is(storageType.KEY_3, undefined);
    t.is(storageType.getItem('KEY_3'), null);

    storageType.setItem('KEY_3', '');
    t.is(storageType.getItem('KEY_3'), '');
    t.is(storageType.length, 3);

    storageType.removeItem('KEY_3');
    t.is(storageType.getItem('KEY_3'), null);
    t.is(storageType.length, 2);

    storageType.clear();
    t.is(storageType.getItem('KEY_1'), null);
    t.is(storageType.getItem('KEY_2'), null);
    t.is(storageType.length, 0);
    t.is(storageType.key(0), null);
  });

  test(`${testName}.key() throws when no index provided`, (t) => {
    t.throws(
      () => {
        // @ts-expect-error: Simulate what happens without strict type checking and no argument
        // passed.
        storageType.key();
      },
      {
        instanceOf: TypeError,
        message: "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      }
    );
  });

  test(`${testName} proxy works`, (t) => {
    t.is(storageType.length, 0);

    storageType.KEY_1 = {};
    t.is(storageType.KEY_1, '[object Object]');

    storageType.KEY_2 = 1;
    t.is(storageType.KEY_2, '1');

    const object = {};
    // @ts-expect-error: Simulate what happens without strict type checking to test if the key gets
    // stringified.
    storageType[object] = 'Key gets stringified';
    t.is(storageType['[object Object]'], 'Key gets stringified');

    t.is(storageType.length, 3);
    t.throws(
      () => {
        // @ts-expect-error: Simulate what happens without strict type checking to test assigning to
        // a readonly property errors.
        storageType.length = 0;
      },
      {
        instanceOf: TypeError
      }
    );
    t.is(storageType.length, 3);

    // @ts-expect-error: Simulate what happens without strict type checking and assign a string to a
    // method name.
    storageType.key = "Don't do this";
    // @ts-expect-error: As above.
    storageType.getItem = 'or this';
    // @ts-expect-error: As above.
    t.is(storageType.key, "Don't do this");
    // @ts-expect-error: As above.
    t.is(storageType.getItem, 'or this');
    t.is(storageType.length, 3);
  });
});
