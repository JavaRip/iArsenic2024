import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../useAuth/useAuth";
import { ActionItem } from "../../models";
import getActionItemFn from './getActionItem'
import getResourceActionItemsFn from './getResourceActionItems'
import createActionItemFn from "./createActionItem";

export function useActionItems() {
    const auth = useAuth();
    const { data: token } = auth.getAccessToken
    const queryClient = useQueryClient();

    const getActionItem = (actionItemId: string) => {
        return useQuery<ActionItem>({
            queryKey: ['action-item', actionItemId],
            enabled: !!actionItemId,
            queryFn: () => getActionItemFn(token, actionItemId),
        })
    }

    const getResourceActionItems = (resourceId: string) => {
        return useQuery<ActionItem[]>({
            queryKey: ['resource-action-items', resourceId],
            enabled: !!resourceId,
            queryFn: () => getResourceActionItemsFn(token, resourceId),
        })
    }

    const createActionitem = () => {
        return useMutation({
            mutationFn: (data?: Partial<ActionItem>) => {
                return createActionItemFn(token, data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['resource-action-items'] })
            }
        })
    }

    return {
        createActionitem,
        getActionItem,
        getResourceActionItems,
    }
}