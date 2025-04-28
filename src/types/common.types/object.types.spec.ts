import {
  isJsData,
  isJsList,
  isJsMap,
  isJsProperty,
  isMapObject,
} from './object.types.ts';

describe('Object Types', () => {
  // --- isMapObject ---
  describe('isMapObject', () => {
    it('should return true for valid map objects', () => {
      expect(isMapObject({})).toBe(true);
      expect(isMapObject({ a: 1 })).toBe(true);
      expect(isMapObject({ a: 'test', b: { c: true } })).toBe(true);
      expect(isMapObject(new Object())).toBe(true); // eslint-disable-line no-new-object
    });

    it('should return false for non-objects or specific object types', () => {
      expect(isMapObject(null)).toBe(false);
      expect(isMapObject(undefined)).toBe(false);
      expect(isMapObject([])).toBe(false);
      expect(isMapObject([1, 2])).toBe(false);
      expect(isMapObject(new Date())).toBe(false);
      expect(isMapObject('string')).toBe(false);
      expect(isMapObject(123)).toBe(false);
      expect(isMapObject(true)).toBe(false);
      expect(isMapObject(Symbol('a'))).toBe(false);
      expect(isMapObject(() => {})).toBe(false); // Functions are objects, but not MapObjects
    });
  });

  // --- isJsProperty ---
  describe('isJsProperty', () => {
    it('should return true for valid JS properties', () => {
      expect(isJsProperty('string')).toBe(true);
      expect(isJsProperty(123)).toBe(true);
      expect(isJsProperty(0)).toBe(true);
      expect(isJsProperty(true)).toBe(true);
      expect(isJsProperty(false)).toBe(true);
      expect(isJsProperty(new Date())).toBe(true);
    });

    it('should return false for invalid JS properties', () => {
      expect(isJsProperty(null)).toBe(false);
      expect(isJsProperty(undefined)).toBe(false);
      expect(isJsProperty({})).toBe(false);
      expect(isJsProperty({ a: 1 })).toBe(false);
      expect(isJsProperty([])).toBe(false);
      expect(isJsProperty([1])).toBe(false);
      expect(isJsProperty(Symbol('a'))).toBe(false);
      expect(isJsProperty(() => {})).toBe(false);
    });
  });

  // --- isJsMap ---
  describe('isJsMap', () => {
    // isJsMap just calls isMapObject, so tests are similar
    it('should return true for valid map objects', () => {
      expect(isJsMap({})).toBe(true);
      expect(isJsMap({ a: 1 })).toBe(true);
      expect(isJsMap({ a: 'test', b: { c: true } })).toBe(true); // Value types aren't checked by the guard itself
      expect(isJsMap(new Object())).toBe(true); // eslint-disable-line no-new-object
    });

    it('should return false for non-objects or specific object types', () => {
      expect(isJsMap(null)).toBe(false);
      expect(isJsMap(undefined)).toBe(false);
      expect(isJsMap([])).toBe(false);
      expect(isJsMap([1, 2])).toBe(false);
      expect(isJsMap(new Date())).toBe(false);
      expect(isJsMap('string')).toBe(false);
      expect(isJsMap(123)).toBe(false);
      expect(isJsMap(true)).toBe(false);
      expect(isJsMap(Symbol('a'))).toBe(false);
      expect(isJsMap(() => {})).toBe(false);
    });
  });

  // --- isJsList ---
  describe('isJsList', () => {
    // isJsList just calls Array.isArray, so tests are straightforward
    it('should return true for valid arrays', () => {
      expect(isJsList([])).toBe(true);
      expect(isJsList([1, 'a', true])).toBe(true);
      expect(isJsList([{}, []])).toBe(true); // Value types aren't checked by the guard itself
      expect(isJsList(new Array())).toBe(true); // eslint-disable-line no-array-constructor
    });

    it('should return false for non-arrays', () => {
      expect(isJsList(null)).toBe(false);
      expect(isJsList(undefined)).toBe(false);
      expect(isJsList({})).toBe(false);
      expect(isJsList({ a: 1 })).toBe(false);
      expect(isJsList(new Date())).toBe(false);
      expect(isJsList('string')).toBe(false);
      expect(isJsList(123)).toBe(false);
      expect(isJsList(true)).toBe(false);
      expect(isJsList(Symbol('a'))).toBe(false);
      expect(isJsList(() => {})).toBe(false);
      expect(isJsList({ length: 1, 0: 'a' })).toBe(false); // Array-like object
    });
  });

  // --- isJsData ---
  describe('isJsData', () => {
    it('should return true for valid JsData types', () => {
      // JsProperty
      expect(isJsData('string')).toBe(true);
      expect(isJsData(123)).toBe(true);
      expect(isJsData(true)).toBe(true);
      expect(isJsData(new Date())).toBe(true);
      // JsMap
      expect(isJsData({})).toBe(true);
      expect(isJsData({ a: 1 })).toBe(true);
      // JsList
      expect(isJsData([])).toBe(true);
      expect(isJsData([1, 'a'])).toBe(true);
      // Nested
      expect(isJsData({ a: [1, { b: 'c' }] })).toBe(true);
      expect(isJsData([1, { b: ['d'] }])).toBe(true);
    });

    it('should return false for invalid JsData types', () => {
      expect(isJsData(null)).toBe(false);
      expect(isJsData(undefined)).toBe(false);
      expect(isJsData(Symbol('a'))).toBe(false);
      expect(isJsData(() => {})).toBe(false);
    });
  });
});
