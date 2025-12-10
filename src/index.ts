/**
 * Core logic for humps - string case conversion utilities.
 */

const ACRONYM_RE = /([A-Z\d]+)(?=[A-Z\d]|$)/g;
const PASCAL_RE = /([^\-_]+)/g;
const SPLIT_RE = /([\-_]*(?:(?<=[^0-9_])(?=[A-Z])|(?<=[0-9])(?=[A-Z][a-z]))[^A-Z]*[\-_]*)/g;
const UNDERSCORE_RE = /(?<=[^\-_])[\-_]+[^\-_]/g;


type StringOrObject = string | number | Record<string, any> | any[];

/**
 * Convert a string, object, or array of objects to pascal case.
 */
export function pascalize(strOrIter: StringOrObject): StringOrObject {
  if (Array.isArray(strOrIter) || isPlainObject(strOrIter)) {
    return processKeys(strOrIter, pascalize);
  }

  const s = isNone(strOrIter as string);
  if (isUpperCase(s) || isNumeric(s)) {
    return strOrIter;
  }

  const replaced = s.replace(PASCAL_RE, (match) => {
    return match[0].toUpperCase() + match.slice(1);
  });

  const camelized = camelize(replaced) as string;
  return camelized.length !== 0
    ? camelized[0].toUpperCase() + camelized.slice(1)
    : camelized;
}

/**
 * Convert a string, object, or array of objects to camel case.
 */
export function camelize(strOrIter: StringOrObject): StringOrObject {
  if (Array.isArray(strOrIter) || isPlainObject(strOrIter)) {
    return processKeys(strOrIter, camelize);
  }

  let s = isNone(strOrIter as string);
  if (isUpperCase(s) || isNumeric(s)) {
    return strOrIter;
  }

  if (
    s.length !== 0 &&
    !s.slice(0, 2).toUpperCase().startsWith(s.slice(0, 2))
  ) {
    s = s[0].toLowerCase() + s.slice(1);
  }

  // For string "hello_world", match will contain the regex capture group for "_w".
  return s.replace(UNDERSCORE_RE, (match) =>
    match[match.length - 1].toUpperCase()
  );
}

/**
 * Convert a string, object, or array of objects to kebab case.
 */
export function kebabize(strOrIter: StringOrObject): StringOrObject {
  if (Array.isArray(strOrIter) || isPlainObject(strOrIter)) {
    return processKeys(strOrIter, kebabize);
  }

  const s = isNone(strOrIter as string);
  if (isNumeric(s)) {
    return strOrIter;
  }

  if (!isUpperCase(s) && (isCamelCase(s) || isPascalCase(s))) {
    return separateWords(fixAbbreviations(s), "-").toLowerCase();
  }

  return s.replace(UNDERSCORE_RE, (match) => "-" + match[match.length - 1]);
}

/**
 * Convert a string, object, or array of objects to snake case.
 */
export function decamelize(strOrIter: StringOrObject): StringOrObject {
  if (Array.isArray(strOrIter) || isPlainObject(strOrIter)) {
    return processKeys(strOrIter, decamelize);
  }

  const s = isNone(strOrIter as string);
  if (isUpperCase(s) || isNumeric(s)) {
    return strOrIter;
  }

  return separateWords(fixAbbreviations(s)).toLowerCase();
}

/**
 * Convert a string, object, or array of objects to snake case.
 * Alias for decamelize.
 */
export function depascalize(strOrIter: StringOrObject): StringOrObject {
  return decamelize(strOrIter);
}

/**
 * Convert a string, object, or array of objects to snake case.
 */
export function dekebabize(strOrIter: StringOrObject): StringOrObject {
  if (Array.isArray(strOrIter) || isPlainObject(strOrIter)) {
    return processKeys(strOrIter, dekebabize);
  }

  const s = isNone(strOrIter as string);
  if (isNumeric(s)) {
    return strOrIter;
  }

  return s.replace(/-/g, "_");
}

/**
 * Determine if a string, object, or array of objects is camel case.
 */
export function isCamelCase(strOrIter: StringOrObject): boolean {
  return strOrIter === camelize(strOrIter);
}

/**
 * Determine if a string, object, or array of objects is pascal case.
 */
export function isPascalCase(strOrIter: StringOrObject): boolean {
  return strOrIter === pascalize(strOrIter);
}

/**
 * Determine if a string, object, or array of objects is kebab case.
 */
export function isKebabCase(strOrIter: StringOrObject): boolean {
  return strOrIter === kebabize(strOrIter);
}

/**
 * Determine if a string, object, or array of objects is snake case.
 */
export function isSnakeCase(strOrIter: StringOrObject): boolean {
  if (isKebabCase(strOrIter) && !isCamelCase(strOrIter)) {
    return false;
  }

  return strOrIter === decamelize(strOrIter);
}

// Helper functions

function isNone(input: string): string {
  return input == null ? "" : input.toString().replace(/\s+/g, "");
}

function isPlainObject(value: any): boolean {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function isUpperCase(str: string): boolean {
  return str === str.toUpperCase() && str !== str.toLowerCase();
}

function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

function processKeys(
  strOrIter: StringOrObject,
  fn: (key: StringOrObject) => StringOrObject
): StringOrObject {
  if (Array.isArray(strOrIter)) {
    return strOrIter.map((item) => processKeys(item, fn));
  }

  if (isPlainObject(strOrIter)) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(strOrIter)) {
      result[fn(key) as string] = processKeys(value, fn);
    }
    return result;
  }

  return strOrIter;
}

/**
 * Rewrite incorrectly cased acronyms, initialisms, and abbreviations,
 * allowing them to be decamelized correctly. For example, given the string
 * "APIResponse", this function is responsible for ensuring the output is
 * "api_response" instead of "a_p_i_response".
 */
function fixAbbreviations(str: string): string {
  return str.replace(ACRONYM_RE, (match) => {
    return match[0] + match.slice(1).toLowerCase();
  });
}

/**
 * Split words that are separated by case differentiation.
 */
export function separateWords(str: string, separator: string = "_"): string {
  return str
    .split(SPLIT_RE)
    .filter((s) => s)
    .join(separator);
}
