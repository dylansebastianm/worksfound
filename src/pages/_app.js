import "@/styles/globals.css";
import Nav from "@/components/Layout/Nav/Nav";
import Footer from "@/components/Layout/Footer/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
