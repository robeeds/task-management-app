// @/src/app/ui/tasks.tsx

// Imports
import star from "../../../../public/star.svg"

import Image from "next/image";

// Type Declaration
type TaskProps = {
    Title: string,
    Description: string,
    DueDate: Date,
    Important: boolean,
    Completed: boolean,
}

export default function TaskCard({Title, Description, DueDate, Important, Completed }: TaskProps) {

    // Task State Handler
    const dueDate = new Date(DueDate)
    const currentDate = new Date()
    const statusHandler = () => {
        if(dueDate > currentDate) {
            return("In Progress")
        } else {
            return("Incomplete!")
        }
    }

    const status = statusHandler();

    return (
        <div className="flex flex-col col-span-1 h-[330px] bg-backgroundTwo rounded-[15px] pt-8 px-5 pb-5">

            {/* Title and Importance */}
            <div className="flex flex-row items-center justify-between">
                <p className="font-semibold text-nowrap overflow-ellipsis truncate text-[20px] max-w-[240px]">{Title}</p>
                <p className="">
                    {Important?
                     <Image src={star} alt="star" width={24} height={24} /> 
                     :
                      ""
                    }
                </p>
            </div>
            

            {/* Description and Due Date */}
            <div className="flex flex-1 flex-col justify-evenly">
                <p className="text-foregroundTwo text-wrap truncate overflow-ellipsis line-clamp-6">{Description}</p>
                <p className="">Due: {DueDate? dueDate.toLocaleDateString() : "N/A"}</p>
            </div>


            {/* Task Status and Edit Buttons */}
            <div className={`flex justify-between items-center`}>

                {/* Task Status */}
                <p className={`flex font-medium px-4 py-2 rounded-full text-[#FBF1C7] ${Completed == false && status == "Incomplete!" ? "bg-red-500": "bg-orange-500" } `}>
                    {status}
                </p>

                {/* Insert Edit Buttons here */}
                <p className="flex">Test</p>

            </div>
            

        </div>
    )
}