import { motion } from "framer-motion";
import TextInput from "./TextInput";

export default function AddressInput({ address = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <motion.div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          label="Street"
          name="street"
          value={address.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
        />
        <TextInput
          label="City"
          name="city"
          value={address.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextInput
          label="State"
          name="state"
          value={address.state || ''}
          onChange={(e) => handleChange('state', e.target.value)}
        />
        <TextInput
          label="Zip Code"
          name="zipCode"
          value={address.zipCode || ''}
          onChange={(e) => handleChange('zipCode', e.target.value)}
        />
        <TextInput
          label="Country"
          name="country"
          value={address.country || ''}
          onChange={(e) => handleChange('country', e.target.value)}
        />
      </div>
    </motion.div>
  );
}