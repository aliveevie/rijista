import { useAccount } from 'wagmi';
import { useEffect } from 'react';

const ModalHider = () => {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // Try to forcibly close WalletConnect modal if it exists
      const modal = document.querySelector('[class*="walletconnect-modal"]');
      if (modal) {
        (modal as HTMLElement).style.display = 'none';
      }
      // Also try to close any modal with role="dialog"
      document.querySelectorAll('[role="dialog"]').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    }
  }, [isConnected]);

  return null;
};

export default ModalHider; 