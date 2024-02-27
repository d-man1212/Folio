import { ListComponent } from "../components/ListComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

export const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="m-20 border-4 border-secondary p-4 rounded-md">
        <div className="text-text font-semibold p-20 text-5xl text-center">
          Genre Lists
        </div>
        <ListComponent
          url={"http://localhost/search/booksByGenre/love"}
          gener={"Love"}
        />
        <ListComponent
          url={"http://localhost/search/booksByGenre/crime"}
          gener={"Crime"}
        />
        <ListComponent
          url={"http://localhost/search/booksByGenre/horror"}
          gener={"Horror"}
        />
        <ListComponent
          url={"http://localhost/search/booksByGenre/science-fiction"}
          gener={"Science Fiction"}
        />
        <ListComponent
          url={"http://localhost/search/booksByGenre/fantasy"}
          gener={"Fantasy"}
        />
        <ListComponent
          url={"http://localhost/search/booksByGenre/drama"}
          gener={"Drama"}
        />
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
};
