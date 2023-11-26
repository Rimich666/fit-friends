type EditControlsProps = {
  editClickHandle: () => void;
  deleteClickHandle: () => void;
}

export default function EditControls({editClickHandle, deleteClickHandle}: EditControlsProps): JSX.Element {
  return (
    <div className="user-info-edit__controls">
      <button className="user-info-edit__control-btn" aria-label="обновить" onClick={editClickHandle}>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-change"/>
        </svg>
      </button>
      <button className="user-info-edit__control-btn" aria-label="удалить" onClick={deleteClickHandle}>
        <svg width="14" height="16" aria-hidden="true">
          <use xlinkHref="#icon-trash"/>
        </svg>
      </button>
    </div>
  );
}
