import { Button } from 'primereact/button';
import { ReactComponent as PlayIcon } from '../../../../public/svg/play.svg';
import { ReactComponent as StopIcon } from '../../../../public/svg/stop.svg';
import { ReactComponent as PauseIcon } from '../../../../public/svg/pause.svg';

interface PlayStopCellProps {
  pauseAction: () => void;
  playAction: () => void;
  stopAction: () => void;
  isActiveCell: boolean;
}
export default function PlayStopCell(props: PlayStopCellProps) {
  const { pauseAction, playAction, stopAction, isActiveCell } = props;

  return (
    <div className='flex'>
      {isActiveCell ? (
        <Button className='mr-[15px]' onClick={pauseAction}>
          <PauseIcon />
        </Button>
      ) : (
        <Button className='mr-[15px]' onClick={playAction}>
          <PlayIcon />
        </Button>
      )}
      <Button onClick={stopAction}>
        <StopIcon className='[&>g>path]:fill-gray' />
      </Button>
    </div>
  );
}
