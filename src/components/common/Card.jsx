const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-light hover:shadow-md
        transition duration-300 p-6
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
