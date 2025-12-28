import FeaturedBook from "@/components/website/FeaturedBook";
import PopularBooks from "@/components/website/home/PopularBooks";
import { getBooks } from "@/services/queries/books";

const Home = async () => {
  const { data: books } = await getBooks("", 0, 7);

  return (
    <>
      <FeaturedBook book={books && books[0]} />
      <PopularBooks books={books && books?.splice(1, 7)} />
    </>
  );
};

export default Home;
