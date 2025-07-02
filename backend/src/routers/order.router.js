import {Router} from 'express'
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

const router = Router();
router.use(auth);

router.post('/create', 
    handler(async (req, res) => {
        const order = req.body;

        if (order.items.length <= 0) {
        return res.status(BAD_REQUEST).send('Cart Is Empty!')
        }

      
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW,
        })

        const newOrder = new OrderModel({...order, user: req.user.id});
        await newOrder.save()
        res.send(newOrder);


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





export default router;

