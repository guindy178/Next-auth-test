// dashboard.tsx
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session } = useSession();

  // Check if the user is authenticated
  if (!session) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (

    <Link href="/pages/product">
      <div className="p-10 cursor-pointer">
        <div className="bg-gray-200 hover:bg-gray-300  p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">CRUD</h1>
          <h3>จัดการข้อมูล</h3>
        </div>
      </div>
    </Link>

  );
}
