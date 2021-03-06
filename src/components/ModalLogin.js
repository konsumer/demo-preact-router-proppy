/** @jsx h */
import { h } from 'preact'

const ModalLogin = ({ onSubmit, onClickCancel }) => (
  <form onSubmit={onSubmit}>
    <h2>Login</h2>
    <div className='field'>
      <input type='email' name='email' placeholder='email' autoFocus required />
    </div>
    <div className='field'>
      <input type='password' name='password' placeholder='password' required />
    </div>
    <div className='field'>
      <button onClick={onClickCancel}>CANCEL</button>
      <button type='submit'>LOGIN</button>
    </div>
  </form>
)

export default ModalLogin
