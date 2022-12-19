import "./LabelChip.scss";

type LabelChipProps = {
  color: string;
  name: string;
};

const LabelChip = ({ color, name }: LabelChipProps): JSX.Element => {
  const textColor = () => {
    const rgb = color
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .match(/.{2}/g);

    const brightness = Math.round(
      (parseInt(rgb![0], 16) * 299 +
        parseInt(rgb![1], 16) * 587 +
        parseInt(rgb![2], 16) * 114) /
        1000
    );

    return brightness > 125 ? "black" : "white";
  };

  return (
    <div
      className="label-chip"
      style={{ backgroundColor: `#${color}`, color: textColor() }}
    >
      {name}
    </div>
  );
};

export default LabelChip;
