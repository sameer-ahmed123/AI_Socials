import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import HomePage from "../pages/Home";
import ExplorePage from "../pages/Explore";
import NotificationsPage from "../pages/Notifications";
import MessagesPage from "../pages/Messages";
import BookmarksPage from "../pages/Bookmarks";
import ProfilePage from "../pages/Profile";
import NotFoundPage from "../pages/NotFound";
import Widgets from "../components/features/widgets/Widgets";
import Sidebar from "../components/features/sidebar/Sidbar";
import MorePage from "../pages/More";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={<AppLayout sidebar={<Sidebar />} widgets={<Widgets />} />}
      >
        <Route path="/" element={<HomePage />} />

        <Route path="/explore" element={<ExplorePage />} />

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/messages" element={<MessagesPage />} />

        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/more" element={<MorePage />} />

        <Route path="/profile/:username" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
