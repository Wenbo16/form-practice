export const deepCopy = function (obj) {
  if (typeof obj !== 'object' || typeof obj == null) return;

  // 初始化返回结果
  let newObj = obj instanceof Array ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
};
