import { formatTime } from "../utils/formatTime";

type DepartureProps = {
  transportMode: string;
  publicCode: string;
  frontText: string;
  aimedArrivalTime: string;
  delayStatus: {
    text: string;
    className: string
  };
};

export const Departure = ({ transportMode, publicCode, frontText, aimedArrivalTime, delayStatus }: DepartureProps) => {
  return (
    <div key={`${frontText}`} className="border-b border-gray-200 py-2 grid grid-cols-4 gap-4">
      <div className="px-4 py-2 bg-red-600 text-white flex gap-3 w-fit rounded-lg items-center justify-center font-bold">
        {transportMode === 'bus' && (
          <div>
            🚌
          </div>
        )}
        {publicCode}
      </div>
      <p>
        {frontText}
      </p>
      <p>
        {formatTime(aimedArrivalTime)}
      </p>
      <p className={delayStatus.className}>
        {delayStatus.text}
      </p>
    </div>
  );
};