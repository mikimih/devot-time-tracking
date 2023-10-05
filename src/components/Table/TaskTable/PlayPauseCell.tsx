import { Button } from 'primereact/button';
import { ReactComponent as PlayIcon } from '../../../../public/svg/play.svg';
import { ReactComponent as StopIcon } from '../../../../public/svg/stop.svg';
import { ReactComponent as PauseIcon } from '../../../../public/svg/pause.svg';
import { TimerMode } from '@/components/Table/TaskTable/TrackerTableWrapper';

interface PlayStopCellProps {
  setActiveStopwatch: (
    stopwatch: Record<number, TimerMode> | undefined
  ) => void;
  isActiveCell: boolean;
  rowIndex: number;
}

export default function PlayStopCell(props: PlayStopCellProps) {
  const { setActiveStopwatch, isActiveCell, rowIndex } = props;

  return (
    <div className='flex'>
      {isActiveCell ? (
        <Button
          className='mr-[15px]'
          onClick={() => {
            setActiveStopwatch({ [rowIndex]: TimerMode.Pause });
          }}
        >
          <PauseIcon />
        </Button>
      ) : (
        <Button
          className='mr-[15px]'
          onClick={() => {
            setActiveStopwatch({ [rowIndex]: TimerMode.Play });
          }}
        >
          <PlayIcon />
        </Button>
      )}
      <Button
        onClick={() => {
          setActiveStopwatch({ [rowIndex]: TimerMode.Stop });
        }}
      >
        <StopIcon className='[&>g>path]:fill-gray' />
      </Button>
    </div>
  );
}
