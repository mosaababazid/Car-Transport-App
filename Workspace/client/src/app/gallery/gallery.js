"use client";

import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Gallery from "../../Section/Gallery/Gallery";

export default function GalleryPage() {
  return (
    <div className="app-shell">
      <Header />
      <main id="main-content">
        <Gallery variant="full" />
      </main>
      <Footer />
    </div>
  );
}
