import Closer from "../components/utils/Closer";


export default function UserSettingLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <div className=" mb-20 ">
     <Closer  to="/home" showLogo={true} />
     

      </div>
      {children}
    
    
    </div>
  );
}