// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaDribbble, FaMeta, FaTwitter } from "react-icons/fa6";
// import { useUser } from "./UserContext";

// function Header() {
//   const { logout, isAdmin } = useUser();
//   const id = localStorage.getItem("token");

//   const [showOptions, setShowOptions] = useState(false);

//   function handleLogoutClick(e) {
//     e.preventDefault();
//     logout({});
//     localStorage.removeItem("token");
//     window.location = "/";
//   }

//   return (
//     <header className="fixed left-0 right-0 top-0 mb-8 w-screen bg-[#101F3C] text-white">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//         <a href="/" className="text-xl font-bold text-white">
//           Tech<span className="text-[#F44F10]">Motisha</span>
//         </a>

//         {/* <Link
//           className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
//           to="/login"
//         >
//           Services
//         </Link> */}
//         <Link
//           className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
//           to="/"
//         >
//           About us
//         </Link>
//         <Link
//           className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
//           to="/blogs"
//         >
//           Blogs
//         </Link>

//         {/* <Link
//           className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
//           to="/write"
//         >
//           Write
//         </Link> */}

//         <div className="hidden items-center gap-4 text-white lg:flex">
//           <a href="/" className="hover:text-orange-500">
//             {" "}
//             <FaMeta />
//           </a>
//           <a href="/" className="hover:text-orange-500">
//             <FaDribbble />
//           </a>
//           <a href="/" className="hover:text-orange-500">
//             <FaTwitter />
//           </a>
//         </div>

//         {id != null ? (
//           <div className="relative flex max-w-7xl items-center justify-between ">
//             {/* <Link
//           className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex mr-[120px]"
//           to="/write"
//         >
//           Write
//         </Link> 
//             <div
//               className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#F44F10] text-white"
//               onClick={() => setShowOptions(!showOptions)}
//             >
//               You can add the user image here
//               For example: <img src={user.image} alt="User Profile" />
//               User
//             </div> */}
//              {isAdmin ? (
//               <Link
//                 className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex mr-[120px]"
//                 to="/admin-dashboard"
//               >
//                 Admin Dashboard
//               </Link>
//             ) : (
//               <Link
//                 className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex mr-[120px]"
//                 to="/write"
//               >
//                 Write
//               </Link>
//             )}
//             <div
//               className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#F44F10] text-white"
//               onClick={() => setShowOptions(!showOptions)}
//             >
//               User
//             </div>
//             {showOptions && (
//               <div className="absolute right-0 mt-[150px] w-36 rounded-lg border-gray-300 bg-[#101F3C] shadow-lg">
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 hover:bg-[#F44F10] "
//                 >
//                   View Profile
//                 </Link>
//                 <button
//                   onClick={(e) => handleLogoutClick(e)}
//                   className="block px-4 py-2 hover:bg-[#F44F10] "
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link className="transition hover:text-[#F44F10]" to="/login">
//               Login
//             </Link>
//             <Link
//               className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10]"
//               to="/sign_up"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

// export default Header;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaDribbble, FaMeta, FaTwitter } from "react-icons/fa6";
import { useUser } from "./UserContext";

// ... (imports)

function Header() {
  const { logout, user } = useUser();
  const id = localStorage.getItem("token");
  const [showOptions, setShowOptions] = useState(false);

  function handleLogoutClick(e) {
    e.preventDefault();
    logout();
    localStorage.removeItem("token");
    window.location = "/";
  }
var isAdmin = false;
if (user!==null) {
  isAdmin = user.isAdmin;
}

  return (
    <header className="fixed left-0 right-0 top-0 mb-8 w-screen bg-[#101F3C] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="/" className="text-xl font-bold text-white">
          Tech<span className="text-[#F44F10]">Motisha</span>
        </a>

        <Link
          className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
          to="/"
        >
          About us
        </Link>
        <Link
          className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex"
          to="/blogs"
        >
          Blogs
        </Link>

        <div className="hidden items-center gap-4 text-white lg:flex">
          <a href="/" className="hover:text-orange-500">
            <FaMeta />
          </a>
          <a href="/" className="hover:text-orange-500">
            <FaDribbble />
          </a>
          <a href="/" className="hover:text-orange-500">
            <FaTwitter />
          </a>
        </div>

        {id != null ? (
          <div className="relative flex max-w-7xl items-center justify-between">
            
              <Link
                className="hidden gap-12 text-lg transition hover:text-[#F44F10] md:flex mr-[120px]"
                to="/write"
              >
                Write
              </Link>
            
            <div
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#F44F10] text-white"
              onClick={() => setShowOptions(!showOptions)}
            >
              User
            </div>
            {showOptions && (
              <div className="absolute right-0 mt-[150px] w-36 rounded-lg border-gray-300 bg-[#101F3C] shadow-lg">
                {isAdmin ? (
                  <Link
                    to="/admin-dashboard"
                    className="block px-4 py-2 hover:bg-[#F44F10] "
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#F44F10] "
                  >
                    View Profile
                  </Link>
                )}
                <button
                  onClick={(e) => handleLogoutClick(e)}
                  className="block px-4 py-2 hover:bg-[#F44F10] "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="transition hover:text-[#F44F10]" to="/login">
              Login
            </Link>
            <Link
              className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10]"
              to="/sign_up"
            >
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

