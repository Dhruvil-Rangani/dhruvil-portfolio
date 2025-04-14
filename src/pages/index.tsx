import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, ArrowUp } from 'lucide-react';
import { Howl } from 'howler';
import Image from 'next/image';

const tickSound = new Howl({
  src: ['/sounds/ticksound.wav'],
  volume: 0.3,
});

const projects = [
  {
    title: 'Full-Stack Blogging Platform',
    description:
      'A modern blogging platform built with Next.js, PostgreSQL, and Prisma. Features include secure user authentication using JWT, a rich-text editor for creating posts, comment threads, likes, and real-time updates using WebSockets. The backend is fully RESTful and optimized for scalability.',
    github: 'https://github.com/Dhruvil-Rangani/blogsite',
    live: 'https://makeblog.vercel.app/',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'JWT'],
  },
  {
    title: 'Fintech Web Application',
    description:
      'A complete financial platform built with the MERN stack for managing investments and tracking portfolios. Features include secure login, payment integration, data visualization, and role-based user access. Uses Redux for state management and MongoDB Atlas for data storage.',
    github: 'https://github.com/Dhruvil-Rangani/Paytm-Web-App',
    live: 'https://moneytransfer.vercel.app/',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Chart.js'],
  },
  {
    title: 'Healthcare AI Assistant',
    description:
      'An AI-powered assistant using Brain.js to predict user health patterns based on symptom input. Users can access health logs, track conditions, and get suggestions. Built with React and Node.js, and stores data securely with MongoDB. Auth uses JWT for secure access.',
    github: 'https://github.com/Dhruvil-Rangani/vital_plus',
    live: 'https://vital-plus.netlify.app/',
    techStack: ['React', 'Node.js', 'Brain.js', 'MongoDB', 'JWT'],
  },
];



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
  { name: 'Git', icon: '/icons/git.svg' }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const playTick = () => {
    tickSound.play();
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const sections = ['about', 'skills', 'projects'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            if (activeSection !== section) playTick();
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-black text-white scroll-smooth px-4 sm:px-6 py-10 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/10 via-blue-500/10 to-transparent pointer-events-none z-0" />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 backdrop-blur ${scrolled ? 'bg-black/70' : 'bg-transparent'
          }`}
      >
        <div className="flex justify-center flex-wrap space-x-4 sm:space-x-6 py-3 text-sm sm:text-base">
          {['about', 'skills', 'projects'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`px-2 py-1 rounded transition-colors duration-300 ${activeSection === section ? 'text-blue-400 font-semibold' : 'hover:bg-blue-600/20'
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </motion.nav>

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 z-50"
        >
          <ArrowUp />
        </button>
      )}

      <motion.div initial="hidden" animate="visible" variants={sectionVariant} transition={{ duration: 0.5 }} className="text-center mt-24 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dhruvil Rangani</h1>
        <p className="text-base sm:text-lg">Software Developer | Full-Stack Engineer | Cloud & API Enthusiast</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a href="https://github.com/Dhruvil-Rangani" target="_blank" rel="noopener noreferrer"><Github /></a>
          <a href="https://www.linkedin.com/in/dhruvilrangani007/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          <a href="mailto:dhruvilrangani007@gmail.com" className="text-blue-400 hover:text-blue-300">dhruvilrangani007@gmail.com</a>
        </div>
      </motion.div>

      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.5 }} className="mt-16 relative z-10">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-sm sm:text-base">
          I&apos;m a passionate Full Stack Software Engineer with a strong foundation in building robust and scalable web applications.
          Proficient in React, Next.js, Node.js, TypeScript, and AWS, I bring hands-on experience from projects spanning blogging platforms,
          fintech systems, and AI-powered healthcare apps. My skillset includes both SQL and NoSQL databases like PostgreSQL and MongoDB,
          and I&apos;m well-versed in DevOps tools like Docker and cloud platforms. I value clean architecture, intuitive UI/UX design, and agile
          collaboration. I'm currently looking for exciting opportunities where I can contribute to impactful products while growing as a developer.
        </p>
      </motion.section>

      <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.5 }} className="mt-16 relative z-10">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map(skill => (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={skill.name}
              className="flex items-center gap-2 bg-zinc-900 p-3 rounded-md shadow hover:shadow-lg hover:bg-blue-800/20 cursor-pointer"
            >
              <Image src={skill.icon} alt={skill.name} width={24} height={24} />
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.5 }} className="mt-16 relative z-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              className="bg-zinc-900 p-6 rounded-xl shadow-xl hover:bg-blue-800/10 transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <div className="flex flex-wrap gap-4 mb-3 text-sm text-blue-300">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <Github size={16} /> GitHub
                  </a>
                  <a href={proj.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
                <p className="text-sm mb-4 text-gray-300">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-700/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
