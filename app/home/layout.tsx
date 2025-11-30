import NavbarPage from "../components/Navbar/NavbarPage";
import NavigationBarLinks from "../components/navegacionlinks/NavigationBarLink";

export default function HomeLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
    <NavbarPage/>
    <NavigationBarLinks/>
    
    <div>
      {children}
    </div>
    
    </div>
  );
}