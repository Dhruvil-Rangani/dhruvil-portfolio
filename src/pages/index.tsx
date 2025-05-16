// pages/index.tsx

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Github, Linkedin, ExternalLink, ArrowUp, Mail, FileText, X as CloseIcon } from 'lucide-react';
import Image from 'next/image';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import { Analytics } from '@vercel/analytics/react';


// Ensure Modal binds to your app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

/* ─────────────────────────  SFX  ───────────────────────── */
const tickSound = new Howl({ src: ['/sounds/ticksound.wav'], volume: 0.3, preload: true });
const roleSound = new Howl({ src: ['/sounds/roleswap.wav'], volume: 0.3, preload: true });

/* ───────────────────────  PROJECTS  ─────────────────────── */
const projects = [
  {
    title: 'Full-Stack Blogging Platform',
    description:
      'Modern blog built with Next.js, PostgreSQL & Prisma. Secure JWT auth, rich-text editor, and real-time comments via WebSockets.',
    github: 'https://github.com/Dhruvil-Rangani/blogsite',
    live: 'https://makeblog.vercel.app/',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'JWT'],
  },
  {
    title: 'Fintech Web Application',
    description:
      'MERN dashboard for managing investments. Secure login, Stripe integration, Chart.js visualisations.',
    github: 'https://github.com/Dhruvil-Rangani/Paytm-Web-App',
    live: 'https://moneytransfer.vercel.app/',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'Chart.js'],
  },
  {
    title: 'Healthcare AI Assistant',
    description:
      'AI assistant (Brain.js) that predicts health patterns from user symptoms. React + Node backend, JWT-secured.',
    github: 'https://github.com/Dhruvil-Rangani/vital_plus',
    live: 'https://vital-plus.netlify.app/',
    techStack: ['React', 'Node.js', 'Brain.js', 'MongoDB', 'JWT'],
  },
  {
    title: 'Self-Hosted Email Platform (🚀 Coming Soon)',
    description:
      'Ground-up email system running Postfix + Dovecot on Docker (Hetzner). Threaded inbox, tagging, AI search — backed by Node.js + Express, PostgreSQL + Prisma, JWT auth, slick Next.js front-end.',
    github: 'https://github.com/Dhruvil-Rangani/Ai-Powered-Email-APP',
    live: 'https://email.dhruvilrangani.com/',
    techStack: [
      'Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'JWT',
      'Node.js + Express', 'Postfix', 'Dovecot', 'Docker', 'Hetzner Cloud',
    ],
  },
];

/* ────────────────────────  SKILLS  ──────────────────────── */
const skills = [
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
  { name: 'AWS', icon: '/icons/aws.svg' },
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'Kubernetes', icon: '/icons/kubernetes.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
//   { name: 'SQL', icon: '/icons/sql.svg' },
//   { name: 'Python', icon: '/icons/python.svg' },
//   { name: 'Java', icon: '/icons/java.svg' },
//   { name: 'C#', icon: '/icons/csharp.svg' }, // Uncomment if desired
//   { name: 'GraphQL', icon: '/icons/graphql.svg' },
//   { name: 'REST APIs', icon: '/icons/restapi.svg' }, // Being more explicit
//   // { name: 'FastAPI', icon: '/icons/fastapi.svg' }, // Uncomment if desired
//   { name: 'Spring Boot', icon: '/icons/springboot.svg' }, // Uncomment if desired
//   { name: 'MySQL', icon: '/icons/mysql.svg' },
//   { name: 'DynamoDB', icon: '/icons/dynamodb.svg' }, // Uncomment if desired
//   { name: 'GitHub Actions', icon: '/icons/githubactions.svg' },
//   { name: 'CI/CD', icon: '/icons/cicd.svg' },
//   { name: 'Jest', icon: '/icons/jest.svg' },
//   { name: 'Postman', icon: '/icons/postman.svg' },
];

