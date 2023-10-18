export default function makeInputObjectFactory({ md5, sanitize }) {
  return Object.freeze({ inputObj });
  let localErrorMsgs = {};
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
}
