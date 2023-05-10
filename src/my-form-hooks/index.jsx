import useField from './useField';
import useForm from './useForm';

export default function MyForm() {
  const { form, values } = useForm({}, {
    username: (val) => !!val.trim() || '用户名不能为空',
    password: (val) => !!(val.length > 6 && val.length < 18) || '密码长度必须大于6个字符，小于18个字符',
    passwordAgain: (val, vals) => val === vals.password || '两次输入密码不一致'
  })

  const username = useField('username', form)
  const password = useField('password', form)
  const passwordAgain = useField('passwordAgain', form)

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div style={{width: '600px', heigth: '200px', margin: '100px auto'}}>
      <form onSubmit={onSubmit}>
        <div><input  {...username}/></div>
        <div><input type="password" {...password} /></div>
        <div>
          <input type="password" {...passwordAgain} />
          {passwordAgain.error && (
          <span>{passwordAgain.error}</span>
        )}
        </div>
        
        <button>Submit</button>
      </form>
    </div>
  );
}