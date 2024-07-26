export default function RegisterSuccessToast({ message }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="d-flex justify-content-center"
    >
      <div
        className="toast fade show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <svg
            className="bd-placeholder-img rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect
              width="100%"
              height="100%"
              fill="#007aff"
            ></rect>
          </svg>
          <strong className="me-auto">Success</strong>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
