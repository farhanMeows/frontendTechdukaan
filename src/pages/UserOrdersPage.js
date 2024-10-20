import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <NavBar>
        <UserOrders />
      </NavBar>
    </div>
  );
}

export default UserOrdersPage;
