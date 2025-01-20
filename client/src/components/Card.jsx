// src/components/Card.jsx
import PropTypes from 'prop-types';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="p-6 border-b">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardHeader.propTypes = {
  children: PropTypes.node
};

CardTitle.propTypes = {
  children: PropTypes.node
};

CardContent.propTypes = {
  children: PropTypes.node
};