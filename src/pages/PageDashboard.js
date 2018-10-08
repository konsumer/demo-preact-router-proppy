import { compose, withHandlers } from 'proppy'
import { attach } from 'proppy-preact'

import { withAuth } from '../providers'

const P = compose(
  withAuth
)

const PageDashboard = ({ user }) => (
  <section>
    <h2>Dashboard</h2>
    <p>You have been authenticated, so you are seeing this special home page.</p>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </section>
)

export default attach(P)(PageDashboard)
