import './style'
import { render } from 'preact'
import { ProppyProvider } from 'proppy-preact'
import Router from 'preact-router'

import providers from './providers'
import Header from './components/Header'
import PageHome from './pages/PageHome'
import PagePricing from './pages/PagePricing'
import PageDashboard from './pages/PageDashboard'

const App = () => (
  <ProppyProvider providers={providers}>
    <div>
      <Header />
      <main>
        <Router>
          { !providers.props.user
            ? <PageHome key='home' path='/' default />
            : <PageDashboard key='dashboard' path='/' default />
          }
          <PagePricing key='pricing' path='/pricing' />
        </Router>
      </main>
    </div>
  </ProppyProvider>
)

if (typeof window !== 'undefined') {
  render(<App />, document.body, document.body.firstChild)
}
