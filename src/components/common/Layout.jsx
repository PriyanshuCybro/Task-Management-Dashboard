const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300 py-8 mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 TaskHub. Built with React & Modern Design Patterns.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
