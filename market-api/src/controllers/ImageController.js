const Image = require('../models/Image');
const { storeImage } = require('../helpers/imageUtils');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Image:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          url:
 *            type: string
 *          width:
 *            type: integer
 *          height:
 *            type: integer
 *          productId:
 *            type: integer
 *      ArrayOfImage:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Image'
 * tags:
 *   - name: Images
 *     description: Images Form
 */
function ImageController() {
  /**
   * @swagger
   * /images:
   *  get:
   *    description: Fetch a list of Images
   *    tags: [Images]
   *    responses:
   *     200:
   *       description: Images list array
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ArrayOfImage'
   */
  const getAll = async (req, res) => {
    const allImages = await Image.findAll();
    return res.status(200).json({ images: allImages });
  };

  /**
   * @swagger
   * /images:
   *   post:
   *     description: Create new Image
   *     tags: [Images]
   *     requestBody:
   *       required: true
   *       content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              productId:
   *                type: integer
   *              file:
   *                type: string
   *                format: binary
   *     responses:
   *       200:
   *         schema:
   *           type: object
   */
  const create = async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No files were uploaded.');
    }
    const { file } = req.files;
    if (!file.mimetype.includes('image')) {
      return res.status(400).send('No files of type image were uploaded.');
    }
    try {
      const { url, width, height } = await storeImage({ imageFile: file });
      const { productId } = req.body;
      await Image.create({
        url,
        width,
        height,
        productId,
      });
      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  };

  return {
    getAll,
    create,
  };
}

module.exports = new ImageController();
