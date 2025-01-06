import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientDashboard from "../components/ClientDashboard";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');
  
  if (!accessToken || !refreshToken) {
    redirect('/');
  }
 
  
    return <ClientDashboard />;
  
}
