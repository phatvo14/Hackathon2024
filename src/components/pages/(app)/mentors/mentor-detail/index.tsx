import { useParams } from "react-router-dom";
import mentors from "@/data/mentors.json";
import img from "@/assets/avt.jpg";

export const MentorDetailPage = () => {
  const { id } = useParams();
  const mentor = mentors.find((item) => item.id == id);

  console.log(mentor);

  if (!mentor) {
  }

  return (
    <div className="p-6 h-full grid grid-cols-10 gap-4">
      <div className="col-span-7 flex flex-col gap-2">
        <div className="flex gap-10 items-start">
          <img src={img} className="w-40 aspect-square rounded-lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl uppercase font-semibold text-my-blue">
              {mentor?.fullName}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
