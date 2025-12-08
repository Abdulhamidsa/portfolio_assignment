import BookmarksExample from "../components/BookmarksExample";
import { useAuthContext } from "../hooks/useAuth";
const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className=" text-red">
      welcome to Home Page, {user ? user.name : "Guest"}!
      <BookmarksExample />
    </div>
  );
};

export default Home;
