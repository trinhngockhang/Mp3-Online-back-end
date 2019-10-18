import * as DbController from './CategoryDAL';

export const popularCategory = async (req, res) => {
  const categories = await DbController.popularCategory();
  res.send(categories);
};
