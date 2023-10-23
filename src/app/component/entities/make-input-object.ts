export default function makeInputObjectFactory({ md5, sanitize }) {
  function inputObj({ params, errorMsgs }) {
    const {
      username,
      password,
      created = Date.now(),
      modified = Date.now(),
    } = params;

    return Object.freeze({
      username: () => checkUsername({ username, errorMsgs }),
      password: () => checkPassword({ password, errorMsgs }),
      created: () => created,
      modified: () => modified,
    });
  }

  function checkUsername({ username, errorMsgs }) {
    checkRequiredParam({
      param: username,
      paramName: 'username',
      errorMsgs,
    });

    if (!strValidator(username)) {
      throw new Error(`${errorMsgs.INVALID_STRING}username`);
    }

    username = sanitize(username);
    return username;
  }

  function checkPassword({ password, errorMsgs }) {
    checkRequiredParam({
      param: password,
      paramName: 'password',
      errorMsgs,
    });
    password = sanitize(password);
    password = hash({ param: password });
    return password;
  }

  function hash({ param }) {
    return md5(param);
  }

  function checkRequiredParam({ param, paramName, errorMsgs }) {
    if (!param || param === '')
      throw new Error(`${errorMsgs.MISSING_PARAMETER}${paramName}`);
    return;
  }

  function strValidator(str: any): boolean {
    console.log(str);
    const isValid =
      str.length > 4 &&
      str.length < 25 &&
      /^[a-z0-9]+$/i.test(str) &&
      /^[a-z]/i.test(str[0]);

    if (isValid) {
      console.log(`[VALIDATION SUCCESS] The string "${str}" is valid.`);
      // throw new Error(`[VALIDATION FAILURE] The string "${str}" is not valid.`);
    } else {
      console.log(`[VALIDATION FAILURE] The string "${str}" is not valid.`);
    }
    return isValid;
  }

  return Object.freeze({ inputObj });
}
