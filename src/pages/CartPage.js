import Cart from "../features/cart/Cart";
import NavBar from "../features/navbar/Navbar";

function CartPage() {
  return (
    <div>
      <NavBar>
        <div className="flex items-center justify-center h-full bg-gray-900">
          <Cart />
        </div>
      </NavBar>
    </div>
  );
}

export default CartPage;
