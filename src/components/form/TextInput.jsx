import PropTypes from 'prop-types';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  placeholder = '',
  textarea = false,
  rows = 3,
  icon,
  className = '',
}) => {
  const InputComponent = textarea ? 'textarea' : 'input';

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium">
        {label} {required && <span className="text-error">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={textarea ? rows : undefined}
          className={`block w-full ${icon ? 'pl-10' : 'pl-2'} pr-3 py-2 border ${error ? 'border-error' : 'border-base-300'} rounded-lg text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-base-200`}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  rows: PropTypes.number,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default TextInput;