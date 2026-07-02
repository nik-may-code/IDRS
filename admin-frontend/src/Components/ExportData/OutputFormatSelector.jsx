import React from 'react';

const OutputFormatSelector = ({ outputFormats, selectedOutputFormat, setSelectedOutputFormat }) => {
  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-neutral-900 mb-4">Output Format</h2>
      <div className="flex flex-wrap gap-3">
        {outputFormats.map((format) => (
          <button
            key={format}
            onClick={() => setSelectedOutputFormat(format)}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 
              ${selectedOutputFormat === format
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {format}
          </button>
        ))}
      </div>
    </section>
  );
};

export default OutputFormatSelector;
