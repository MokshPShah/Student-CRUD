import Form from './components/Form'
import ViewData from './components/ViewData'

const App = () => {
  return (
    <>
      <div className="min-h-dvh flex flex-col justify-center items-center bg-slate-100">
        <Form />
        <ViewData />
      </div>
    </>
  )
}

export default App
