const Product = require('../models/Product');

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
 *          price:
 *            type: number
 *            format: float
 *          inventory:
 *            type: integer
 *          deliveryTimeBusinessDaysMin:
 *            type: integer
 *          deliveryTimeBusinessDaysMax:
 *            type: integer
 *          isActive:
 *            type: boolean
 *          category:
 *            type: string
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
    const allProducts = await Product.findAll();
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
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Product'
   *          example:
   *            SKU: AS131IO78CA
   *            price: 220.14
   *            inventory: 90
   *            deliveryTimeBusinessDaysMin: 2
   *            deliveryTimeBusinessDaysMax: 15
   *            isActive: true
   *            category: FURNITURE
   *     responses:
   *       200:
   *         schema:
   *           type: object
   */
  const create = async (req, res) => {
    const {
      SKU,
      price,
      inventory,
      deliveryTimeBusinessDaysMin,
      deliveryTimeBusinessDaysMax,
      isActive,
      category,
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
