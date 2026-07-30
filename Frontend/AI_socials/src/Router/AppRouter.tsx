import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import HomePage from "../pages/Home";
import ExplorePage from "../pages/Explore";
import NotificationsPage from "../pages/Notifications";
import MessagesPage from "../pages/Messages";
import BookmarksPage from "../pages/Bookmarks";
import ProfilePage from "../pages/Profile";
import EditProfilePage from "../pages/EditProfile";
import NotFoundPage from "../pages/NotFound";
import Widgets from "../components/features/widgets/Widgets";
import Sidebar from "../components/features/sidebar/Sidbar";
import MorePage from "../pages/More";
import Login from "../pages/login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import LoadingScreen from "../components/common/loadingScreen/LoadingScreen";
import PostDetail from "../pages/PostDetail";
import { useAuth } from "../hooks/useAuth";
import FollowersPage from "../pages/FollowersPage/FollowersPage";
import FollowingPage from "../pages/FollowingPage/FollowingPage";
import HashtagPage from "../pages/HashtagPage";
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
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/hashtag/:hashtag_name/" element={<HashtagPage />} />

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
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:user_id/followers"
          element={
            <ProtectedRoute>
              <FollowersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:user_id/following"
          element={
            <ProtectedRoute>
              <FollowingPage />
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
