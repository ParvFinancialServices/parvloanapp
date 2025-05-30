const Icons = ({ fill }) => {
  return (
    <svg
      className="min-w-3.5 min-h-3.5 sm:w-4 sm:h-4"
      fill={fill}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );
};

const FormStepIndicator = ({ keys, step }) => {
  return (
    <div className="flex flex-row items-center justify-stretch gap-4">
      {keys.map((key, index) => {
        return (
          <div
            className={`flex flex-row gap-2 items-center justify-stretch ${
              index == keys.length - 1 ? "" : "flex-1"
            }`}
            key={key}
          >
            <div>
              {step > index ? <Icons fill="blue" /> : <Icons fill="gray" />}
            </div>
            <p
              className={`min-w-max sm:block ${
                step == index ? "block" : "hidden"
              }`}
            >
              {key}
            </p>
            {index == keys.length - 1 ? null : <hr className="flex-1 h-1" />}
          </div>
        );
      })}
    </div>
  );
};

export default FormStepIndicator;
