const Product = require('../models/Product');
const Image = require('../models/Image');
const { CATEGORY } = require('../helpers/types');

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
   *    responses:
   *     200:
   *       description: Products list array
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ArrayOfProduct'
   */
  const getAll = async (req, res) => {
    const allProducts = await Product.findAll({ include: Image });
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
    await Product.create({
      SKU,
      price,
      inventory,
      deliveryTimeBusinessDaysMin,
      deliveryTimeBusinessDaysMax,
      isActive,
      category,
    });
    return res.status(200).send();
  };

  return {
    getAll,
    create,
  };
}

module.exports = new ProductController();
