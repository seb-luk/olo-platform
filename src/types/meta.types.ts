/**
 * A higher-order function (factory) that creates a type guard for checking if an object is an array
 * where every element satisfies a given base type guard.
 *
 * This is useful for easily creating list validation functions based on existing
 * single-item validation functions.
 *
 * @template Type - The type of the elements within the array that the resulting guard will check for.
 * @param guard - The type guard function `(obj: unknown) => obj is Type` used to validate
 *   each individual element of the array.
 * @returns A new type guard function `(obj: unknown) => obj is Type[]` that returns `true`
 *   if the input `obj` is an array and *all* its elements satisfy the provided `guard`,
 *   `false` otherwise.
 *
 * @example
 * ```typescript
 * // Define a type guard for a single string
 * const isString = (val: unknown): val is string => typeof val === 'string';
 *
 * // Create a type guard for an array of strings using the factory
 * const isStringList = GetListTypeGuard(isString);
 *
 * const list1 = ['a', 'b', 'c'];
 * const list2 = ['a', 1, 'c'];
 * const notAList = { a: 1 };
 *
 * console.log(isStringList(list1));    // Output: true
 * console.log(isStringList(list2));    // Output: false
 * console.log(isStringList(notAList)); // Output: false
 * console.log(isStringList([]));       // Output: true (empty arrays satisfy the condition)
 * ```
 */
export const GetListTypeGuard = <Type>(guard: (obj: unknown) => obj is Type) =>
  (obj: unknown): obj is Type[] => Array.isArray(obj) && obj.every(guard);
