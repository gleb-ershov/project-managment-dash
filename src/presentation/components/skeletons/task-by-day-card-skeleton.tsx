export const TaskByDayCardSkeleton = () => {
    return (
        <div className="flex w-full items-center gap-4">
            <input type="checkbox" />
            <div className="flex w-full flex-col gap-2">
                <span className="h-[16px] w-[50%] rounded-lg bg-[#FAFAFA]" />
                <span className="h-[16px] w-[80%] rounded-lg bg-[#FAFAFA]" />
            </div>
        </div>
    );
};
