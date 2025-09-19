import { useState } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer.jsx";
import { FooterCredit } from "./components/footer-credit";

function App() {
  const [data, setData] = useState({
    todos: [],
    filter: "all",
  });

  return (
    <>
      <section className="todoapp">
        <Header setData={setData} />
        <Main data={data} setData={setData} />
        {data.todos.length > 0 && <Footer data={data} setData={setData} />}
      </section>

      <FooterCredit />
    </>
  );
}

export default App;
