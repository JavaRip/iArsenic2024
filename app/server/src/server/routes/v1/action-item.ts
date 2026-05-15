import Router from '@koa/router';
import { useAuth } from '../../middleware'
import { ActionItemController } from '../../controllers';

const actionItem = new Router();

actionItem.post('/action-item', useAuth, ctx => ActionItemController.createActionItem(ctx));
actionItem.get('/action-item/:actionItemId', useAuth, ctx => ActionItemController.getActionItem(ctx));
actionItem.get('/action-item/resource/:resourceId', useAuth, ctx => ActionItemController.getResourceActionItems(ctx));

export default actionItem;
