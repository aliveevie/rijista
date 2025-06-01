import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creatorName: '',
    creatorAddress: '',
    imageUrl: '',
    mediaUrl: '',
    mediaType: 'audio/mpeg',
    attributes: [
      { key: '', value: '' }
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index] = {
      ...newAttributes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      attributes: newAttributes
    }));
  };

  const addAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { key: '', value: '' }]
    }));
  };

  const removeAttribute = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration functionality
    console.log('Form submitted:', formData);
  };

  return (
    <section className="fixed inset-0 z-0 bg-gradient-to-br from-[#0A0F1C] via-[#181F36] to-[#1B0F2B] text-white overflow-auto flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,15,28,0.85),rgba(10,15,28,0.85)),url('/grid.svg')] bg-center opacity-20 w-full h-full pointer-events-none"></div>
      {/* Glowing orbs */}
      <div className="absolute top-[-10%] left-1/4 w-[36rem] h-[36rem] bg-blue-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-1/4 w-[36rem] h-[36rem] bg-purple-500/30 rounded-full blur-[140px] animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-400/10 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl">
        <div className="w-full bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-3xl shadow-2xl border border-blue-500/30 backdrop-blur-2xl p-10 md:p-14 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Register Your IP
            </h2>
            <p className="mt-2 text-lg text-gray-200">
              Register your intellectual property on the Story blockchain
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-bold text-blue-200 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-blue-100">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 placeholder:text-blue-300"
                    placeholder="e.g. Midnight Marriage"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-blue-100">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 placeholder:text-blue-300"
                    placeholder="Describe your IP..."
                  />
                </div>
              </div>
            </div>

            {/* Creator Information */}
            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-4">Creator Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="creatorName" className="block text-sm font-medium text-purple-100">Creator Name</label>
                  <input
                    type="text"
                    name="creatorName"
                    id="creatorName"
                    required
                    value={formData.creatorName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-purple-900/40 text-white shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 placeholder:text-purple-300"
                    placeholder="e.g. Jacob Tucker"
                  />
                </div>
                <div>
                  <label htmlFor="creatorAddress" className="block text-sm font-medium text-purple-100">Creator Address</label>
                  <input
                    type="text"
                    name="creatorAddress"
                    id="creatorAddress"
                    required
                    value={formData.creatorAddress}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-purple-900/40 text-white shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 placeholder:text-purple-300"
                    placeholder="0x..."
                  />
                </div>
              </div>
            </div>

            {/* Media Information */}
            <div>
              <h3 className="text-xl font-bold text-pink-200 mb-4">Media Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-pink-100">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-pink-900/40 text-white shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none p-3 placeholder:text-pink-300"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label htmlFor="mediaUrl" className="block text-sm font-medium text-pink-100">Media URL</label>
                  <input
                    type="url"
                    name="mediaUrl"
                    id="mediaUrl"
                    required
                    value={formData.mediaUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-0 bg-pink-900/40 text-white shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none p-3 placeholder:text-pink-300"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-100">Attributes</h3>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-200 bg-indigo-700/60 hover:bg-indigo-800/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition"
                >
                  Add Attribute
                </button>
              </div>
              {formData.attributes.map((attr, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end mb-2">
                  <div>
                    <label className="block text-sm font-medium text-indigo-100">Key</label>
                    <input
                      type="text"
                      value={attr.key}
                      onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                      className="mt-1 block w-full rounded-lg border-0 bg-indigo-900/40 text-white shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none p-3 placeholder:text-indigo-300"
                      placeholder="e.g. Suno Artist"
                    />
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-indigo-100">Value</label>
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        className="mt-1 block w-full rounded-lg border-0 bg-indigo-900/40 text-white shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none p-3 placeholder:text-indigo-300"
                        placeholder="e.g. amazedneurofunk956"
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeAttribute(index)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-red-200 bg-red-700/60 hover:bg-red-800/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/')} 
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-200 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 border border-transparent rounded-lg shadow-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              >
                Register IP
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register; 