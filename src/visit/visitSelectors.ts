import { ParsedLogic } from '../types'
import * as ts from 'typescript'
import {cloneNode} from "@wessberg/ts-clone-node";

export function visitSelectors(type: ts.Type, parsedLogic: ParsedLogic) {
    const { checker } = parsedLogic

    for (const property of type.getProperties()) {
        const name = property.getName()
        const value = (property.valueDeclaration as ts.PropertyAssignment).initializer
        if (ts.isArrayLiteralExpression(value) && value.elements.length > 1) {
            const inputFunction = value.elements[0] as ts.ArrowFunction | ts.FunctionDeclaration
            const inputFunctionTypeNode = checker.getTypeAtLocation(inputFunction)

            const selectorInputFunctionType = inputFunctionTypeNode.getCallSignatures()[0]?.getReturnType() as ts.Type
            const selectorInputTypeNode = selectorInputFunctionType ? checker.typeToTypeNode(selectorInputFunctionType) : null

            let functionTypes = []
            if (selectorInputTypeNode && ts.isTupleTypeNode(selectorInputTypeNode)) {
                functionTypes = selectorInputTypeNode.elementTypes.map((selectorTypeNode, index) => ({
                    // TODO: figure out the real name of the input
                    name: `arg${index + 1}`,
                    type: ts.isFunctionTypeNode(selectorTypeNode)
                        ? cloneNode(selectorTypeNode.type)
                        : ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                }))
            }

            // return type
            const computedFunction = value.elements[1] as ts.ArrowFunction | ts.FunctionDeclaration
            const computedFunctionTypeNode = checker.getTypeAtLocation(computedFunction)
            const type = computedFunctionTypeNode.getCallSignatures()[0]?.getReturnType()

            parsedLogic.selectors.push({
                name,
                typeNode: type ? checker.typeToTypeNode(type) : ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                functionTypes,
            })
        }
    }
}
