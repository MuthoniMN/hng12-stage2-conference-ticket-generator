import Navigation from "./components/Navigation";
import TicketForm from "./components/TicketForm";
import FormContextProvider from "./contexts/FormContext";

function App() {

  return (
    <FormContextProvider>
    <section className="lg:py-[112px] py-[64px] px-[20px] flex-col md:gap-[80px] gap-[48px] mobile:w-[375px] w-[100vw] gradient bg-no-repeat bg-cover h-fit">
      <Navigation />
      <TicketForm />
   </section>
   </FormContextProvider>
  )
}

export default App
