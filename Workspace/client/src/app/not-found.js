import NotFoundPage from "./not-found/NotFoundPage";

export const metadata = {
  title: "Seite nicht gefunden",
  description: "Die angeforderte Seite existiert nicht. Zurück zur Startseite von LUXOR DRIVE.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundPage />;
}
