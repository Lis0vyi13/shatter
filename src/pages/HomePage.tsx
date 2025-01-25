import HomeContainer from "@/components/pages/Home/HomeContainer";
import Home from "../components/pages/Home";

const HomePage = () => {
  return (
    <>
      <section className="text-white overflow-y-auto min-h-full bg-home bg-cover">
        <HomeContainer>
          <Home />
        </HomeContainer>
      </section>
    </>
  );
};

export default HomePage;
