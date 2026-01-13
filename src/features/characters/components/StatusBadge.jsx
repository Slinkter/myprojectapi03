/**
 * @file Status badge component for character status display.
 * Displays a colored badge indicating character status (Alive, Dead, unknown).
 */
import PropTypes from "prop-types";

/**
 * Status badge component with color-coded status indicators.
 *
 * @param {object} props - Component props
 * @param {'Alive'|'Dead'|'unknown'} props.status - Character status
 * @returns {JSX.Element} Colored status badge
 *
 * @example
 * <StatusBadge status="Alive" />
 */
export const StatusBadge = ({ status }) => {
  const statusStyles = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-slate-500",
  };

  return (
    <span
      className={`absolute top-2 left-2 text-xs font-bold text-white px-2 py-1 rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(["Alive", "Dead", "unknown"]).isRequired,
};
