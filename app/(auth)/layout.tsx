

interface AuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div >
        <main >
          {children}
        </main>
      </div>
    );
  }
  