const { Readable } = require('stream');
const csv = require('csv-parser');

const Product = require('../models/Product');
const Image = require('../models/Image');
const { CATEGORY } = require('../helpers/types');
const { storeImage } = require('../helpers/imageUtils');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - SKU
 *          - price
 *        properties:
 *          id:
 *            type: integer
 *          SKU:
 *            type: string
 *            example: UIA7824289912
 *          price:
 *            type: number
 *            format: float
 *            example: 220.12
 *          inventory:
 *            type: integer
 *            example: 50
 *          deliveryTimeBusinessDaysMin:
 *            type: integer
 *            example: 3
 *          deliveryTimeBusinessDaysMax:
 *            type: integer
 *            example: 5
 *          isActive:
 *            type: boolean
 *            example: true
 *          category:
 *            type: string
 *            example: OTHER
 *          image:
 *            type: string
 *            format: binary
 *      ArrayOfProduct:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Product'
 * tags:
 *   - name: Products
 *     description: Products Form
 */
function ProductController() {
  /**
   * @swagger
   * /products:
   *  get:
   *    description: Fetch a list of Products
   *    tags: [Products]
   *    parameters:
   *     - in: query
   *       name: page
   *       schema:
   *        type: integer
   *        default: 0
   *     - in: query
   *       name: category
   *       schema:
   *        type: string
   *        enum:
   *          - OTHER
   *          - SHOES
   *          - FURNITURE
   *          - HANDBAGS
   *    responses:
   *     200:
   *       description: Products list array
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ArrayOfProduct'
   */
  const getAll = async (req, res) => {
    const { pageSize = 20, page = 0, category = '' } = req.query;
    const whereClauses = { isActive: true };
    if (category) {
      whereClauses.category = category;
    }
    const allProducts = await Product.findAll({
      where: whereClauses,
      include: Image,
      limit: pageSize,
      offset: page * pageSize,
    });
    return res.status(200).json({ products: allProducts });
  };

  /**
   * @swagger
   * /products:
   *   post:
   *     description: Create new Product
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/Product'
   *     responses:
   *       200:
   *         schema:
   *           type: object
   */
  const create = async (req, res) => {
    const {
      SKU,
      price,
      inventory = 0,
      deliveryTimeBusinessDaysMin = 0,
      deliveryTimeBusinessDaysMax = 0,
      isActive = true,
      category = CATEGORY.OTHER,
    } = req.body;
    const product = await Product.create({
      SKU,
      price,
      inventory,
      deliveryTimeBusinessDaysMin,
      deliveryTimeBusinessDaysMax,
      isActive,
      category,
    });
    if (req.files.image) {
      const { url, width, height } = await storeImage({
        imageFile: req.files.image,
      });
      const productId = product.id;
      await Image.create({
        url,
        width,
        height,
        productId,
      });
    }
    return res.status(200).send();
  };

  /**
   * @swagger
   * /products-import:
   *   post:
   *     description: Import Products from CSV file
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              file:
   *                type: string
   *                format: binary
   *     responses:
   *       200:
   *         schema:
   *           type: object
   */
  const bulkImport = async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No files were uploaded.');
    }
    try {
      const { file } = req.files;
      const stream = Readable.from(file.data.toString());
      const products = await new Promise((resolve) => {
        const rows = [];
        stream
          .pipe(csv())
          .on('data', (data) => rows.push(data))
          .on('end', () => resolve(rows));
      });
      await Promise.all(products.map((product) => Product.create(product)));
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  return {
    getAll,
    create,
    bulkImport,
  };
}

module.exports = new ProductController();
