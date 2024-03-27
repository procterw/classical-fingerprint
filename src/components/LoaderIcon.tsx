import './loader-icon.css';

export const LoaderIcon = () => {
  return (
    <div
      className="loader-icon__container"
      style={{
        // position: 'absolute',
        width: 30,
        height: 30,
      }}
    >
      <div className="loader-icon__black-key loader-icon__f-sharp" />
      <div className="loader-icon__black-key loader-icon__g-sharp" />
      <div className="loader-icon__black-key loader-icon__a-sharp" />

      <div className="loader-icon__white-key loader-icon__f-key" />
      <div className="loader-icon__white-key loader-icon__g-key" />
      <div className="loader-icon__white-key loader-icon__a-key" />
      <div className="loader-icon__white-key loader-icon__b-key" />

    </div>
  );
};


