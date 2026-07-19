import { useEffect } from "react";
import { getProfile, getProfilePosts } from "./components/features/Profile";
import SketchFilter from "./components/layout/SketchFilter";
import AppRouter from "./Router";

const App = () => {
  const testl = async () => {
    const profile = await getProfile("sameerahmedjan00");
    console.log(profile);

    const posts = await getProfilePosts("sameerahmedjan00");
    console.log(posts);
  };
  useEffect(() => {
    testl();
  });
  return (
    <>
      <SketchFilter />
      <AppRouter />;
    </>
  );
};

export default App;
