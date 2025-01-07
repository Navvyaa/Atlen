import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientDashboard from "../components/ClientDashboard";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    // const refreshToken = cookieStore.get('refreshToken');
    // const sessionToken = cookieStore.get('next-auth.session-token');
  if (!accessToken ) {
    redirect('/');
  }

    return <ClientDashboard accessToken={accessToken?.value}/>;
  
}
