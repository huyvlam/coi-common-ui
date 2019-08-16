import { containsKey, isEmpty } from '../object';

describe('containsKey', () => {
  it('should return \"true\" if object contains specified attribute', () => {
    expect(containsKey({a:1}, 'a')).toBeTruthy();
  });

  it('should return \"false\" if object contains specified attribute', () => {
    expect(containsKey({b:1}, 'a')).toBeFalsy();
  });
});

describe('isEmpty', () => {
  it('should return \"true\" if object has no enumerable attribute', () => {
    expect(isEmpty({})).toBeTruthy();
  });

  it('should return \"false\" if object contains any attribute', () => {
    expect(isEmpty({a: 1})).toBeFalsy();
  });
});
