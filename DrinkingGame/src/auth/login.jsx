import "src/auth/login.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return navigate("/recipes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <h3>Login to see your recipes</h3>
      <button
        onClick={() => {
          if (user) {
            navigate("/recipes");
          } else {
            GoogleLogin();
          }
        }}
      >
        Sign in with Google
        <FcGoogle size={30} className="googleIcon" />
      </button>
    </div>
  );
}
