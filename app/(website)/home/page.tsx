import { getBooks } from "@/Services/server/services";

const Home = async () => {
  const { data: books } = await getBooks("", 0, 7);
  console.log(books);
  return <div></div>;
};

export default Home;
