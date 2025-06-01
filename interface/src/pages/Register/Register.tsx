import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ShieldCheckIcon, GlobeAltIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-blue-400" />,
    title: "Immutable Proof of Ownership",
    desc: "Your IP is permanently recorded on-chain, providing indisputable proof of creation and ownership."
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8 text-purple-400" />,
    title: "Global Marketplace Exposure",
    desc: "List your IP for discovery and licensing by creators, companies, and fans worldwide."
  },
  {
    icon: <SparklesIcon className="w-8 h-8 text-pink-400" />,
    title: "Instant NFT Minting",
    desc: "Mint an NFT that represents your IP, tradable and verifiable on the blockchain."
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
    title: "Decentralized & Secure",
    desc: "No single point of failure. Your data is stored on IPFS and protected by blockchain technology."
  },
  {
    icon: <CurrencyDollarIcon className="w-8 h-8 text-yellow-400" />,
    title: "Earn Royalties Automatically",
    desc: "Set your own terms and earn royalties every time your IP is used or remixed."
  }
];

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
    <section className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Remove all background divs here, keep only the content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-8 px-2 md:px-8">
        {/* Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-3xl shadow-2xl border border-blue-500/30 backdrop-blur-2xl p-10 md:p-14 animate-fade-in">
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
        {/* Benefits Panel */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-3xl shadow-xl border border-blue-500/30 backdrop-blur-2xl p-8 md:p-10 h-full flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Register Your IP?
            </h2>
            <ul className="space-y-6">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span>{b.icon}</span>
                  <div>
                    <div className="font-bold text-lg">{b.title}</div>
                    <div className="text-gray-300 text-sm">{b.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register; 