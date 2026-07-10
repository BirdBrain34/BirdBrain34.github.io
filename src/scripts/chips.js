const chipDescriptions = {
  // Maps a chip label (chip.textContent) to the text shown inside the tooltip.
  // If a chip label is not found here, no tooltip will be shown.
  // Programming Languages
  'Python': 'High-level, versatile language used for backend development, automation, data processing, and scripting.',
  'C#': 'Modern, object-oriented language by Microsoft for building desktop apps, web services, and games.',
  'C++': 'Powerful systems-level language for performance-critical applications, game engines, and embedded systems.',
  'PHP': 'Server-side scripting language tailored for web development and dynamic content generation.',
  'Dart': 'Optimized client-side language by Google for building fast apps across platforms with Flutter.',
  'HTML': 'Standard markup language for creating structure and content on the web.',
  'JavaScript': 'Essential language for interactive web pages, client-side logic, and full-stack development.',
  'CSS': 'Style sheet language used to control the visual presentation and layout of web pages.',

  // Backend Development
  'REST API Integration': 'Designing and consuming RESTful web services for communication between client and server.',
  'REST API': 'Architecting and using RESTful endpoints to exchange data between a client and server via HTTP.',
  'CRUD Operations': 'Implementing Create, Read, Update, Delete functionality in database-driven applications.',
  'JSON Handling': 'Parsing, generating, and manipulating JSON data for data interchange between systems.',
  'JSON': 'Using JSON (JavaScript Object Notation) to store and transfer structured data between applications.',
  'Client–Server Communication': 'Managing data exchange between client-side interfaces and back-end servers.',
  'Authentication & Encryption': 'Implementing secure user login, data protection, and encrypted communication.',

  // Database Management
  'MySQL': 'Open-source relational database management system for structured data storage and retrieval.',
  'Oracle SQL': 'Enterprise-grade SQL database system for complex queries, transactions, and data management.',
  'Table Relationships & Normalization': 'Designing efficient database schemas with proper table relationships and minimal redundancy.',
  'Foreign Keys & Constraints': 'Enforcing referential integrity and data validation rules across related database tables.',
  'Triggers': 'Automated database procedures that execute in response to table events like insert, update, or delete.',
  'Stored Procedures': 'Pre-compiled SQL code blocks for reusable, efficient database operations and business logic.',

  // Frameworks & Platforms
  'Flutter': 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from one codebase.',
  'React': 'JavaScript library for building dynamic, component-based user interfaces for web applications.',
  'Node.js': 'JavaScript runtime for building scalable server-side applications and network tools.',

  // Tools & Others
  'GitHub': 'Web-based platform for version control, collaboration, and hosting Git repositories.',
  'Git': 'Distributed version control system for tracking changes in source code during software development.',
  'Visual Studio': 'Full-featured IDE by Microsoft for developing .NET, C#, and cross-platform applications.',
  'VS Code': 'Lightweight, extensible code editor with rich support for debugging, IntelliSense, and extensions.',
  'XAMPP': 'Free, cross-platform web server solution stack for local development and testing.',

  // Certifications
  'Full Stack Web Dev': 'Building complete web applications across both front-end (HTML/CSS/JavaScript) and back-end (server logic, databases, APIs) layers.',
  'TOEIC': 'Test of English for International Communication certificate measuring professional English proficiency.',

  // Experience page chips
  'Effect House': 'TikTok\'s augmented reality platform for creating interactive face filters and AR effects.',
  'AR Filter/Game Logic': 'Designing and implementing augmented reality filters and game mechanics using Effect House.',
  'Tracking & Interaction': 'Implementing face tracking, body tracking, and gesture recognition for interactive AR experiences.',
  'Performance Optimization': 'Optimizing AR effects for smooth performance across different mobile device capabilities.',
  'Audio-Driven Effects': 'Creating real-time audio-reactive effects that respond to sound input and music beats.',
  'Visual Scripting': 'Building logic and interactions using node-based visual programming instead of traditional code.',
  'Refactoring': 'Restructuring existing code to improve readability, performance, and maintainability without changing behavior.',
  'AR Animation': 'Creating and controlling animated sequences specifically for augmented reality environments.',
  'Pitch Detection': 'Analyzing audio input to identify musical note frequencies for interactive sound-responsive features.',
  'Object Pooling': 'Reusing game objects from a pre-allocated pool to reduce memory allocation and improve performance.',
  'UI/UX Animation': 'Designing and implementing smooth, engaging user interface animations and transitions.',
  'Face Tracking': 'Using facial recognition technology to detect and respond to user expressions, head movements, and mouth gestures.',
  'Game Loop': 'The core game cycle handling input, updating state, and rendering frames at a consistent rate.',
  'Audio Feedback': 'Playing synchronized sounds and effects in response to user actions and game events.',

  // Index page chips (small-chip variants - matching by text)
  'PurpleBug Inc.': 'Digital agency where I gained hands-on experience in AR development and interactive media.',
  'Effect House (TikTok AR)': 'TikTok\'s AR platform for creating interactive augmented reality effects and filters.',
  'Interactive AR Filters': 'Augmented reality filters that respond to user actions, facial expressions, and environment.',
  'Audio DSP': 'Digital signal processing techniques applied to audio for real-time sound analysis and effects.',
  'Gamified Face/Body Tracking': 'Using facial and body tracking technology to create engaging, game-like AR experiences.',
  'Hackathon 1st Place': 'Won first place in a competitive coding hackathon, demonstrating problem-solving under pressure.',
  'Dean\'s Lister': 'Consistent academic excellence recognized by being placed on the Dean\'s List.',
  'TOEIC 805/990': 'Scored 805 on the TOEIC, demonstrating strong English communication skills in a professional context.',
  'CCNA': 'Cisco Certified Network Associate, validating foundational networking knowledge and skills.',
  'Ethical Hacking': 'Knowledge of penetration testing and security assessment techniques to identify vulnerabilities.',
  'CompTIA Tech+': 'Entry-level certification covering IT fundamentals including hardware, software, and troubleshooting.',
  'Google Cloud': 'Familiarity with Google Cloud Platform services for cloud computing and infrastructure.',
  'Python (CodeChum)': 'Proven Python programming skills through CodeChum\'s competitive coding platform.',
  'Blockchain': 'Understanding of distributed ledger technology, smart contracts, and decentralized applications.',
  'SapPIIre': 'A capstone project — an SAP-inspired system for managing school enrollment and records.',
  'CCIS Tracker': 'A tracking system for the College of Computing and Information Sciences, monitoring student progress.',
  'PokedexCards': 'A web-based digital card collection inspired by the Pokédex for organizing Pokémon data.',
  'Personify API': 'A RESTful API project for managing and serving user profile data with authentication.',
  'DiceHard': 'A dice-rolling game application with probability tracking and interactive gameplay.',

  // Seminars page chips
  'Crypto & Blockchain': 'Foundational concepts of blockchain technology and cryptocurrency, including how transactions are validated and secured.',
  'Cryptocurrency': 'Digital or virtual currency secured by cryptography and typically built on blockchain technology.',
  'Web3': 'The vision of a decentralized internet built on blockchain technology, giving users more control over their own data.',
  'Decentralization': 'Distributing control and data across a network rather than relying on a single central authority.',
  'IoT Security': 'Best practices for securing internet-connected devices against common attack vectors.',
  'Network Security': 'Practices and technologies used to protect a network and its data from unauthorized access or attacks.',
  'Multi-Factor Authentication': 'A security method requiring two or more verification steps to confirm a user\'s identity.',
  'Network Segmentation': 'Dividing a network into smaller isolated segments to limit the spread and impact of security breaches.',
  'Machine Learning': 'A branch of AI where systems learn patterns from data to make predictions or decisions without explicit programming.',
  'Computer Vision': 'A field of AI focused on enabling systems to interpret and understand visual information from images and video.',
  'Natural Language Processing': 'A field of AI focused on enabling computers to understand, interpret, and generate human language.',
  'AI Ethics': 'The study of moral issues raised by AI systems, including bias, privacy, and the societal impact of automation.',
  'AI in Social Media': 'How machine learning and recommendation systems shape content feeds and the ethical questions this raises.',
  'CyberSocPH Member': 'Member of the Cybersecurity Society of the Philippines, a professional organization for cybersecurity practitioners.',
  'Cybersecurity Leadership': 'Guiding an organization\'s security strategy and culture, beyond just its technical implementation.',
  'Digital Transformation': 'The process of integrating technology, strategy, and culture to fundamentally change how an organization operates.',
  'Professional Networking': 'Building and maintaining relationships with peers and professionals to support long-term career growth.',
  'Beyond the Breach': 'A leadership-focused look at cybersecurity and digital transformation strategy.',
  'Beyond the Code': 'Modern cloud-native engineering practices including Zero Trust Architecture and Infrastructure as Code.',
  'Zero Trust Architecture': 'A security model built on "never trust, always verify," assuming no user or device is trusted by default.',
  'Kubernetes': 'An open-source platform for automating the deployment, scaling, and management of containerized applications.',
  'Infrastructure as Code': 'Managing and provisioning computing infrastructure through machine-readable configuration files instead of manual processes.',
  'Terraform': 'An open-source Infrastructure as Code tool used to define and provision cloud infrastructure through declarative configuration.',
};

