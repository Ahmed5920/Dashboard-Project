import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const Notification =() => {
  const ctx = useContext(AppContext);
  const notif = ctx.notify;
  const setNotif = ctx.setNotify;

  if (!notif) return null;
  const color =
    notif.type === "success"
      ? "bg-green-500"
      : notif.type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div
      className={`fixed top-4 right-2 z-50 ${color} text-white px-4 py-2 rounded shadow`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">{notif.msg}</div>
        <button onClick={() => setNotif(null)} className="font-bold">
          x
        </button>
      </div>
    </div>
  );
}
export default Notification;
