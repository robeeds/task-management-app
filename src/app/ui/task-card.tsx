// @/src/app/ui/tasks.tsx

// Imports

// Type Declaration
type TaskProps = {
    Title: string,
    Description: string,
    Date: string,
    Important: boolean,
    Completed: boolean,
}

const TaskCard = ({Title, Description, Date, Important, Completed }: TaskProps) => {

    return (
        <div className="flex flex-col col-span-1 h-[330px] bg-backgroundTwo rounded-[15px] p-5">

            {/* Title and Importance */}
            <div className="flex flex-row items-center">
                <p className="font-semibold text-nowrap overflow-ellipsis truncate text-[24px] max-w-[240px]">{Title}</p>
                <p className="">{Important? "Important" : "Not Important"}</p>
            </div>
            

            {/* Description and Due Date */}
            <p className="text-foregroundTwo flex flex-1">{Description}</p>
            <p className="">Due: {Date? Date : "N/A"}</p>

            {/* Task Status and Edit Buttons */}
            <p>{Completed? "Complete" : "Incomplete"}</p>
            {/* Insert Edit Buttons here */}

        </div>
    )
}

export default TaskCard