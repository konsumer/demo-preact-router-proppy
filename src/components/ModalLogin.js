const ModalLogin = ({ onSubmit, onClickCancel }) => (
  <form onSubmit={onSubmit}>
    <input type='email' name='email' />
    <input type='password' name='password' />
    <button onClick={onClickCancel}>CANCEL</button>
    <button type='submit'>LOGIN</button>
  </form>
)

export default ModalLogin
