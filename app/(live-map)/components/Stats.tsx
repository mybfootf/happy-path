export const Stats = () => {
  return (
    <div className='absolute right-0 bottom-0 py-4 px-6 bg-black/30 backdrop-blur-sm flex justify-between items-center gap-4 rounded-tl-md'>
      <div className='p-2 border border-gray-500 rounded-md user-select-none w-[124px] h-[104px]'>
        <div className='text-4xl font-bold text-white'>
          72%
        </div>
        <p className='text-white text-sm mt-2 tracking-tight'>
          Compliance Score
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md user-select-none w-[124px] h-[104px]'>
        <div className='text-4xl font-bold text-red-500'>
          1
        </div>
        <p className='text-white text-sm mt-2 tracking-tight'>
          Vessels needing attention
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md user-select-none w-[130px] h-[104px]'>
        <div className='text-4xl font-bold text-orange-500'>
          2
        </div>
        <p className='text-white text-sm mt-2 tracking-tight'>
          Total risky activities
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md user-select-none w-[124px] h-[104px]'>
        <div className='text-4xl font-bold text-green-500'>
          10
        </div>
        <p className='text-white text-sm mt-2 tracking-tight'>
          Total active vessels
        </p>
      </div>
    </div>
  );
};
