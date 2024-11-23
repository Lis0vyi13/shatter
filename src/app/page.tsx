import HomeContainer from "@/components/Home/HomeContainer";
import Home from "./Home";

export default function HomePage() {
  return (
    <section className="text-white overflow-y-auto min-h-full bg-home bg-cover">
      <HomeContainer>
        <Home />
      </HomeContainer>
    </section>
  );
}
