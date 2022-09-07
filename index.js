const yaml = require('js-yaml');

const matter = (markdown) => {
  const separator = '---';
  const lines = markdown.split('\n');
  if (lines[0] !== separator || lines.filter(l => l === separator).length < 2) {
    return { content: markdown, data: undefined };
  }
  
  const endSeparatorIndex = lines.slice(1).indexOf(separator) + 1;
  const frontMatter = lines.slice(1, endSeparatorIndex).join('\n');
  let data = {};
  try {
    data = yaml.load(frontMatter);
  } catch (err) {
    console.log(err);
  }

  const content = lines.slice(endSeparatorIndex + 1).join('\n').trim();
  return { content, data };
};

module.exports = matter;
