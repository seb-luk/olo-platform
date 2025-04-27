/**
 * Type guard function to check if a value is a plain JavaScript object
 * suitable for use as a map (string keys to any value type).
 *
 * It verifies that the value is:
 * - Not null or undefined.
 * - Of type 'object'.
 * - Not an array.
 * - Not a Date instance.
 * - All its enumerable keys are strings (this is generally true for standard objects).
 *
 * @param obj - The value to check.
 *
 * @returns `true` if `obj` is a plain map-like object, `false` otherwise.
 */
export const isMapObject = (obj: any): obj is MapObject<any> =>
  obj != null &&
  typeof obj === 'object' &&
  !Array.isArray(obj) &&
  !(obj instanceof Date) &&
  Object.keys(obj).every((key: any) => typeof key === 'string');

/**
 * A generic JavaScript object used as a map or dictionary,
 * where keys are strings and values are of a specified `Datatype`.
 *
 * @template Datatype - The type of the values stored in the map. Defaults to `object`.
 */
export interface MapObject<Datatype = object> {
  [key: string]: Datatype;
}

/**
 * A JavaScript object that is guaranteed to be serializable
 * to JSON and deserializable back without losing information or changing types
 * (within the limits of JSON).
 *
 * It restricts values to primitives (string, number, boolean, undefined),
 * nested `SerializableObject`s, or arrays containing only these allowed types.
 * Functions, Symbols, Dates, Maps, Sets, etc., are excluded.
 *
 * @extends MapObject - Inherits the string-keyed structure.
 */
export interface SerializableObject extends MapObject<string
| number
| boolean
| SerializableObject
| Array<string | number | boolean | SerializableObject | undefined>
| undefined> {
  [key: string | number]:
    | string
    | number
    | boolean
    | SerializableObject
    | Array<string | number | boolean | SerializableObject | undefined>
    | undefined;
}

/**
 * Type guard function to check if a value is a primitive JavaScript property type
 * allowed within `JsData` (string, number, boolean, or Date).
 * Excludes null and undefined.
 *
 * @param obj - The value to check.
 *
 * @returns `true` if `obj` is a string, number, boolean, or Date, `false` otherwise.
 */
export const isJsProperty = (obj: any): obj is JsProperty =>
  obj != null &&
  (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date);

/**
 * Represents the primitive data types allowed as properties within `JsData`.
 * Includes string, number, boolean, and Date. Excludes null and undefined.
 */
export type JsProperty = string | number | boolean | string | Date;

/**
 * Type guard function to check if a value is a `JsMap`.
 * It verifies that the value is not null and is a plain map-like object
 * using `isMapObject`.
 *
 * @param obj - The value to check.
 *
 * @returns `true` if `obj` is a `JsMap`, `false` otherwise.
 */
export const isJsMap = (obj: any): obj is JsMap => obj != null && isMapObject(obj);

/**
 * Represents a JavaScript object used as a map where keys are strings
 * and values can be any valid `JsData` type (JsProperty, JsMap, or JsList).
 * This forms part of a recursive structure for representing JSON-like data.
 *
 * @extends MapObject<JsData>
 */
export type JsMap = MapObject<JsData>;

/**
 * Type guard function to check if a value is a `JsList` (an array).
 * It verifies that the value is not null and is an array using `Array.isArray`.
 *
 * @param list - The value to check.
 * @returns `true` if `list` is a `JsList` (an array), `false` otherwise.
 */
export const isJsList = (list: any): list is JsList => list != null && Array.isArray(list);

/**
 * Represents a JavaScript array where elements can be any valid `JsData` type
 * (JsProperty, JsMap, or JsList).
 * This forms part of a recursive structure for representing JSON-like data.
 */
export type JsList = Array<JsData>;

/**
 * Type guard function to check if a value conforms to the `JsData` type.
 * It verifies if the value is either a `JsProperty`, a `JsMap`, or a `JsList`.
 *
 * @param data - The value to check.
 * @returns `true` if `data` is valid `JsData`, `false` otherwise.
 */
export const isJsData = (data: any): data is JsData => isJsProperty(data) || isJsMap(data) || isJsList(data);

/**
 * Represents the union of all valid data types that can typically be found
 * in JSON-like structures or basic JavaScript data interchange formats.
 * It includes primitive properties (`JsProperty`), map objects (`JsMap`),
 * and arrays (`JsList`).
 */
export type JsData = JsProperty | JsMap | JsList;

/**
 * Defines a basic interface for classes that represent data and need
 * standard methods for string conversion and JSON serialization.
 */
export interface OloDataClass {
  /**
   * Returns a string representation of the object.
   *
   * @returns A string describing the object.
   */
  toString: () => string;
  /**
   * Returns an object representation suitable for JSON serialization.
   * This method is automatically called by `JSON.stringify()`.
   *
   * @returns An object suitable for JSON serialization.
   */
  toJSON: () => object;
}
