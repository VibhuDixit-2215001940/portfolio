// Crisp inline brand & domain SVG emblems for every skill chip so zero external URLs fail.
export function SkillLogo({ id, color = '#3ddec8' }) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" fill={color} stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </svg>
      )
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
          <path d="M9.5 14.5c0 1.1.9 1.8 2.5 1.8s2.5-.6 2.5-1.7c0-1.2-1-1.5-2.5-1.8-1.4-.3-2.3-.6-2.3-1.7 0-1 .9-1.7 2.3-1.7 1.3 0 2.2.6 2.3 1.5" strokeLinecap="round" />
        </svg>
      )
    case 'express':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M3 12h8M3 8h7M3 16h8" />
          <path d="m14 8 7 8M21 8l-7 8" />
        </svg>
      )
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3.5" stroke={color} strokeWidth="1.7" />
          <path d="M10.5 10v5.2c0 1.2-.6 1.8-1.7 1.8-.6 0-1.1-.2-1.5-.6M16.8 11.2c-.3-.7-.9-1.1-1.7-1.1-1 0-1.6.5-1.6 1.3 0 .9.7 1.2 1.8 1.6 1.2.4 1.9.9 1.9 2.1 0 1.2-.9 2-2.2 2-1.1 0-1.9-.5-2.3-1.4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'html-css':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" />
          <path d="M8.5 8.5h7l-.4 3.5H9.2l.2 2.5 2.6.8 2.6-.8.2-1.8" />
        </svg>
      )
    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="4" />
          <path d="M9 8h3.6a2.1 2.1 0 0 1 0 4.2H9V8Zm0 4.2h4a2.2 2.2 0 0 1 0 4.4H9v-4.4Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'responsive-ui':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="4" width="14" height="11" rx="2" />
          <path d="M6.5 19h6M9.5 15v4" />
          <rect x="15.5" y="9" width="6" height="11" rx="1.4" fill="#070b10" />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c-3 0-4 1.3-4 3v2h5v1H6.5C4.5 9 3 10.4 3 13s1.5 4 3.5 4H8v-2.2c0-1.6 1.3-2.8 3-2.8h4c1.3 0 2-.8 2-2V6c0-1.7-1-3-5-3Z" />
          <path d="M12 21c3 0 4-1.3 4-3v-2h-5v-1h6.5c2 0 3.5-1.4 3.5-4s-1.5-4-3.5-4H16v2.2c0 1.6-1.3 2.8-3 2.8H9c-1.3 0-2 .8-2 2v4c0 1.7 1 3 5 3Z" />
          <circle cx="10" cy="6" r="0.8" fill={color} stroke="none" />
          <circle cx="14" cy="18" r="0.8" fill={color} stroke="none" />
        </svg>
      )
    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 12h10v3.5a4.5 4.5 0 0 1-4.5 4.5h-1A4.5 4.5 0 0 1 6 15.5V12Z" />
          <path d="M16 13h1.5a2 2 0 0 1 0 4H16" />
          <path d="M9 8.5c0-1.5 1.5-2 1.5-3.5M13 8.5c0-1.5 1.5-2 1.5-3.5" />
        </svg>
      )
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.5C8.5 7 7 10.8 7 14a5 5 0 0 0 10 0c0-3.2-1.5-7-5-11.5Z" />
          <path d="M12 10v11.5" />
        </svg>
      )
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
          <path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6" />
          <path d="M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="2.2" />
          <circle cx="6.5" cy="17.5" r="2.2" />
          <circle cx="17.5" cy="8.5" r="2.2" />
          <path d="M6.5 8.7v6.6M8.7 6.5h4.6a2 2 0 0 1 2 2v0" />
          <path d="M8.7 17.5h4.3a2.5 2.5 0 0 0 2.5-2.5v-4.3" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
        </svg>
      )
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
          <path d="M16.5 3.2 21 5.4v13.2l-4.5 2.2-8.2-7.4-4 3.1-1.8-1.1 3.4-3.4-3.4-3.4 1.8-1.1 4 3.1 8.2-7.4Z" />
          <path d="M16.5 7.5v9l-4.8-4.5 4.8-4.5Z" />
        </svg>
      )
    case 'azure':
    case 'ms-ai-studio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
          <path d="m13.5 4 7.5 15h-6l-3.5-7-4 7H3l7.5-15h3Z" />
        </svg>
      )
    case 'aws':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6.5 15a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 16.8 6a3.8 3.8 0 0 1 1.2 7.4" />
          <path d="M5 17.5c4.5 2.8 9.5 2.8 14 0M17 16l2 1.5-1.5 2" />
        </svg>
      )
    case 'gcp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 18h9.5a4 4 0 0 0 .8-7.92A5.5 5.5 0 0 0 6.8 9.4 4.2 4.2 0 0 0 7 18Z" />
          <circle cx="12" cy="13" r="2.2" />
        </svg>
      )
    case 'langchain':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a4.5 4.5 0 0 1 0-6.4l1.6-1.6a4.5 4.5 0 0 1 6.4 6.4l-1 1" />
          <path d="M14 11a4.5 4.5 0 0 1 0 6.4l-1.6 1.6a4.5 4.5 0 0 1-6.4-6.4l1-1" />
        </svg>
      )
    case 'langgraph':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="12" r="2.4" />
          <circle cx="18" cy="6.5" r="2.4" />
          <circle cx="18" cy="17.5" r="2.4" />
          <path d="m8.2 10.9 7.6-3.3M8.2 13.1l7.6 3.3M18 8.9v6.2" />
        </svg>
      )
    case 'langsmith':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 17 9 11l4 3 7-8" />
          <circle cx="20" cy="6" r="1.6" fill={color} stroke="none" />
          <path d="M4 20h16" />
        </svg>
      )
    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 4h9l4 4v11a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5.5A1.5 1.5 0 0 1 5 4Z" />
          <circle cx="11" cy="13" r="3" />
          <path d="m13.3 15.3 2.2 2.2" />
        </svg>
      )
    case 'ai-agents':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="7" width="16" height="12" rx="3.5" />
          <path d="M12 3v4M9 12.5h.01M15 12.5h.01M9.5 16h5" />
        </svg>
      )
    case 'llm-nlp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z" />
          <path d="M8.5 9h7M8.5 12h4.5" />
        </svg>
      )
    case 'yolo':
    case 'image-processing':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      )
    case 'fabric-sentinel':
    case 'owasp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.5 4.5 5.8v5.7c0 5 3.2 9.2 7.5 10.5 4.3-1.3 7.5-5.5 7.5-10.5V5.8L12 2.5Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'vapt-nmap':
    case 'virustotal-wdk':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5" />
          <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
        </svg>
      )
    case 'cicd-bash':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="m7.5 9.5 3 2.5-3 2.5M12.5 14.5h4" />
        </svg>
      )
  }
}
