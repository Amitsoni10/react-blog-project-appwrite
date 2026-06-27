import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAuthModal } from "../../store/uiSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Route links shown based on auth status
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow-sm bg-white border-b border-slate-200 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center ml-auto gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-5 py-2 font-medium text-slate-700 duration-200 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => dispatch(openAuthModal("login"))}
                    className="inline-block px-5 py-2 font-medium text-slate-700 duration-200 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(openAuthModal("signup"))}
                    className="inline-block px-5 py-2 font-medium text-slate-700 duration-200 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
