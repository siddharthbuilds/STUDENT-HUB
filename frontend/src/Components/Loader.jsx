let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-student-hub-loader", "true");
  style.textContent = `
  :root {
    --sh-bg: #0a0e27;
    --sh-cyan: #22d3ee;
    --sh-cyan-dim: rgba(34, 211, 238, 0.25);
    --sh-purple: #a855f7;
  }

  .sh-loader-overlay {
    position: fixed;
    inset: 0;
    background: var(--sh-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .sh-loader-inline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .sh-orbit {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sh-orbit-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid var(--sh-cyan-dim);
  }

  .sh-orbit-spin {
    position: absolute;
    inset: 0;
    animation: sh-spin 2.2s linear infinite;
    will-change: transform;
  }

  .sh-orbit-spin-reverse {
    animation: sh-spin-reverse 3.1s linear infinite;
  }

  .sh-orbit-dot {
    position: absolute;
    top: -3px;
    left: 50%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--sh-cyan);
    box-shadow: 0 0 8px 1px var(--sh-cyan);
    transform: translateX(-50%);
  }

  .sh-orbit-dot-purple {
    background: var(--sh-purple);
    box-shadow: 0 0 8px 1px var(--sh-purple);
  }

  .sh-orbit-core {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: sh-pulse 1.8s ease-in-out infinite;
    will-change: transform, opacity;
  }

  .sh-orbit-cap {
    color: var(--sh-cyan);
    filter: drop-shadow(0 0 6px var(--sh-cyan-dim));
  }

  .sh-loader-text {
    margin-top: 18px;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: var(--sh-cyan);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .sh-loader-dot {
    animation: sh-dot-fade 1.4s ease-in-out infinite;
    opacity: 0.2;
  }
  .sh-loader-dot:nth-child(1) { animation-delay: 0s; }
  .sh-loader-dot:nth-child(2) { animation-delay: 0.2s; }
  .sh-loader-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes sh-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes sh-spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes sh-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.88); opacity: 0.75; }
  }

  @keyframes sh-dot-fade {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }

  /* ---------- Top bar loader ---------- */

  .sh-topbar-track {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: transparent;
    z-index: 9998;
    overflow: hidden;
    pointer-events: none;
  }

  .sh-topbar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, transparent, var(--sh-cyan), var(--sh-purple), transparent);
    box-shadow: 0 0 8px 1px var(--sh-cyan-dim);
    animation: sh-topbar-sweep 1.1s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes sh-topbar-sweep {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .sh-orbit-spin,
    .sh-orbit-spin-reverse,
    .sh-orbit-core,
    .sh-loader-dot,
    .sh-topbar-fill {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
  `;
  document.head.appendChild(style);
}

/**
 * PageLoader — orbit-style loader.
 *
 * @param {number} size - diameter in px (default 88)
 * @param {string} text - optional label under the loader
 * @param {boolean} fullScreen - if true, covers the viewport with the
 *        theme background; if false, renders inline (good for cards/sections)
 */
export function PageLoader({ size = 88, text = "Loading", fullScreen = false }) {
  injectStyles();

  const capSize = Math.round(size * 0.4);

  const loader = (
    <div className="sh-loader-inline">
      <div className="sh-orbit" style={{ width: size, height: size }}>
        <div className="sh-orbit-ring" />

        <div className="sh-orbit-spin">
          <div className="sh-orbit-dot" />
        </div>
        <div className="sh-orbit-spin sh-orbit-spin-reverse">
          <div className="sh-orbit-dot sh-orbit-dot-purple" />
        </div>

        <div className="sh-orbit-core">
          <svg
            className="sh-orbit-cap"
            width={capSize}
            height={capSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z"
              fill="currentColor"
            />
            <path
              d="M5 10.18v4.34c0 .35.16.68.44.9C6.79 16.47 9.25 18 12 18s5.21-1.53 6.56-2.58c.28-.22.44-.55.44-.9v-4.34l-7 3.18-7-3.18z"
              fill="currentColor"
              opacity="0.55"
            />
          </svg>
        </div>
      </div>

      {text && (
        <div className="sh-loader-text" role="status" aria-live="polite">
          {text}
          <span className="sh-loader-dot">.</span>
          <span className="sh-loader-dot">.</span>
          <span className="sh-loader-dot">.</span>
        </div>
      )}
    </div>
  );

  if (!fullScreen) return loader;

  return <div className="sh-loader-overlay">{loader}</div>;
}

/**
 * TopBarLoader — slim animated progress bar for route/data transitions.
 * Mount once near the app root and toggle `active`.
 *
 * @param {boolean} active - whether to show/animate the bar
 */
export function TopBarLoader({ active = false }) {
  injectStyles();

  if (!active) return null;

  return (
    <div className="sh-topbar-track" role="status" aria-live="polite" aria-label="Loading">
      <div className="sh-topbar-fill" />
    </div>
  );
}

export default PageLoader;
