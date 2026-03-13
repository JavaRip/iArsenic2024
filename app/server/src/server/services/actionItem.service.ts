import uuid4 from 'uuid4'
import { KnownError } from "../errors";
import { AbstractToken, ActionItem, ActionItemSchema, User } from "../models";
import { ActionItemRepo } from "../repositories/actionItem.repo";

export const ActionItemService = {
    async createActionItem(
        auth: { user: User | { type: 'guest' }, token: AbstractToken },
        createActionItem: Partial<ActionItem>,
    ) {
        if (!createActionItem?.resourceId) {
            throw new Error('Cannot create action item with no resourceId')
        }

        if (!createActionItem?.message) {
            throw new Error('Cannot create action item with no message')
        }

        const actionItem = ActionItemSchema.parse({
            createdAt: new Date(),
            id: createActionItem?.id || uuid4(),
            message: createActionItem.message,
            resourceId: createActionItem.resourceId,
            type: createActionItem.type,
            userId: createActionItem.userId || (auth.user.type === 'guest' ? 'guest' : auth.user.id),
        })

        return await ActionItemRepo.create(actionItem)
    },

    async getActionItemById(id: string) {
        const actionItem = await ActionItemRepo.findById(id)

        if (!actionItem) {
            throw new KnownError({
                message: 'Action Item not found',
                code: 404,
                name: 'ActionItemNotFoundError',
            })
        }

        return ActionItemSchema.parse(actionItem)
    },

    async getResourceActionItems(resourceId: string) {
        return await ActionItemRepo.getByQuery([
            ['resourceId', '==', resourceId]
        ])
    }
}