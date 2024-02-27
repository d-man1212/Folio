import { NavButton } from "./NavButton";
import { SecondaryButton } from "./SecondaryButton";

export const Features = () => {
  return (
    <>
      <div className=" text-text pt-44">
        <div className=" container">
          <div className=" grid grid-cols-3 pb-12 pt-4">
            <div className=" col-span-2 py-16 mx-16 font-semibold">
              <div className=" text-5xl font-Poppins ">
                Have Personalized Recommendations For Books
              </div>
            </div>
            <div className=" col-span-2 mx-16  font-light">
              this is another Dummy text From the UI Designer
              <br />
              for Beautiful design
            </div>
            <div className=" col-span-2 mx-16 py-10">
              <div className="grid grid-cols-3">
                <div className=" w-32 text-center col-span-1">
                  <NavButton text={"Get Started"} location={"signup"} />
                </div>
                <div className=" col-span-1 w-32 text-center">
                  <SecondaryButton text={"Learn More"} location={"login"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
