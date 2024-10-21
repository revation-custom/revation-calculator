interface IcSpinProps {
  className?: string;
}

export const IcSpin = ({ className = "" }: IcSpinProps) => {
  return (
    <svg
      width="31"
      height="32"
      viewBox="0 0 31 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        id="Ellipse 489"
        d="M30.5408 9.32425C29.2943 6.60913 27.3124 4.29725 24.8197 2.65039C22.3271 1.00353 19.4231 0.0874783 16.4366 0.00595753C13.4501 -0.0755633 10.5005 0.680706 7.92164 2.18913C5.34282 3.69756 3.23784 5.89788 1.84505 8.54095C0.452266 11.184 -0.172684 14.1643 0.0409643 17.1442C0.254613 20.1241 1.29833 22.9847 3.05392 25.4021C4.80952 27.8194 7.20686 29.6969 9.97449 30.8221C12.7421 31.9472 15.7695 32.2749 18.7138 31.7682L18.3611 29.7186C15.7995 30.1595 13.1656 29.8744 10.7577 28.8955C8.34978 27.9166 6.26405 26.2831 4.73664 24.18C3.20924 22.0769 2.30119 19.5881 2.11531 16.9955C1.92943 14.4029 2.47315 11.81 3.6849 9.51047C4.89665 7.21094 6.72803 5.29662 8.97166 3.98426C11.2153 2.6719 13.7815 2.01393 16.3798 2.08485C18.9781 2.15578 21.5047 2.95276 23.6734 4.38557C25.8421 5.81837 27.5663 7.82975 28.6508 10.192L30.5408 9.32425Z"
        fill="url(#paint0_linear_4396_3608)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4396_3608"
          x1="29"
          y1="3"
          x2="29"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.9" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
