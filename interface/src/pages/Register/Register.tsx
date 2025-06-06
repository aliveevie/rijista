import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, DocumentTextIcon, PhotoIcon, MusicalNoteIcon, CloudArrowUpIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon, ClipboardIcon, HomeIcon, PlusIcon, ShieldCheckIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@tomo-inc/tomo-evm-kit';
import { useAccount } from 'wagmi';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083/api';

const registrationSteps = [
  {
    id: 1,
    title: "IP Metadata",
    description: "Register your IP's core metadata",
    icon: <DocumentTextIcon className="w-6 h-6" />,
    status: 'current'
  },
  {
    id: 2,
    title: "NFT Metadata",
    description: "Register your IP's NFT metadata",
    icon: <PhotoIcon className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 3,
    title: "IPFS Upload",
    description: "Upload metadata to IPFS",
    icon: <CloudArrowUpIcon className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 4,
    title: "NFT Creation",
    description: "Create your IP's NFT representation",
    icon: <MusicalNoteIcon className="w-6 h-6" />,
    status: 'upcoming'
  }
];

interface RegistrationState {
  registrationId?: string;
  error?: string;
}

interface RegistrationDetails {
  registrationId: string;
  title: string;
  transactionHash: string;
  ipaId: string;
  licenseTermsIds: string[];
  explorerUrl: string;
  timestamp: string;
  isYakoaProtected?: boolean;
  yakoaProtection?: YakoaProtection;
}

interface YakoaProtection {
  tokenId: string;
  protectedAt: string;
  metadata: {
    title: string;
    description: string;
    mediaCount: number;
    licenseCount: number;
  };
  infringements: Array<{
    id: string;
    status: string;
    details: any;
  }>;
  isFallback?: boolean;
  attempts?: number;
}

// Add new interface for Yakoa modal
interface YakoaBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

// Add Yakoa Benefits Modal Component
const YakoaBenefitsModal: React.FC<YakoaBenefitsModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-blue-500/30">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-blue-100 flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
            Protect Your IP with Yakoa
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-2">Benefits of Yakoa Protection:</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Automated detection of unauthorized content reuse</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Real-time validation of brand authorizations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Protection against future infringements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>AI-powered originality detection</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Protecting...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-5 h-5" />
                Protect with Yakoa
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for copy-to-clipboard
const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="ml-2 text-blue-300 hover:text-blue-400 focus:outline-none"
      title="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? (
        <span className="text-green-400 text-xs ml-1">Copied!</span>
      ) : (
        <ClipboardIcon className="w-4 h-4 inline" />
      )}
    </button>
  );
};

const Detail: React.FC<{ label: string; value: string | string[]; copy?: boolean }> = ({ label, value, copy }) => (
  <div className="mb-3">
    <span className="block text-xs text-gray-400">{label}</span>
    <span className="block text-white font-mono text-sm break-all">
      {Array.isArray(value) ? value.join(', ') : value}
      {copy && typeof value === 'string' && <CopyButton value={value} />}
    </span>
  </div>
);

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

