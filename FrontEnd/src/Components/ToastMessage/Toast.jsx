import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function Toast({ isShown, message, type, onClose }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-6 transition-opacity duration-500 ${
        isShown ? "opacity-100" : "opacity-0"
      } pointer-events-none`}
      style={{ transition: "opacity 0.5s ease" }}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md relative ${
          type === "delete" ? "border-red-500" : "border-green-500"
        }`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
