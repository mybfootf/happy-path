export const Stats = () => {
  return (
    <div className='absolute right-0 bottom-0 py-4 px-6 bg-black/30 backdrop-blur-sm flex justify-between items-center gap-4 rounded-tl-md'>
      <div className='p-2 border border-gray-500 rounded-md h-[104px] w-[124px]'>
        <div className='text-4xl font-bold text-white'>
          72%
        </div>
        <p className='text-white text-sm mt-2'>
          Compliance Score
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md h-[104px] w-[124px]'>
        <div className='text-4xl font-bold text-red-500'>
          1
        </div>
        <p className='text-white text-sm mt-2'>
          Vessels needing attention
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md h-[104px] w-[124px]'>
        <div className='text-4xl font-bold text-orange-500'>
          2
        </div>
        <p className='text-white text-sm mt-2'>
          Total risky activities
        </p>
      </div>

      <div className='p-2 border border-gray-500 rounded-md h-[104px] w-[124px]'>
        <div className='text-4xl font-bold text-green-500'>
          10
        </div>
        <p className='text-white text-sm mt-2'>
          Total active vessels
        </p>
      </div>
    </div>
  );
};
