import { GetListTypeGuard } from './meta.types.js';

// --- Test Setup ---

// 1. Define a simple interface for testing
interface TestItem {
  id: number;
  name: string;
}

// 2. Define a type guard for the simple interface
const isTestItem = (obj: unknown): obj is TestItem => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as TestItem).id === 'number' &&
    typeof (obj as TestItem).name === 'string'
  );
};

// 3. Create the list type guard using the factory function
const isTestItemList = GetListTypeGuard(isTestItem);

// --- Tests ---

describe('GetListTypeGuard', () => {
  it('should return a function', () => {
    expect(typeof isTestItemList).toBe('function');
  });

  describe('Generated List Type Guard (isTestItemList)', () => {
    it('should return true for an array of valid items', () => {
      const validList: TestItem[] = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
      ];
      expect(isTestItemList(validList)).toBe(true);
    });

    it('should return true for an empty array', () => {
      const emptyList: TestItem[] = [];
      expect(isTestItemList(emptyList)).toBe(true);
    });

    it('should return false for an array with some invalid items', () => {
      const mixedList = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: undefined }, // Invalid item
        { id: 4, name: 'four' },
      ];
      expect(isTestItemList(mixedList)).toBe(false);
    });

    it('should return false for an array with only invalid items', () => {
      const invalidList = [
        { id: 1 }, // Missing name
        { name: 'two' }, // Missing id
        null,
        'string',
      ];
      expect(isTestItemList(invalidList)).toBe(false);
    });

    it('should return false for non-array inputs', () => {
      expect(isTestItemList(null)).toBe(false);
      expect(isTestItemList(undefined)).toBe(false);
      expect(isTestItemList({})).toBe(false);
      expect(isTestItemList({ id: 1, name: 'one' })).toBe(false); // Single valid item, not an array
      expect(isTestItemList('string')).toBe(false);
      expect(isTestItemList(123)).toBe(false);
      expect(isTestItemList(true)).toBe(false);
      expect(isTestItemList(new Date())).toBe(false);
    });

    it('should work with different base type guards', () => {
      const isString = (obj: unknown): obj is string => typeof obj === 'string';
      const isStringList = GetListTypeGuard(isString);

      expect(isStringList(['a', 'b', 'c'])).toBe(true);
      expect(isStringList([])).toBe(true);
      expect(isStringList(['a', 1, 'c'])).toBe(false);
      expect(isStringList(null)).toBe(false);

      const isNumber = (obj: unknown): obj is number => typeof obj === 'number';
      const isNumberList = GetListTypeGuard(isNumber);

      expect(isNumberList([1, 2, 3])).toBe(true);
      expect(isNumberList([])).toBe(true);
      expect(isNumberList([1, '2', 3])).toBe(false);
      expect(isNumberList({})).toBe(false);
    });
  });
});
