# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
There are three points about refactored code:
1. Creating a hash is refactored into a new helper method for reusability and readability.
2. The function is restructured to return as soon as possible; no need to go down as soon as we know the return value. For example, if no input is given, we return immediately.
3. Statments are executed only for valid cases. For example, when there is no partitionKey defined, there is no need to check if candidate is a string or if candidate length is greater than MAX_PARTITION_KEY_LENGTH.