import yaml from 'js-yaml';

/**
  * Extracts the front matter and content from a markdown string.
  *
  * @param {string} markdown Markdown string to parse.
  * @returns {{ content: string, data: unknown }} The markdown content and the front matter data.
  */
const matter = (markdown: string): { content: string; data: unknown; } => {
  // If the markdown is empty, return empty content and undefined data
  if (markdown === '') {
    return { content: markdown, data: undefined };
  }

  const cached = matter.cache[markdown];
  if (cached) {
    return cached;
  } else {
    const parsed = parseMatter(markdown);
    matter.cache[markdown] = parsed;
    return parsed;
  }
};

const parseMatter = (markdown: string): { content: string; data: unknown; } => {
  const open = '---';
  const close = '\n' + open;

  // If there's no front matter, return the original markdown and undefined data
  if (!markdown.startsWith(open) || markdown.charAt(open.length) !== '\n') {
    return { content: markdown, data: undefined };
  }

  const str = markdown.slice(open.length);
  const len = str.length;
  let closeIndex = str.indexOf(close);
  if (closeIndex === -1) {
    closeIndex = len;
  }
  const frontMatter = str.slice(0, closeIndex);

  const block = frontMatter.replace(/^\s*#[^\n]+/gm, '').trim();
  if (block === '') {
    return { content: markdown, data: undefined };
  }

  let data: unknown;
  try {
    data = yaml.load(frontMatter);
  } catch (err) {
    data = undefined;
  }

  let content = '';
  if (closeIndex !== len) {
    content = str.slice(closeIndex + close.length);
    if (content[0] === '\r') {
      content = content.slice(1);
    }
    if (content[0] === '\n') {
      content = content.slice(1);
    }
  }

  return { content, data };
};

matter.cache = {} as { [key: string]: { content: string; data: unknown; }; };

export default matter;
