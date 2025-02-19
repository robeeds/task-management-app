// @/src/app/dashboard/page.tsx

// Imports
import CreateButton from "@/test/create-button"

export default async function Page() {

    return (
        <div className="flex flex-1 flex-col">

            {/* Title */}
            <p className="font-bold text-4xl pt-5 pl-2 self-center md:self-start"> All Tasks </p>

            {/* Divider */}
            <div className="flex w-full md:w-[10%] px-2 pt-9 pb-4">
                <hr className="flex flex-1 w-full border-textPrimary rounded-full" />
            </div>

            {/* Task List */}
            {/* Use Realtime to retrieve and update task data */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <CreateButton />
            </div>
        </div>
    )
}