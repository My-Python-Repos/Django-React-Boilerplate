// * Validation utilities

export function isAllCapitals(string) {
  // Numbers are considered capitals
  return string === string.toUpperCase();
}

export function isAlphanumeric(string) {
  // Ignores case
  return string && string.match(/^[0-9a-z]+$/i);
}

export function isAlphanumericAllowWildcard(string) {
  // Ignores case
  return string && string.match(/^[0-9a-z%]+$/i);
}

export function isAlphanumericAllowWildcardAndDash(string) {
  // Ignores case
  return string && string.match(/^[0-9a-z%-]+$/i);
}

export function isNotWildcardOnly(string) {
  return string && string.match(/.*[0-9a-z].*/i);
}

export function isDuplicate(element, array) {
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === element) {
      count += 1;
    }
    if (count > 1) {
      return true;
    }
  }
  return false;
}

export function findDuplicates(array) {
  return array.filter((e, i, a) => a.indexOf(e) !== i);
}

export function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

// regex for checking for an email, allows for % wildcard
export const emailRegex = /^%$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// * Formatting utilities

export function commaStringToArray(text) {
  /*
  Transforms a comma separated string into an array of strings "abc,123" -> ['abc','123']
    Discards empty elements "abc,,,123" -> ['abc','123']
    Trims whitespace from elements "  abc  , 123 " -> ['abc','123']
    Empty string returns empty array "" -> []
  */
  return text ? text.split(',').map((t) => t.trim()).filter((t) => t) : [];
}

// Formats a comma separated string to multiline text for display
// * Also performs a sort
export function commaStringToMultiline(text) {
  return commaStringToArray(text).sort().join('\n');
}

export function utcToDatetimeString(seconds) {
  return new Date(seconds * 1000).toLocaleString();
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// * Functional utilities

export async function sleep(milliseconds) {
  await new Promise((r) => setTimeout(r, milliseconds));
}
