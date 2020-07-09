export function toLowerCase(obj) {
  if (!obj)
    return null;

  let key, keys = Object.keys(obj);
  let n = keys.length;
  let newItem = {}
  while (n--) {
    key = keys[n];
    newItem[key.toLowerCase()] = obj[key];
  }

  return newItem;
}

export function parseDateTime(datetime = '') {
  if (!datetime)
    return undefined;

  const parseDatetime = datetime.split(/[- :TZ]/);
  var d = new Date(
    Date.UTC(parseDatetime[0],
      parseDatetime[1]-1,
      parseDatetime[2],
      parseDatetime[3],
      parseDatetime[4],
      parseDatetime[5]
    ));

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}