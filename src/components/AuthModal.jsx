import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "../store/uiSlice";
import Modal from "./Modal";
import Login from "./Login";
import Signup from "./Signup";

function AuthModal() {
  const authModal = useSelector((state) => state.ui.authModal);
  const dispatch = useDispatch();

  const close = () => dispatch(closeAuthModal());

  return (
    <Modal isOpen={!!authModal} onClose={close}>
      {authModal === "signup" ? <Signup /> : <Login />}
    </Modal>
  );
}

export default AuthModal;
