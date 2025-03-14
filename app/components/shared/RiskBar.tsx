import { CircleAlert } from 'lucide-react';

export const RiskBar = ({ risk }: { risk: string }) => {
  if (!risk) return null;

  return (
    <div
      className={`flex items-center justify-between gap-4 border p-2 rounded-md ${
        risk == 'high'
          ? 'text-red-500 border-red-500 bg-red-100'
          : risk == 'medium'
          ? 'text-yellow-500 border-yellow-500 bg-yellow-100'
          : 'text-green-500 border-green-500 bg-green-100'
      }`}
    >
      <div className={`flex items-center gap-1 `}>
        <CircleAlert className={`w-4 h-4`} />
        <p className='capitalize'>{risk} Risk</p>
      </div>
      <p>
        {risk == 'high'
          ? 'Illegal oil trade '
          : risk == 'medium'
          ? 'Some medium risk'
          : 'No known risks'}
      </p>
    </div>
  );
};