/* ────────────────────  ROTATING ROLES  ──────────────────── */
const roles = [
  'Software Developer',
  'Full-Stack Engineer',
  'Cloud & API Enthusiast',
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  /* scroll & roles */
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  /* Contact Modal */
  const [isContactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', from: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* Resume Modal */
  const [isResumeOpen, setResumeOpen] = useState(false);
  const resumeUrl = '/Dhruvil_Rangani_Resume.pdf'; // Ensure this PDF is in your /public folder

  // resumeViewerRef and resumeWidth state are no longer needed for iframe method
  // const resumeViewerRef = useRef<HTMLDivElement>(null);
  // const [resumeWidth, setResumeWidth] = useState<number | undefined>();

  /* Bot logging ref */
  const hasLogged = useRef(false);

  /* Role rotation */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentRoleIndex(i => {
        roleSound.play();
        return (i + 1) % roles.length;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  /* Scroll listener for scroll-to-top button */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Section observer for active nav link */
  useEffect(() => {
    const ids = ['about', 'skills', 'projects'];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id !== activeSection) {
              tickSound.play();
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [activeSection]);

  /* Bot logging */
  useEffect(() => {
    if (hasLogged.current || process.env.NODE_ENV === 'development') return;
    hasLogged.current = true;
    const userAgent = navigator.userAgent;
    const isBot = /(bot|crawl|spider|slurp|ia_archiver)/i.test(userAgent);
    fetch('/api/log-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        userAgent,
        isBot,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }, []);

  // Resume PDF width listener is no longer needed for iframe method
  // useEffect(() => { ... });


  /* EmailJS send */
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.from || !form.subject || !form.message) {
      alert('Please fill in all fields, including your name.');
      return;
    }
    setSending(true);
    try {
      const adminTemplateParams = {
        from_name: form.name.trim(),
        from_email: form.from,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_6et1vcr',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_ADMIN_TEMPLATE_ID',
        adminTemplateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      if (process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID) {
        const userNameForEmail = form.name ? form.name.trim() : 'there';
        const userConfirmationParams = {
          user_name: userNameForEmail,
          to_email: form.from,
          user_subject: form.subject,
        };
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_6et1vcr',
          process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID,
          userConfirmationParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
        );
      }

      setSent(true);
      setForm({ name: '', from: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS Send Error:', err);
      alert('Failed to send message. Please try again later or contact me directly at dhruvilrangani007@gmail.com.');
    } finally {
      setSending(false);
    }
  };

  const openContactModal = () => {
    setSent(false);
    setForm({ name: '', from: '', subject: '', message: '' });
    setContactOpen(true);
  };

  const closeContactModal = () => {
    setContactOpen(false);
  };

  const openResumeModal = () => setResumeOpen(true);
  const closeResumeModal = () => setResumeOpen(false);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 px-4 sm:px-6 py-10 font-sans">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-slate-900/10 to-transparent pointer-events-none z-0" />

      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 50 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex space-x-2 sm:space-x-4 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-full px-3 py-2 shadow-xl"
      >
        {['about', 'skills', 'projects'].map(sec => (
          <a
            key={sec}
            href={`#${sec}`}
            onClick={() => setActiveSection(sec)}
            className={`relative px-3 py-1.5 text-xs sm:text-sm transition-colors duration-200 rounded-full
                        ${activeSection === sec
                          ? 'text-blue-400'
                          : 'text-zinc-300 hover:text-blue-400'
                        }`}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
            {activeSection === sec && (
              <motion.span
                layoutId="underline"
                className="absolute inset-0 bg-blue-500/30 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </motion.nav>

      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            aria-label="Scroll to top"
            className="fixed bottom-24 sm:bottom-6 right-6 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50 cursor-pointer"
          >
            <ArrowUp size={20} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center pt-24 pb-12 sm:pt-32 sm:pb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-zinc-100">Hi 👋🏻, I’m</h1>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 py-2"
        >
          Dhruvil Rangani
        </motion.h2>

        <div className="mt-3 min-h-[32px] text-base sm:text-lg text-blue-300">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRoleIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {roles[currentRoleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={openContactModal}
            aria-label="Contact me via form"
            className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-full hover:bg-green-400 shadow-md transition-colors text-sm sm:text-base cursor-pointer"
          >
            <Mail size={18}/> Contact Me
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={openResumeModal}
            aria-label="View my resume"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 shadow-md transition-colors text-sm sm:text-base cursor-pointer"
          >
            <FileText size={18}/> View Resume
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            href="https://github.com/Dhruvil-Rangani" target="_blank" rel="noopener noreferrer" aria-label="My GitHub Profile"
            className="p-2.5 text-zinc-300 hover:text-blue-400 transition-colors bg-zinc-800 rounded-full shadow-md"
          >
            <Github size={22}/>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            href="https://linkedin.com/in/dhruvilrangani007" target="_blank" rel="noopener noreferrer" aria-label="My LinkedIn Profile"
            className="p-2.5 text-zinc-300 hover:text-blue-400 transition-colors bg-zinc-800 rounded-full shadow-md"
          >
            <Linkedin size={22}/>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href="mailto:dhruvilrangani007@gmail.com"
            aria-label="Email me directly"
            className="flex items-center gap-2 px-4 py-2.5 text-blue-400 border border-blue-400/50 rounded-full hover:bg-blue-400/10 hover:text-blue-300 shadow-md transition-colors text-sm sm:text-base"
          >
            Direct Email
          </motion.a>
        </div>
      </motion.div>

      <motion.section
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mt-20 sm:mt-32 py-12 sm:py-16 flex flex-col items-center text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8 text-zinc-100">About Me</h2>
        <p className="max-w-3xl text-sm sm:text-base text-zinc-300 leading-relaxed sm:leading-loose">
          I&apos;m a full-stack engineer who loves shipping entire products—from polished
          React/Next.js front-ends to rock-solid back-end infrastructure. Most recently
          I built a fully <strong>self-hosted email platform</strong> on Postfix + Dovecot,
          Docker and Hetzner Cloud, complete with Node/Express APIs, PostgreSQL + Prisma,
          JWT auth and a real-time Next.js inbox. Earlier projects include a real-time
          blogging platform, a MERN fintech dashboard and an AI-powered healthcare
          assistant. Comfortable across the stack (TypeScript, GraphQL/REST, Postgres,
          Mongo, Docker/AWS, CI/CD), I sweat clean architecture, observability and
          delightful UX. I&apos;m looking for a team where I can own features end-to-end and
          keep sharpening my distributed-systems and product skills.
        </p>
      </motion.section>

      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mt-16 sm:mt-24 py-12 sm:py-16 flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-zinc-100">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-4xl">
          {skills.map(s => (
            <motion.div
              key={s.name}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center gap-2 bg-zinc-800/70 p-4 rounded-lg shadow-lg hover:bg-blue-700/20 transition-colors"
            >
              <Image src={s.icon} alt={`${s.name} icon`} width={32} height={32} className="sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm text-zinc-200">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mt-16 sm:mt-24 py-12 sm:py-16 flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-zinc-100">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-800/70 p-6 rounded-xl shadow-xl hover:shadow-blue-500/30 hover:bg-zinc-700/50 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-400">{p.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
                  <motion.a
                    href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${p.title}`}
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors"
                    whileHover={{x:2}}
                  >
                    <Github size={16} /> GitHub
                  </motion.a>
                  <motion.a
                    href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${p.title}`}
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors"
                    whileHover={{x:2}}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </motion.a>
                </div>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map(t => (
                    <span
                      key={t}
                      className="bg-blue-600/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onRequestClose={closeContactModal}
        contentLabel="Contact Me Modal"
        className="fixed inset-0 flex items-center justify-center p-4 z-[60]"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-zinc-800 p-6 sm:p-8 rounded-lg w-full max-w-md shadow-2xl border border-zinc-700"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100">Contact Me</h2>
            <button onClick={closeContactModal} aria-label="Close contact form" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              <CloseIcon size={24}/>
            </button>
          </div>

          {sent ? (
            <div className="text-center py-4">
                <motion.div initial={{scale:0}} animate={{scale:1}} className="text-green-400 text-5xl mb-3 mx-auto w-fit">✓</motion.div>
                <p className="text-green-400 text-lg">Thanks! Your message has been sent.</p>
                <p className="text-zinc-300 text-sm mt-1">I&apos;ll get back to you soon. A confirmation email is on its way to your inbox.</p>
                <button
                    onClick={closeContactModal}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-2.5 rounded text-white transition-colors"
                >
                    Close
                </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <input
                type="text" required placeholder="Your Name"
                name="from_name_field"
                className="w-full p-2.5 bg-zinc-700 text-zinc-100 rounded border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                type="email" required placeholder="Your Email"
                name="from_email"
                className="w-full p-2.5 bg-zinc-700 text-zinc-100 rounded border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.from}
                onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
              />
              <input
                type="text" required placeholder="Subject"
                name="subject"
                className="w-full p-2.5 bg-zinc-700 text-zinc-100 rounded border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              />
              <textarea
                required rows={4} placeholder="Your Message"
                name="message"
                className="w-full p-2.5 bg-zinc-700 text-zinc-100 rounded resize-none border border-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-zinc-500 p-2.5 rounded text-white font-semibold transition-colors"
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </Modal>

      {/* Resume Modal with iframe */}
      <Modal
        isOpen={isResumeOpen}
        onRequestClose={closeResumeModal}
        contentLabel="Resume Viewer Modal"
        className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[60]" // Ensure modal is above overlay
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y:50 }}
          animate={{ scale: 1, opacity: 1, y:0 }}
          exit={{ scale: 0.9, opacity: 0, y:50 }}
          transition={{type: 'spring', stiffness:200, damping:25}}
          className="bg-zinc-800 p-3 sm:p-4 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl border border-zinc-700"
        >
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">My Resume</h2>
            <button onClick={closeResumeModal} aria-label="Close resume viewer" className="text-zinc-400 hover:text-red-400 transition-colors p-1">
              <CloseIcon size={24}/>
            </button>
          </div>
          <div className="flex-1 overflow-hidden bg-zinc-900 rounded"> {/* Changed to overflow-hidden for iframe */}
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`} // Added parameters to hide toolbar, etc. (optional)
              title="Dhruvil Rangani Resume"
              width="100%"
              height="100%"
              style={{ border: 'none' }} // Remove iframe border
              // sandbox // Optional: for added security, but might restrict some PDF functionalities
            >
              <p className="p-4 text-zinc-300">Your browser does not support embedded PDFs. Please <a href={resumeUrl} download="Dhruvil_Rangani_Resume.pdf" className="text-blue-400 hover:underline">download the PDF</a> to view it.</p>
            </iframe>
          </div>
           <a
            href={resumeUrl}
            download="Dhruvil_Rangani_Resume.pdf"
            className="mt-3 text-center w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
          >
            Download PDF
          </a>
        </motion.div>
      </Modal>

      <Analytics />
      <footer className="text-center py-10 mt-20 border-t border-zinc-800 relative z-10">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Dhruvil Rangani. All rights reserved.
        </p>
        <p className="text-xs text-zinc-600 mt-1">
            Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </footer>
    </div>
  );
}
