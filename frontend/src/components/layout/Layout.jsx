import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-blue-600/20 selection:text-blue-600">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
};

export default Layout;
