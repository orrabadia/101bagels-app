import {Router} from 'express'
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';

const router = Router();
router.use(auth);


router.post('/create', 
    handler(async (req, res) => {
        const order = req.body;

        if (!order.items || order.items.length <= 0) {
            return res.status(BAD_REQUEST).send('Cart Is Empty!');
        }

        console.log("Authenticated user:", req.user);
      
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW,
        })

        const newOrder = new OrderModel({...order, user: req.user.id, status: OrderStatus.NEW});
        console.log('New Order Payload: ', newOrder)
        try {
            await newOrder.save()
            res.send(newOrder);
        } catch (error) {
            console.error("Order save failed:", err);
            res.status(BAD_REQUEST).send({ message: "Order save failed", error: err.message });
        }


    })
)

const getNewOrderForCurrentUser = async req => {
    return (await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW, }).populate('user'));
}

router.get(
    '/newOrderForCurrentUser',
    handler(async (req, res) => {
        const order = await getNewOrderForCurrentUser(req);
        if (order) res.send(order);
        else res.status(BAD_REQUEST).send({ message: 'No new order found for current user' });
    })
);

router.get(
    '/latestOrderForCurrentUser',
    handler(async (req, res) => {
        const latestOrder = await OrderModel.findOne({ user: req.user.id }).sort({ createdAt: -1 });
  
      if (!latestOrder) {
        return res.status(BAD_REQUEST).send({ message: 'No recent order found for current user' });
      }
      res.send({
        ...latestOrder.toObject(), 
        orderedAt: latestOrder.createdAt,
      });
    })
);

router.post('/cancel-latest', auth, handler(async (req, res) => {
  const order = await OrderModel.findOneAndUpdate(
    { user: req.user.id, status: 'NEW' },
    { status: 'CANCELLED' }
  );
  res.send({ success: !!order });
}));

router.get('/my-orders/:orderId', handler(async (req, res) => {
  const { orderId } = req.params;
  const user = await UserModel.findById(req.user.id);

  const filter = { _id: orderId };

  if (!user) {
    return res.status(UNAUTHORIZED).send({ message: 'User not found' });
  }

  if (!user.isAdmin) {
    filter.user = user.id;
  }

  const order = await OrderModel.findOne(filter);

  if (!order) return res.status(UNAUTHORIZED).send({ message: 'Order not found or unauthorized' });


  return res.send(order);

}))

router.get('/my-orders', handler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  const filter = {status: { $ne: OrderStatus.PENDING }}
  if (!user.isAdmin) {
    filter.user = user.id;
  }

  const orders = await OrderModel.find(filter).sort({ createdAt: -1 });

  res.send(orders);
}));

router.get('/:id', auth, handler(async (req, res) => {
    const order = await OrderModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
  
    if (!order) return res.status(404).send({ message: 'Order not found' });
  
    res.send(order);
}));



export default router;

