import { fetchImages } from '../utils/pixabay.service.js';

export const getImages = async (req, res) => {
  try {
    const { category = 'nature', page = 1, sort = 'id', order = 'asc' } = req.query;
    console.log(`Fetching images for category: ${category}, page: ${page}, sort: ${sort}, order: ${order}`);

    const data = await fetchImages(category, page);

    if (!data?.hits) {
      return res.status(404).json({ message: 'No images found' });
    }

    const sortedImages = [...data.hits].sort((a, b) => {
      let fieldA = a[sort];
      let fieldB = b[sort];

      if (typeof fieldA === 'string') fieldA = fieldA.toLowerCase();
      if (typeof fieldB === 'string') fieldB = fieldB.toLowerCase();

      if (order === 'desc') {
        return fieldA < fieldB ? 1 : -1;
      } else {
        return fieldA > fieldB ? 1 : -1;
      }
    });

    res.json({
      id: data.id,
      total: data.total,
      totalHits: data.totalHits,
      hits: sortedImages,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
