import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">tsender</h1>
          
          {/* GitHub Button */}
          <a 
            href="https://github.com/codersjj/full-stack-web3-cu/tree/main/Section_3_TS_TSender_UI/ts-tsender-ui-cu" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="GitHub Repository"
          >
            <FaGithub className="text-gray-700 text-xl" />
          </a>
        </div>
        
        {/* Connect Button */}
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}