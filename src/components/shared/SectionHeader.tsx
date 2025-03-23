import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
    title: string;
    desc: string;
    squareColor: string;
    haveLink: boolean;
    linkText: string;
    linkUrl: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
    desc, 
    haveLink, 
    linkText, 
    linkUrl, 
    squareColor, 
    title 
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 p-4">
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                    {/* Using a separate div for dynamic color */}
                    <span className={clsx("w-4 h-4 rounded-sm", squareColor)}></span>
                    {title}
                </h2>

                <h5 className="text-gray-500 text-base sm:text-lg max-w-xl">{desc}</h5>
            </div>

            {haveLink && (
                <Link href={linkUrl} className='self-end'>
                    <button className="btn btn-success btn-lg btn-soft transition-transform transform hover:scale-105 w-full sm:w-auto">
                        {linkText}
                    </button>
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;