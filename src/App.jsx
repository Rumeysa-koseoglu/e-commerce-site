import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/header'

function App() {

  return (
    <div>
      <PageContainer>{/**the outer box that includes all content */}
        <Header/> {/**the header section in pagecontainer */}
      </PageContainer>
    </div>
  )
}

export default App
