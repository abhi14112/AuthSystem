import useAuthStore from "../../store/store";
const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="items-center  px-4 py-2 border-b-2 border-slate-300 flex gap-2">
      <div>
        <img
          className="w-16 h-16 rounded-full"
          src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className="w-max">
        <p className="font-semibold">{user?.firstName}</p>
        <p>{user?.emailAddress}</p>
      </div>
    </div>
  );
};
export default Navbar;
