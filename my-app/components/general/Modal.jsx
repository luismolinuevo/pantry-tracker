export default function Modal({ isVisable, onClose, children }) {
  if (!isVisable) return null;

  const handleClose = (e) => {
    //if you click out side the box is will close because the wrapper is in a div that is the background. And the div below contains the modal
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[584px] bg-white py-8 px-12">
        <div className="flex justify-end">
          <button className="" onClick={() => onClose()}>
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
