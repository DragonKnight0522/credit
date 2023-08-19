import Content from '../../collections/content';

export const getCskhContent = async (req, res) => {
  let content = await Content.findOne({ type: 'cskh' });
  if (!content) {
    content = await Content.create({ type: 'cskh', content: '' });
  }

  res.send({ data: content.content });
};

export const updateCskhContent = async (req, res) => {
  const { content } = req.body;

  try {
    await Content.findOneAndUpdate({ type: 'cskh' }, { content });
    res.send(true);
  } catch (err) {
    res.send(false);
  }
};