// Add ErrorMessage component before the Register component
interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type = 'error', onDismiss }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <ExclamationCircleIcon className="w-5 h-5 text-blue-400" />;
      default:
        return <ExclamationCircleIcon className="w-5 h-5 text-red-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-red-500/20 border-red-500/30';
    }
  };

  return (
    <div className={`rounded-lg p-4 ${getBackgroundColor()} border backdrop-blur-sm animate-fade-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${
            type === 'warning' ? 'text-yellow-200' :
            type === 'info' ? 'text-blue-200' :
            'text-red-200'
          }`}>
            {message}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationState, setRegistrationState] = useState<RegistrationState>({});
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null);
  const [showRegistrationDetails, setShowRegistrationDetails] = useState(false);
  const [showYakoaModal, setShowYakoaModal] = useState(false);
  const [isProtectingYakoa, setIsProtectingYakoa] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - IP Metadata Fields
    title: '',
    description: '',
    createdAt: new Date().toISOString(),
    creators: [{
      name: '',
      address: '' as `0x${string}`,
      contributionPercent: 100,
    }],
    image: '',
    mediaUrl: '',
    mediaType: 'audio/mpeg',
    // Step 2 - NFT Metadata Fields
    nftName: '',
    nftDescription: '',
    nftImage: '',
    animationUrl: '',
    attributes: [
      { key: '', value: '' },
    ],
  });
  const [error, setError] = useState<{ message: string; type?: 'error' | 'warning' | 'info' } | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setFormData(prev => ({
        ...prev,
        creators: [{
          ...prev.creators[0],
          address: address as `0x${string}`
        }]
      }));
    }
  }, [isConnected, address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatorChange = (field: 'name' | 'contributionPercent', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      creators: [{
        ...prev.creators[0],
        [field]: value
      }]
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError({
        message: "Please connect your wallet first to register your IP",
        type: 'warning'
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      switch (currentStep) {
        case 1: {
          const response = await axios.post(`${API_BASE_URL}/register`, {
            step: 1,
            data: {
              title: formData.title,
              description: formData.description,
              createdAt: formData.createdAt,
              creators: formData.creators,
              image: formData.image,
              mediaUrl: formData.mediaUrl,
              mediaType: formData.mediaType
            }
          });

          if (response.data.success) {
            const registrationId = response.data.data.registrationId;
            setRegistrationState(prev => ({
              ...prev,
              registrationId
            }));
            setCurrentStep(2);
          } else {
            throw new Error(response.data.error || 'IP metadata registration failed');
          }
          break;
        }

        case 2: {
          if (!registrationState.registrationId) {
            throw new Error('Registration ID not found. Please start over.');
          }

          const response = await axios.post(`${API_BASE_URL}/register`, {
            step: 2,
            data: {
              registrationId: registrationState.registrationId,
              nftName: formData.nftName,
              nftDescription: formData.nftDescription,
              nftImage: formData.nftImage,
              animationUrl: formData.animationUrl,
              attributes: formData.attributes
            }
          });

          if (response.data.success) {
            setCurrentStep(3);
          } else {
            throw new Error(response.data.error || 'NFT metadata registration failed');
          }
          break;
        }

        case 3: {
          if (!registrationState.registrationId) {
            throw new Error('Registration ID not found. Please start over.');
          }

          const response = await axios.post(`${API_BASE_URL}/register`, {
            step: 3,
            data: {
              registrationId: registrationState.registrationId
            }
          });

          if (response.data.success) {
            setCurrentStep(4);
          } else {
            throw new Error(response.data.error || 'IPFS upload failed');
          }
          break;
        }

        case 4: {
          if (!registrationState.registrationId) {
            throw new Error('Registration ID not found. Please start over.');
          }

          const response = await axios.post(`${API_BASE_URL}/register`, {
            step: 4,
            data: {
              registrationId: registrationState.registrationId
            }
          });

          if (response.data.success) {
            const details: RegistrationDetails = {
              registrationId: response.data.data.registrationId,
              title: formData.title,
              transactionHash: response.data.data['Transaction Hash'],
              ipaId: response.data.data['IPA ID'],
              licenseTermsIds: response.data.data['License Terms IDs'],
              explorerUrl: response.data.data['Explorer URL'],
              timestamp: response.data.data.timestamp
            };
            setRegistrationDetails(details);
            setShowRegistrationDetails(true);
          } else {
            throw new Error(response.data.error || 'Final registration failed');
          }
          break;
        }

        default:
          throw new Error('Invalid registration step');
      }
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (axios.isAxiosError(error)) {
        // Try to extract backend error message
        const backendMsg = error.response?.data?.error;
        if (backendMsg) {
          // Custom handling for attribute errors
          if (backendMsg.includes('attribute') && backendMsg.includes('key and value')) {
            errorMessage =
              'Each NFT attribute must have both a key and a value. Please fill in all fields for every attribute.';
          } else {
            errorMessage = backendMsg;
          }
        } else if (error.response?.status) {
          errorMessage = `Request failed with status code ${error.response.status}`;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError({
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to handle Yakoa protection
  const handleYakoaProtection = async () => {
    if (!registrationDetails) return;
    
    setIsProtectingYakoa(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/protect-yakoa`, {
        registrationId: registrationDetails.registrationId,
        registrationData: {
          ipMetadata: {
            title: formData.title,
            description: formData.description,
            createdAt: formData.createdAt,
            creators: formData.creators,
            image: formData.image,
            mediaUrl: formData.mediaUrl,
            mediaType: formData.mediaType
          },
          nftMetadata: {
            name: formData.nftName,
            description: formData.nftDescription,
            image: formData.nftImage,
            animation_url: formData.animationUrl,
            attributes: formData.attributes
          },
          uploadResult: {
            ipaId: registrationDetails.ipaId,
            transactionHash: registrationDetails.transactionHash,
            licenseTermsIds: registrationDetails.licenseTermsIds,
            blockNumber: 0,
            timestamp: registrationDetails.timestamp
          }
        }
      });

      if (response.data.success) {
        setRegistrationDetails(prev => prev ? {
          ...prev,
          isYakoaProtected: true,
          yakoaProtection: {
            tokenId: response.data.data.yakoaTokenId,
            protectedAt: response.data.data.protectedAt,
            metadata: response.data.data.metadata,
            infringements: response.data.data.infringements || [],
            isFallback: response.data.data.isFallback,
            attempts: response.data.data.attempts
          }
        } : null);
        setShowYakoaModal(false);
      } else {
        throw new Error(response.data.error || 'Failed to protect IP with Yakoa');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to protect IP with Yakoa';
      alert(errorMessage);
    } finally {
      setIsProtectingYakoa(false);
    }
  };

  const renderStepForm = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-100">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter your IP title"
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
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Describe your IP..."
            />
          </div>

          <div>
            <label htmlFor="creatorName" className="block text-sm font-medium text-blue-100">Creator Name</label>
            <input
              type="text"
              name="creatorName"
              id="creatorName"
              required
              value={formData.creators[0].name}
              onChange={(e) => handleCreatorChange('name', e.target.value)}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter creator name"
            />
          </div>

          <div>
            <label htmlFor="creatorAddress" className="block text-sm font-medium text-blue-100">Creator Address</label>
            <input
              type="text"
              name="creatorAddress"
              id="creatorAddress"
              required
              value={formData.creators[0].address}
              readOnly
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner p-3 opacity-75"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-100">Image URL</label>
            <input
              type="url"
              name="image"
              id="image"
              required
              value={formData.image}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label htmlFor="mediaUrl" className="block text-sm font-medium text-blue-100">Media URL</label>
            <input
              type="url"
              name="mediaUrl"
              id="mediaUrl"
              required
              value={formData.mediaUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter media URL"
            />
          </div>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <label htmlFor="nftName" className="block text-sm font-medium text-blue-100">NFT Name</label>
            <input
              type="text"
              name="nftName"
              id="nftName"
              required
              value={formData.nftName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter NFT name"
            />
          </div>

          <div>
            <label htmlFor="nftDescription" className="block text-sm font-medium text-blue-100">NFT Description</label>
            <textarea
              name="nftDescription"
              id="nftDescription"
              rows={3}
              required
              value={formData.nftDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Describe your NFT..."
            />
          </div>

          <div>
            <label htmlFor="nftImage" className="block text-sm font-medium text-blue-100">NFT Image URL</label>
            <input
              type="url"
              name="nftImage"
              id="nftImage"
              required
              value={formData.nftImage}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter NFT image URL"
            />
          </div>

          <div>
            <label htmlFor="animationUrl" className="block text-sm font-medium text-blue-100">Animation URL</label>
            <input
              type="url"
              name="animationUrl"
              id="animationUrl"
              required
              value={formData.animationUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-0 bg-blue-900/40 text-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none p-3"
              placeholder="Enter animation URL"
            />
          </div>

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
                    className="mt-1 block w-full rounded-lg border-0 bg-indigo-900/40 text-white shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none p-3"
                    placeholder="e.g. Genre"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-indigo-100">Value</label>
                    <input
                      type="text"
                      value={attr.value}
                      onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                      className="mt-1 block w-full rounded-lg border-0 bg-indigo-900/40 text-white shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none p-3"
                      placeholder="e.g. Electronic"
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
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-100 mb-4">Uploading to IPFS</h3>
            <p className="text-gray-300">
              Your metadata will be uploaded to IPFS. This step is required before creating your NFT.
            </p>
          </div>
        </div>
      );
    } else if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-100 mb-4">Creating NFT</h3>
            <p className="text-gray-300">
              Your IP will be registered as an NFT on the blockchain. This is the final step.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderRegistrationDetails = () => {
    if (!registrationDetails) return null;

    return (
      <div className="flex flex-col items-center animate-fade-in">
        {/* Success Animation */}
        <div className="mb-4">
          <CheckCircleIcon className="w-16 h-16 text-green-400 animate-bounce" />
        </div>
        <h2 className="text-4xl font-extrabold text-green-400 mb-2">Registration Successful!</h2>
        <p className="text-gray-300 mb-8">Your IP has been successfully registered on the blockchain.</p>

        <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-2xl p-8 shadow-xl w-full max-w-3xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IP Details */}
            <div>
              <h3 className="text-lg font-semibold text-blue-200 mb-4 border-b border-blue-700 pb-2">IP Details</h3>
              <Detail label="Title" value={registrationDetails.title} />
              <Detail label="IPA ID" value={registrationDetails.ipaId} copy />
              <Detail label="Transaction Hash" value={registrationDetails.transactionHash} copy />
              <Detail label="License Terms IDs" value={registrationDetails.licenseTermsIds} />
            </div>
            {/* Registration Info */}
            <div>
              <h3 className="text-lg font-semibold text-blue-200 mb-4 border-b border-blue-700 pb-2">Registration Info</h3>
              <Detail label="Registration ID" value={registrationDetails.registrationId} copy />
              <Detail label="Timestamp" value={formatDate(registrationDetails.timestamp)} />
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-400">Explorer Link</span>
                <a
                  href={registrationDetails.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-blue-100 rounded-lg font-medium text-xs transition-colors ml-2"
                  title="Open in new tab"
                >
                  View on Explorer <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Yakoa Protection Section */}
          <div className="mt-8 pt-6 border-t border-blue-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className={`w-6 h-6 ${
                  registrationDetails.isYakoaProtected 
                    ? registrationDetails.yakoaProtection?.isFallback 
                      ? 'text-yellow-400' 
                      : 'text-green-400'
                    : 'text-blue-400'
                }`} />
                <div>
                  <h3 className="text-lg font-semibold text-blue-200">IP Protection Status</h3>
                  <p className="text-sm text-gray-300">
                    {registrationDetails.isYakoaProtected 
                      ? registrationDetails.yakoaProtection?.isFallback
                        ? 'IP assumed to be protected by Yakoa (fallback)'
                        : 'Your IP is protected by Yakoa'
                      : 'Protect your IP with Yakoa\'s advanced protection system'}
                  </p>
                </div>
              </div>
              {!registrationDetails.isYakoaProtected && (
                <button
                  onClick={() => setShowYakoaModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                  Protect with Yakoa
                </button>
              )}
            </div>

            {/* Show Yakoa Protection Details if protected */}
            {registrationDetails.isYakoaProtected && registrationDetails.yakoaProtection && (
              <div className={`mt-4 rounded-lg p-4 ${
                registrationDetails.yakoaProtection.isFallback 
                  ? 'bg-yellow-900/30 border border-yellow-500/30' 
                  : 'bg-blue-800/30 border border-blue-500/30'
              }`}>
                <h4 className="text-sm font-semibold text-blue-200 mb-3">
                  Yakoa Protection Details
                  {registrationDetails.yakoaProtection.isFallback && (
                    <span className="ml-2 text-yellow-400 text-xs">(Fallback Mode)</span>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400">Protected At</span>
                    <p className="text-sm text-gray-200">{formatDate(registrationDetails.yakoaProtection.protectedAt)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Yakoa Token ID</span>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-200 font-mono">{registrationDetails.yakoaProtection.tokenId}</p>
                      <CopyButton value={registrationDetails.yakoaProtection.tokenId} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Protected Media</span>
                    <p className="text-sm text-gray-200">{registrationDetails.yakoaProtection.metadata.mediaCount} items</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Licenses</span>
                    <p className="text-sm text-gray-200">{registrationDetails.yakoaProtection.metadata.licenseCount} terms</p>
                  </div>
                  {registrationDetails.yakoaProtection.isFallback && (
                    <div className="col-span-2 mt-2">
                      <span className="text-xs text-yellow-400">Registration Attempts</span>
                      <p className="text-sm text-yellow-200">
                        Made {registrationDetails.yakoaProtection.attempts} attempts to register with Yakoa
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-3xl">
          <button
            onClick={() => {
              setShowRegistrationDetails(false);
              setCurrentStep(1);
              setFormData({
                title: '',
                description: '',
                createdAt: new Date().toISOString(),
                creators: [{
                  name: '',
                  address: '' as `0x${string}`,
                  contributionPercent: 100,
                }],
                image: '',
                mediaUrl: '',
                mediaType: 'audio/mpeg',
                nftName: '',
                nftDescription: '',
                nftImage: '',
                animationUrl: '',
                attributes: [{ key: '', value: '' }],
              });
            }}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors w-full sm:w-auto"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Register Another IP
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold shadow transition-colors w-full sm:w-auto"
          >
            <HomeIcon className="w-5 h-5 mr-2" /> Return to Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-8 px-2 md:px-8">
        {/* Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-3xl shadow-2xl border border-blue-500/30 backdrop-blur-2xl p-10 md:p-14">
            {showRegistrationDetails ? (
              renderRegistrationDetails()
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Register Your IP
                  </h2>
                  <p className="mt-2 text-lg text-gray-200">
                    Step {currentStep}: {registrationSteps[currentStep - 1].title}
                  </p>
                  {error && (
                    <div className="mt-4">
                      <ErrorMessage
                        message={error.message}
                        type={error.type}
                        onDismiss={() => setError(null)}
                      />
                    </div>
                  )}
                  {!isConnected && !error && (
                    <div className="mt-4">
                      <ErrorMessage
                        message="Please connect your wallet to continue"
                        type="warning"
                      />
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {renderStepForm()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between space-x-4 mt-8">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isLoading}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-200 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeftIcon className="w-5 h-5 mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isConnected || isLoading}
                      className={`px-8 py-3 border border-transparent rounded-lg shadow-xl text-base font-bold text-white 
                        ${!isConnected || isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200`}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : !isConnected ? (
                        'Connect Wallet'
                      ) : currentStep === 1 ? (
                        'Continue to Step 2'
                      ) : currentStep === 2 ? (
                        'Continue to Step 3'
                      ) : currentStep === 3 ? (
                        'Continue to Step 4'
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Registration Steps Panel - Only show when not displaying registration details */}
        {!showRegistrationDetails && (
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-blue-900/80 to-purple-900/70 rounded-3xl shadow-xl border border-blue-500/30 backdrop-blur-2xl p-8 md:p-10">
              <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Registration Steps
              </h2>
              <div className="space-y-6">
                {registrationSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      step.id === currentStep
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : step.id < currentStep
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-gray-500/20 border border-gray-500/30'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      step.id === currentStep
                        ? 'bg-blue-500/30 text-blue-200'
                        : step.id < currentStep
                        ? 'bg-green-500/30 text-green-200'
                        : 'bg-gray-500/30 text-gray-200'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{step.title}</h3>
                      <p className="text-sm text-gray-300">{step.description}</p>
                      {step.id < currentStep && (
                        <div className="mt-2 flex items-center text-green-400 text-sm">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Yakoa Modal */}
      <YakoaBenefitsModal
        isOpen={showYakoaModal}
        onClose={() => setShowYakoaModal(false)}
        onConfirm={handleYakoaProtection}
        isLoading={isProtectingYakoa}
      />
    </section>
  );
};

export default Register; 