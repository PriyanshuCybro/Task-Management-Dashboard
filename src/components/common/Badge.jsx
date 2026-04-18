import { getStatusBadgeClass, getStatusLabel } from '../../utils/helpers';

const Badge = ({ status, className = '' }) => {
  const badgeClass = getStatusBadgeClass(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        ${badgeClass}
        ${className}
      `}
    >
      {label}
    </span>
  );
};

export default Badge;
