import { compose, withState, withHandlers, withProps } from 'proppy'
import jwt from 'jwt-decode'

import demoLogin from './demoLogin'

const providers = compose(
  withState(
    'user',
    'setUser',
    global.localStorage.token && jwt(global.localStorage.token)
  ),

  withState('Modal', 'setModal', null)
)()

// HOC that adds user, login, & logout
export const withAuth = compose(
  withProps((props, { props: { user, setUser } }) => {
    return {
      user,
      setUser
    }
  }),

  withHandlers({
    login: ({ setUser }) => (email, password) => new Promise((resolve, reject) => {
      // normally this would call out to a server, but this is a no-server demo
      const { user, token } = demoLogin(email, password)
      global.localStorage.token = token
      setUser(user)
      resolve(user)
    }),

    logout: ({ setUser }) => () => {
      global.localStorage.removeItem('token')
      setUser(null)
    }
  })
)

// HOC that adds Modal, modalShow, & modalHide
export const withModal = compose(
  withProps((props, { props: { Modal, setModal } }) => {
    return {
      Modal,
      setModal
    }
  }),

  withHandlers({
    modalShow: ({ setModal }) => modal => {
      console.log('MODAL', modal)
      setModal(modal)
    },
    modalHide: ({ setModal }) => () => {
      console.log('MODAL HIDE')
      setModal(null)
    }
  })
)

export default providers
