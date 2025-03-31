const Button = ({ children, type = "button", onClick }) => (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white p-2 rounded-[3px] hover:bg-blue-700 transition my-4 cursor-pointer"
    >
      {children}
    </button>
  );
  export default Button;