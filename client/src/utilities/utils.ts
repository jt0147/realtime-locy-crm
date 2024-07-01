export const isNumber = (value: string) => {
    if (value === "") return false;
    return /^[0-9]*$/.test(value);
};

export const rgbToHex = (r: number, g: number, b: number) => {
    const result =
        "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    return result;
};

export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildTree(data: any[] | [], parentId = 0) {
    const tree: any[] = [];
    data.forEach((item) => {
        if (item.parentId === parentId) {
            const children = buildTree(data, item.id);
            if (children.length) {
                item.subRows = children;
            }
            tree.push(item);
        }
    });
    return tree;
}
