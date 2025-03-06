import Mark from "../../assets/Mark.png"
import Roxanne from "../../assets/Roxanne.png"
import Rhenel from "../../assets/Rhenel.png"

interface MemberCard {
    image: string; // URL or import path for the image
    name: string;
    title: string;
  }

const MemberCard:React.FC<MemberCard> = ({ image, name, title }) => {
    return(
        <div className="w-50">
            <img src={image} alt={name} className="w-50"/>
            <h3 className="text-[1.5rem] font-[600] text-[#32347C] text-center">{name}</h3>
            <h4 className="text-[#525252] text-center">{title}</h4>
        </div>
    );
}

const Team = () => {

  return (
    <div className="bg-[#F6F6F6] p-5">
        <h3 className="text-[3rem] font-[800] text-[#32347C] text-center">Meet the Team</h3>
        <div className="flex flex-col items-center gap-4 p-10 md:flex-row md:justify-evenly md:gap-5">
            <MemberCard image={Mark} name="Mark Limpahan" title="UI/UX Designer" />
            <MemberCard image={Roxanne} name="Roxanne Locsin" title="UI/UX Designer" />
            <MemberCard image={Rhenel} name="Rhenel Sajol" title="UI/UX Designer" />
        </div>
    </div>
  )
}

export default Team

