/* eslint-disable react/prop-types */
import world_map2 from "@assets/images/world_map2.svg";

const Auth = ({ legend, children }) => {
  return (
    <div className="min-h-screen">
      <div
        className="bg-cover"
        style={{
          backgroundImage: `url(${world_map2})`,
          backgroundPosition: "center",
        }}
      >
        <div className="bg-sky-950/85 min-h-screen flex items-center">
          <form className="auth-form  p-4 ">
            <legend className="text-center font-mono text-2xl font-semibold text-slate-200">
              {legend}
            </legend>
            <hr className="my-4 h-px border-0 bg-sky-400" />
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
