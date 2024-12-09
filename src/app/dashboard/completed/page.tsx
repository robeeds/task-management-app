export default function Page() {
  return (
    <div className="flex flex-1 flex-col h-screen w-full bg-background ml-4 p-4">
      
      {/* Title */}
      <div className="flex pl-1 pt-4 pb-5">
        <p className="font-semibold text-[40px]">Completed Tasks</p>
      </div>
      

      {/* Divider */}
      <div className="flex">
        <hr className="w-[10%] border-foreground rounded-full" />
      </div>

    </div>
  );
}