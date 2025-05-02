import { motion } from "framer-motion";

export default function AddressInput({ address, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <motion.div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Street</label>
          <input
            value={address.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
            className="bg-base-100/70 border border-base-100 text-white rounded-lg focus:ring-primary focus:border-primary block w-full p-3 backdrop-blur-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
          <input
            value={address.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="bg-base-100/70 border border-base-100 text-white rounded-lg focus:ring-primary focus:border-primary block w-full p-3 backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
          <input
            value={address.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="bg-base-100/70 border border-base-100 text-white rounded-lg focus:ring-primary focus:border-primary block w-full p-3 backdrop-blur-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Zip Code</label>
          <input
            value={address.zipCode || ''}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="bg-base-100/70 border border-base-100 text-white rounded-lg focus:ring-primary focus:border-primary block w-full p-3 backdrop-blur-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
          <input
            value={address.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            className="bg-base-100/70 border border-base-100 text-white rounded-lg focus:ring-primary focus:border-primary block w-full p-3 backdrop-blur-sm"
          />
        </div>
      </div>
    </motion.div>
  );
}