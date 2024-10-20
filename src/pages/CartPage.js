import Cart from "../features/cart/Cart";
import NavBar from "../features/navbar/Navbar";

function CartPage() {
  return (
    <div className="bg-gray-950 flex-1 min-h-screen">
      <NavBar />
      <div className="flex items-center justify-center h-full bg-gray-900">
        <Cart />
      </div>
    </div>
  );
}

export default CartPage;
