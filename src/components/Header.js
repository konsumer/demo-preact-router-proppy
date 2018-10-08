import { compose, withHandlers } from 'proppy'
import { attach } from 'proppy-preact'
import { Link } from 'preact-router/match'
import { route } from 'preact-router'

import { withAuth, withModal } from '../providers'
import ModalLogin from './ModalLogin'

const P = compose(
  withAuth,
  withModal,

  withHandlers({
    onSubmit: ({ login, modalHide }) => e => {
      e.preventDefault()
      e.stopPropagation()
      console.log(e.target)
    },

    onClickCancel: ({ modalHide }) => e => {
      e.preventDefault()
      e.stopPropagation()
      modalHide()
    }
  }),

  withHandlers({
    onLoginClick: ({ modalShow, onSubmit, onClickCancel }) => e => {
      e.preventDefault()
      e.stopPropagation()
      console.log('LOGIN MODAL')
      modalShow(<ModalLogin onSubmit={onSubmit} onClickCancel={onClickCancel} />)
    },

    onLogoutClick: ({ logout }) => e => {
      e.preventDefault()
      e.stopPropagation()
      logout()
      route('/')
    },

    onSecretModalClick: ({ modalShow, modalHide }) => e => {
      e.preventDefault()
      e.stopPropagation()
    }
  })
)

const Header = ({ user, Modal, onLoginClick, onLogoutClick, onSecretModalClick }) => (
  <header>
    <h1>Site Name</h1>
    {!user && (
      <nav>
        <Link activeClassName='active' href='/'>HOME</Link>
        <Link activeClassName='active' href='/pricing'>PRICING</Link>
        <a href='/login' onClick={onLoginClick}>LOGIN</a>
      </nav>
    )}
    {!!user && (
      <nav>
        <Link activeClassName='active' href='/'>DASHBOARD</Link>
        <a href='/modal' onClick={onSecretModalClick}>LOGOUT</a>
        <a href='/login' onClick={onLogoutClick}>LOGOUT</a>
      </nav>
    )}
    {!!Modal && (
      <div className='modal-backdrop'>
        <div className='modal'>
          {Modal}
        </div>
      </div>
    )}
  </header>
)

export default attach(P)(Header)
