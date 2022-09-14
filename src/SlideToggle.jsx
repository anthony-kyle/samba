export const SlideToggle = ({ checked , ...props}) => {
  return (
    <div className={`toggleOuter ${checked ? 'checked' : ''}`} {...props}>
      <div className="toggleInner" />
    </div>
  );
};
