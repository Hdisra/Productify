import {
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { PlusIcon, ShoppingBag, UserIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";

export default function NavBar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-300">
      <div className="max-w-5xl lg:max-w-6xl mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo - Left side */}
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <span className="text-lg font-bold font-mono uppercase tracking-wider lg:text-xl">
              Productify
            </span>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link to={"/create"} className="btn btn-primary bt-sm gap-1">
                <PlusIcon className="size-4 lg:size-5" />
                <span className="lg:text-base">New Product</span>
              </Link>
              <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary btn-sm">Get Started</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
