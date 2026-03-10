/** Artisanal SVG portrait — placeholder until official photo is provided */
export function TherapistPortrait() {
  return (
    <div
      className="w-full"
      style={{
        aspectRatio: '3/4',
        background: 'linear-gradient(145deg, #f5e6e8 0%, #e8d0d4 25%, #dbb8bf 50%, #c89aa3 75%, #b8838e 100%)',
      }}
      role="img"
      aria-label="Elaine Teixeira — Psicóloga Intercultural"
    >
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="320" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5E6E8" />
            <stop offset="60%" stopColor="#E8D0D4" />
            <stop offset="100%" stopColor="#D4B0B8" />
          </linearGradient>
        </defs>
        <rect width="320" height="400" fill="url(#bg)" />

        {/* Floor shadow */}
        <rect x="0" y="260" width="320" height="140" fill="rgba(0,0,0,0.05)" />

        {/* Wall art */}
        <rect x="240" y="40" width="60" height="80" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="270" cy="70" rx="14" ry="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Potted plant */}
        <ellipse cx="30" cy="228" rx="22" ry="18" fill="rgba(80,110,60,0.25)" />
        <ellipse cx="20" cy="214" rx="14" ry="16" fill="rgba(80,110,60,0.2)" />
        <rect x="26" y="238" width="8" height="30" fill="rgba(80,60,40,0.2)" />

        {/* Clothing / body */}
        <path d="M80 310 Q100 205 160 210 Q220 205 240 310 L240 400 L80 400Z" fill="#9F4A5A" />
        <path d="M100 310 Q118 228 160 220 Q202 228 220 310" fill="#8a3a49" />

        {/* Collar */}
        <path d="M145 208 L160 228 L175 208 Q165 234 160 236 Q155 234 145 208Z" fill="#FAFAFA" />

        {/* Neck */}
        <rect x="150" y="186" width="20" height="24" rx="6" fill="#F0D8DA" />

        {/* Face */}
        <ellipse cx="160" cy="146" rx="44" ry="46" fill="#F5E6E8" />

        {/* Hair */}
        <ellipse cx="160" cy="116" rx="46" ry="42" fill="#3D2B2E" />
        <ellipse cx="114" cy="148" rx="11" ry="32" fill="#3D2B2E" />
        <ellipse cx="206" cy="148" rx="11" ry="32" fill="#3D2B2E" />
        <path d="M114 180 Q120 196 128 200" stroke="#3D2B2E" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M206 180 Q200 196 192 200" stroke="#3D2B2E" strokeWidth="8" strokeLinecap="round" fill="none" />

        {/* Eyebrows */}
        <path d="M136 133 Q147 128 154 131" stroke="#3D2B2E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M166 131 Q173 128 184 133" stroke="#3D2B2E" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <ellipse cx="148" cy="143" rx="8" ry="6" fill="#4A3035" />
        <ellipse cx="172" cy="143" rx="8" ry="6" fill="#4A3035" />
        <ellipse cx="149" cy="141" rx="3" ry="3" fill="#2A1A1E" />
        <ellipse cx="173" cy="141" rx="3" ry="3" fill="#2A1A1E" />
        <ellipse cx="151" cy="140" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="175" cy="140" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.6)" />

        {/* Nose */}
        <path d="M157 152 Q160 162 163 152" stroke="#C8A0A6" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Warm smile */}
        <path d="M148 168 Q160 180 172 168" stroke="#C07A86" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Earrings */}
        <circle cx="116" cy="158" r="5" fill="#9F4A5A" opacity="0.7" />
        <circle cx="204" cy="158" r="5" fill="#9F4A5A" opacity="0.7" />

        {/* Necklace */}
        <path d="M150 206 Q160 220 170 206" stroke="#C07A86" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      </svg>
    </div>
  )
}
