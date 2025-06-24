
import React from 'react';
import { Sun, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Sun className={`${sizeClasses[size]} text-yellow-500 animate-pulse`} />
        <Zap className={`${sizeClasses[size]} text-blue-500 absolute top-0 left-0 opacity-70`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent`}>
          SolarPro AI
        </span>
      )}
    </div>
  );
};

export default Logo;
