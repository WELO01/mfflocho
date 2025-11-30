import NavbarPage from "../components/Navbar/NavbarPage";



export default function CartOrdersLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
   
 <div>
 <NavbarPage/>
   {children}
 </div>
    
    
   
   
    
   
  );
}