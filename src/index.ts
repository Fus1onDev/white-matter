import yaml from 'js-yaml';

const matter = (markdown: string) => {
  const separator = '---';
  const lines = markdown.split('\n');

  // If the format is invalid, return the whole markdown as content
  if (lines[0] !== separator || lines.filter(l => l === separator).length < 2) {
    return { content: markdown, data: undefined };
  }
  
  const endSeparatorIndex = lines.slice(1).indexOf(separator) + 1;
  const frontMatter = lines.slice(1, endSeparatorIndex).join('\n');

  // If the front matter is not valid YAML, return undefined as data
  let data: any;
  try {
    data = yaml.load(frontMatter);
  } catch (err) {
    console.log(err);
    data = undefined;
  }

  const content = lines.slice(endSeparatorIndex + 1).join('\n').trim();
  return { content, data };
};

export default matter;
