import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Layout from '../../components/Layout';

export default function BlogPost({ frontmatter, content }) {
  return (
    <Layout>
      <div className="mb-12">
        <span className="font-bold">aditya washikar</span>
      </div>

      <article>
        <p className="mb-4">{frontmatter.date}</p>
        

        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('blogs'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('blogs', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content
    }
  };
}