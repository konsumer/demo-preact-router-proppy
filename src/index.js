/** @jsx h */
import { render, h } from 'preact'
import { ProppyProvider } from 'proppy-preact'
import Router from 'preact-router'

import './style'
import providers from './providers'
import Header from './components/Header'
import Footer from './components/Footer'
import PageHome from './pages/PageHome'
import PagePricing from './pages/PagePricing'
import PageDashboard from './pages/PageDashboard'

const App = () => (
  <ProppyProvider providers={providers}>
    <div className='App'>
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
      <Footer />
    </div>
  </ProppyProvider>
)

// when global state chnages, render app
if (typeof window !== 'undefined') {
  providers.subscribe(props => {
    console.log('PROVIDERS', props)
    render(<App />, document.body, document.body.lastChild)
  })
}
