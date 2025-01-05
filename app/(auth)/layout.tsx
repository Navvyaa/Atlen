
// import { EmailProvider } from '../context/EmailContext'; // Adjust the path to where your EmailContext is located

interface AuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
      // <EmailProvider>
      <div>
        <main>{children}</main>
      </div>
    // </EmailProvider>
    );
  }
  