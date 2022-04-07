const Image = require('../models/Image');
const crypto = require('crypto');
const config = require('../config');

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
    const imageName = crypto.randomBytes(20).toString('hex');
    const [fileExtension] = file.name.split('.').slice(-1);
    const uploadPath = config.uploadPathBase + `${imageName}.${fileExtension}`;
    return file.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      const { productId } = req.body;

      const url = `http://localhost:${config.port}/${imageName}.${fileExtension}`;
      // TODO: resize and determine real image dimensions
      const width = 256;
      const height = 256;
      await Image.create({
        url,
        width,
        height,
        productId,
      });
      return res.status(200).send();
    });
  };

  return {
    getAll,
    create,
  };
}

module.exports = new ImageController();
