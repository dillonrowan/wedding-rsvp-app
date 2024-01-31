import SubmitButton from "@/components/SubmitButton";

export default function LocationCard(props) {
    return (
      
        <div className="text-center flex flex-col lg:items-center border-solid border-2 px-4 py-4 bg-white shadow-xl w-full lg:w-1/2">
            <div className="text-4xl mb-4">{props.name}</div>
            <div className="text-stone-500 pb-4">
                <div className="text-xl">{props.address}</div>
                <div>{props.phoneNumber}</div>
                {props.description ? <p className="pt-8">{props.description}</p> : null}
            </div>                
            <div className="lg:w-1/3"><a href={props.website}><SubmitButton label={"WEBSITE"} /></a></div>
        </div>
    );
}