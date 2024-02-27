import review from "/images/review.png";
import personalize from "/images/personalization.png";

export const PageInfo = () => {
  return (
    <div>
      <div className="p-20 mt-16 font-Poppins text-text">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <img src={personalize} alt="Personalize.png" className="w-10/12" />
          </div>
          <div className="col-span-1 text-5xl font-semibold self-center">
            <div>
              Experience{" "}
              <span className="bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
                Personalized
              </span>{" "}
              Book Recommendations Just for You
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 p-16 py-28 text-xl">
          <div className="col-span-1 text-center">
            Intelligent Suggestions <br />
            Tailored to Enhance Your Reading
          </div>
          <div className="col-span-1 text-center">
            Express Your Emotions to AI <br />
            Discover a World of Literary Marvels
          </div>
          <div className="col-span-1 text-center">
            Genuine Reviews <br />
            Shared by Readers Worldwide
          </div>
        </div>
        <div className="grid grid-cols-2 text-5xl font-semibold">
          <div className="col-span-1 self-center">
            Explore <span className="text-accent">Book Reviews</span> for Any{" "}
            <br />
            Book You Desire
          </div>
          <div className="col-span-1">
            <img src={review} alt="Review.png" className="w-2/3" />
          </div>
        </div>
        <div className="grid grid-cols-1 text-5xl font-semibold">
          {/* Additional Section or Content Goes Here */}
        </div>
      </div>
    </div>
  );
};
