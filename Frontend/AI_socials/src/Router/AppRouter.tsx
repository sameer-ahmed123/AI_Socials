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
import Login from "../pages/login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import LoadingScreen from "../components/common/loadingScreen/LoadingScreen";
import { useAuth } from "../hooks/useAuth";
const AppRouter = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      <Route
        element={<AppLayout sidebar={<Sidebar />} widgets={<Widgets />} />}
      >
        <Route path="/" element={<HomePage />} />

        <Route path="/explore" element={<ExplorePage />} />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          }
        />
        <Route path="/more" element={<MorePage />} />

        <Route
          path="/profile/:username/"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
