

interface AuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="blur-background ">
        <main >
          {children}
        </main>
      </div>
    );
  }
  