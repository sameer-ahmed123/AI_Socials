import "./Login.css";
import { APP_NAME } from "../../constants/app";
import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { login, loading } = useAuth();

  return (
    <main className="login-page">
      <section className="login-card">
        <h1 className="login-title">{APP_NAME}</h1>

        <p className="login-subtitle">Sign in to continue.</p>

        <button className="login-button" onClick={login} disabled={loading}>
          <FcGoogle size={22} />

          <span>{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>
      </section>
    </main>
  );
}
