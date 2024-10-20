import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { selectUserInfo } from "../user/userSlice";

const navigation = [
  { name: "Home", link: "/", admin: true },
  { name: "Admin Dashboard", link: "/admin", admin: true },
  { name: "Manage Orders", link: "/admin/orders", admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {userInfo && (
        <div className="min-h-full ">
          <Disclosure as="nav" className="bg-gray-900  w-full z-50 shadow-md">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-8 w-8"
                            src="/ecommerce.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          <h1 className="text-3xl font-bold mt-0 tracking-tight text-gray-200">
                            TechDukaan
                          </h1>
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium transition duration-200"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Cart Button */}
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View cart</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-600 text-white px-2 py-1 text-xs font-medium ring-1 ring-inset ring-red-600">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm p-1 hover:text-white focus:outline-none focus:ring-2 focus:none focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              {open ? (
                                <XMarkIcon
                                  className="block h-6 w-6 text-[#d9d9d9]"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Bars3Icon
                                  className="block h-6 w-6 text-[#d9d9d9]"
                                  aria-hidden="true"
                                />
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-gray-800 text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-700" : "",
                                        "block px-4 py-2 text-sm text-gray-200 hover:text-white"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>

                    {/* Mobile menu and cart button */}

                    <div className="flex items-center -mr-2 md:hidden">
                      <Link to="/cart" className="ml-4">
                        <button
                          type="button"
                          className="rounded-full mr-4  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-600 text-white mb-7 -ml-7 mr-2 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-red-600">
                          {items.length}
                        </span>
                      )}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>

                      {/* Mobile Cart Button */}
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) =>
                      item[userInfo.role] ? (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-white"
                              : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium transition duration-200"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ) : null
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center justify-between px-5">
                      <div className="ml-0">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <main>
            <div className="mx-auto py-0 sm:px-6 lg:px-0">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
