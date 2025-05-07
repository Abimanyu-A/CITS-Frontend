import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  icon,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const variants = {
    primary: 'bg-base hover:bg-primary/10 hover:cursor-pointer text-white',
    secondary: 'bg-transparent border border-gray-600 hover:bg-base-100/50',
    danger: 'bg-error hover:bg-error/90 text-white',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 rounded-full shadow-sm font-bold focus:outline-none focus:ring-primary transition-colors ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;