/**
 * Runs after Astro finishes loading the page.
 * This is important because Astro uses client-side navigation.
 */
document.addEventListener('astro:page-load', () => {
  initChipTooltips();
});

function initChipTooltips() {
  // Collect all clickable chips on the page.
  const chips = document.querySelectorAll('.single-chip');

  // Current/active tooltip + chip (only one tooltip at a time).
  let activeTooltip = null;
  let activeChip = null;

  // Used to throttle tooltip position updates during scroll/resize.
  let rafId = null;

  /**
   * Computes the tooltip position so it stays anchored to the clicked chip
   * even while the user scrolls/resizes the page.
   */
  const updatePosition = () => {
    // If either the tooltip or chip is missing, there's nothing to compute.
    if (!activeTooltip || !activeChip) return;

    // Get chip position in the viewport at this moment.
    const rect = activeChip.getBoundingClientRect();

    // Keep tooltip within the viewport horizontally.
    const maxLeft = window.innerWidth - 320;

    // Apply the updated coordinates.
    activeTooltip.style.left = Math.min(rect.left, maxLeft) + 'px';
    activeTooltip.style.top = (rect.bottom + 8) + 'px';
  };

  /**
   * Throttles calls to updatePosition() by scheduling a single DOM update
   * per animation frame (better performance during scroll).
   */
  const scheduleUpdate = () => {
    // Only update when a tooltip is currently visible.
    if (!activeTooltip) return;

    // Cancel any pending frame update to avoid stacking.
    if (rafId) cancelAnimationFrame(rafId);

    // Schedule tooltip repositioning for the next animation frame.
    rafId = requestAnimationFrame(() => {
      updatePosition();
      rafId = null; // Clear RAF id after execution.
    });
  };

  // Event callbacks that reuse the throttled scheduler.
  const onScroll = () => scheduleUpdate();
  const onResize = () => scheduleUpdate();

  // The page's actual scrollable element is `.main` (it has `overflow: auto`),
  // not `window` — so the listener must be attached there too, or the
  // tooltip never repositions while the user scrolls.
  const scrollContainer = document.querySelector('.main');

  // While a tooltip is active, keep it aligned with the chip as the user scrolls.
  window.addEventListener('scroll', onScroll, { passive: true });
  scrollContainer?.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // Attach click listeners to all chips on the page.
  chips.forEach(chip => {
    // Skip chips inside anchor links to avoid interfering with normal navigation.
    if (chip.closest('a[href]')) return;

    // Improve affordance that the chip is clickable.
    chip.style.cursor = 'pointer';

    chip.addEventListener('click', (e) => {
      // Stop propagation so the document-level "outside click" handler doesn't close it immediately.
      e.stopPropagation();

      // Remove any existing tooltip before showing a new one.
      if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
        activeChip = null;
      }

      // Match chip label to tooltip description.
      const text = chip.textContent.trim();
      const description = chipDescriptions[text];

      // If no description exists for this label, do nothing.
      if (!description) return;

      // Create tooltip element.
      const tooltip = document.createElement('div');
      tooltip.className = 'chip-tooltip';
      tooltip.textContent = description;
      tooltip.setAttribute('data-chip-tooltip', '');

      // Use fixed positioning so scroll doesn't move it away from the viewport anchor.
      tooltip.style.position = 'fixed';

      // Add tooltip to DOM and mark current active tooltip/chip.
      document.body.appendChild(tooltip);
      activeTooltip = tooltip;
      activeChip = chip;

      // Position it immediately (before any animation class is toggled).
      updatePosition();

      // Next frame: add "visible" class to trigger any CSS transitions.
      requestAnimationFrame(() => {
        tooltip.classList.add('visible');
      });
    });
  });

  /**
   * Closes the active tooltip when the user clicks outside a chip and outside the tooltip itself.
   */
  // Global click handler used to close the tooltip when clicking outside.
  const closeHandler = (e) => {
    // If the click is inside the tooltip, keep it open.
    const clickedTooltip = e.target.closest('.chip-tooltip');

    // If the click is on another chip, keep it open (chip click will replace the tooltip).
    const clickedChip = e.target.closest('.single-chip');

    // Clicking tooltip/chip should not close.
    if (clickedTooltip || clickedChip) return;

    // Only close if we have an active tooltip.
    if (activeTooltip) {
      // Remove visible state first to allow CSS fade-out transitions.
      activeTooltip.classList.remove('visible');

      // Remove tooltip from DOM after transition duration.
      setTimeout(() => {
        if (activeTooltip) {
          activeTooltip.remove();
          activeTooltip = null;
          activeChip = null;
        }
      }, 200);
    }
  };

  // Global click listener to detect "click outside".
  document.addEventListener('click', closeHandler);

  /**
   * Cleanup function.
   * Note: This returns a cleanup closure (not executed here).
   * It's ready for future refactors if Astro transitions/components reuse this init.
   */
  // Cleanup closure (useful if init is later enhanced to support teardown on navigation).
  return () => {
    // Remove event listeners.
    document.removeEventListener('click', closeHandler);
    window.removeEventListener('scroll', onScroll);
    scrollContainer?.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);

    // Ensure active tooltip is removed.
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
      activeChip = null;
    }

    // Cancel any pending RAF update.
    if (rafId) cancelAnimationFrame(rafId);
  };
}
