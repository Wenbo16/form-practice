import { deepCopy } from "./utils";

class FormStore {
  constructor(defaultValues = {}, rules = {}) {
    // 表单值
    this.values = defaultValues;

    // 表单初始值，用于重置表单
    this.defaultValues = deepCopy(defaultValues);

    // 表单校验规则
    this.rules = rules;

    this.errors = {};
    
    // 事件回调
    this.observers = {};
  }

  // 每个Field创建时，通过调用FormStore.subscribe(observer)订阅表单数据变动。
  subscribe(name, observer) {
    this.observers[name] = this.observers[name] || [];
    this.observers[name].push(observer);

    // 返回一个用于取消订阅的函数
    return () => {
      const index = this.observers[name].indexOf(observer);
      if (index > -1) this.observers[name].splice(index, 1);
    };
  }

  // 通知表单变动，调用所有listener
  notify(name) {
    if(name === '*'){
      Object.keys(this.observers).forEach(name => {
        this.observers[name].forEach(observer => observer());
      })
      return;
    }
    this.observers[name].forEach(observer => observer());
  }

  // 获取表单值
  get(name) {
    // 如果传入name，返回对应的表单值，否则返回整个表单的值
    return name === undefined ? this.values : this.values[name];
  }

  // 设置表单值
  set(name, value) {
    //如果指定了name
    if (typeof name === "string") {
      // 设置name对应的值
      this.values[name] = value;
      // 执行表单校验，见下
      this.validate(name);
      // 通知表单变动
      this.notify(name);
    }

    // 批量设置表单值
    else if (name) {
      const values = name;
      Object.keys(values).forEach(key => this.set(key, values[key]));
    }
  }

  // 重置表单值
  reset() {
    // 清空错误信息
    this.errors = {};
    // 重置默认值
    this.values = deepCopy(this.defaultValues);
    // 执行通知
    this.notify("*");
  }

   // 用于设置和获取错误信息
   error(name, value) {
    const args = arguments;
    // 如果没有传入参数，则返回错误信息中的第一条
    // const errors = store.error()
    if (args.length === 0) return this.errors;

    // 如果传入的name是number类型，返回第i条错误信息
    // const error = store.error(0)
    if (typeof name === "number") {
      name = Object.keys(this.errors)[name];
    }

    // 如果传了value，则根据value值设置或删除name对应的错误信息
    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name];
      } else {
        this.errors[name] = value;
      }
    }

    // 返回错误信息
    return this.errors[name];
  }

  // 用于表单校验
  validate(name) {
    if (name === undefined) {
      // 遍历校验整个表单
      Object.keys(this.rules).forEach(rule => this.validate(rule));
      // 并通知整个表单的变动
      this.notify("*");
      // 返回一个包含第一条错误信息和表单值的数组
      return [this.error(0), this.get()];
    }

    // 根据name获取校验函数
    const validator = this.rules[name];
    // 根据name获取表单值
    const value = this.get(name);
    // 执行校验函数得到结果
    const result = validator ? validator(name, this.values) : true;
    // 获取并设置结果中的错误信息
    const message = this.error(
      name,
      result === true ? undefined : result || ""
    );

    // 返回Error对象或undefind，和表单值
    const error = message === undefined ? undefined : new Error(message);
    return [error, value];
  }
}

export default FormStore;