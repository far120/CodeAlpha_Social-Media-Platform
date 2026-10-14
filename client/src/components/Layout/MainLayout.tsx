import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Feedback/Loader";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors duration-200">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}