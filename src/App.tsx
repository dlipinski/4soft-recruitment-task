import React from "react";
import "./App.css";
import { AppDetails } from "./components/AppDetails/AppDetails";
import { AllAppsList } from "./components/AppsList/AllAppsList";
import Header from "./components/Header/Header";
import { SubscribedGrid } from "./components/SubscribedGrid/SubscribedGrid";
import { AppsProvider } from "./context/appsContext";

export default function App() {
  return (
    <AppsProvider>
      <div className="app">
        <Header />
        <main className="app__main">
          <AllAppsList />
          <SubscribedGrid />
          <AppDetails />
        </main>
      </div>
    </AppsProvider>
  );
}
