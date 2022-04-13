import sharp, { ResizeOptions } from 'sharp';
export declare const generateResizedAssets: (sourcePath: string, destinationPath: string, width: number, height?: number, options?: ResizeOptions) => Promise<sharp.OutputInfo>;
export declare const generateResizedAssetsWithoutAlpha: (sourcePath: string, destinationPath: string, width: number, height: number, options: ResizeOptions, backgroundColor: string) => Promise<sharp.OutputInfo>;
