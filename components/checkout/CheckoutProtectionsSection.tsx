"use client";

export default function CheckoutProtectionsSection() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#000000] mb-4">
        Protections for this order
      </h3>

      <div className="space-y-4">
        {/* Secure Payments */}
        <div className="flex items-start gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 mt-0.5"
          >
            <path
              d="M10.4902 2.22957L5.50016 4.10957C4.35016 4.53957 3.41016 5.89957 3.41016 7.11957V14.5496C3.41016 15.7296 4.19016 17.2796 5.14016 17.9896L9.44016 21.1996C10.8502 22.2596 13.1702 22.2596 14.5802 21.1996L18.8802 17.9896C19.8302 17.2796 20.6102 15.7296 20.6102 14.5496V7.11957C20.6102 5.88957 19.6702 4.52957 18.5202 4.09957L13.5302 2.22957C12.6802 1.91957 11.3202 1.91957 10.4902 2.22957Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.05078 11.8697L10.6608 13.4797L14.9608 9.17969"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#000000] mb-1">
              Secure payments
            </p>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Every payment you make on Alibaba.com is secured with strict SSL
              encryption and PCI DSS data protection protocols.
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-start gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 mt-0.5"
          >
            <path
              d="M11.9998 14H12.9998C14.0998 14 14.9998 13.1 14.9998 12V2H5.99976C4.49976 2 3.18977 2.82999 2.50977 4.04999"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 8H8"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 11H6"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 14H4"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#000000] mb-1">
              Delivery via <span className="text-orange">MaheDeluxe.com</span>{" "}
              logistics
            </p>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Expect your order to be delivered before scheduled dates or
              receive a 10% delay compensation.
            </p>
          </div>
        </div>

        {/* Standard Refund Policy */}
        <div className="flex items-start gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 mt-0.5"
          >
            <path
              d="M2 8.5H14.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 16.5H8"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 16.5H14.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 3.5V9.5L22 7.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 9.5L18 7.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#000000] mb-1">
              Standard refund policy
            </p>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Claim a refund if your order doesn&apos;t ship, is missing, or
              arrives with product issues.
            </p>
          </div>
        </div>

        {/* Trade Assurance */}
        <div>
          <p className="text-xs text-[#6B6B6B] mb-2">
            MaheDeluxe.com protects all your orders placed and paid on the platform
            with
          </p>
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.741 3.47478L16.8388 2.40932C16.7134 2.36132 16.5701 2.37457 16.4577 2.44456C16.3453 2.51456 16.2789 2.63185 16.2812 2.75647V4.23371H13.6245V1.47497C13.6225 1.32767 13.5252 1.1956 13.377 1.1389L10.519 0.0900608C10.1894 -0.0300203 9.82218 -0.0300203 9.49254 0.0900608L6.64261 1.1389C6.49442 1.1956 6.39713 1.32767 6.39505 1.47497V4.23001H3.7323V2.75278C3.73463 2.62816 3.66829 2.51087 3.55588 2.44087C3.44347 2.37088 3.30017 2.35762 3.17479 2.40563L0.270523 3.47478C0.0984916 3.53567 -0.0106564 3.69186 0.000826065 3.86071L0.950803 16.0479C0.970625 16.2907 1.13468 16.5037 1.37749 16.6019L9.44021 19.8906C9.79697 20.0365 10.2045 20.0365 10.5613 19.8906L18.624 16.6019C18.8668 16.5037 19.0309 16.2907 19.0507 16.0479L19.9986 3.86071C20.0133 3.69438 19.9091 3.53842 19.741 3.47478Z"
                fill="#41ADFF"
              />
              <path
                d="M12.5862 11.3187C12.0919 10.9484 11.3642 10.6336 10.403 10.3743C9.99735 10.2462 9.60805 10.0792 9.24178 9.87614C9.04181 9.76219 8.92222 9.56206 8.92638 9.34837C8.92359 9.12581 9.03472 8.91459 9.22744 8.77614C9.46058 8.6118 9.75143 8.52895 10.0467 8.54281C10.3894 8.51909 10.7305 8.60423 11.0113 8.78355C11.2424 8.9827 11.3601 9.26648 11.3308 9.55392H13.2027V9.52429C13.2584 8.8672 12.9433 8.22911 12.365 7.82799C11.9547 7.55326 11.4781 7.37048 10.9744 7.29466V6.11133H9.21925V7.30948C8.73579 7.38609 8.27784 7.56084 7.87985 7.82059C7.32379 8.16424 6.99597 8.73758 7.00739 9.34651C6.97013 9.92217 7.2509 10.4771 7.75696 10.828C8.25873 11.1706 9.02264 11.4928 10.0548 11.7965C10.4305 11.8978 10.7864 12.0515 11.1096 12.2521C11.3097 12.4039 11.4178 12.633 11.4004 12.8687C11.4074 13.0897 11.297 13.3004 11.1034 13.4354C10.8388 13.5977 10.5211 13.6741 10.2023 13.6521C9.71282 13.6521 9.34828 13.5613 9.11071 13.3761C8.87314 13.191 8.75435 12.8817 8.75435 12.4502H6.87836L6.86812 12.4798C6.84764 13.344 7.16372 13.9743 7.81636 14.3706C8.24097 14.6277 8.71896 14.8041 9.2213 14.8891V16.1113H10.9744V14.9058C11.5128 14.8487 12.0275 14.6732 12.4736 14.3947C13.032 14.0434 13.3546 13.4594 13.3296 12.8447C13.3595 12.2589 13.0844 11.6942 12.5862 11.3187Z"
                fill="white"
              />
            </svg>
            <span className="text-sm font-medium text-[#000000]">
              Trade Assurance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
