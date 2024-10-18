function Footer() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
            {/* Section 1: About, Contact, Privacy */}
            <div className="order-1 md:order-1 text-center md:text-left">
              <span className="px-2 cursor-pointer hover:text-indigo-400 transition-colors">
                About us
              </span>
              <span className="px-2 border-l border-gray-600 cursor-pointer hover:text-indigo-400 transition-colors">
                Contact us
              </span>
              <span className="px-2 border-l border-gray-600 cursor-pointer hover:text-indigo-400 transition-colors">
                Privacy Policy
              </span>
            </div>

            {/* Section 2: Contact Information */}
            <div className="order-2 md:order-2 text-center md:text-left">
              <p className="font-semibold">Get in touch:</p>
              <p>Thangal Bazar, Mg Road, Opposite to SBI, Imphal West</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:techdukaansupport@gmail.com"
                  className="text-indigo-400 hover:underline"
                >
                  techdukaansupport@gmail.com
                </a>
              </p>
              <p>Mon to Sat: 10 AM - 6 PM</p>
            </div>

            {/* Section 3: Copyright */}
            <div className="order-3 md:order-3 text-center md:text-right">
              <p>© Designed and developed by Dabin Consultancy.</p>
              <p className="text-gray-500">All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
