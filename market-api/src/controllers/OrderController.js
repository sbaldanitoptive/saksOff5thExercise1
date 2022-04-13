const sequelize = require('../db/connection/database');
const Order = require('../models/Order');
const Card = require('../models/Card');
const Address = require('../models/Address');
const Product = require('../models/Product');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - price
 *          - productId
 *          - userId
 *        properties:
 *          id:
 *            type: integer
 *          price:
 *            type: number
 *            format: float
 *            example: 220.12
 *          productId:
 *            type: integer
 *            example: 5
 *          userId:
 *            type: integer
 *            example: 1
 *          paymentCardId:
 *            type: integer
 *          shippingAddressId:
 *            type: integer
 *      ArrayOfOrder:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Order'
 * tags:
 *   - name: Orders
 *     description: Orders Form
 */
function OrderController() {
  /**
   * @swagger
   * /orders:
   *  get:
   *    description: Fetch a list of Orders
   *    tags: [Orders]
   *    responses:
   *     200:
   *       description: Orders list array
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ArrayOfOrder'
   */
  const getAll = async (req, res) => {
    const allOrders = await Order.findAll({
      include: { all: true },
    });
    return res.status(200).json({ orders: allOrders });
  };

  /**
   * @swagger
   * /orders:
   *   post:
   *     description: Create new Order
   *     tags: [Orders]
   *     requestBody:
   *       required: true
   *       content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/Order'
   *     responses:
   *       200:
   *         schema:
   *           type: object
   *       401:
   *         schema:
   *           type: object
   */
  const create = async (req, res) => {
    const {
      price,
      productId,
      userId,
      paymentCardId = null,
      shippingAddressId = null,
      fromWeb = false,
    } = req.body;

    // Determine paymentCard from request params or
    // check if user has at least one associated
    const paymentCard = paymentCardId
      ? await Card.findByPk(paymentCardId)
      : await Card.findOne({ where: { userId } });
    if (!paymentCard || paymentCard.userId != userId) {
      return !fromWeb
        ? res
            .status(401)
            .send(
              paymentCardId
                ? 'Invalid Payment Card Id'
                : 'User has no Payment Card associated'
            )
        : res.redirect('/post-order?success=false');
    }

    // Determine shippingAddress from request params or
    // check if user has at least one associated
    const shippingAddress = shippingAddressId
      ? await Address.findByPk(shippingAddressId)
      : await Address.findOne({ where: { userId } });
    if (!shippingAddress || shippingAddress.userId != userId) {
      return !fromWeb
        ? res
            .status(401)
            .send(
              shippingAddressId
                ? 'Invalid Shipping Address Id'
                : 'User has no Address associated'
            )
        : res.redirect('/post-order?success=false');
    }

    // Create new order and decrement product inventory in a single transaction
    await sequelize.transaction(async (t) => {
      await Order.create(
        {
          price,
          productId,
          userId,
          paymentCardId: paymentCard.id,
          shippingAddressId: shippingAddress.id,
        },
        { transaction: t }
      );
      return Product.decrement('inventory', {
        where: { id: productId },
        transaction: t,
      });
    });

    return !fromWeb
      ? res.status(200).send()
      : res.redirect('/post-order?success=true');
  };

  return {
    getAll,
    create,
  };
}

module.exports = new OrderController();
