// Auto-generated with kea-typegen. DO NOT EDIT!

import { Logic } from 'kea'

export interface githubImportLogicType<Repository> extends Logic {
    key: undefined
    actionCreators: {}
    actionKeys: {}
    actionTypes: {}
    actions: {}
    cache: Record<string, any>
    constants: {}
    defaults: {
        repositoryReducerCopy: Repository[]
    }
    events: {}
    path: ['samples', 'githubImportLogic']
    pathString: 'samples.githubImportLogic'
    props: Record<string, unknown>
    reducer: (
        state: any,
        action: () => any,
        fullState: any,
    ) => {
        repositoryReducerCopy: Repository[]
    }
    reducerOptions: {}
    reducers: {
        repositoryReducerCopy: (state: Repository[], action: any, fullState: any) => Repository[]
    }
    selector: (
        state: any,
    ) => {
        repositoryReducerCopy: Repository[]
    }
    selectors: {
        repositoryReducerCopy: (state: any, props: any) => Repository[]
        repositorySelectorCopy: (state: any, props: any) => Repository[]
    }
    values: {
        repositoryReducerCopy: Repository[]
        repositorySelectorCopy: Repository[]
    }
    _isKea: true
    __keaTypeGenInternalSelectorTypes: {
        repositorySelectorCopy: (arg1: Repository[]) => Repository[]
    }
    __keaTypeGenInternalReducerActions: {
        'set repositories (samples.githubLogic)': (
            repositories: Repository[],
        ) => {
            type: 'set repositories (samples.githubLogic)'
            payload: {
                repositories: Repository[]
            }
        }
        'set username (samples.githubLogic)': (
            username: string,
        ) => {
            type: 'set username (samples.githubLogic)'
            payload: {
                username: string
            }
        }
    }
}
