"use client";

export default function RFQFormCard() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 mt-4 lg:-mt-[70px] relative z-10 mb-8 flex justify-center">
      <div className="bg-[#F5FBFF] rounded-[10px] md:p-4 shadow-lg flex flex-col w-full lg:w-[1030px] h-auto lg:h-[360px]">
        <h2 className="text-[20px] font-bold leading-[28px] text-[#7c3aed] mb-4">
          Tell us what you need
        </h2>

        {/* Border container with upload area */}
        <div className="border border-[#A6A6A6] rounded-lg flex flex-col items-center justify-center flex-1 mb-4 py-6 px-4 lg:p-0">
          {/* Upload File Button */}
          <button className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg transition-colors py-2 px-4 lg:px-6 lg:py-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17V11L7 13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11L11 13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Upload File</span>
          </button>

          {/* Instruction Text - 24px below button */}
          <p className="text-[14px] text-[#6B6B6B] text-center mt-6 px-4">
            Upload an image, file, or enter keywords. For example, &quot;100
            bear toys, refer to the uploaded design.&quot;
          </p>
        </div>

        {/* Write RFQ Details Button - 16px below border */}
        <div className="flex justify-center">
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 rounded-lg transition-colors">
            Write Order Details
          </button>
        </div>
      </div>
    </div>
  );
}
