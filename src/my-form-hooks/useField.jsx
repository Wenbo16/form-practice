import React from "react";

// 从onChange事件中获取表单值，这里主要应对checkbox的特殊情况
function getValueFromEvent(e) {
  return e && e.target
    ? e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value
    : e;
}

function useField(name, form) {

  // 组件内部状态，用于触发组件的重新渲染
  const [value, setValue] = React.useState(
    name && form ? form.getFieldValue(name) : undefined
  );
  
  const [error, setError] = React.useState(
    name && form ? form.error(name) : undefined
  );

  // 订阅表单数据变动
  React.useEffect(() => {
    if (!name || !form) return;
    return form.subscribe(name, () => {
      setValue(form.getFieldValue(name));
      setError(form.error(name));
    });
  }, [name, form]);

  // 表单组件onChange事件，用于从事件中取得表单值
  const onChange = React.useCallback(
    (...args) => {
      name && form && form.setFieldValue(name, getValueFromEvent(...args))
    },
    [name, form]
  );

  return { value, error, onChange };
}

export default useField;