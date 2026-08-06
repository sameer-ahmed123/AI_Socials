import "./DateSeparator.css";

interface Props {
  label: string;
}

const DateSeparator = ({ label }: Props) => {
  return (
    <div className="date-separator">
      <span>{label}</span>
    </div>
  );
};

export default DateSeparator;
