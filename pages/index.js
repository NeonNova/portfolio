import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Typed from 'typed.js';

const ProjectEntry = ({ title, description, tryLink, githubLink }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div>
        {tryLink && (
          <a href={tryLink} className="text-green-400 hover:underline mr-2" target="_blank" rel="noopener noreferrer">
            Try It!
          </a>
        )}
        <a href={githubLink} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
    <p className="text-base md:text-lg">{description}</p>
  </div>
);

export default function Home({ blogs }) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const typed = new Typed('#typed', {
      strings: ['aka washi', 'upcoming swe?', 'mit manipal\'25'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Layout home>
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-center">
        aditya washikar.
      </h1>

      <div className="terminal p-4 mb-8 text-center">
        <div className="prompt mb-2">
          <span className="text-green-400 text-left">user@portfolio</span>:<span className="text-blue-400">~</span>$
          <span id="typed" className="cursor"></span>
        </div>
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">about.</h2>
        <p className="text-base md:text-lg mb-2">20y/o based in blr/mum</p>
        <p className="text-base md:text-lg mb-2">super into football, food and fashion</p>
        <p className="text-base md:text-lg">&lt;3 reading non-fiction, cooking, anime, finance, music</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">projects.</h2>
        <div className="flex-col space-y-8">
          <ProjectEntry
            title="habits."
            description="adhd-friendly habit tracker"
            tryLink="https://habit-alpha.vercel.app/"
            githubLink="https://github.com/NeonNova/habit."
          />
          <ProjectEntry
            title="PantryPal"
            description="intelligent recipe suggestion app using available ingredients in pantry."
            tryLink="https://pantrypal-pink.vercel.app/"
            githubLink="https://github.com/NeonNova/PantryPal"
          />
          <ProjectEntry
            title="typify."
            description="spotify-integrated typing test, type to music"
            githubLink="https://github.com/NeonNova/typify"
          />
          <ProjectEntry
            title="dharampal"
            description="desi discord bot for task management"
            githubLink="https://github.com/NeonNova/dharampal"
          />
        </div>
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">brain_dump.</h2>
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className="mb-2">
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-blue-400 hover:underline">{blog.frontmatter.title}</a>
              </Link>
              <span className="text-sm text-gray-400 ml-2">{blog.frontmatter.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('blogs'));

  const blogs = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('blogs', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
