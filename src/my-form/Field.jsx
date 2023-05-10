import React from "react";
import { FormStoreContext } from "./Form";

// 从onChange事件中获取表单值，这里主要应对checkbox的特殊情况
function getValueFromEvent(e) {
  return e && e.target
    ? e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value
    : e;
}

function Field(props) {
  const { label, name, children } = props;
  // 拿到Form传下来的FormStore实例
  const store = React.useContext(FormStoreContext);

  // 组件内部状态，用于触发组件的重新渲染
  const [value, setValue] = React.useState(
    name && store ? store.get(name) : undefined
  );
  
  const [error, setError] = React.useState(
    name && store ? store.error(name) : undefined
  );

  // 订阅表单数据变动
  React.useEffect(() => {
    if (!name || !store) return;
    return store.subscribe(name, () => {
      setValue(store.get(name));
      setError(store.error(name));
    });
  }, [name, store]);

  // 表单组件onChange事件，用于从事件中取得表单值
  const onChange = React.useCallback(
    (...args) => {
      name && store && store.set(name, getValueFromEvent(...args))
    },
    [name, store]
  );

  let child = children;

  // 如果children是一个合法的组件，传入value和onChange
  if (name && store && React.isValidElement(child)) {
    const childProps = { value, onChange };
    child = React.cloneElement(children, childProps);
  }

  // 表单结构，具体的样式就不贴出来了
  return (
    <div className="form">
      <label className="form__label">{label}</label>
      <div className="form__content">
        <div className="form__control">{child}</div>
        <div className="form__message">{error}</div>
      </div>
    </div>
  );
}

export default Field;