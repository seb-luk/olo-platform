/**
 * A utility type that prepends a separator string `S` to a target string `T`,
 * but only if the target string `T` is not empty. If `T` is empty, it returns an empty string.
 *
 * @template T - The target string.
 * @template S - The separator string to prepend if `T` is not empty.
 *
 * @internal - Primarily used as a helper within `ConcatString`.
 *
 * @example
 * type Result1 = PrependIfDefined<'World', '/'>; // Result1 is '/World'
 * type Result2 = PrependIfDefined<'', '/'>;      // Result2 is ''
 */
type PrependIfDefined<T extends string, S extends string> = T extends '' ? T : `${S}${T}`;

/**
 * Recursively concatenates an array of strings `T` into a single string literal type,
 * inserting a separator string `S` between each element (except before the first).
 *
 * This is useful for creating precise string literal types based on arrays, often used
 * for representing joined paths, syntax strings, or keys.
 *
 * @template T - An array of strings to concatenate.
 * @template S - The separator string to insert between elements. Defaults to `''` (no separator).
 *
 * @example
 * type Path = ConcatString<['users', 'admin', 'settings'], '/'>;
 * // Path is 'users/admin/settings'
 *
 * type NoSeparator = ConcatString<['one', 'two', 'three']>;
 * // NoSeparator is 'onetwothree'
 *
 * type SingleElement = ConcatString<['config'], '-'>;
 * // SingleElement is 'config'
 *
 * type Empty = ConcatString<[], '/'>;
 * // Empty is ''
 */
export type ConcatString<T extends string[], S extends string = ''> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F}${PrependIfDefined<ConcatString<R, S>, S>}`
  : '';
