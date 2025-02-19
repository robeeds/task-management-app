// @/src/app/dashboard/create/page.tsx

import CreateForm from "@/test/create-form";

// Imports

export default function Page() {
    return(
        <div className="flex flex-1 flex-col md:justify-center md:items-center">

            {/* Form */}
            <div className=" md:max-w-[600px] md:w-full">
                <CreateForm />
            </div>
        </div>
    )
}