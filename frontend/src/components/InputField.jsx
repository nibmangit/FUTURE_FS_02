 

function InputField({formData, handleChange ,label, name, type = 'text', error }) { 
    
    return (
        <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full py-3 px-4 bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500 transition`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
    )
}

export default InputField
