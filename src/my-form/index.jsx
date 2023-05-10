import React, { useState } from 'react';
import Form from './Form';
import FormStore from './FormStore';
import Field from './Field';

export default function MyForm() {
  const [ store ] = useState(new FormStore({}, {
      username: (val) => !!val.trim() || '用户名不能为空',
      password: (val) => !!(val.length > 6 && val.length < 18) || '密码长度必须大于6个字符，小于18个字符',
      passwordAgain: (val, vals) => val === vals.password || '两次输入密码不一致'
    })
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const data = store.get();
    console.log(data)
  };

  return (
    <div style={{width: '200px', heigth: '200px', margin: '100px auto'}}>
    <Form store={store} onSubmit={onSubmit}>
      <Field name="username">
        <input />
      </Field>
      <Field name="password">
        <input type="password" />
      </Field>
      <Field name="passwordAgain">
        <input type="password" />
      </Field>
      <button>Submit</button>
    </Form>
    </div>
  );
}