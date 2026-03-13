import { Context } from "koa";
import { ActionItemSchema } from "../models";
import { ActionItemService } from "../services/actionItem.service";
import { KnownError } from "../errors";

export const ActionItemController = {
    async createActionItem(ctx: Context) {
        const auth = ctx.state.auth
        const parsed = ActionItemSchema.partial().parse(ctx.request.body);

        const actionItem = await ActionItemService.createActionItem(
            auth,
            parsed,
        )

        ctx.status = 201
        ctx.body = { ...actionItem }
    },

    async getActionItem(ctx: Context) {
        // const auth = ctx.state.auth
        const actionItemId = ctx.params.actionitemId

        if (!actionItemId) {
            throw new KnownError({
                message: 'Action ID is required',
                code: 400,
                name: 'ValidationError'
            })
        }

        const actionItem = await ActionItemService.getActionItemById(
            actionItemId,
        )

        ctx.status = 200
        ctx.body = { ...actionItem }
    },

    async getResourceActionItems(ctx: Context) {
        const resourceId = ctx.params.resourceId

        if (!resourceId) {
            throw new KnownError({
                message: 'Resource ID is required',
                code: 400,
                name: 'ValidationError'
            })
        }

        const actionItems = await ActionItemService.getResourceActionItems(
            resourceId,
        )

        ctx.status = 200
        ctx.body = { actionItems }
    }
}