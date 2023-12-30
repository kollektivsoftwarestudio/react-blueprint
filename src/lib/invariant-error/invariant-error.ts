/**
 * Based on: https://github.com/epicweb-dev/invariant
 * and https://www.npmjs.com/package/invariant
 */

export class InvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvariantError";
  }
}

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {InvariantError} if condition is falsey
 */
export function invariant(
  condition: unknown,
  message: string | (() => string)
): asserts condition {
  if (!condition) {
    throw new InvariantError(
      typeof message === "function" ? message() : message
    );
  }
}
