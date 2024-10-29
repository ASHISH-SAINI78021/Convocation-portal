import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import myImage from "../assets/your-image.png"; // Update the path to your image

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      {/* <Header></Header> */}
      <main style={{ minHeight: "70vh", overflow: "hidden" }}>
        <Toaster />
        <div className="flex w-full items-center justify-center h-screen" style={{ backgroundImage: `url('/GoldenJubilee.jpg')` }}>
        <div className="bg-white p-8 shadow-sm border-2 border-red-100 rounded-lg">
            {children}
        </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

// These are default props
Layout.defaultProps = {
  title: "Convocation-Portal",
  description: "Convocation-Portal",
  keywords: "nothing",
  author: "NIT Kurukshetra",
};

export default Layout;
