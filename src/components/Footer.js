import { compose } from 'proppy'
import { attach } from 'proppy-preact'

import { withAuth, withModal } from '../providers'

const P = compose(
  withAuth,
  withModal
)

const Footer = ({ user, Modal }) => (
  <footer>
    modal: {Modal ? 'true' : 'false'} |
    user: {user ? 'true' : 'false'}
  </footer>
)

export default attach(P)(Footer)
