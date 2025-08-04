"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromSlateNodes = void 0;
const extractTextFromSlateNodes = (nodes) => {
    if (!nodes || !Array.isArray(nodes))
        return '';
    return nodes.map((node) => {
        let text = '';
        if (typeof node.text === 'string') {
            text += node.text;
        }
        if (Array.isArray(node.children)) {
            text += (0, exports.extractTextFromSlateNodes)(node.children);
        }
        return text;
    }).join(' ').replace(/\s+/g, ' ').trim(); // Normalize spaces
};
exports.extractTextFromSlateNodes = extractTextFromSlateNodes;
