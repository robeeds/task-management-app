export default function Page() {
  return (
    <div className="flex flex-1 flex-col w-full h-full bg-background p-4">
      
      {/* Title */}
      <div className="flex pl-1 pt-4 pb-5">
        <p className="font-semibold text-[40px]">Completed Tasks</p>
      </div>
      

      {/* Divider */}
      <div className="flex pl-2">
        <hr className="w-[10%] border-foreground rounded-full" />
      </div>

    </div>
  );
}