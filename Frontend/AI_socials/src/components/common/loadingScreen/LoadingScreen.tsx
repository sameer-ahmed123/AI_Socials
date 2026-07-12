import "./LoadingScreen.css";

import { APP_NAME } from "../../../constants/app";

export default function LoadingScreen() {
  return (
    <main className="loading-screen">
      <section className="loading-screen__content">
        <h1 className="loading-screen__title">{APP_NAME}</h1>

        <div className="loading-screen__spinner" />

        <p className="loading-screen__text">Loading...</p>
      </section>
    </main>
  );
}
