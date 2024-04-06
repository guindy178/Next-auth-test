// src/components/Test.tsx/index.tsx

"use client";
import { Navbar, Nav } from 'rsuite';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import GearIcon from '@rsuite/icons/Gear';
import { useEffect } from 'react';
import axios from 'axios';
import router from 'next/router';


export default function Navbars() {
  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await axios.post('http://localhost:3000/api/auth', {
            token: [session.user?.email, session.user?.name]
          });
          const token = response.data.data;
          const accessToken = token[0].access_token;
          localStorage.setItem('access_token', accessToken);
          
          console.log(localStorage.getItem('access_token'));

        }
      } catch (error) {
        console.error('Error sending token:', error);
      }
    };
  
    fetchData();
  }, [session]);



    // const handleSignOut = async () => {
    //   // localStorage.removeItem('access_token');
    
    //   // await signOut();
    //   router.push('/');
    // };

    const handleSignOut = () => {
      localStorage.removeItem('access_token');
      signOut()
  };
  

  return (
    <Navbar>
      <Navbar.Brand href="#"></Navbar.Brand>
      <Nav>
        <Nav.Item>Home</Nav.Item>
        <Nav.Item></Nav.Item>
        <Nav.Item></Nav.Item>
      
      </Nav>
      <Nav pullRight>
        {/* เพิ่มเงื่อนไขเช็คว่า session ไม่เป็น null ก่อนที่จะเข้าถึง property */}
        {session && (
          <Nav.Item>
            <Image
              src={session.user?.image as string}
              width={50}
              height={50}
              alt=""
              className="object-cover rounded-full"
            />
          </Nav.Item>
        )}
         <Nav>
         <Nav.Item onClick={handleSignOut} className="text-red-500">
            Sign out
        </Nav.Item>
      
      </Nav>
      </Nav>
    </Navbar>
  );
}




